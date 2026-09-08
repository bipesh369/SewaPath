import 'dotenv/config';
import { createApp } from './app.js';
import { connectDB } from './config/db.js';

const PORT = process.env.PORT || 5000;

async function start() {
  if (!process.env.MONGO_URI) throw new Error('MONGO_URI is not set. Copy .env.example to .env first.');
  if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET is not set. Copy .env.example to .env first.');

  await connectDB(process.env.MONGO_URI);
  const app = createApp();
  app.listen(PORT, () => console.log(`[server] SewaPath API listening on http://localhost:${PORT}`));
}

start().catch((err) => {
  console.error('[server] failed to start:', err);
  process.exit(1);
});
