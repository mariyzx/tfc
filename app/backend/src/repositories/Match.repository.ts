import { IMatchRepository } from "../interfaces/repositories/IMatchRepository";
import MatchesModel from "../database/models/Matches";
import TeamModel from "../database/models/Team";
import { IMatch, MatchParams } from "../interfaces/IMatch";

export class MatchRepository implements IMatchRepository {
  async getMatches(): Promise<IMatch[]> {
    const matches = await MatchesModel.findAll({
      include: [{
        model: TeamModel,
        as: 'teamHome',
        attributes: { exclude: ['id'] },
      },
      { model: TeamModel,
        as: 'teamAway',
        attributes: { exclude: ['id'] } },
      ],
    });

    return matches;
  }

  async getMatchesInProgress(status: boolean): Promise<IMatch[]> {
    const matches = await MatchesModel.findAll({
      include: [{
        model: TeamModel,
        as: 'teamHome',
        attributes: { exclude: ['id'] },
      },
      { model: TeamModel,
        as: 'teamAway',
        attributes: { exclude: ['id'] } },
      ],
      where: { inProgress: status }
    });

    return matches;
  }

  async saveMatch(match: MatchParams): Promise<IMatch> {
    return MatchesModel.create(
      { ...match, inProgress: true });
  }

  async update(data: object, id: number): Promise<void> {
    await MatchesModel.update(data, { where: { id } });
  }
}