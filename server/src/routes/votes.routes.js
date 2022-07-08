import { Router } from "express";
import { registerDefinition } from "swaggiffy";
import { getAll, getVotesByCandidate, vote, deleteOne } from "../controllers/votes.controller";
import { AuthMiddleware } from "../middleware/auth.middleware";
import { VoterMiddleware } from "../middleware/voter.middleware copy";

const router = Router();

router.post('/candidate/:id', VoterMiddleware,vote)
router.get('/candidate/:id', AuthMiddleware,getVotesByCandidate)
router.get('/', getAll)
router.delete('/',  VoterMiddleware, deleteOne)

registerDefinition(router, {tags: 'Votes', mappedSchema: 'Votes', basePath: '/api/v1/votes'});
export default router;