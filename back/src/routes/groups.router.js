import { Router } from "express";
import {
  createGroup,
  getGroups,
  getGroup,
  updateGroup,
  deleteGroup,
  createProblemToGroup,
  deleteProblemFromGroup,
} from "../controllers/groups.controller.js";

const router = Router();

router.post("/", createGroup);
router.get("/", getGroups);
router.get("/:id", getGroup);
router.patch("/:id", updateGroup);
router.delete("/:id", deleteGroup);
router.post("/:groupId", createProblemToGroup);
router.delete("/:groupId/:problemId", deleteProblemFromGroup);

export default router;
