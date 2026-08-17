const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Property owner is required'],
    },
    title: {
      type: String,
      required: [true, 'Property title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    propertyType: {
      type: String,
      enum: ['residential', 'commercial', 'land', 'industrial', 'other'],
      default: 'residential',
    },
    address: {
      type: String,
      trim: true,
      default: '',
    },
    city: {
      type: String,
      trim: true,
      default: '',
    },
    state: {
      type: String,
      trim: true,
      default: '',
    },
    country: {
      type: String,
      trim: true,
      default: 'India',
    },
    postalCode: {
      type: String,
      trim: true,
      default: '',
    },
    area: {
      type: Number,
      min: [0, 'Area cannot be negative'],
    },
    areaUnit: {
      type: String,
      default: 'sq.ft',
    },
    purchaseDate: {
      type: Date,
    },
    purchasePrice: {
      type: Number,
      min: [0, 'Purchase price cannot be negative'],
    },
    currentValue: {
      type: Number,
      min: [0, 'Current value cannot be negative'],
    },
    status: {
      type: String,
      enum: ['owned', 'rented', 'sold', 'inactive'],
      default: 'owned',
    },
    description: {
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
propertySchema.index({ owner: 1 });
propertySchema.index({ status: 1 });
propertySchema.index({ city: 1 });

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
