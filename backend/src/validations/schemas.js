const { z } = require('zod');

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['Pro Athlete', 'Athlete', 'Member']).optional(),
  age: z.number().optional().nullable(),
  height: z.number().optional().nullable(),
  heightCm: z.number().optional().nullable(),
  weight: z.number().optional().nullable(),
  weightKg: z.number().optional().nullable(),
  fitnessGoal: z.string().optional().nullable(),
  goal: z.string().optional().nullable()
});

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required')
});

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address')
});

const updateProfileSchema = z.object({
  name: z.string().min(2).optional(),
  bio: z.string().optional(),
  age: z.number().optional(),
  height: z.number().optional(),
  heightCm: z.number().optional(),
  weight: z.number().optional(),
  weightKg: z.number().optional(),
  fitnessGoal: z.string().optional(),
  goal: z.string().optional(),
  targetWeightKg: z.number().positive().optional(),
  targetCalories: z.number().positive().optional(),
  targetProtein: z.number().positive().optional(),
  targetCarbs: z.number().positive().optional(),
  targetFat: z.number().positive().optional(),
  targetWaterMl: z.number().positive().optional()
});

const createWorkoutSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  category: z.enum(['Hypertrophy', 'Strength', 'Endurance', 'HIIT', 'Recovery', 'Powerlifting']).optional(),
  durationMinutes: z.number().nonnegative(),
  caloriesBurned: z.number().nonnegative(),
  volumeKg: z.number().nonnegative().optional(),
  exercises: z.array(z.object({
    name: z.string(),
    category: z.string().optional(),
    sets: z.array(z.object({
      setNumber: z.number(),
      reps: z.number(),
      weightKg: z.number(),
      rpe: z.number().optional(),
      completed: z.boolean().optional()
    }))
  })).optional(),
  date: z.string().optional(),
  notes: z.string().optional()
});

const createActivitySchema = z.object({
  title: z.string().min(1),
  type: z.enum(['Running', 'Lifting', 'Cycling', 'Swimming', 'Walking', 'HIIT', 'Mobility']),
  durationMinutes: z.number().positive(),
  caloriesBurned: z.number().nonnegative(),
  distanceKm: z.number().nonnegative().optional(),
  steps: z.number().nonnegative().optional(),
  date: z.string().optional(),
  intensity: z.enum(['Low', 'Moderate', 'High', 'Maximum']).optional()
});

const createFoodSchema = z.object({
  foodName: z.string().min(1),
  mealType: z.enum(['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Pre-Workout', 'Post-Workout']),
  calories: z.number().nonnegative(),
  proteinGrams: z.number().nonnegative(),
  carbsGrams: z.number().nonnegative(),
  fatGrams: z.number().nonnegative(),
  date: z.string().optional(),
  imageUri: z.string().optional()
});

const createWaterSchema = z.object({
  amountMl: z.number().positive(),
  date: z.string().optional()
});

const createGoalSchema = z.object({
  title: z.string().min(1),
  category: z.enum(['Weight', 'Workout', 'Nutrition', 'Hydration', 'Biometric', 'Streak']),
  currentValue: z.number(),
  targetValue: z.number(),
  unit: z.string().optional(),
  deadline: z.string(),
  icon: z.string().optional()
});

const createWeightSchema = z.object({
  weightKg: z.number().positive(),
  bodyFatPercentage: z.number().positive().optional().nullable(),
  muscleMassKg: z.number().positive().optional().nullable(),
  date: z.string().optional(),
  notes: z.string().optional()
});

const aiChatSchema = z.object({
  message: z.string().min(1, 'Message cannot be empty'),
  context: z.string().optional()
});

module.exports = {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  updateProfileSchema,
  createWorkoutSchema,
  createActivitySchema,
  createFoodSchema,
  createWaterSchema,
  createGoalSchema,
  createWeightSchema,
  aiChatSchema
};
