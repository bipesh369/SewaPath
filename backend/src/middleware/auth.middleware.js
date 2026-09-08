import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/apiError.js';
import User from '../models/user.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const requireAuth = asyncHandler(async (req, res, next) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) throw new ApiError(401, 'Sign in required.');

  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    throw new ApiError(401, 'Your session has expired. Please sign in again.');
  }

  const user = await User.findById(payload.sub);
  if (!user) throw new ApiError(401, 'Account not found.');

  req.user = user;
  next();
});
