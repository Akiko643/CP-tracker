import { Router } from "express";
import Problem from "./problems.js";

const router = Router();

router.use("/problems", Problem);

export default router;
