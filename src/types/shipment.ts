export interface ShipmentInput {
  senderName: string;
  senderEmail: string;
  senderPhone: string;
  receiverName: string;
  receiverEmail: string;
  receiverPhone: string;
  parcelType: string;
  weight: string;
  value: string;
  origin: string;
  destination: string;
  notes?: string;
}

export interface StatusHistoryEntry {
  status: ShipmentStatus;
  notes?: string;
  timestamp: Date;
}

export interface Shipment extends ShipmentInput {
  trackingId: string;
  status: ShipmentStatus;
  notes?: string;
  statusHistory: StatusHistoryEntry[];
  createdAt: Date;
  updatedAt: Date;
}

export type ShipmentStatus = 
  | "pending"
  | "processing"
  | "in_transit"
  | "out_for_delivery"
  | "delivered"
  | "on_hold";
