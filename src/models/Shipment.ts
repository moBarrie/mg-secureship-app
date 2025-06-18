import mongoose from 'mongoose';

const shipmentSchema = new mongoose.Schema({
  trackingId: {
    type: String,
    required: true,
    unique: true,
  },
  senderName: {
    type: String,
    required: true,
  },
  senderEmail: {
    type: String,
    required: true,
  },
  senderPhone: {
    type: String,
    required: true,
  },
  receiverName: {
    type: String,
    required: true,
  },
  receiverEmail: {
    type: String,
    required: true,
  },
  receiverPhone: {
    type: String,
    required: true,
  },
  parcelType: {
    type: String,
    required: true,
  },
  weight: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  origin: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'in_transit', 'out_for_delivery', 'delivered', 'on_hold'],
    default: 'pending',
  },
  notes: String,
  statusHistory: [{
    status: String,
    notes: String,
    timestamp: {
      type: Date,
      default: Date.now,
    },
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field on every save
shipmentSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export const Shipment = mongoose.models.Shipment || mongoose.model('Shipment', shipmentSchema);
