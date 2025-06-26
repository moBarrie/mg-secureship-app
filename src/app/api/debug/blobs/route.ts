import { NextRequest, NextResponse } from 'next/server';
import { list } from '@vercel/blob';

export async function GET(request: NextRequest) {
  try {
    console.log('Debug: Listing all blobs in storage');
    
    // List ALL blobs (not just shipments)
    const { blobs } = await list();
    
    console.log(`Found ${blobs.length} total blobs in storage`);
    
    const blobInfo = blobs.map(blob => ({
      pathname: blob.pathname,
      url: blob.url,
      size: blob.size,
      uploadedAt: blob.uploadedAt,
    }));
    
    // Filter for shipment blobs
    const shipmentBlobs = blobs.filter(blob => 
      blob.pathname.startsWith('shipments/') && blob.pathname.endsWith('.json')
    );
    
    console.log(`Found ${shipmentBlobs.length} shipment blobs`);
    
    // Extract tracking IDs
    const trackingIds = shipmentBlobs.map(blob => 
      blob.pathname.replace('shipments/', '').replace('.json', '')
    );
    
    return NextResponse.json({
      success: true,
      totalBlobs: blobs.length,
      shipmentBlobs: shipmentBlobs.length,
      trackingIds,
      allBlobs: blobInfo,
    });
    
  } catch (error) {
    console.error('Debug endpoint error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}
