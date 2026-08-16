require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`\n🚀 AssetNest API is running`);
  console.log(`   Environment : ${process.env.NODE_ENV || 'development'}`);
  console.log(`   Port        : ${PORT}`);
  console.log(`   Health      : http://localhost:${PORT}/api/health\n`);
});

// ─── Graceful shutdown ────────────────────────────────────────────────────────
const shutdown = (signal) => {
  console.log(`\n${signal} received. Shutting down gracefully...`);
  server.close(() => {
    console.log('HTTP server closed.');
    process.exit(0);
  });
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT',  () => shutdown('SIGINT'));

module.exports = server;
