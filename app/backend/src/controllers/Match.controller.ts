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
    const { authorization } = req.headers;
    // validar o token
    const val = validateToken(authorization as string);
    if (val) return res.status(val.status).json({ message: val.message });

    const match = { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals };
    const createdMatch = await this.matchesService.saveMatch(match);

    if (createdMatch.status !== 201) {
      return res.status(createdMatch.status).json({ message: createdMatch.message });
    }

    return res.status(createdMatch.status).json(createdMatch.message);
  };

  updateMatch = async (req: Request, res: Response) => {
    const { id } = req.params;

    await this.matchesService.updateMatch(Number(id));

    return res.status(200).json({ message: 'Finished!' });
  };

  updateResult = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    await this.matchesService.updateResult(Number(id), homeTeamGoals, awayTeamGoals);

    return res.status(200).json({ message: 'Updated!' });
  };
}
