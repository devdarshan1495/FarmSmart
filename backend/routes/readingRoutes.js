const express = require('express');
const router = express.Router();
const Reading = require('../models/Reading');
const Sensor = require('../models/Sensor');
const Field = require('../models/Field');
const Alert = require('../models/Alert');

// Create reading (sensor data ingestion)
router.post('/', async (req, res) => {
  try {
    const { sensorId, value } = req.body;

    // Save reading
    const reading = new Reading({ sensorId, value });
    await reading.save();

    // Update sensor
    const sensor = await Sensor.findByIdAndUpdate(
      sensorId,
      { lastValue: value, lastUpdated: Date.now() },
      { new: true }
    );

    // Update field based on sensor type
    const updateData = {};
    if (sensor.sensorType === 'moisture') {
      updateData.moisture = value;
      
      // Check for critical moisture
      if (value < 20) {
        await Alert.create({
          fieldId: sensor.fieldId,
          message: `Critical: Moisture level is ${value}%`,
          severity: 'critical'
        });
      }
    } else if (sensor.sensorType === 'temperature') {
      updateData.temperature = value;
      
      if (value > 35) {
        await Alert.create({
          fieldId: sensor.fieldId,
          message: `Warning: High temperature ${value}°C`,
          severity: 'warning'
        });
      }
    } else if (sensor.sensorType === 'waterLevel') {
      const level = value < 30 ? 'low' : value < 70 ? 'medium' : 'high';
      updateData.waterLevel = level;
      
      if (level === 'low') {
        await Alert.create({
          fieldId: sensor.fieldId,
          message: 'Warning: Water level is low',
          severity: 'warning'
        });
      }
    }

    await Field.findByIdAndUpdate(sensor.fieldId, updateData);

    res.status(201).json(reading);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get readings by sensor
router.get('/:sensorId', async (req, res) => {
  try {
    const readings = await Reading.find({ sensorId: req.params.sensorId })
      .sort({ timestamp: -1 })
      .limit(50);
    res.json(readings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
