const express = require('express');
const router = express.Router();
const Sensor = require('../models/Sensor');

// Create sensor
router.post('/', async (req, res) => {
  try {
    const { fieldId, sensorType } = req.body;
    
    // Set unit based on sensor type
    let unit = '';
    let initialValue = 50;
    
    if (sensorType === 'moisture') {
      unit = '%';
      initialValue = 60;
    } else if (sensorType === 'temperature') {
      unit = '°C';
      initialValue = 25;
    } else if (sensorType === 'waterLevel') {
      unit = '%';
      initialValue = 70;
    }
    
    const sensor = new Sensor({ 
      fieldId, 
      sensorType, 
      unit,
      lastValue: initialValue 
    });
    await sensor.save();
    res.status(201).json(sensor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get sensors by field
router.get('/:fieldId', async (req, res) => {
  try {
    const sensors = await Sensor.find({ fieldId: req.params.fieldId });
    res.json(sensors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
