import { Router } from "express";
import ProblemRouter from "./problems.router.js";
import UserRouter from "./user.router.js";
import RecommenderRouter from "./recommender.router.js";
import { verifyToken } from "../middlewares/auth.js";
<<<<<<< HEAD
import GroupRouter from "./groups.router.js";
import { getLastIndex } from "../middlewares/recommender.js";
=======
>>>>>>> dev

const router = Router();

// TODO add authorization middleware
router.use("/problems", verifyToken, ProblemRouter);
<<<<<<< HEAD
router.use("/groups", verifyToken, GroupRouter);
router.use("/recommender", verifyToken, getLastIndex, RecommenderRouter);
=======
>>>>>>> dev
router.use(UserRouter);

export default router;
