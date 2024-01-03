import { Router } from "express";
import {
    createGroup,
    deleteGroup,
    getGroups,
    updateGroup
} from "../controllers/groups.controller.js";

const router = Router();

router.post('/', createGroup);
router.get('/', getGroups);
router.put('/:id', updateGroup);
router.delete('/:id', deleteGroup);

// TODO: add functions two these two routes
router.post('/:groupId/:problemId', () => {});
router.delete('/:groupId/:problemId', () => {});

export default router;