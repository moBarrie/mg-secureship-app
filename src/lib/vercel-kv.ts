import { kv } from '@vercel/kv';

export interface Shipment {
  id: string;
  trackingId: string;
  senderName: string;
  senderEmail: string;
  senderPhone: string;
  senderAddress: string;
  receiverName: string;
  receiverEmail: string;
  receiverPhone: string;
  receiverAddress: string;
  parcelDescription: string;
  parcelWeight: number;
  parcelValue: number;
  status: string;
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

  // Store the shipment
  await kv.set(`shipment:${shipment.trackingId}`, shipment);
  
  // Add to the list of all shipments
  const allShipments = await kv.get<string[]>('shipments:all') || [];
  if (!allShipments.includes(shipment.trackingId)) {
    allShipments.push(shipment.trackingId);
    await kv.set('shipments:all', allShipments);
  }

  return shipment;
}

// Get a shipment by tracking ID
export async function getShipmentByTrackingId(trackingId: string): Promise<Shipment | null> {
  const shipment = await kv.get<Shipment>(`shipment:${trackingId}`);
  return shipment;
}

// Get all shipments (for admin)
export async function getAllShipments(): Promise<Shipment[]> {
  const allTrackingIds = await kv.get<string[]>('shipments:all') || [];
  const shipments: Shipment[] = [];

  for (const trackingId of allTrackingIds) {
    const shipment = await kv.get<Shipment>(`shipment:${trackingId}`);
    if (shipment) {
      shipments.push(shipment);
    }
  }

  // Sort by creation date (newest first)
  return shipments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

// Update shipment status
export async function updateShipmentStatus(trackingId: string, status: string): Promise<Shipment | null> {
  const shipment = await kv.get<Shipment>(`shipment:${trackingId}`);
  
  if (!shipment) {
    return null;
  }

  const updatedShipment: Shipment = {
    ...shipment,
    status,
    updatedAt: new Date().toISOString(),
  };

  await kv.set(`shipment:${trackingId}`, updatedShipment);
  return updatedShipment;
}
