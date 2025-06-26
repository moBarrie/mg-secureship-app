import mongoose from 'mongoose';

// Define the type for our cached connection
type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

// Define the global mongoose cache type
declare global {
  var mongoose: MongooseCache | undefined;
}

if (!process.env.MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env');
}

const MONGODB_URI = process.env.MONGODB_URI;

// Initialize the cached connection object
const cached: MongooseCache = global.mongoose ?? { conn: null, promise: null };
if (!global.mongoose) global.mongoose = cached;

const handleConnectionError = (error: unknown): never => {
  console.error('Database connection failed:', error);
  
  if (error instanceof Error) {
    console.error(`
MongoDB Atlas connection failed. Please check:

1. NETWORK CONNECTIVITY:
   - Check your internet connection
   - Try accessing other websites to confirm connectivity

2. MONGODB ATLAS CLUSTER:
   - Log into https://cloud.mongodb.com
   - Verify your cluster is running (not paused)
   - Check cluster status in the dashboard

3. IP WHITELIST:
   - In MongoDB Atlas: Network Access > IP Whitelist
   - Add your current IP address or use 0.0.0.0/0 for development
   - Current error suggests DNS/network issue

4. CONNECTION STRING:
   - Verify username and password are correct
   - Check if special characters in password need URL encoding
   - Try regenerating the connection string from Atlas

5. FIREWALL/NETWORK:
   - Corporate/school networks may block MongoDB connections
   - Try a different network (mobile hotspot) to test

Error: ${error.message}
Error Code: ${(error as any).code || 'Unknown'}
    `);
  }

  throw error;
};

async function dbConnect(): Promise<typeof mongoose> {
  try {
    // Return existing connection if available
    if (cached.conn && cached.conn.connection.readyState === 1) {
      return cached.conn;
    }

    // If a connection attempt is in progress, wait for it
    if (cached.promise) {
      const conn = await cached.promise;
      return conn;
    }

    const opts: mongoose.ConnectOptions = {
      maxPoolSize: 10,
      minPoolSize: 5,
      serverSelectionTimeoutMS: 30000, // Increased timeout
      socketTimeoutMS: 45000,
      family: 4, // Use IPv4, helps with some network issues
      retryWrites: true,
      retryReads: true,
      maxIdleTimeMS: 60000,
      connectTimeoutMS: 30000,
      // Adding autoIndex for better performance in production
      autoIndex: process.env.NODE_ENV !== 'production',
      // Enable heartbeat to keep connections alive
      heartbeatFrequencyMS: 30000,
      // Add additional connection stability options
      bufferCommands: false,
    };

    console.log('Initiating new MongoDB connection...');
    
    // Create the connection promise
    cached.promise = mongoose.connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log('Successfully connected to MongoDB');
        cached.conn = mongoose;

        // Log connection details
        const dbName = mongoose.connection.name || 'Cluster0';
        console.log(`Connected to database: ${dbName}`);
        
        // Add process termination handlers for cleanup
        process.on('SIGTERM', () => {
          mongoose.connection.close().then(() => {
            console.log('MongoDB connection closed due to application termination');
            process.exit(0);
          });
        });

        return mongoose;
      })
      .catch((error) => {
        cached.promise = null;
        return handleConnectionError(error);
      });

    const db = await cached.promise;
    
    // Set up connection event handlers
    db.connection.on('error', (error: unknown) => {
      console.error('MongoDB connection error event:', error);
      cached.conn = null;
      cached.promise = null;
    });

    db.connection.on('disconnected', () => {
      console.log('MongoDB disconnected, will try to reconnect...');
      cached.conn = null;
      cached.promise = null;
    });

    db.connection.on('connected', () => {
      console.log('MongoDB connected successfully');
    });

    return db;
  } catch (error) {
    return handleConnectionError(error);
  }
}

export default dbConnect;
