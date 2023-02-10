import { Router } from 'express';
import { CreateTeamControllerFactory } from '../factories/CreateTeamControllerFactory';

const router = Router();

const teamController = CreateTeamControllerFactory.make()

router.get('/', (req, res) => teamController.getAll(req, res));
router.get('/:id', (req, res) => teamController.getById(req, res));

export default router;
