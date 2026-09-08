import { Router } from 'express';
import { register, login, me, updatePreferredLanguage } from '../controllers/auth.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', requireAuth, me);
router.patch('/me/language', requireAuth, updatePreferredLanguage);

export default router;
