import { Router } from "express";
import { test } from "../services/problems.js";

const router = Router();

router.get("/test", test);

export default router;
