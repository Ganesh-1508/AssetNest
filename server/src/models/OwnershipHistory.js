const mongoose = require('mongoose');

const ownershipHistorySchema = new mongoose.Schema(
  {
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property',
      required: [true, 'Property reference is required'],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    ownershipType: {
      type: String,
      enum: ['owner', 'previous_owner', 'co_owner', 'transferred'],
      default: 'owner',
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    transferDate: {
      type: Date,
    },
    notes: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
ownershipHistorySchema.index({ property: 1 });
ownershipHistorySchema.index({ owner: 1 });

const OwnershipHistory = mongoose.model('OwnershipHistory', ownershipHistorySchema);

module.exports = OwnershipHistory;
