const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['Weight', 'Workout', 'Nutrition', 'Hydration', 'Biometric', 'Streak'], 
    default: 'Weight' 
  },
  currentValue: { type: Number, required: true },
  targetValue: { type: Number, required: true },
  unit: { type: String, default: 'kg' },
  deadline: { type: String, required: true },
  status: { type: String, enum: ['Active', 'Achieved', 'Paused'], default: 'Active' },
  icon: { type: String, default: 'flag' }
}, { timestamps: true });

module.exports = mongoose.model('Goal', goalSchema);
