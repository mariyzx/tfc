import { Request, Response } from 'express';
import { ITeamService } from '../interfaces/services/TeamService.interface';

export default class TeamController {
  constructor(private teamService: ITeamService) {}

  getAll = async (_req: Request, res: Response) => {
    const teams = await this.teamService.getAllTeams()

    return res.status(200).json(teams);
  };

  getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, data} = await this.teamService.getTeamsById(Number(id));

    return res.status(status).json(data);
  };
}
