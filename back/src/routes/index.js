import { Router } from "express";
import ProblemRouter from "./problems.router.js";
import UserRouter from "./user.router.js";
import RecommenderRouter from "./recommender.router.js";
import { verifyToken } from "../middlewares/auth.js";
import GroupRouter from "./groups.router.js";
import { getLastIndex } from "../middlewares/recommender.js";

const router = Router();

// TODO add authorization middleware
router.use("/problems", verifyToken, ProblemRouter);
router.use("/groups", verifyToken, GroupRouter);
router.use("/recommender", verifyToken, getLastIndex, RecommenderRouter);
router.use(UserRouter);

export default router;
