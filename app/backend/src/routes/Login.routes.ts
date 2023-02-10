import { Router } from 'express';
import { CreateLoginControllerFactory } from '../factories/CreateLoginControllerFactory';

const router = Router();

const loginController = CreateLoginControllerFactory.make();

router.post('/', (req, res) => loginController.login(req, res));
router.get('/validate', (req, res) => loginController.validate(req, res));

export default router;
