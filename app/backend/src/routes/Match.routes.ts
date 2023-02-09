import { Router } from 'express';
import validateToken from '../middlewares/token';
import { CreateMatchesControllerFactory } from '../factories/CreateMatchesControllerFactory';

const router = Router();

const matchesController = CreateMatchesControllerFactory.make();

router.get('/', (req, res) => matchesController.getAllMatches(req, res));
router.post('/', validateToken, (req, res) => matchesController.saveMatch(req, res));
router.patch('/:id/finish', validateToken, (req, res) => matchesController.finishMatch(req, res));
router.patch('/:id', validateToken, (req, res) => matchesController.updateResult(req, res));

export default router;
