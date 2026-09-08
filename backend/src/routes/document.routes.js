import { Router } from 'express';
import {
  listDocuments,
  createDocument,
  updateDocument,
  deleteDocument,
} from '../controllers/document.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';
import { requireRole } from '../middleware/authorize.middleware.js';
import { ROLES } from '../constants.js';

const router = Router({ mergeParams: true });

router.get('/', listDocuments);
router.post('/', requireAuth, requireRole(ROLES.ADMIN), createDocument);
router.patch('/:documentId', requireAuth, requireRole(ROLES.ADMIN), updateDocument);
router.delete('/:documentId', requireAuth, requireRole(ROLES.ADMIN), deleteDocument);

export default router;
