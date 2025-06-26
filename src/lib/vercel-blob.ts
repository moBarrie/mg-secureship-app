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

  // Store the shipment as a JSON file
  const filename = `shipments/${shipment.trackingId}.json`;
  await put(filename, JSON.stringify(shipment), {
    access: 'public',
    addRandomSuffix: false,
  });

  console.log('Shipment created successfully:', shipment.trackingId);

  return shipment;
}

// Get a shipment by tracking ID
export async function getShipmentByTrackingId(trackingId: string): Promise<Shipment | null> {
  try {
    console.log('Looking for shipment with tracking ID:', trackingId);
    
    // List all blobs to find the shipment file
    const { blobs } = await list({
      prefix: `shipments/${trackingId}.json`,
    });

    if (blobs.length === 0) {
      console.log('No blob found for tracking ID:', trackingId);
      return null;
    }

    // Fetch the blob content
    const response = await fetch(blobs[0].url);
    
    if (!response.ok) {
      console.error('Failed to fetch blob content:', response.status);
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
    await put(filename, JSON.stringify(updatedShipment), {
      access: 'public',
      addRandomSuffix: false,
    });

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

// Generate a unique tracking ID
export function generateTrackingId(): string {
  const prefix = 'GAE';
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.random().toString(36).substr(2, 4).toUpperCase();
  return `${prefix}${timestamp}${random}`;
}
