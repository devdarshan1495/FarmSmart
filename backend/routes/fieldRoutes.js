const express = require('express');
const router = express.Router();
const Field = require('../models/Field');
const { protect } = require('../middleware/auth');
const { checkRole } = require('../middleware/roleCheck');

// Get all fields
router.get('/', async (req, res) => {
  try {
    const fields = await Field.find().sort({ createdAt: -1 });
    res.json(fields);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new field (Admin/Expert only)
router.post('/', protect, checkRole('expert'), async (req, res) => {
  try {
    const { farmId, name, location, area, moisture, temperature, waterLevel } = req.body;
    
    // Check if farmId already exists
    const existingField = await Field.findOne({ farmId });
    if (existingField) {
      return res.status(400).json({ message: 'Farm ID already exists' });
    }

    const field = new Field({
      farmId,
      name,
      location,
      area,
      moisture: moisture || 0,
      temperature: temperature || 0,
      waterLevel: waterLevel || 'medium'
    });

    const savedField = await field.save();
    res.status(201).json(savedField);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get field by farmId (e.g., FARM001)
router.get('/farm/:farmId', async (req, res) => {
  try {
    const field = await Field.findOne({ farmId: req.params.farmId });
    if (!field) {
      return res.status(404).json({ message: 'Farm not found' });
    }
    res.json(field);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update field
router.put('/:id', async (req, res) => {
  try {
    const field = await Field.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(field);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete field (Admin/Expert only)
router.delete('/:id', protect, checkRole('expert'), async (req, res) => {
  try {
    const field = await Field.findByIdAndDelete(req.params.id);
    if (!field) {
      return res.status(404).json({ message: 'Field not found' });
    }
    res.json({ message: 'Field deleted successfully', field });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
