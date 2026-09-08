import { Router } from 'express';
import { listCategories, createCategory, updateCategory, deleteCategory } from '../controllers/category.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';
import { requireRole } from '../middleware/authorize.middleware.js';
import { ROLES } from '../constants.js';

const router = Router();

router.get('/', listCategories);
router.post('/', requireAuth, requireRole(ROLES.ADMIN), createCategory);
router.patch('/:id', requireAuth, requireRole(ROLES.ADMIN), updateCategory);
router.delete('/:id', requireAuth, requireRole(ROLES.ADMIN), deleteCategory);

export default router;
