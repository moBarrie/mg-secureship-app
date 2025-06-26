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
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
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

  // Update the index of all shipments
  await updateShipmentsIndex(shipment.trackingId, 'add');

  return shipment;
}

// Get a shipment by tracking ID
export async function getShipmentByTrackingId(trackingId: string): Promise<Shipment | null> {
  try {
    const filename = `shipments/${trackingId}.json`;
    const response = await fetch(`${process.env.VERCEL_URL || 'http://localhost:3000'}/_vercel/blob/${filename}`);
    
    if (!response.ok) {
      return null;
    }

    const shipment = await response.json();
    return shipment;
  } catch (error) {
    console.error('Error fetching shipment:', error);
    return null;
  }
}

// Get all shipments (for admin)
export async function getAllShipments(): Promise<Shipment[]> {
  try {
    // Get list of all tracking IDs from index
    const indexResponse = await fetch(`${process.env.VERCEL_URL || 'http://localhost:3000'}/_vercel/blob/shipments/index.json`);
    
    if (!indexResponse.ok) {
      return [];
    }

    const trackingIds: string[] = await indexResponse.json();
    
    // Fetch all shipments
    const shipments: Shipment[] = [];
    
    for (const trackingId of trackingIds) {
      const shipment = await getShipmentByTrackingId(trackingId);
      if (shipment) {
        shipments.push(shipment);
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
    const existingShipment = await getShipmentByTrackingId(trackingId);
    
    if (!existingShipment) {
      return null;
    }

    const updatedShipment: Shipment = {
      ...existingShipment,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    // Store the updated shipment
    const filename = `shipments/${trackingId}.json`;
    await put(filename, JSON.stringify(updatedShipment), {
      access: 'public',
      addRandomSuffix: false,
    });

    return updatedShipment;
  } catch (error) {
    console.error('Error updating shipment:', error);
    return null;
  }
}

// Delete a shipment
export async function deleteShipment(trackingId: string): Promise<boolean> {
  try {
    const filename = `shipments/${trackingId}.json`;
    await del(`${process.env.VERCEL_URL || 'http://localhost:3000'}/_vercel/blob/${filename}`);
    
    // Update the index
    await updateShipmentsIndex(trackingId, 'remove');
    
    return true;
  } catch (error) {
    console.error('Error deleting shipment:', error);
    return false;
  }
}

// Helper function to maintain an index of all shipments
async function updateShipmentsIndex(trackingId: string, action: 'add' | 'remove'): Promise<void> {
  try {
    let trackingIds: string[] = [];
    
    // Try to fetch existing index
    try {
      const indexResponse = await fetch(`${process.env.VERCEL_URL || 'http://localhost:3000'}/_vercel/blob/shipments/index.json`);
      if (indexResponse.ok) {
        trackingIds = await indexResponse.json();
      }
    } catch {
      // Index doesn't exist yet, start with empty array
    }

    if (action === 'add' && !trackingIds.includes(trackingId)) {
      trackingIds.push(trackingId);
    } else if (action === 'remove') {
      trackingIds = trackingIds.filter(id => id !== trackingId);
    }

    // Store updated index
    await put('shipments/index.json', JSON.stringify(trackingIds), {
      access: 'public',
      addRandomSuffix: false,
    });
  } catch (error) {
    console.error('Error updating shipments index:', error);
  }
}

// Generate a unique tracking ID
export function generateTrackingId(): string {
  const prefix = 'GAE';
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.random().toString(36).substr(2, 4).toUpperCase();
  return `${prefix}${timestamp}${random}`;
}
