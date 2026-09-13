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
    throw new ApiError(400, "Email is required.");
  }

  const normalizedEmail = email.toLowerCase().trim();

  const user = await User.findOne({
    email: normalizedEmail,
  });

  if (!user) {
    throw new ApiError(
      404,
      "No SewaPath account is registered with this email."
    );
  }

  // Generate 6-digit OTP
  const otp = crypto
    .randomInt(100000, 1000000)
    .toString();

  // Hash OTP before storing it
  const otpHash = crypto
    .createHash("sha256")
    .update(otp)
    .digest("hex");

  user.passwordResetOtpHash = otpHash;

  // OTP expires after 10 minutes
  user.passwordResetOtpExpiresAt = new Date(
    Date.now() + 10 * 60 * 1000
  );

  // Reset attempt counter
  user.passwordResetOtpAttempts = 0;

  // Clear any previous verified reset session
  user.passwordResetVerifiedTokenHash = null;
  user.passwordResetVerifiedExpiresAt = null;

  await user.save();

  // Send OTP email
  await sendPasswordResetEmail({
    email: user.email,
    name: user.name,
    otp,
  });

  return res.json({
    success: true,
    message: "A verification code has been sent to your email.",
  });
});


export const verifyPasswordResetOtp = asyncHandler(
  async (req, res) => {
    const { email, otp } = req.body;

    if (!email) {
      throw new ApiError(400, "Email is required.");
    }

    if (!otp) {
      throw new ApiError(400, "OTP is required.");
    }

    if (!/^\d{6}$/.test(otp)) {
      throw new ApiError(
        400,
        "OTP must be a 6-digit number."
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      throw new ApiError(
        404,
        "No SewaPath account is registered with this email."
      );
    }

    // Check whether OTP exists
    if (
      !user.passwordResetOtpHash ||
      !user.passwordResetOtpExpiresAt
    ) {
      throw new ApiError(
        400,
        "No active OTP found. Please request a new OTP."
      );
    }

    // Check expiration
    if (
      user.passwordResetOtpExpiresAt.getTime() <
      Date.now()
    ) {
      user.passwordResetOtpHash = null;
      user.passwordResetOtpExpiresAt = null;
      user.passwordResetOtpAttempts = 0;

      await user.save();

      throw new ApiError(
        400,
        "OTP has expired. Please request a new OTP."
      );
    }

    // Maximum attempts
    if (user.passwordResetOtpAttempts >= 5) {
      throw new ApiError(
        429,
        "Too many incorrect attempts. Please request a new OTP."
      );
    }

    // Hash submitted OTP
    const otpHash = crypto
      .createHash("sha256")
      .update(otp)
      .digest("hex");

    // Check OTP
    if (otpHash !== user.passwordResetOtpHash) {
      user.passwordResetOtpAttempts += 1;

      await user.save();

      throw new ApiError(
        400,
        "Invalid OTP."
      );
    }

    // OTP is correct.
    // Create temporary reset token.
    const resetToken = crypto
      .randomBytes(32)
      .toString("hex");

    const resetTokenHash = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.passwordResetVerifiedTokenHash = resetTokenHash;

    // Reset token valid for 15 minutes
    user.passwordResetVerifiedExpiresAt = new Date(
      Date.now() + 15 * 60 * 1000
    );

    // OTP can no longer be reused
    user.passwordResetOtpHash = null;
    user.passwordResetOtpExpiresAt = null;
    user.passwordResetOtpAttempts = 0;

    await user.save();

    res.json({
      success: true,
      message: "OTP verified successfully.",
      resetToken,
    });
  }
);


export const resetPassword = asyncHandler(async (req, res) => {
  const { resetToken, password } = req.body;

  if (!resetToken) {
    throw new ApiError(
      400,
      "Password reset verification is required."
    );
  }

  if (!password) {
    throw new ApiError(
      400,
      "New password is required."
    );
  }

  if (password.length < 6) {
    throw new ApiError(
      400,
      "Password must be at least 6 characters."
    );
  }

  // Hash reset token
  const resetTokenHash = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const user = await User.findOne({
    passwordResetVerifiedTokenHash: resetTokenHash,
    passwordResetVerifiedExpiresAt: {
      $gt: new Date(),
    },
  });

  if (!user) {
    throw new ApiError(
      400,
      "Invalid or expired password reset session."
    );
  }

  // Update password
  user.passwordHash = await bcrypt.hash(
    password,
    10
  );

  // Clear reset data
  user.passwordResetOtpHash = null;
  user.passwordResetOtpExpiresAt = null;
  user.passwordResetOtpAttempts = 0;

  user.passwordResetVerifiedTokenHash = null;
  user.passwordResetVerifiedExpiresAt = null;

  await user.save();

  res.json({
    success: true,
    message: "Password has been reset successfully.",
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
