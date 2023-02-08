import { Request, Response, NextFunction } from "express";

const validateTeams = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  
  // se o usuário não inserir um número, retorna erro;
  if (typeof id !== 'number') {
    return res.status(400).json({ message: 'ID must be a number!' });
  }

  return next();
}

export default validateTeams;
