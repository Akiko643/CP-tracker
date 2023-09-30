import { Router } from "express";
import {
  createProblem,
  deleteProblem,
  findProblem,
  findProblems,
  updateProblem,
} from "../controllers/problems.controller.js";

const router = Router();

router.get("/", findProblems);
router.get("/:id", findProblem);
router.post("/add", createProblem);
router.delete("/:id", deleteProblem);
router.patch("/:id", updateProblem);

export default router;
