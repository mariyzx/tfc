import { Router } from 'express';
import Login from './Login.routes';

const router = Router();

router.use('/login', Login);

export default router;
