import { Request, Response } from 'express';
import LeaderboardService from '../services/Leaderboard.service';

export default class LeaderboardController {
  constructor(readonly leaderboardService = new LeaderboardService()) {}

  getHome = async (req: Request, res: Response) => {
    const teamsHome = await this.leaderboardService.getHome();
    return res.status(200).json(teamsHome);
  };

  getAway = async (req: Request, res: Response) => {
    const teamsAway = await this.leaderboardService.getAway();
    return res.status(200).json(teamsAway);
  };
}
