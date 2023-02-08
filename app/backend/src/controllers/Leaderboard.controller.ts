import { Request, Response } from 'express';
import LeaderboardService from '../services/Leaderboard.service';

export default class LeaderboardController {
  constructor(readonly leaderboardService = new LeaderboardService()) {}

  getHome = async (req: Request, res: Response) => {
    const teamsHome = await this.leaderboardService.getStatistics('home');
    return res.status(200).json(teamsHome);
  };

  getAway = async (req: Request, res: Response) => {
    const teamsAway = await this.leaderboardService.getStatistics('away');
    return res.status(200).json(teamsAway);
  };

  getAll = async (req: Request, res: Response) => {
    const allTeams = await this.leaderboardService.getAll();
    return res.status(200).json(allTeams);
  };
}
