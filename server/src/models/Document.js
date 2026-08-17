const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema(
  {
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property',
      required: [true, 'Associated property is required'],
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Uploader reference is required'],
    },
    documentType: {
      type: String,
      enum: [
        'sale_deed',
        'seven_twelve_extract',
        'property_card',
        'tax_receipt',
        'rent_agreement',
        'insurance',
        'maintenance',
        'other',
      ],
      default: 'other',
    },
    title: {
      type: String,
      required: [true, 'Document title is required'],
      trim: true,
    },
    fileUrl: {
      type: String,
      required: [true, 'File URL is required'],
    },
    fileName: {
      type: String,
      trim: true,
      default: '',
    },
    fileSize: {
      type: Number,
      default: 0,
    },
    mimeType: {
      type: String,
      default: '',
    },
    documentDate: {
      type: Date,
    },
    expiryDate: {
      type: Date,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    status: {
      type: String,
      enum: ['active', 'expired', 'archived'],
      default: 'active',
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
documentSchema.index({ property: 1 });
documentSchema.index({ uploadedBy: 1 });
documentSchema.index({ expiryDate: 1 });
documentSchema.index({ documentType: 1 });

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;
