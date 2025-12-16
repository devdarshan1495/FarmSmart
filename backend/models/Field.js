const mongoose = require('mongoose');

const fieldSchema = new mongoose.Schema({
  farmId: { type: String, required: true, unique: true }, // FARM001, FARM002, etc
  name: { type: String, required: true },
  location: { type: String, required: true },
  area: { type: String, default: '1 acre' },
  moisture: { type: Number, default: 0 },
  temperature: { type: Number, default: 0 },
  waterLevel: { type: String, default: 'medium' },
  irrigating: { type: Boolean, default: false },
  irrigationStartTime: { type: Date },
  lastWatered: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Field', fieldSchema);
