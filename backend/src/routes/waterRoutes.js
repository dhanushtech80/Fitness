const express = require('express');
const router = express.Router();
const WaterLog = require('../models/WaterLog');
const { protect } = require('../middleware/authMiddleware');
const validate = require('../middleware/validateMiddleware');
const { createWaterSchema } = require('../validations/schemas');

// @route GET /api/water
router.get('/', protect, async (req, res, next) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const targetDate = req.query.date || today;
    const waterLogs = await WaterLog.find({ user: req.user._id, date: targetDate }).sort({ createdAt: -1 });
    
    const totalMl = waterLogs.reduce((sum, item) => sum + item.amountMl, 0);
    const targetMl = req.user.targetWaterMl || 3500;

    res.json({
      date: targetDate,
      totalMl,
      targetMl,
      percentage: Math.min(100, Math.round((totalMl / targetMl) * 100)),
      logs: waterLogs
    });
  } catch (error) {
    next(error);
  }
});

// @route POST /api/water
router.post('/', protect, validate(createWaterSchema), async (req, res, next) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const waterLog = await WaterLog.create({
      ...req.body,
      user: req.user._id,
      date: req.body.date || today
    });
    res.status(201).json(waterLog);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
