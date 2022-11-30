import { Router } from 'express';
import LeaderboardController from '../controllers/Leaderboard.controller';

const router = Router();

const leaderboardController = new LeaderboardController();

router.get('/home', (req, res) => leaderboardController.getHome(req, res));

export default router;
