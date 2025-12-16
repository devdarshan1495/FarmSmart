const express = require('express');
const router = express.Router();
const Alert = require('../models/Alert');

// Get alerts for a field
router.get('/:fieldId', async (req, res) => {
  try {
    const alerts = await Alert.find({ fieldId: req.params.fieldId })
      .sort({ createdAt: -1 })
      .limit(20);
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all recent alerts
router.get('/', async (req, res) => {
  try {
    const alerts = await Alert.find()
      .populate('fieldId', 'name')
      .sort({ createdAt: -1 })
      .limit(50);
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
