import ITeam from '../interfaces/ITeam';
import TeamModel from '../database/models/Team';

export default class TeamService {
  constructor(readonly teamModel = TeamModel) {}

  async getAllTeams(): Promise<ITeam[]> {
    const teams = await this.teamModel.findAll();

    return teams;
  }

  async getTeamsById(id: number): Promise<ITeam | null> {
    const team = await this.teamModel.findByPk(id);

    if (!team) return null;

    return team;
  }
}
