import { Request, Response, NextFunction } from "express";
import { verify } from '../helpers/utils/jwt';

const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;
    // se não tiver token retorna erro;
    if (!authorization) return res.status(401).json({message: 'Token not found!' });
    // valida o token;
    verify(authorization);

    return next();
  } catch (error) {
    // se o token for inválido retorna erro
    return res.status(401).json({ message: 'Token must be a valid token' })
  }
};
  
  export default validateToken;