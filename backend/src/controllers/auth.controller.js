
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.model.js';
import { ApiError } from '../utils/apiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendPasswordResetEmail } from '../utils/email.js';

function signToken(user) {
  return jwt.sign(
    {
      sub: user._id.toString(),
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    }
  );
}

export const register = asyncHandler(async (req, res) => {
  const { name, email, password, preferredLanguage } = req.body;

  if (!name || !email || !password) {
    throw new ApiError(
      400,
      'Name, email and password are required.'
    );
  }

  if (password.length < 6) {
    throw new ApiError(
      400,
      'Password must be at least 6 characters.'
    );
  }

  const normalizedEmail = email.toLowerCase().trim();

  const existing = await User.findOne({
    email: normalizedEmail,
  });

  if (existing) {
    throw new ApiError(
      409,
      'An account with this email already exists.'
    );
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email: normalizedEmail,
    passwordHash,
    preferredLanguage: preferredLanguage === 'ne' ? 'ne' : 'en',
  });

  const token = signToken(user);

  res.status(201).json({
    token,
    user: user.toSafeJSON(),
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(
      400,
      'Email and password are required.'
    );
  }

  const normalizedEmail = email.toLowerCase().trim();

  const user = await User.findOne({
    email: normalizedEmail,
  });

  if (!user) {
    throw new ApiError(
      401,
      'Incorrect email or password.'
    );
  }

  const match = await bcrypt.compare(
    password,
    user.passwordHash
  );

  if (!match) {
    throw new ApiError(
      401,
      'Incorrect email or password.'
    );
  }

  const token = signToken(user);

  res.json({
    token,
    user: user.toSafeJSON(),
  });
});

export const me = asyncHandler(async (req, res) => {
  res.json({
    user: req.user.toSafeJSON(),
  });
});

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new ApiError(400, 'Email is required.');
  }

  const normalizedEmail = email.toLowerCase().trim();

  const user = await User.findOne({
    email: normalizedEmail,
  });

  const message =
    'If an account exists with this email, you will receive a password reset link.';

  // Do not reveal whether the email exists.
  if (!user) {
    return res.json({
      success: true,
      message,
    });
  }

  // Generate a secure random token.
  const resetToken = crypto.randomBytes(32).toString('hex');

  // Store only the hash in the database.
  const resetTokenHash = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  user.resetPasswordTokenHash = resetTokenHash;

  // Token expires after 15 minutes.
  user.resetPasswordExpiresAt = new Date(
    Date.now() + 15 * 60 * 1000
  );

  await user.save();

  // URL sent to the user's email.
  const resetUrl =
    `${process.env.CLIENT_ORIGIN}/reset-password/${resetToken}`;

  // Send password reset email.
  await sendPasswordResetEmail({
    email: user.email,
    name: user.name,
    resetUrl,
  });

  return res.json({
    success: true,
    message,
  });
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  if (!token) {
    throw new ApiError(400, 'Reset token is required.');
  }

  if (!password) {
    throw new ApiError(400, 'New password is required.');
  }

  if (password.length < 6) {
    throw new ApiError(
      400,
      'Password must be at least 6 characters.'
    );
  }

  // Hash the token received from the URL.
  const resetTokenHash = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');

  // Find the user with a matching token that has not expired.
  const user = await User.findOne({
    resetPasswordTokenHash: resetTokenHash,
    resetPasswordExpiresAt: { $gt: new Date() },
  });

  if (!user) {
    throw new ApiError(
      400,
      'Invalid or expired password reset token.'
    );
  }

  // Hash the new password.
  user.passwordHash = await bcrypt.hash(password, 10);

  // Remove the reset token so it cannot be reused.
  user.resetPasswordTokenHash = undefined;
  user.resetPasswordExpiresAt = undefined;

  await user.save();

  res.json({
    success: true,
    message: 'Password has been reset successfully.',
  });
});


export const updatePreferredLanguage = asyncHandler(
  async (req, res) => {
    const { preferredLanguage } = req.body;

    if (!['en', 'ne'].includes(preferredLanguage)) {
      throw new ApiError(400, 'Invalid language.');
    }

    req.user.preferredLanguage = preferredLanguage;

    await req.user.save();

    res.json({
      user: req.user.toSafeJSON(),
    });
  }
);

