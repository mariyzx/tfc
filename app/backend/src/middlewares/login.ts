import { Request, Response, NextFunction } from "express";

const validateLogin = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  
  // se o usuário não inserir informações retorna erro;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  return next();
}

export default validateLogin;
