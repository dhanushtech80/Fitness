const express = require('express');
const router = express.Router();
const Workout = require('../models/Workout');
const Activity = require('../models/Activity');
const FoodLog = require('../models/FoodLog');
const WeightLog = require('../models/WeightLog');
const WaterLog = require('../models/WaterLog');
const { protect } = require('../middleware/authMiddleware');

// @route GET /api/analytics
router.get('/', protect, async (req, res, next) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const userId = req.user._id;

    const [workouts, activities, foodLogs, weightLogs, waterLogs] = await Promise.all([
      Workout.find({ user: userId }).sort({ createdAt: -1 }),
      Activity.find({ user: userId }).sort({ date: -1 }),
      FoodLog.find({ user: userId, date: today }),
      WeightLog.find({ user: userId }).sort({ date: -1 }).limit(14),
      WaterLog.find({ user: userId, date: today })
    ]);

    const totalWorkoutVolume = workouts.reduce((sum, w) => sum + (w.volumeKg || 0), 0);
    const totalWorkoutCalories = workouts.reduce((sum, w) => sum + (w.caloriesBurned || 0), 0);
    const totalActivityCalories = activities.reduce((sum, a) => sum + (a.caloriesBurned || 0), 0);
    
    const todayNutrientTotals = foodLogs.reduce((acc, log) => {
      acc.calories += log.calories;
      acc.protein += log.proteinGrams;
      acc.carbs += log.carbsGrams;
      acc.fat += log.fatGrams;
      return acc;
    }, { calories: 0, protein: 0, carbs: 0, fat: 0 });

    const totalWaterToday = waterLogs.reduce((sum, w) => sum + w.amountMl, 0);

    res.json({
      summary: {
        totalWorkouts: workouts.length,
        totalWorkoutVolume,
        totalCaloriesBurned: totalWorkoutCalories + totalActivityCalories,
        streakDays: req.user.streakDays || 14,
        cnsReadiness: req.user.cnsReadiness || 94,
        heartRateResting: req.user.heartRateResting || 52
      },
      nutrition: {
        todayTotals: todayNutrientTotals,
        targets: {
          calories: req.user.targetCalories,
          protein: req.user.targetProtein,
          carbs: req.user.targetCarbs,
          fat: req.user.targetFat
        }
      },
      water: {
        todayMl: totalWaterToday,
        targetMl: req.user.targetWaterMl
      },
      recentWeight: weightLogs,
      recentWorkouts: workouts.slice(0, 5),
      recentActivities: activities.slice(0, 5)
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
