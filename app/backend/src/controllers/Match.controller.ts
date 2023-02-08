import { Request, Response } from 'express';
import validateToken from '../helpers/validations/tokenValidation';
import MatchesService from '../services/Match.service';

export default class MatchesController {
  constructor(private matchesService: MatchesService = new MatchesService()) {}

  getAllMatches = async (req: Request, res: Response) => {
    const { inProgress } = req.query;

    const matches = await this.matchesService.getMatches(inProgress as string);

    return res.status(200).json(matches);
  };

  saveMatch = async (req: Request, res: Response) => {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;

    if (!homeTeam || !awayTeam || !homeTeamGoals || !awayTeamGoals) {
      return res.status(400).json({ message: 'Some fiels are missing!' });
    }

    const match = { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals };
    const createdMatch = await this.matchesService.saveMatch(match);

    if (createdMatch.status !== 201) {
      return res.status(createdMatch.status).json({ message: createdMatch.message });
    }

    return res.status(createdMatch.status).json(createdMatch.message);
  };

  finishMatch = async (req: Request, res: Response) => {
    const { id } = req.params;

    const updated = await this.matchesService.finishMatch(Number(id));

    if (!updated) {
      return res.status(404).json({ message: 'Match not found!' })
    }

    return res.status(200).json({ message: 'Finished!' });
  };

  updateResult = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    if (!homeTeamGoals || !awayTeamGoals) {
      return res.status(400).json({ message: 'Some fiels are missing!' });
    }

    const updated = await this.matchesService.updateResult(Number(id), homeTeamGoals, awayTeamGoals);

    if (!updated) {
      return res.status(404).json({ message: 'Match not found!' })
    }

    return res.status(200).json({ message: 'Updated!' });
  };
}
