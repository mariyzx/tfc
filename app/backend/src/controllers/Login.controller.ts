import { Request, Response } from 'express';
import LoginService from '../services/Login.service';

export default class LoginController {
  // Dependency Inversion Principle
  constructor(private loginService: LoginService = new LoginService()) {}

  public login = async (req: Request, res: Response) => {
    const { status, data } = await this.loginService.login(req.body);
    return res.status(status).json(data);
  };
}
