import { Router } from "express";
import { login, signUp, loginGoogle, generateToken } from "../controllers/user.controller.js";

const router = new Router();

router.post("/login", login);
router.post("/signup", signUp);
router.post("/login/google", loginGoogle);
router.post("/generateToken", generateToken);

export default router;
