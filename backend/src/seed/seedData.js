const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Workout = require('../models/Workout');
const Activity = require('../models/Activity');
const FoodLog = require('../models/FoodLog');
const WaterLog = require('../models/WaterLog');
const Goal = require('../models/Goal');
const WeightLog = require('../models/WeightLog');

const seedInitialData = async () => {
  try {
    const userCount = await User.countDocuments();
    if (userCount > 0) {
      console.log('[Seed] Database already seeded.');
      return;
    }

    console.log('[Seed] Seeding initial FitTrack AI data...');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    const user = await User.create({
      name: 'Sarah Vance',
      email: 'sarah.vance@fittrack.ai',
      password: hashedPassword,
      role: 'Pro Athlete',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      streakDays: 14,
      cnsReadiness: 94,
      heartRateResting: 52,
      weightKg: 72.5,
      targetWeightKg: 70.0,
      targetCalories: 2200,
      targetProtein: 140,
      targetCarbs: 240,
      targetFat: 65,
      targetWaterMl: 3500
    });

    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    const twoDaysAgo = new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0];

    // Seed Workouts
    await Workout.create([
      {
        user: user._id,
        title: 'HEAVY LOWER BODY / POSTERIOR CHAIN',
        category: 'Hypertrophy',
        durationMinutes: 75,
        caloriesBurned: 620,
        volumeKg: 14850,
        date: today,
        exercises: [
          {
            name: 'Barbell Romanian Deadlift',
            category: 'Barbell',
            sets: [
              { setNumber: 1, reps: 10, weightKg: 100, rpe: 7, completed: true },
              { setNumber: 2, reps: 8, weightKg: 120, rpe: 8, completed: true },
              { setNumber: 3, reps: 8, weightKg: 130, rpe: 9, completed: true }
            ]
          },
          {
            name: 'Bulgarian Split Squat',
            category: 'Dumbbell',
            sets: [
              { setNumber: 1, reps: 12, weightKg: 24, rpe: 8, completed: true },
              { setNumber: 2, reps: 10, weightKg: 28, rpe: 9, completed: true }
            ]
          }
        ]
      },
      {
        user: user._id,
        title: 'UPPER BODY HYPERTROPHY & PRESS',
        category: 'Hypertrophy',
        durationMinutes: 60,
        caloriesBurned: 480,
        volumeKg: 11200,
        date: yesterday,
        exercises: [
          {
            name: 'Incline Dumbbell Press',
            category: 'Dumbbell',
            sets: [
              { setNumber: 1, reps: 10, weightKg: 32, rpe: 8, completed: true },
              { setNumber: 2, reps: 8, weightKg: 36, rpe: 9, completed: true }
            ]
          }
        ]
      }
    ]);

    // Seed Activities
    await Activity.create([
      {
        user: user._id,
        title: 'Morning Zone 2 Cardio Run',
        type: 'Running',
        durationMinutes: 45,
        caloriesBurned: 410,
        distanceKm: 6.8,
        steps: 8400,
        avgHeartRate: 142,
        date: today,
        time: '07:00 AM'
      },
      {
        user: user._id,
        title: 'High Exertion HIIT Sprints',
        type: 'HIIT',
        durationMinutes: 25,
        caloriesBurned: 310,
        distanceKm: 3.2,
        steps: 4100,
        avgHeartRate: 168,
        date: yesterday,
        time: '06:00 PM'
      }
    ]);

    // Seed Food Logs
    await FoodLog.create([
      {
        user: user._id,
        foodName: 'Oatmeal with Whey Protein & Blueberries',
        mealType: 'Breakfast',
        calories: 520,
        proteinGrams: 42,
        carbsGrams: 68,
        fatGrams: 10,
        date: today,
        time: '08:30 AM'
      },
      {
        user: user._id,
        foodName: 'Grilled Salmon Bowl with Quinoa & Asparagus',
        mealType: 'Lunch',
        calories: 580,
        proteinGrams: 46,
        carbsGrams: 42,
        fatGrams: 22,
        date: today,
        time: '01:00 PM'
      },
      {
        user: user._id,
        foodName: 'Chicken Breast & Sweet Potato Prep',
        mealType: 'Dinner',
        calories: 550,
        proteinGrams: 50,
        carbsGrams: 55,
        fatGrams: 12,
        date: today,
        time: '07:00 PM'
      }
    ]);

    // Seed Water Logs
    await WaterLog.create([
      { user: user._id, amountMl: 750, date: today, time: '08:00 AM' },
      { user: user._id, amountMl: 1000, date: today, time: '11:30 AM' },
      { user: user._id, amountMl: 850, date: today, time: '03:15 PM' }
    ]);

    // Seed Goals
    await Goal.create([
      {
        user: user._id,
        title: 'Target Bodyweight 70.0 kg',
        category: 'Weight',
        currentValue: 72.5,
        targetValue: 70.0,
        unit: 'kg',
        deadline: '2026-11-30',
        status: 'Active',
        icon: 'monitor_weight'
      },
      {
        user: user._id,
        title: 'Deadlift PR 150 kg',
        category: 'Workout',
        currentValue: 130,
        targetValue: 150,
        unit: 'kg',
        deadline: '2026-12-15',
        status: 'Active',
        icon: 'fitness_center'
      },
      {
        user: user._id,
        title: '30-Day Workout Consistency Streak',
        category: 'Streak',
        currentValue: 14,
        targetValue: 30,
        unit: 'days',
        deadline: '2026-10-31',
        status: 'Active',
        icon: 'local_fire_department'
      }
    ]);

    // Seed Weight Logs
    await WeightLog.create([
      { user: user._id, weightKg: 72.5, bodyFatPercentage: 16.8, muscleMassKg: 58.2, date: today, notes: 'Morning weigh in post-hydrate' },
      { user: user._id, weightKg: 72.8, bodyFatPercentage: 17.0, muscleMassKg: 58.0, date: yesterday, notes: 'Rest day check' },
      { user: user._id, weightKg: 73.1, bodyFatPercentage: 17.2, muscleMassKg: 57.9, date: twoDaysAgo, notes: 'Initial mesocycle start' }
    ]);

    console.log('[Seed] Data successfully seeded!');
  } catch (error) {
    console.error('[Seed Error]', error);
  }
};

module.exports = seedInitialData;
