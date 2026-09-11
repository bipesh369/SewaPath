import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { rateLimit } from 'express-rate-limit';
import routes from './routes/index.js';
import { notFoundHandler, errorHandler } from './middleware/error.middleware.js';

export function createApp() {
  const app = express();

  app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "SewaPath API is running"
  });
});

  const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'https://sewapath-frontend.vercel.app',
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

  app.use(express.json({ limit: '1mb' }));
  app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

  app.use(
    '/api',
    rateLimit({ windowMs: 15 * 60 * 1000, max: 300, standardHeaders: true, legacyHeaders: false }),
    routes
  );

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
