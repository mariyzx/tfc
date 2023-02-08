import ITeam from '../interfaces/ITeam';
import TeamModel from '../database/models/Team';

export default class TeamService {
  constructor(readonly teamModel = TeamModel) {}

  async getAllTeams(): Promise<ITeam[]> {
    // busca todos os times na tabela
    const teams = await this.teamModel.findAll();

    return teams;
  }

  async getTeamsById(id: number): Promise<ITeam | null> {
    // busca o time com id específico
    const team = await this.teamModel.findByPk(id);
    // se não encontrar retorna null;
    if (!team) return null;

    return team;
  }
}
