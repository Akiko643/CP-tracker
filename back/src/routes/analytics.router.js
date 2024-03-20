import { Router } from "express";

import { findAnalyticsTimeBar } from "../controllers/analytics.controller.js";

const router = Router();
router.get("/timebar", findAnalyticsTimeBar);

export default router;
