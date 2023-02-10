import { Request, Response } from 'express';
import { ITeamService } from '../interfaces/services/TeamService.interface';

export default class TeamController {
  constructor(private teamService: ITeamService) {}

  getAll = async (_req: Request, res: Response) => {
    const { status, data } = await this.teamService.getAllTeams()

    return res.status(status).json(data);
  };

  getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, data} = await this.teamService.getTeamsById(Number(id));

    return res.status(status).json(data);
  };
}
