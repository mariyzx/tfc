import { Router } from 'express';
import LeaderboardController from '../controllers/Leaderboard.controller';

const router = Router();

const leaderboardController = new LeaderboardController();

router.get('/home', (req, res) => leaderboardController.getHome(req, res));
router.get('/away', (req, res) => leaderboardController.getAway(req, res));
router.get('/', (req, res) => leaderboardController.getAll(req, res));

export default router;
