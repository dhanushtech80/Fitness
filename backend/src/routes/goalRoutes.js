const express = require('express');
const router = express.Router();
const Goal = require('../models/Goal');
const { protect } = require('../middleware/authMiddleware');
const validate = require('../middleware/validateMiddleware');
const { createGoalSchema } = require('../validations/schemas');

// @route GET /api/goals
router.get('/', protect, async (req, res, next) => {
  try {
    const goals = await Goal.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(goals);
  } catch (error) {
    next(error);
  }
});

// @route POST /api/goals
router.post('/', protect, validate(createGoalSchema), async (req, res, next) => {
  try {
    const goal = await Goal.create({
      ...req.body,
      user: req.user._id
    });
    res.status(201).json(goal);
  } catch (error) {
    next(error);
  }
});

// @route PUT /api/goals/:id
router.put('/:id', protect, async (req, res, next) => {
  try {
    const goal = await Goal.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );
    if (!goal) return res.status(404).json({ message: 'Goal not found' });
    res.json(goal);
  } catch (error) {
    next(error);
  }
});

// @route DELETE /api/goals/:id
router.delete('/:id', protect, async (req, res, next) => {
  try {
    const goal = await Goal.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!goal) return res.status(404).json({ message: 'Goal not found' });
    res.json({ message: 'Goal deleted successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
