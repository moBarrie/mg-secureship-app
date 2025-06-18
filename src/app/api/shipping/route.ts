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
    
    // Log environment variables status (without exposing values)
    const envStatus = {
      MONGODB_URI: !!process.env.MONGODB_URI,
      SMTP_HOST: !!process.env.SMTP_HOST,
      SMTP_PORT: !!process.env.SMTP_PORT,
      SMTP_USER: !!process.env.SMTP_USER,
      SMTP_PASSWORD: !!process.env.SMTP_PASSWORD,
      SMTP_FROM: !!process.env.SMTP_FROM,
      CONTACT_EMAIL: !!process.env.CONTACT_EMAIL,
    };
    console.log('Environment variables status:', envStatus);

    const body = await request.json();
    console.log('Received body:', { ...body, senderEmail: '***@***.com' }); // Hide sensitive data
    
    // Generate tracking ID before validation
    const dataWithTracking = {
      ...body,
      trackingId: `SHP${Date.now().toString(36).toUpperCase()}`,
      status: "pending"
    };
    
    console.log('Attempting database connection...');
    await dbConnect();
    console.log('Database connected successfully');
    
    // Validate the complete data
    console.log('Validating data...');
    const data = shipmentSchema.parse(dataWithTracking);

    // Connect to database
    await dbConnect();

    // Create new shipment in MongoDB
    console.log('Creating new shipment...');
    const shipment = new Shipment(data);
    
    console.log('Saving shipment to database...');
    await shipment.save();
    console.log('Shipment saved successfully');

    // Add initial status to history
    console.log('Adding initial status to history...');
    shipment.statusHistory.push({
      status: 'pending',
      notes: 'Shipment created',
      timestamp: new Date(),
    });
    
    console.log('Preparing email notifications...');
    await sendEmail({
      name: data.senderName,
      email: data.senderEmail,
      subject: `New Shipment Created - Tracking ID: ${data.trackingId}`,
      message: `
        New Shipment Details:
        
        Tracking ID: ${data.trackingId}
        
        Sender Information:
        Name: ${data.senderName}
        Email: ${data.senderEmail}
        
        Receiver Information:
        Name: ${data.receiverName}
        Email: ${data.receiverEmail}
        
        Parcel Details:
        Type: ${data.parcelType}
        Weight: ${data.weight}
        Declared Value: ${data.value}
        
        Shipping Details:
        Origin: ${data.origin}
        Destination: ${data.destination}
        
        Status: ${data.status || 'Pending'}
        Notes: ${data.notes || 'N/A'}
      `
    });

    // Send confirmation email to sender
    await sendEmail({
      name: data.senderName,
      email: data.senderEmail,
      subject: `Shipment Confirmation - Tracking ID: ${data.trackingId}`,
      message: `
        Dear ${data.senderName},

        Your shipment has been successfully created. Please keep this tracking ID for future reference:
        
        Tracking ID: ${data.trackingId}
        
        Shipment Details:
        - Parcel Type: ${data.parcelType}
        - Weight: ${data.weight}
        - Value: ${data.value}
        - Destination: ${data.destination}
        
        You can track your shipment at any time using your tracking ID.
        
        Thank you for choosing our services!
        
        Best regards,
        M&G SecureShip Team
      `
    });

    return NextResponse.json({
      success: true,
      message: "Shipment created successfully",
      trackingId: data.trackingId
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
    const body = await request.json();
    const { trackingId, status, notes } = body;

    if (!trackingId || !status) {
      return NextResponse.json({
        success: false,
        message: "Tracking ID and status are required"
      }, { status: 400 });
    }

    // Here you would typically update the status in your database
    // For now, we'll just send an email notification
    await sendEmail({
      name: "Admin",
      email: process.env.ADMIN_EMAIL || process.env.CONTACT_EMAIL || "",
      subject: `Shipment Status Updated - ${trackingId}`,
      message: `
        Shipment Status Update:
        
        Tracking ID: ${trackingId}
        New Status: ${status}
        Notes: ${notes || 'N/A'}
        Updated at: ${new Date().toLocaleString()}
      `
    });

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
