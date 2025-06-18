import mongoose from 'mongoose';
import dbConnect from '@/lib/db';

async function initializeDatabase() {
  try {
    console.log('Connecting to MongoDB...');
    await dbConnect();
    console.log('Successfully connected to MongoDB');

    // Create the shipments collection with validation
    await mongoose.connection.createCollection('shipments', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['trackingId', 'senderName', 'senderEmail', 'status'],
          properties: {
            trackingId: {
              bsonType: 'string',
              description: 'Unique tracking ID for the shipment'
            },
            senderName: {
              bsonType: 'string',
              description: 'Name of the sender'
            },
            senderEmail: {
              bsonType: 'string',
              description: 'Email of the sender'
            },
            status: {
              bsonType: 'string',
              enum: ['pending', 'processing', 'in_transit', 'out_for_delivery', 'delivered', 'on_hold'],
              description: 'Current status of the shipment'
            }
          }
        }
      }
    });

    console.log('Database and collections initialized successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

initializeDatabase();
