import { Router } from 'express';
import MatchesController from '../controllers/Match.controller';

const router = Router();

const matchesController = new MatchesController();

router.get('/', (req, res) => matchesController.getAllMatches(req, res));

export default router;
