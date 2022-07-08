import { Router } from 'express';
import { registerDefinition } from 'swaggiffy';
import { adminSignup, getProfile, login, voterSignup } from '../controllers/auth.controller';
import { AuthMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.post('/admin/signup', adminSignup)
router.post('/voter/signup', voterSignup)
router.post('/login', login)
router.get('/profile', AuthMiddleware ,getProfile)

registerDefinition(router, {tags: 'Auth', mappedSchema: 'Auth', basePath: '/api/v1/auth'});

export default router;