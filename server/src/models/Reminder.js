const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User reference is required'],
    },
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property',
    },
    title: {
      type: String,
      required: [true, 'Reminder title is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    reminderType: {
      type: String,
      enum: ['insurance', 'tax', 'rent_agreement', 'maintenance', 'document_expiry', 'other'],
      default: 'other',
    },
    dueDate: {
      type: Date,
      required: [true, 'Due date is required'],
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'dismissed'],
      default: 'pending',
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
reminderSchema.index({ user: 1 });
reminderSchema.index({ property: 1 });
reminderSchema.index({ dueDate: 1 });
reminderSchema.index({ status: 1 });

const Reminder = mongoose.model('Reminder', reminderSchema);

module.exports = Reminder;
