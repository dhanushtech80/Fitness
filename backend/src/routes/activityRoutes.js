const express = require('express');
const router = express.Router();
const Activity = require('../models/Activity');
const { protect } = require('../middleware/authMiddleware');
const validate = require('../middleware/validateMiddleware');
const { createActivitySchema } = require('../validations/schemas');

// @route GET /api/activities
router.get('/', protect, async (req, res, next) => {
  try {
    const activities = await Activity.find({ user: req.user._id }).sort({ date: -1, createdAt: -1 });
    res.json(activities);
  } catch (error) {
    next(error);
  }
});

// @route POST /api/activities
router.post('/', protect, validate(createActivitySchema), async (req, res, next) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const activity = await Activity.create({
      ...req.body,
      user: req.user._id,
      date: req.body.date || today
    });
    res.status(201).json(activity);
  } catch (error) {
    next(error);
  }
});

// @route DELETE /api/activities/:id
router.delete('/:id', protect, async (req, res, next) => {
  try {
    const activity = await Activity.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!activity) return res.status(404).json({ message: 'Activity log not found' });
    res.json({ message: 'Activity log removed' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
