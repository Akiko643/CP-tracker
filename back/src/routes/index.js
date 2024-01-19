import { Router } from "express";
import ProblemRouter from "./problems.router.js";
import UserRouter from "./user.router.js";
import { verifyToken } from "../middlewares/auth.js";
import GroupRouter from "./groups.router.js";

const router = Router();

// TODO add authorization middleware
router.use("/problems", verifyToken, ProblemRouter);
router.use("/groups", verifyToken, GroupRouter);
router.use(UserRouter);

export default router;
