import { Request, Response } from 'express';
import { IMatchService } from '../interfaces/services/MatchService.interface';

export default class MatchesController {
  constructor(private matchesService: IMatchService) {}

  getAllMatches = async (req: Request, res: Response) => {
    const { inProgress } = req.query;

    const { status, data } = await this.matchesService.getMatches(inProgress as string);

    return res.status(status).json(data);
  };

  saveMatch = async (req: Request, res: Response) => {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;

    if (!homeTeam || !awayTeam || !homeTeamGoals || !awayTeamGoals) {
      return res.status(400).json({ message: 'Some fiels are missing!' });
    }

    const { status, data } = await this.matchesService.saveMatch(req.body);

    return res.status(status).json(data);
  };

  finishMatch = async (req: Request, res: Response) => {
    const { id } = req.params;

    const { status, data } = await this.matchesService.finishMatch(Number(id));

    return res.status(status).json(data);
  };

  updateResult = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    if (!homeTeamGoals || !awayTeamGoals) {
      return res.status(400).json({ message: 'Some fiels are missing!' });
    }

    const { status, data } = await this.matchesService.updateResult(
      {homeTeamGoals, awayTeamGoals}, Number(id)
    );

    return res.status(status).json(data);
  };
}
