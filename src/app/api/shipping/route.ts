import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createShipment, getAllShipments, updateShipment, generateTrackingId } from '@/lib/vercel-blob';
import { sendEmail, sendShipmentNotification } from '@/lib/email';

// Validation schema for shipment data - updated to match form data
const createShipmentSchema = z.object({
  senderName: z.string().min(1, 'Sender name is required'),
  senderEmail: z.string().email('Invalid sender email'),
  senderPhone: z.string().min(1, 'Sender phone is required'),
  receiverName: z.string().min(1, 'Receiver name is required'),
  receiverEmail: z.string().email('Invalid receiver email'),
  receiverPhone: z.string().min(1, 'Receiver phone is required'),
  parcelType: z.string().min(1, 'Parcel type is required'),
  weight: z.string().min(1, 'Weight is required'),
  value: z.string().min(1, 'Value is required'),
  destination: z.string().min(1, 'Destination is required'),
  origin: z.string().min(1, 'Origin is required'),
  notes: z.string().optional(),
});

const updateStatusSchema = z.object({
  trackingId: z.string().min(1, 'Tracking ID is required'),
  status: z.enum(['pending', 'processing', 'shipped', 'delivered', 'cancelled']),
});

export async function POST(request: NextRequest) {
  try {
    console.log('POST /api/shipping - Creating new shipment');
    
    const body = await request.json();
    console.log('Request body:', body);

    // Validate the request data
    const validatedData = createShipmentSchema.parse(body);
    
    // Generate tracking ID
    const trackingId = generateTrackingId();
    
    // Create shipment using Vercel Blob
    const shipment = await createShipment({
      ...validatedData,
      trackingId,
      status: 'pending' as const,
    });

    console.log('Shipment created successfully:', { trackingId });

    // Send notification email to admin only
    try {
      await sendShipmentNotification({
        trackingId,
        senderName: validatedData.senderName,
        senderEmail: validatedData.senderEmail,
        senderPhone: validatedData.senderPhone,
        receiverName: validatedData.receiverName,
        receiverEmail: validatedData.receiverEmail,
        receiverPhone: validatedData.receiverPhone,
        parcelType: validatedData.parcelType,
        weight: validatedData.weight,
        value: validatedData.value,
        destination: validatedData.destination,
        origin: validatedData.origin,
        notes: validatedData.notes,
      });

      console.log('Admin notification email sent successfully');
    } catch (emailError) {
      console.error('Email sending failed (non-critical):', emailError);
      // Don't fail the entire request if email fails
    }

    return NextResponse.json({
      success: true,
      message: 'Shipment created successfully',
      shipment,
    });

  } catch (error) {
    console.error('POST /api/shipping error:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 400 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    console.log('GET /api/shipping - Fetching all shipments');
    
    const shipments = await getAllShipments();
    
    return NextResponse.json({
      success: true,
      shipments,
    });

  } catch (error) {
    console.error('GET /api/shipping error:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    console.log('PUT /api/shipping - Updating shipment status');
    
    const body = await request.json();
    console.log('Update request body:', body);

    // Validate the request data
    const validatedData = updateStatusSchema.parse(body);
    
    // Update shipment status
    const updatedShipment = await updateShipment(validatedData.trackingId, {
      status: validatedData.status,
    });

    if (!updatedShipment) {
      return NextResponse.json(
        { success: false, error: 'Shipment not found' },
        { status: 404 }
      );
    }

    console.log('Shipment status updated successfully:', { 
      trackingId: validatedData.trackingId, 
      status: validatedData.status 
    });

    return NextResponse.json({
      success: true,
      message: 'Shipment status updated successfully',
      shipment: updatedShipment,
    });

  } catch (error) {
    console.error('PUT /api/shipping error:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 400 }
    );
  }
}
