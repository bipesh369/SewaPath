import { Router } from "express";

import {
  listServices,
  getServiceBySlug,
  getServiceById,
  createService,
  updateService,
  deleteService,
} from "../controllers/service.controller.js";

import { requireAuth } from "../middleware/auth.middleware.js";
import { requireRole } from "../middleware/authorize.middleware.js";
import { ROLES } from "../constants.js";

import eligibilityRoutes from "./eligibility.routes.js";
import documentRoutes from "./document.routes.js";
import journeyRoutes from "./journey.routes.js";

const router = Router({ mergeParams: true });

router.get("/", listServices);

router.get("/slug/:slug", getServiceBySlug);

router.get("/:id", getServiceById);

router.post("/", requireAuth, requireRole(ROLES.ADMIN), createService);

router.patch("/:id", requireAuth, requireRole(ROLES.ADMIN), updateService);

router.delete("/:id", requireAuth, requireRole(ROLES.ADMIN), deleteService);

router.use(
  "/:serviceId/eligibility",
  (req, res, next) => {
    console.log("PARENT SERVICE ID:", req.params.serviceId);
    next();
  },
  eligibilityRoutes
);

router.use("/:serviceId/documents", documentRoutes);

router.use("/:serviceId/journey", journeyRoutes);

export default router;