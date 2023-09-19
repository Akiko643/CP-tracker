import { Router } from "express";
import {
  addProblem,
  deleteProblem,
  getProblem,
  getProblems,
  updateProblem,
} from "../controllers/problems.js";

const router = Router();

router.get("/", getProblems);
router.get("/:id", getProblem);
router.post("/add", addProblem);
router.delete("/:id", deleteProblem);
router.patch("/:id", updateProblem);

export default router;
