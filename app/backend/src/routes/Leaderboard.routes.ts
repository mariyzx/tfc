import { Router } from 'express';
import { CreateLeaderboardControllerFactory } from '../factories/CreateLeaderboardControllerFactory';

const router = Router();

const leaderboardController = CreateLeaderboardControllerFactory.make()

router.get('/home', (req, res) => leaderboardController.getHome(req, res));
router.get('/away', (req, res) => leaderboardController.getAway(req, res));
router.get('/', (req, res) => leaderboardController.getAll(req, res));

export default router;
