import mongoose from 'mongoose';

if (!process.env.MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env');
}

const MONGODB_URI = process.env.MONGODB_URI;

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    };

    console.log('Attempting to connect to MongoDB...');
    
    try {
      // Test that the URI is properly formatted
      const uri = new URL(MONGODB_URI!);
      console.log('MongoDB URI format is valid');
      console.log('Connecting to cluster:', uri.hostname);
    } catch (error) {
      console.error('Invalid MongoDB URI format:', error);
      throw new Error('Invalid MongoDB URI format. Please check your environment variables.');
    }

    cached.promise = mongoose.connect(MONGODB_URI!, opts)
      .then((mongoose) => {
        console.log('Successfully connected to MongoDB');
        return mongoose;
      })
      .catch((error) => {
        console.error('MongoDB connection error:', error);
        if (error.name === 'MongoServerSelectionError') {
          throw new Error('Could not connect to MongoDB. Please check:\n1. Your network connection\n2. IP whitelist in MongoDB Atlas\n3. Database user credentials\n4. VPC/Firewall settings');
        }
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error('Failed to establish MongoDB connection:', e);
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
