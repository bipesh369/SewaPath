import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { ApiError } from '../utils/apiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

function signToken(user) {
  return jwt.sign({ sub: user._id.toString(), role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
}

export const register = asyncHandler(async (req, res) => {
  const { name, email, password, preferredLanguage } = req.body;
  if (!name || !email || !password) throw new ApiError(400, 'Name, email and password are required.');
  if (password.length < 6) throw new ApiError(400, 'Password must be at least 6 characters.');

  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) throw new ApiError(409, 'An account with this email already exists.');

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    passwordHash,
    preferredLanguage: preferredLanguage === 'ne' ? 'ne' : 'en',
  });

  const token = signToken(user);
  res.status(201).json({ token, user: user.toSafeJSON() });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) throw new ApiError(400, 'Email and password are required.');

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) throw new ApiError(401, 'Incorrect email or password.');

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) throw new ApiError(401, 'Incorrect email or password.');

  const token = signToken(user);
  res.json({ token, user: user.toSafeJSON() });
});

export const me = asyncHandler(async (req, res) => {
  res.json({ user: req.user.toSafeJSON() });
});

export const updatePreferredLanguage = asyncHandler(async (req, res) => {
  const { preferredLanguage } = req.body;
  if (!['en', 'ne'].includes(preferredLanguage)) throw new ApiError(400, 'Invalid language.');
  req.user.preferredLanguage = preferredLanguage;
  await req.user.save();
  res.json({ user: req.user.toSafeJSON() });
});
