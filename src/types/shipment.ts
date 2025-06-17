export interface ShipmentInput {
  mineralType: string;
  quantity: string;
  destination: string;
}

export interface Shipment extends ShipmentInput {
  id: string;
  origin: string; // Always Sierra Leone for new shipments from UI
  status?: ShipmentStatus; // For tracking
  trackingId?: string; // For tracking
  complianceAdvice?: string; // From GenAI
  savedAt?: number; // Timestamp for saved shipments
}

export type ShipmentStatus = "Processing" | "In Transit" | "Out for Delivery" | "Delayed" | "Delivered" | "Awaiting Info";
