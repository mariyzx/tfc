import { Request, Response } from 'express';
import MatchesService from '../services/Match.service';

export default class MatchesController {
  constructor(private matchesService: MatchesService = new MatchesService()) {}

  getAllMatches = async (req: Request, res: Response) => {
    const { inProgress } = req.query;

    const matches = await this.matchesService.getMatches(inProgress as string);

    return res.status(200).json(matches);
  };
}
