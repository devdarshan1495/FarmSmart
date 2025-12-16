const mongoose = require('mongoose');

const readingSchema = new mongoose.Schema({
  sensorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Sensor', required: true },
  value: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Reading', readingSchema);
