import { put, list, del } from '@vercel/blob';

export interface Shipment {
  id: string;
  trackingId: string;
  senderName: string;
  senderEmail: string;
  senderPhone: string;
  receiverName: string;
  receiverEmail: string;
  receiverPhone: string;
  parcelType: string;
  weight: string;
  value: string;
  destination: string;
  origin: string;
  notes?: string;
  status: 'pending' | 'processing' | 'in_transit' | 'out_for_delivery' | 'delivered' | 'on_hold' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

// Create a new shipment
export async function createShipment(shipmentData: Omit<Shipment, 'id' | 'createdAt' | 'updatedAt'>): Promise<Shipment> {
  const id = Math.random().toString(36).substr(2, 9);
  const now = new Date().toISOString();
  
  const shipment: Shipment = {
    id,
    ...shipmentData,
    createdAt: now,
    updatedAt: now,
  };

  console.log('Creating shipment with data:', {
    trackingId: shipment.trackingId,
    id: shipment.id,
    status: shipment.status,
  });

  // Store the shipment as a JSON file
  const filename = `shipments/${shipment.trackingId}.json`;
  console.log('Storing shipment to filename:', filename);
  
  try {
    const result = await put(filename, JSON.stringify(shipment), {
      access: 'public',
      addRandomSuffix: false,
    });
    
    console.log('Shipment stored successfully:', {
      url: result.url,
      pathname: result.pathname,
    });
  } catch (error) {
    console.error('Error storing shipment:', error);
    throw error;
  }

  console.log('Shipment created successfully:', shipment.trackingId);

  return shipment;
}

// Get a shipment by tracking ID
export async function getShipmentByTrackingId(trackingId: string): Promise<Shipment | null> {
  try {
    console.log('Looking for shipment with tracking ID:', trackingId);
    
    // First, try exact match with prefix search
    let { blobs } = await list({
      prefix: `shipments/${trackingId}.json`,
    });

    console.log(`Found ${blobs.length} blobs with exact prefix match`);

    // If exact match fails, try searching all shipment files
    if (blobs.length === 0) {
      console.log('Exact match failed, searching all shipments...');
      const allBlobs = await list({
        prefix: 'shipments/',
      });
      
      console.log(`Found ${allBlobs.blobs.length} total shipment files`);
      
      // Filter for the specific tracking ID
      blobs = allBlobs.blobs.filter(blob => 
        blob.pathname.includes(trackingId) && blob.pathname.endsWith('.json')
      );
      
      console.log(`Found ${blobs.length} blobs matching tracking ID`);
    }

    if (blobs.length === 0) {
      console.log('No blob found for tracking ID:', trackingId);
      
      // Debug: List all blobs to see what's actually stored
      const allBlobs = await list({ prefix: 'shipments/' });
      console.log('All stored blobs:', allBlobs.blobs.map(b => b.pathname));
      
      return null;
    }

    // Fetch the blob content
    const blob = blobs[0];
    console.log('Fetching blob:', blob.pathname, 'URL:', blob.url);
    
    const response = await fetch(blob.url);
    
    if (!response.ok) {
      console.error('Failed to fetch blob content:', response.status, response.statusText);
      return null;
    }

    const shipment = await response.json();
    console.log('Shipment found:', shipment.trackingId);
    return shipment;
  } catch (error) {
    console.error('Error fetching shipment:', error);
    return null;
  }
}

// Get all shipments (for admin)
export async function getAllShipments(): Promise<Shipment[]> {
  try {
    console.log('Fetching all shipments...');
    
    // List all shipment blobs
    const { blobs } = await list({
      prefix: 'shipments/',
    });

    // Filter out non-JSON files and the index file
    const shipmentBlobs = blobs.filter(blob => 
      blob.pathname.endsWith('.json') && 
      !blob.pathname.includes('index.json')
    );

    console.log(`Found ${shipmentBlobs.length} shipment files`);

    // Fetch all shipments
    const shipments: Shipment[] = [];
    
    for (const blob of shipmentBlobs) {
      try {
        const response = await fetch(blob.url);
        if (response.ok) {
          const shipment = await response.json();
          shipments.push(shipment);
        }
      } catch (error) {
        console.error(`Error fetching shipment from ${blob.pathname}:`, error);
      }
    }

    return shipments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (error) {
    console.error('Error fetching all shipments:', error);
    return [];
  }
}

// Update a shipment
export async function updateShipment(trackingId: string, updates: Partial<Shipment>): Promise<Shipment | null> {
  try {
    console.log('Updating shipment:', trackingId, 'with updates:', updates);
    
    const existingShipment = await getShipmentByTrackingId(trackingId);
    
    if (!existingShipment) {
      console.log('Shipment not found for update:', trackingId);
      return null;
    }

    console.log('Existing shipment found:', existingShipment.trackingId);

    const updatedShipment: Shipment = {
      ...existingShipment,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    console.log('Updated shipment data:', updatedShipment);

    // Store the updated shipment
    const filename = `shipments/${trackingId}.json`;
    
    // Delete existing file first if it exists
    try {
      const { blobs } = await list({
        prefix: filename,
      });
      
      for (const blob of blobs) {
        if (blob.pathname === filename) {
          await del(blob.url);
          console.log('Deleted existing shipment file for update');
          break;
        }
      }
    } catch (error) {
      console.log('Error checking/deleting existing file:', error);
    }
    
    // Create the updated file
    const result = await put(filename, JSON.stringify(updatedShipment), {
      access: 'public',
      addRandomSuffix: false,
    });
    
    console.log('Updated shipment stored at:', result.url);

    console.log('Shipment updated successfully in blob storage');

    return updatedShipment;
  } catch (error) {
    console.error('Error updating shipment:', error);
    return null;
  }
}

// Delete a shipment
export async function deleteShipment(trackingId: string): Promise<boolean> {
  try {
    console.log('Deleting shipment:', trackingId);
    
    // List the specific blob to delete
    const { blobs } = await list({
      prefix: `shipments/${trackingId}.json`,
    });

    if (blobs.length === 0) {
      console.log('Shipment not found for deletion:', trackingId);
      return false;
    }

    // Delete the blob
    await del(blobs[0].url);
    console.log('Shipment deleted successfully:', trackingId);
    
    return true;
  } catch (error) {
    console.error('Error deleting shipment:', error);
    return false;
  }
}

// Debug function to list all blobs
export async function debugListAllBlobs(): Promise<any[]> {
  try {
    const { blobs } = await list();
    console.log('All blobs in storage:', blobs.map(b => ({ 
      pathname: b.pathname, 
      size: b.size, 
      uploadedAt: b.uploadedAt 
    })));
    return blobs;
  } catch (error) {
    console.error('Error listing blobs:', error);
    return [];
  }
}

// Generate a unique tracking ID
export function generateTrackingId(): string {
  const prefix = 'GAE';
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.random().toString(36).substr(2, 4).toUpperCase();
  return `${prefix}${timestamp}${random}`;
}
