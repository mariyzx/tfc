import { ITeamRepository } from "../interfaces/repositories/ITeamRepository";
import TeamModel from "../database/models/Team";
import ITeam from "../interfaces/ITeam";

export class TeamRepository implements ITeamRepository {
  async findAll(): Promise<ITeam[]> {
    return TeamModel.findAll();
  }

  async findById(id: number): Promise<ITeam | null> {
    return TeamModel.findByPk(id)
  }
}