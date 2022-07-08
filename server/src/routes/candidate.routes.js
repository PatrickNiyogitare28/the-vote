import { Router } from "express";
import { registerDefinition } from "swaggiffy";
import { getAllCandidates, register } from '../controllers/candidate.controller';
import { AdminMiddleware } from "../middleware/admin.middleware";
import { AuthMiddleware } from "../middleware/auth.middleware";
const router = Router();

router.post('/register', AdminMiddleware,register)
router.get('/', AuthMiddleware,getAllCandidates)

registerDefinition(router, {tags: 'Candidate', mappedSchema: 'Candidate', basePath: '/api/v1/candidate'});
export default router;