// Simple MongoDB connection test
const mongoose = require("mongoose");
require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI not found in environment variables");
  process.exit(1);
}

console.log("🔗 Testing MongoDB connection...");
console.log("Connection string:", MONGODB_URI.replace(/:[^@]*@/, ":****@")); // Hide password

const testConnection = async () => {
  try {
    console.log("⏳ Attempting to connect...");

    const connection = await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    });

    console.log("✅ Successfully connected to MongoDB!");
    console.log("📊 Connection details:");
    console.log("  - Database:", connection.connection.name || "default");
    console.log("  - Host:", connection.connection.host);
    console.log("  - Port:", connection.connection.port);
    console.log("  - Ready State:", connection.connection.readyState);

    // Test a simple operation
    const collections = await connection.connection.db
      .listCollections()
      .toArray();
    console.log(
      "📁 Available collections:",
      collections.map((c) => c.name).join(", ") || "none"
    );

    await mongoose.disconnect();
    console.log("🔌 Disconnected successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Connection failed:");
    console.error("Error:", error.message);
    console.error("Code:", error.code);

    if (error.code === "ECONNREFUSED") {
      console.log(`
🔧 TROUBLESHOOTING STEPS:

1. CHECK CLUSTER STATUS:
   - Go to https://cloud.mongodb.com
   - Make sure your cluster is running (not paused)

2. VERIFY IP WHITELIST:
   - In MongoDB Atlas: Network Access
   - Add your IP or use 0.0.0.0/0 for testing

3. TEST NETWORK:
   - Try: ping cluster0.mgpwrqt.mongodb.net
   - Try from a different network (mobile hotspot)

4. CHECK CREDENTIALS:
   - Verify username/password in Atlas
   - Regenerate connection string if needed
      `);
    }

    process.exit(1);
  }
};

testConnection();
