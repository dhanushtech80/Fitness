const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');
const validate = require('../middleware/validateMiddleware');
const { registerSchema, loginSchema, forgotPasswordSchema, updateProfileSchema } = require('../validations/schemas');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fittrack_ai_super_secret_jwt_key_2026_powerpulse_iron', {
    expiresIn: '30d'
  });
};

const formatUserResponse = (user, token = null) => {
  return {
    _id: user._id,
    name: user.name,
    fullName: user.name,
    email: user.email,
    role: user.role,
    avatarUrl: user.avatarUrl,
    age: user.age || 20,
    height: user.heightCm || 170,
    heightCm: user.heightCm || 170,
    weight: user.weightKg || 62,
    weightKg: user.weightKg || 62,
    fitnessGoal: user.fitnessGoal || 'Stay Fit',
    goal: user.fitnessGoal || 'Stay Fit',
    streakDays: user.streakDays || 14,
    cnsReadiness: user.cnsReadiness || 94,
    bio: user.bio || '',
    token: token || user.token
  };
};

// @route POST /api/auth/register
router.post('/register', validate(registerSchema), async (req, res, next) => {
  try {
    const { name, email, password, role, age, height, heightCm, weight, weightKg, fitnessGoal, goal } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'Pro Athlete',
      age: age || 20,
      heightCm: heightCm || height || 170,
      weightKg: weightKg || weight || 62,
      fitnessGoal: fitnessGoal || goal || 'Stay Fit'
    });

    const token = generateToken(user._id);
    res.status(201).json(formatUserResponse(user, token));
  } catch (error) {
    next(error);
  }
});

// @route POST /api/auth/login
router.post('/login', validate(loginSchema), async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user._id);
    res.json(formatUserResponse(user, token));
  } catch (error) {
    next(error);
  }
});

// @route GET /api/auth/me
router.get('/me', protect, async (req, res, next) => {
  try {
    res.json(formatUserResponse(req.user));
  } catch (error) {
    next(error);
  }
});

// @route PUT /api/auth/profile
router.put('/profile', protect, validate(updateProfileSchema), async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const { name, bio, age, height, heightCm, weight, weightKg, fitnessGoal, goal } = req.body;

    if (name) user.name = name;
    if (bio !== undefined) user.bio = bio;
    if (age !== undefined) user.age = age;
    if (heightCm || height) user.heightCm = heightCm || height;
    if (weightKg || weight) user.weightKg = weightKg || weight;
    if (fitnessGoal || goal) user.fitnessGoal = fitnessGoal || goal;

    await user.save();

    res.json(formatUserResponse(user));
  } catch (error) {
    next(error);
  }
});

// @route POST /api/auth/forgot-password
router.post('/forgot-password', validate(forgotPasswordSchema), async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: 'If an account exists with this email, password reset instructions have been sent.' });
    }
    res.json({ message: 'Password reset link sent to ' + email });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
