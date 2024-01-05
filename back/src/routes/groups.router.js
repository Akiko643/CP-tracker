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
router.patch('/', updateGroup);
router.delete('/:id', deleteGroup);
router.post('/problem', () => {}); // http://localhost:5000/groups/problem
router.delete('/problem', () => {}); // http://localhost:5000/groups/problem

export default router;
