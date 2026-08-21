const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const healthRouter = require('./routes/health');
const authRouter = require('./routes/auth');
const propertyRouter = require('./routes/property');
const notFound    = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');

const app = express();

// ─── Security & Parsing ──────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ─── Logging (only in non-test environments) ─────────────────────────────────
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// ─── Routes ──────────────────────────────────────────────────────────────────
app.use('/api/health', healthRouter);
app.use('/api/auth', authRouter);
app.use('/api/properties', propertyRouter);

// ─── Error Handling ──────────────────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

module.exports = app;
