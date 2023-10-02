import { Router } from "express";
import { login, signUp } from "../controllers/user.controller.js";

const router = new Router();

router.post("/login", login);
router.post("/signUp", signUp);

export default router;
