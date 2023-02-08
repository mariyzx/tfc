import TeamModel from '../database/models/Team';
import MatchesModel from '../database/models/Matches';
import { IMatch, IMatchWithId } from '../interfaces/IMatch';

export default class MatchesService {
  constructor(readonly matchesModel = MatchesModel) {}

  async getMatches(inProgress: string | undefined): Promise<IMatchWithId[]> {
    // pega todas as partidas do banco, incluindo as colunas 'teamHome' e 'teamAway';
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

    // filtra todas as partidas e retorna de acordo com o progresso;
    if (inProgress === 'true') {
      return matches.filter((match) => match.inProgress);
    } if (inProgress === 'false') {
      return matches.filter((match) => !match.inProgress);
    }

    return matches;
  }

  async saveMatch({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals }: IMatch) {
    // post /matches
    // os times precisam existir:
    const matches = await this.getMatches(undefined);
    // retorna as partidas com cada um dos times
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

  async finishMatch(id: number) {
    // patch /:id/finish
    // a partida precisa existir
    const matches = await this.getMatches(undefined);
    const currentMatch = matches.filter((mt) => mt.id === id);
    // retorna um array vazio se nao existir partida com aquele id
    if (currentMatch.length === 0) {
      return null;
    }

    await this.matchesModel.update({ inProgress: false }, { where: { id } });
    return 'Finished!';
  }

  async updateResult(id: number, homeTeamGoals: number, awayTeamGoals: number) {
    // patch /:id
    const matches = await this.getMatches(undefined);
    const currentMatch = matches.filter((mt) => mt.id === id);
    // retorna um array vazio se nao existir partida com aquele id
    if (currentMatch.length === 0) {
      return null;
    }

    await this.matchesModel.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    return 'Updated!';
  }
}
