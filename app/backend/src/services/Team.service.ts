import ITeam, { ITeamResponse } from '../interfaces/ITeam';
import TeamModel from '../database/models/Team';
import { TeamRepository } from '../repositories/Team.repository';

export default class TeamService {
  constructor(readonly teamModel: TeamRepository) {}

  async getAllTeams(): Promise<ITeamResponse> {
    // busca todos os times na tabela
    const teams = await this.teamModel.findAll();

    return { status: 200, data: teams };
  }

  async getTeamsById(id: number): Promise<ITeamResponse> {
    // busca o time com id específico
    const team = await this.teamModel.findById(id);
    // se não encontrar retorna null;
    if (!team) return { status: 400, data: { message: 'Team not found!'} };

    return { status: 200, data: team };
  }
}
