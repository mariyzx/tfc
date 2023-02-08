import { Router } from 'express';
import validateLogin from '../middlewares/login';
import LoginController from '../controllers/Login.controller';

const router = Router();

const loginController = new LoginController();

router.post('/', validateLogin, (req, res) => loginController.login(req, res));
router.get('/validate', (req, res) => loginController.validate(req, res));

export default router;
