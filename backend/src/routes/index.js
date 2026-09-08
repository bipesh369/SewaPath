import { Router } from 'express';
import authRoutes from './auth.routes.js';
import categoryRoutes from './category.routes.js';
import serviceRoutes from './service.routes.js';
import officeRoutes from './office.routes.js';
import savedServiceRoutes from './savedService.routes.js';

const router = Router();

router.get('/health', (req, res) => res.json({ status: 'ok', service: 'sewapath-api' }));
router.use('/auth', authRoutes);
router.use('/categories', categoryRoutes);
router.use('/services', serviceRoutes);
router.use('/offices', officeRoutes);
router.use('/saved-services', savedServiceRoutes);

export default router;
