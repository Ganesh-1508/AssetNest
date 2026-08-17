const mongoose = require('mongoose');

const insuranceSchema = new mongoose.Schema(
  {
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property',
      required: [true, 'Property reference is required'],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User reference is required'],
    },
    provider: {
      type: String,
      trim: true,
      default: '',
    },
    policyNumber: {
      type: String,
      trim: true,
      default: '',
    },
    coverageType: {
      type: String,
      trim: true,
      default: '',
    },
    premium: {
      type: Number,
      min: [0, 'Premium cannot be negative'],
    },
    startDate: {
      type: Date,
    },
    expiryDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ['active', 'expired', 'cancelled'],
      default: 'active',
    },
    document: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Document',
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
insuranceSchema.index({ property: 1 });
insuranceSchema.index({ user: 1 });
insuranceSchema.index({ expiryDate: 1 });
insuranceSchema.index({ policyNumber: 1 });

const Insurance = mongoose.model('Insurance', insuranceSchema);

module.exports = Insurance;
