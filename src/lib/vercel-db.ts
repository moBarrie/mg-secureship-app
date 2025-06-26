import { sql } from '@vercel/postgres';

export interface Shipment {
  id: string;
  tracking_id: string;
  sender_name: string;
  sender_email: string;
  sender_phone: string;
  sender_address: string;
  receiver_name: string;
  receiver_email: string;
  receiver_phone: string;
  receiver_address: string;
  package_type: string;
  package_weight: number;
  package_dimensions: string;
  package_value: number;
  special_instructions?: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  created_at: Date;
  updated_at: Date;
}

// Initialize the database tables
export async function initializeDatabase() {
  try {
    // Create shipments table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS shipments (
        id SERIAL PRIMARY KEY,
        tracking_id VARCHAR(255) UNIQUE NOT NULL,
        sender_name VARCHAR(255) NOT NULL,
        sender_email VARCHAR(255) NOT NULL,
        sender_phone VARCHAR(50) NOT NULL,
        sender_address TEXT NOT NULL,
        receiver_name VARCHAR(255) NOT NULL,
        receiver_email VARCHAR(255) NOT NULL,
        receiver_phone VARCHAR(50) NOT NULL,
        receiver_address TEXT NOT NULL,
        package_type VARCHAR(100) NOT NULL,
        package_weight DECIMAL(10,2) NOT NULL,
        package_dimensions VARCHAR(255),
        package_value DECIMAL(12,2) NOT NULL,
        special_instructions TEXT,
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Create index on tracking_id for faster lookups
    await sql`
      CREATE INDEX IF NOT EXISTS idx_tracking_id ON shipments(tracking_id);
    `;

    console.log('Database initialized successfully');
    return true;
  } catch (error) {
    console.error('Database initialization failed:', error);
    throw error;
  }
}

// Generate unique tracking ID
export function generateTrackingId(): string {
  const prefix = 'GAE'; // Global Atlantic Express
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}${timestamp}${random}`;
}

// Create a new shipment
export async function createShipment(shipmentData: Omit<Shipment, 'id' | 'tracking_id' | 'created_at' | 'updated_at'>) {
  try {
    const trackingId = generateTrackingId();
    
    const result = await sql`
      INSERT INTO shipments (
        tracking_id, sender_name, sender_email, sender_phone, sender_address,
        receiver_name, receiver_email, receiver_phone, receiver_address,
        package_type, package_weight, package_dimensions, package_value,
        special_instructions, status
      ) VALUES (
        ${trackingId}, ${shipmentData.sender_name}, ${shipmentData.sender_email}, 
        ${shipmentData.sender_phone}, ${shipmentData.sender_address},
        ${shipmentData.receiver_name}, ${shipmentData.receiver_email}, 
        ${shipmentData.receiver_phone}, ${shipmentData.receiver_address},
        ${shipmentData.package_type}, ${shipmentData.package_weight}, 
        ${shipmentData.package_dimensions}, ${shipmentData.package_value},
        ${shipmentData.special_instructions}, ${shipmentData.status}
      )
      RETURNING *;
    `;

    return result.rows[0];
  } catch (error) {
    console.error('Error creating shipment:', error);
    throw error;
  }
}

// Get shipment by tracking ID
export async function getShipmentByTrackingId(trackingId: string) {
  try {
    const result = await sql`
      SELECT * FROM shipments WHERE tracking_id = ${trackingId};
    `;
    
    return result.rows[0] || null;
  } catch (error) {
    console.error('Error fetching shipment:', error);
    throw error;
  }
}

// Get all shipments (for admin)
export async function getAllShipments() {
  try {
    const result = await sql`
      SELECT * FROM shipments ORDER BY created_at DESC;
    `;
    
    return result.rows;
  } catch (error) {
    console.error('Error fetching all shipments:', error);
    throw error;
  }
}

// Update shipment status
export async function updateShipmentStatus(trackingId: string, status: string) {
  try {
    const result = await sql`
      UPDATE shipments 
      SET status = ${status}, updated_at = CURRENT_TIMESTAMP
      WHERE tracking_id = ${trackingId}
      RETURNING *;
    `;
    
    return result.rows[0];
  } catch (error) {
    console.error('Error updating shipment status:', error);
    throw error;
  }
}

// Delete shipment (for admin)
export async function deleteShipment(trackingId: string) {
  try {
    const result = await sql`
      DELETE FROM shipments WHERE tracking_id = ${trackingId}
      RETURNING *;
    `;
    
    return result.rows[0];
  } catch (error) {
    console.error('Error deleting shipment:', error);
    throw error;
  }
}
