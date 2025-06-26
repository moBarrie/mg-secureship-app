import { NextRequest, NextResponse } from 'next/server';
import { getShipmentByTrackingId } from '@/lib/vercel-blob';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const trackingId = searchParams.get('trackingId');

    console.log('GET /api/track - Tracking ID:', trackingId);

    if (!trackingId) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Tracking ID is required' 
        },
        { status: 400 }
      );
    }

    // Get shipment from Vercel Blob
    const shipment = await getShipmentByTrackingId(trackingId);

    if (!shipment) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Shipment not found',
          message: 'No shipment found with the provided tracking ID' 
        },
        { status: 404 }
      );
    }

    console.log('Shipment found:', shipment.trackingId);

    return NextResponse.json({
      success: true,
      shipment,
    });
  } catch (error) {
    console.error('GET /api/track error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to track shipment',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
