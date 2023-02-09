import { Request, Response } from 'express';
import LeaderboardService from '../services/Leaderboard.service';

export default class LeaderboardController {
  constructor(private leaderboardService = new LeaderboardService()) {}

  getHome = async (_req: Request, res: Response) => {
    const teamsHome = await this.leaderboardService.getStatistics('home');
    return res.status(200).json(teamsHome);
  };

  getAway = async (_req: Request, res: Response) => {
    const teamsAway = await this.leaderboardService.getStatistics('away');
    return res.status(200).json(teamsAway);
  };

  getAll = async (_req: Request, res: Response) => {
    const allTeams = await this.leaderboardService.getAll();
    return res.status(200).json(allTeams);
  };
}
