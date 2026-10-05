const express = require('express');
const router = express.Router();
const FoodLog = require('../models/FoodLog');
const { protect } = require('../middleware/authMiddleware');
const validate = require('../middleware/validateMiddleware');
const { createFoodSchema } = require('../validations/schemas');

// @route GET /api/nutrition
router.get('/', protect, async (req, res, next) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const targetDate = req.query.date || today;
    const foodLogs = await FoodLog.find({ user: req.user._id, date: targetDate }).sort({ createdAt: -1 });
    
    // Totals calculation
    const totals = foodLogs.reduce((acc, log) => {
      acc.calories += log.calories;
      acc.protein += log.proteinGrams;
      acc.carbs += log.carbsGrams;
      acc.fat += log.fatGrams;
      return acc;
    }, { calories: 0, protein: 0, carbs: 0, fat: 0 });

    res.json({ date: targetDate, totals, foodLogs });
  } catch (error) {
    next(error);
  }
});

// @route POST /api/nutrition
router.post('/', protect, validate(createFoodSchema), async (req, res, next) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const foodLog = await FoodLog.create({
      ...req.body,
      user: req.user._id,
      date: req.body.date || today
    });
    res.status(201).json(foodLog);
  } catch (error) {
    next(error);
  }
});

// @route DELETE /api/nutrition/:id
router.delete('/:id', protect, async (req, res, next) => {
  try {
    const log = await FoodLog.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!log) return res.status(404).json({ message: 'Food log entry not found' });
    res.json({ message: 'Food log entry deleted' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
