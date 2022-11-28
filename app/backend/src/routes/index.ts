import { Router } from 'express';
import Login from './Login.routes';
import Teams from './Team.routes';

const router = Router();

router.use('/login', Login);
router.use('/teams', Teams);

export default router;
