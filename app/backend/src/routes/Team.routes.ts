import { Router } from 'express';
import validateTeams from '../middlewares/teams';
import TeamController from '../controllers/Team.controller';

const router = Router();

const teamController = new TeamController();

router.get('/', (req, res) => teamController.getAll(req, res));
router.get('/:id', validateTeams, (req, res) => teamController.getById(req, res));

export default router;
