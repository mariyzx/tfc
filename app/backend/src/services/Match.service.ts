import TeamModel from '../database/models/Team';
import MatchesModel from '../database/models/Matches';
import { IMatch, IMatchWithId } from '../interfaces/IMatch';

export default class MatchesService {
  constructor(readonly matchesModel = MatchesModel) {}

  async getMatches(inProgress: string | undefined): Promise<IMatchWithId[]> {
    const matches = await this.matchesModel.findAll({
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

    if (inProgress === 'true') {
      return matches.filter((match) => match.inProgress);
    } if (inProgress === 'false') {
      return matches.filter((match) => !match.inProgress);
    }

    return matches;
  }

  async saveMatch({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals }: IMatch) {
    // os times precisam existir:
    const matches = await this.getMatches(undefined);
    const team1 = matches.find((mt) => mt.id === homeTeam);
    const team2 = matches.find((mt) => mt.id === awayTeam);
    // se não existirem retornam undefined;
    if (!team1 || !team2) return { status: 404, message: 'There is no team with such id!' };
    // se os times forem iguais retornam undefined;
    if (homeTeam === awayTeam) {
      return { status: 422,
        message: 'It is not possible to create a match with two equal teams' };
    }
    // se existirem a partida é criada
    const createdMatch = await this.matchesModel
      .create({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress: true });

    return { status: 201, message: createdMatch };
  }

  async updateMatch(id: number) {
    await this.matchesModel.update({ inProgress: false }, { where: { id } });
  }
}
