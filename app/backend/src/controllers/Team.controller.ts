import { Request, Response } from 'express';
import TeamService from '../services/Team.service';

export default class TeamController {
  constructor(private teamService = new TeamService()) {}

  getAll = async (req: Request, res: Response) => {
    const teams = await this.teamService.getAllTeams();

    return res.status(200).json(teams);
  };

  getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, data} = await this.teamService.getTeamsById(Number(id));

    return res.status(status).json(data);
  };
}
