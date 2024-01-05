import { Router } from "express";
import {
    createGroup,
    getGroups,
    updateGroup,
    deleteGroup,
    createProblemToGroup,
    deleteProblemFromGroup
} from "../controllers/groups.controller.js";

const router = Router();

router.post('/', createGroup);
router.get('/', getGroups);
router.patch('/', updateGroup);
router.delete('/:id', deleteGroup);
router.post('/problem', createProblemToGroup);
router.delete('/problem/:groupId/:problemId', deleteProblemFromGroup);

export default router;
