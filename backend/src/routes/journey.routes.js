import { Router } from 'express';
import { listSteps, createStep, updateStep, deleteStep } from '../controllers/journey.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';
import { requireRole } from '../middleware/authorize.middleware.js';
import { ROLES } from '../constants.js';

const router = Router({ mergeParams: true });

router.get('/', listSteps);
router.post('/', requireAuth, requireRole(ROLES.ADMIN), createStep);
router.patch('/:stepId', requireAuth, requireRole(ROLES.ADMIN), updateStep);
router.delete('/:stepId', requireAuth, requireRole(ROLES.ADMIN), deleteStep);

export default router;
