const express = require('express');
const router = express.Router();
const Workout = require('../models/Workout');
const { protect } = require('../middleware/authMiddleware');
const validate = require('../middleware/validateMiddleware');
const { createWorkoutSchema } = require('../validations/schemas');

// @route GET /api/workouts
router.get('/', protect, async (req, res, next) => {
  try {
    const workouts = await Workout.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(workouts);
  } catch (error) {
    next(error);
  }
});

// @route GET /api/workouts/:id
router.get('/:id', protect, async (req, res, next) => {
  try {
    const workout = await Workout.findOne({ _id: req.params.id, user: req.user._id });
    if (!workout) return res.status(404).json({ message: 'Workout not found' });
    res.json(workout);
  } catch (error) {
    next(error);
  }
});

// @route POST /api/workouts
router.post('/', protect, validate(createWorkoutSchema), async (req, res, next) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const workout = await Workout.create({
      ...req.body,
      user: req.user._id,
      date: req.body.date || today
    });
    res.status(201).json(workout);
  } catch (error) {
    next(error);
  }
});

// @route PUT /api/workouts/:id
router.put('/:id', protect, async (req, res, next) => {
  try {
    const workout = await Workout.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );
    if (!workout) return res.status(404).json({ message: 'Workout not found' });
    res.json(workout);
  } catch (error) {
    next(error);
  }
});

// @route DELETE /api/workouts/:id
router.delete('/:id', protect, async (req, res, next) => {
  try {
    const workout = await Workout.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!workout) return res.status(404).json({ message: 'Workout not found' });
    res.json({ message: 'Workout removed successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
