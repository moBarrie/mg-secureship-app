import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";
import { z } from "zod";
import dbConnect from "@/lib/db";
import { Shipment } from "@/models/Shipment";

const shipmentSchema = z.object({
  trackingId: z.string().optional(),
  senderName: z.string(),
  senderEmail: z.string().email(),
  receiverName: z.string(),
  receiverEmail: z.string().email(),
  parcelType: z.string(),
  weight: z.string(),
  value: z.string(),
  origin: z.string(),
  destination: z.string(),
  status: z.string().optional(),
  notes: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    console.log('POST /api/shipping - Starting request');
    
    const envStatus = {
      MONGODB_URI: !!process.env.MONGODB_URI,
      hasCluster0: process.env.MONGODB_URI?.includes('Cluster0'),
      SMTP_HOST: !!process.env.SMTP_HOST,
      SMTP_PORT: !!process.env.SMTP_PORT,
      SMTP_USER: !!process.env.SMTP_USER,
      SMTP_PASSWORD: !!process.env.SMTP_PASSWORD,
      SMTP_FROM: !!process.env.SMTP_FROM,
      CONTACT_EMAIL: !!process.env.CONTACT_EMAIL,
    };
    console.log('Environment variables status:', envStatus);

    const body = await request.json();
    console.log('Received body:', { ...body, senderEmail: '***@***.com' });
    
    const dataWithTracking = {
      ...body,
      trackingId: `SHP${Date.now().toString(36).toUpperCase()}`,
      status: "pending"
    };
    
    console.log('Attempting database connection...');
    try {
      await dbConnect();
      console.log('Database connection successful');
    } catch (error) {
      console.error('Database connection failed:', error);
      return NextResponse.json(
        { error: 'Database connection failed', details: error instanceof Error ? error.message : String(error) },
        { status: 500 }
      );
    }

    try {
      shipmentSchema.parse(dataWithTracking);
    } catch (error) {
      console.error('Validation error:', error);
      return NextResponse.json({ error: 'Invalid shipment data', details: error }, { status: 400 });
    }

    let createdShipment;

    try {
      createdShipment = await Shipment.create(dataWithTracking);
      console.log('Shipment created successfully:', createdShipment.trackingId);

      createdShipment.statusHistory.push({
        status: 'pending',
        notes: 'Shipment created',
        timestamp: new Date(),
      });
      await createdShipment.save();
      
    } catch (error) {
      console.error('Error creating shipment:', error);
      return NextResponse.json(
        { error: 'Failed to create shipment', details: error instanceof Error ? error.message : String(error) },
        { status: 500 }
      );
    }
    
    console.log('Preparing email notifications...');
    try {
      const notificationMessage = [
        'New Shipment Details:',
        '',
        `Tracking ID: ${dataWithTracking.trackingId}`,
        '',
        'Sender Information:',
        `Name: ${dataWithTracking.senderName}`,
        `Email: ${dataWithTracking.senderEmail}`,
        '',
        'Receiver Information:',
        `Name: ${dataWithTracking.receiverName}`,
        `Email: ${dataWithTracking.receiverEmail}`,
        '',
        'Parcel Details:',
        `Type: ${dataWithTracking.parcelType}`,
        `Weight: ${dataWithTracking.weight}`,
        `Declared Value: ${dataWithTracking.value}`,
        '',
        'Shipping Details:',
        `Origin: ${dataWithTracking.origin}`,
        `Destination: ${dataWithTracking.destination}`,
        '',
        `Status: ${dataWithTracking.status || 'Pending'}`,
        `Notes: ${dataWithTracking.notes || 'N/A'}`
      ].join('\n');

      const confirmationMessage = [
        `Dear ${dataWithTracking.senderName},`,
        '',
        'Your shipment has been successfully created. Please keep this tracking ID for future reference:',
        '',
        `Tracking ID: ${dataWithTracking.trackingId}`,
        '',
        'Shipment Details:',
        `- Parcel Type: ${dataWithTracking.parcelType}`,
        `- Weight: ${dataWithTracking.weight}`,
        `- Value: ${dataWithTracking.value}`,
        `- Destination: ${dataWithTracking.destination}`,
        '',
        'You can track your shipment at any time using your tracking ID.',
        '',
        'Thank you for choosing our services!',
        '',
        'Best regards,',
        'M&G SecureShip Team'
      ].join('\n');

      await sendEmail({
        name: dataWithTracking.senderName,
        email: dataWithTracking.senderEmail,
        subject: `New Shipment Created - Tracking ID: ${dataWithTracking.trackingId}`,
        message: notificationMessage
      });

      await sendEmail({
        name: dataWithTracking.senderName,
        email: dataWithTracking.senderEmail,
        subject: `Shipment Confirmation - Tracking ID: ${dataWithTracking.trackingId}`,
        message: confirmationMessage
      });
    } catch (error) {
      console.error('Error sending email notifications:', error);
    }

    return NextResponse.json({
      success: true,
      message: "Shipment created successfully",
      trackingId: dataWithTracking.trackingId
    });

  } catch (error) {
    console.error("Error creating shipment:", error);
    return NextResponse.json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to create shipment"
    }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { trackingId, status, notes } = body;

    if (!trackingId || !status) {
      return NextResponse.json({
        success: false,
        message: "Tracking ID and status are required"
      }, { status: 400 });
    }

    const shipment = await Shipment.findOne({ trackingId });
    if (!shipment) {
      return NextResponse.json({
        success: false,
        message: "Shipment not found"
      }, { status: 404 });
    }

    shipment.status = status;
    if (notes) shipment.notes = notes;

    shipment.statusHistory.push({
      status,
      notes: notes || `Status updated to ${status}`,
      timestamp: new Date()
    });

    await shipment.save();

    try {
      const updateMessage = [
        'Shipment Status Update:',
        '',
        `Tracking ID: ${trackingId}`,
        `New Status: ${status}`,
        `Notes: ${notes || 'N/A'}`,
        `Updated at: ${new Date().toLocaleString()}`
      ].join('\n');

      await sendEmail({
        name: shipment.senderName,
        email: shipment.senderEmail,
        subject: `Shipment Status Updated - ${trackingId}`,
        message: updateMessage
      });
    } catch (error) {
      console.error('Error sending status update email:', error);
    }

    return NextResponse.json({
      success: true,
      message: "Shipment status updated successfully"
    });

  } catch (error) {
    console.error("Error updating shipment:", error);
    return NextResponse.json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to update shipment"
    }, { status: 500 });
  }
}
