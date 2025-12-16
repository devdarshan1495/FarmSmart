const express = require('express');
const router = express.Router();
const Field = require('../models/Field');

// Get all fields
router.get('/', async (req, res) => {
  try {
    const fields = await Field.find().sort({ createdAt: -1 });
    res.json(fields);
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

module.exports = router;
