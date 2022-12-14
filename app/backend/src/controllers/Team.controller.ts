import { Request, Response } from 'express';
import TeamService from '../services/Team.service';

export default class TeamController {
  constructor(private teamService: TeamService = new TeamService()) {}

  getAll = async (req: Request, res: Response) => {
    const teams = await this.teamService.getAllTeams();

    return res.status(200).json(teams);
  };

  getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const team = await this.teamService.getTeamsById(Number(id));

    if (!team) return res.status(400).json({ message: 'Team not found!' });

    return res.status(200).json(team);
  };
}
