import { Router } from 'express';

import {
  listQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  checkEligibility,
} from '../controllers/eligibility.controller.js';

import { requireAuth } from '../middleware/auth.middleware.js';
import { requireRole } from '../middleware/authorize.middleware.js';
import { ROLES } from '../constants.js';

const router = Router({ mergeParams: true });

router.get('/', listQuestions);

router.post(
  '/',
  requireAuth,
  requireRole(ROLES.ADMIN),
  createQuestion
);

// Keep /check before /:questionId
router.post('/check', checkEligibility);

router.patch(
  '/:questionId',
  requireAuth,
  requireRole(ROLES.ADMIN),
  updateQuestion
);

router.delete(
  '/:questionId',
  requireAuth,
  requireRole(ROLES.ADMIN),
  deleteQuestion
);

export default router;