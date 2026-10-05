const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoMemoryServer = null;

const connectDB = async () => {
  try {
    const connStr = process.env.MONGODB_URI || 'mongodb://localhost:27017/fittrack_ai';
    console.log(`[DB] Attempting connection to ${connStr}...`);
    
    // Set connect timeout to 3 seconds for local fallback check
    await mongoose.connect(connStr, {
      serverSelectionTimeoutMS: 3000
    });
    console.log(`[DB] Connected to MongoDB at ${mongoose.connection.host}`);
  } catch (err) {
    console.warn(`[DB] Direct MongoDB connection failed (${err.message}). Starting MongoMemoryServer...`);
    try {
      mongoMemoryServer = await MongoMemoryServer.create();
      const memoryUri = mongoMemoryServer.getUri();
      await mongoose.connect(memoryUri);
      console.log(`[DB] Connected to MongoMemoryServer at ${memoryUri}`);
    } catch (memErr) {
      console.error(`[DB] MongoMemoryServer initialization failed:`, memErr);
      process.exit(1);
    }
  }
};

module.exports = connectDB;
