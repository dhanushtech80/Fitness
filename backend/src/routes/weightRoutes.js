const express = require('express');
const router = express.Router();
const WeightLog = require('../models/WeightLog');
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');
const validate = require('../middleware/validateMiddleware');
const { createWeightSchema } = require('../validations/schemas');

// @route GET /api/weight
router.get('/', protect, async (req, res, next) => {
  try {
    const logs = await WeightLog.find({ user: req.user._id }).sort({ date: -1, createdAt: -1 });
    res.json(logs);
  } catch (error) {
    next(error);
  }
});

// @route POST /api/weight
router.post('/', protect, validate(createWeightSchema), async (req, res, next) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const log = await WeightLog.create({
      ...req.body,
      user: req.user._id,
      date: req.body.date || today
    });

    // Update current user's weightKg
    await User.findByIdAndUpdate(req.user._id, { weightKg: req.body.weightKg });

    res.status(201).json(log);
  } catch (error) {
    next(error);
  }
});

// @route DELETE /api/weight/:id
router.delete('/:id', protect, async (req, res, next) => {
  try {
    const log = await WeightLog.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!log) return res.status(404).json({ message: 'Weight log entry not found' });
    res.json({ message: 'Weight log entry deleted' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
