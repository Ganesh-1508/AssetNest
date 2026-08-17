const mongoose = require('mongoose');

/**
 * Connect to MongoDB Atlas / Local MongoDB instance
 */
const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.warn('⚠️ MONGODB_URI is not defined in environment variables. Database connection deferred.');
    return false;
  }

  try {
    const conn = await mongoose.connect(uri, {
      dbName: process.env.MONGODB_DB_NAME || 'assetnest',
    });

    console.log(`\n🍃 MongoDB Connected Successfully`);
    console.log(`   Host     : ${conn.connection.host}`);
    console.log(`   Database : ${conn.connection.name}\n`);
    return true;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    return false;
  }
};

// Event Listeners
mongoose.connection.on('disconnected', () => {
  console.warn('⚠️ MongoDB Connection Lost (Disconnected)');
});

mongoose.connection.on('reconnected', () => {
  console.log('🍃 MongoDB Reconnected');
});

/**
 * Get human-readable connection status
 */
const getDBStatus = () => {
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };
  const stateCode = mongoose.connection.readyState;
  return {
    stateCode,
    status: states[stateCode] || 'unknown',
    isConnected: stateCode === 1,
    databaseName: mongoose.connection.name || null,
  };
};

module.exports = {
  connectDB,
  getDBStatus,
};
