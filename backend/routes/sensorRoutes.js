const express = require('express');
const router = express.Router();
const Sensor = require('../models/Sensor');
const { protect } = require('../middleware/auth');
const { checkRole } = require('../middleware/roleCheck');

// Create sensor (Admin/Expert only)
router.post('/', protect, checkRole('expert'), async (req, res) => {
  try {
    const { fieldId, sensorType, position, lat, lng } = req.body;
    
    // Validate required fields
    if (!fieldId || !sensorType || !lat || !lng) {
      return res.status(400).json({ message: 'Missing required fields: fieldId, sensorType, lat, lng' });
    }
    
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
      position: position || 'A1',
      lat,
      lng,
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

// Delete sensor (Admin/Expert only)
router.delete('/:id', protect, checkRole('expert'), async (req, res) => {
  try {
    const sensor = await Sensor.findByIdAndDelete(req.params.id);
    if (!sensor) {
      return res.status(404).json({ message: 'Sensor not found' });
    }
    res.json({ message: 'Sensor deleted successfully', sensor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
