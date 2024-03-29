import { Request, Response } from 'express';
import { ILoginResponse } from '../interfaces/ILogin';
import { ILoginService } from '../interfaces/services/LoginService.interface';

export default class LoginController {
  // Dependency Inversion Principle
  constructor(private loginService: ILoginService) {}

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    const { status, data } = await this.loginService.login(req.body);

    return res.status(status).json(data);
  };

  validate = async (req: Request, res: Response) => {
    const { authorization } = req.headers;

    if (!authorization) return res.status(400).json({ message: 'Token not found!' });

    const { status, data } = await this.loginService.validate(authorization);

    return res.status(status).json(data);
  };
}
