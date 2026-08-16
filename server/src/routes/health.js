const express = require('express');
const router = express.Router();

/**
 * GET /api/health
 * Returns API health status.
 */
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'AssetNest API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
  });
});

module.exports = router;
