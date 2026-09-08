import { Router } from 'express';
import { listSavedServices, saveService, unsaveService } from '../controllers/savedService.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';

const router = Router();

router.use(requireAuth);
router.get('/', listSavedServices);
router.post('/', saveService);
router.delete('/:serviceId', unsaveService);

export default router;
