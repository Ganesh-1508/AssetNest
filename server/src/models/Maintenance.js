const mongoose = require('mongoose');

const maintenanceSchema = new mongoose.Schema(
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
    title: {
      type: String,
      required: [true, 'Maintenance title is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    maintenanceType: {
      type: String,
      enum: ['repair', 'inspection', 'cleaning', 'renovation', 'other'],
      default: 'repair',
    },
    cost: {
      type: Number,
      min: [0, 'Cost cannot be negative'],
    },
    serviceDate: {
      type: Date,
    },
    nextDueDate: {
      type: Date,
    },
    vendor: {
      type: String,
      trim: true,
      default: '',
    },
    status: {
      type: String,
      enum: ['scheduled', 'completed', 'cancelled'],
      default: 'scheduled',
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
maintenanceSchema.index({ property: 1 });
maintenanceSchema.index({ user: 1 });
maintenanceSchema.index({ status: 1 });

const Maintenance = mongoose.model('Maintenance', maintenanceSchema);

module.exports = Maintenance;
