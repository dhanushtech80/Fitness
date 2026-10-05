const mongoose = require('mongoose');

const foodLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  foodName: { type: String, required: true },
  mealType: { 
    type: String, 
    enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Pre-Workout', 'Post-Workout'], 
    default: 'Breakfast' 
  },
  calories: { type: Number, required: true },
  proteinGrams: { type: Number, required: true },
  carbsGrams: { type: Number, required: true },
  fatGrams: { type: Number, required: true },
  imageUri: { type: String, default: '' },
  date: { type: String, required: true }, // YYYY-MM-DD
  time: { type: String, default: '12:30 PM' },
  aiConfidenceScore: { type: Number, default: 0.94 }
}, { timestamps: true });

module.exports = mongoose.model('FoodLog', foodLogSchema);
