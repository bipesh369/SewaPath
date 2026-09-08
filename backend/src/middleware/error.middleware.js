import { ApiError } from '../utils/apiError.js';

export function notFoundHandler(req, res) {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
}

export function errorHandler(err, req, res, next) { // eslint-disable-line no-unused-vars
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({ message: err.message, details: err.details });
  }

  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: 'Validation failed.', details: err.errors });
  }

  if (err.code === 11000) {
    return res.status(409).json({ message: 'That record already exists.', details: err.keyValue });
  }

  console.error(err);
  return res.status(500).json({ message: 'Something went wrong on our end.' });
}
