import { ApiError } from '../utils/apiError.js';

export const requireRole = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    throw new ApiError(403, 'You do not have permission to do this.');
  }
  next();
};
