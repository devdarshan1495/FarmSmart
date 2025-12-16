const mongoose = require('mongoose');

const sensorSchema = new mongoose.Schema({
  fieldId: { type: mongoose.Schema.Types.ObjectId, ref: 'Field', required: true },
  sensorType: { type: String, enum: ['moisture', 'temperature', 'waterLevel'], required: true },
  position: { type: String, default: 'A1' }, // Grid position like A1, B2, C3
  lastValue: { type: Number, default: 0 },
  lastUpdated: { type: Date, default: Date.now },
  unit: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Sensor', sensorSchema);
