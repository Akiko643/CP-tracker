import { Router } from "express";
import ProblemRouter from "./problems.router.js";
import AuthRouter from "./auth.router.js";

const router = Router();

// TODO add authorization middleware
router.use("/problems", ProblemRouter);
router.use(AuthRouter);

export default router;
