import { Router } from 'express';
import Login from './Login.routes';
import Teams from './Team.routes';
import Matches from './Match.routes';
import Leaderboard from './Leaderboard.routes';
import * as swaggerDoc from '../swagger.json';
import * as swaggerUi from 'swagger-ui-express'

const router = Router();

router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc) )
router.use('/login', Login);
router.use('/teams', Teams);
router.use('/matches', Matches);
router.use('/leaderboard', Leaderboard);

export default router;
