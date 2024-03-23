import { Router } from "express";
import { recommendProblem } from "../controllers/recommender.controller.js";

const router = Router();

router.get("/", recommendProblem);
export default router;
