import { Router } from 'express';
import { listOffices, getOffice, createOffice, updateOffice, deleteOffice } from '../controllers/office.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';
import { requireRole } from '../middleware/authorize.middleware.js';
import { ROLES } from '../constants.js';

const router = Router();

router.get('/', listOffices);
router.get('/:id', getOffice);
router.post('/', requireAuth, requireRole(ROLES.ADMIN), createOffice);
router.patch('/:id', requireAuth, requireRole(ROLES.ADMIN), updateOffice);
router.delete('/:id', requireAuth, requireRole(ROLES.ADMIN), deleteOffice);

export default router;
