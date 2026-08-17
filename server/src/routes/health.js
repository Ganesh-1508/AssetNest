const express = require('express');
const router = express.Router();
const { getDBStatus } = require('../config/database');

/**
 * GET /api/health
 * Returns core API health status.
 */
router.get('/', (req, res) => {
  const dbStatus = getDBStatus();
  res.status(200).json({
    success: true,
    message: 'AssetNest API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    databaseStatus: dbStatus.status,
  });
});

/**
 * GET /api/health/db
 * Returns dedicated database connection status.
 */
router.get('/db', (req, res) => {
  const dbStatus = getDBStatus();
  
  if (dbStatus.isConnected) {
    return res.status(200).json({
      success: true,
      database: 'connected',
      databaseName: dbStatus.databaseName,
      timestamp: new Date().toISOString(),
    });
  }

  return res.status(503).json({
    success: false,
    database: dbStatus.status,
    message: 'Database is currently not connected or MONGODB_URI is unconfigured.',
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
