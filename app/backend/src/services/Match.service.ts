import { IMatch, IMatchResponse } from '../interfaces/IMatch';
import { MatchRepository } from '../repositories/Match.repository';

export default class MatchesService {
  constructor(readonly matchesModel: MatchRepository) {}

  async getMatches(inProgress?: string): Promise<IMatchResponse> {
    // pega todas as partidas do banco, incluindo as colunas 'teamHome' e 'teamAway';
    const matches = await this.matchesModel.getMatches();

    if (inProgress === 'true') {
      const matchesProgress = await this.matchesModel.getMatchesInProgress();
      return { status: 200, data: matchesProgress }
    } if (inProgress === 'false') {
      const matchesProgress = await this.matchesModel.getMatchesFinished();
      return { status: 200, data: matchesProgress }
    }

    return { status: 200, data: matches };
  }

  async saveMatch({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals }: IMatch): Promise<IMatchResponse> {
    const matches = await this.matchesModel.getMatches();
    // retorna as partidas com cada um dos times
    const team1 = matches.find((mt) => mt.id === homeTeam);
    const team2 = matches.find((mt) => mt.id === awayTeam);
    // se não existirem retornam erro;
    if (!team1 || !team2) return { status: 404, data: { message: 'There is no team with such id!'} };
    // se os times forem iguais retornam undefined;
    if (homeTeam === awayTeam) {
      // 422 - erro semântico
      return { status: 422, data: {
        message: 'It is not possible to create a match with two equal teams' } };
    }
    // se existirem a partida é criada
    const createdMatch = await this.matchesModel.saveMatch(
      { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals })
      
    return { status: 201, data: createdMatch };
  }

  async finishMatch(id: number): Promise<IMatchResponse> {
    const matches = await this.matchesModel.getMatches();
    const currentMatch = matches.filter((mt) => mt.id === id);
    // retorna um array vazio se nao existir partida com aquele id
    if (currentMatch.length === 0) {
      return { status: 404, data: { message: 'Match not found!' }};
    }

    await this.matchesModel.update({ inProgress: false }, id);

    return { status: 201, data: { message: 'Finished!' }};
  }

  async updateResult(data: object, id: number): Promise<IMatchResponse>  {
    const matches = await this.matchesModel.getMatches();
    const currentMatch = matches.filter((mt) => mt.id === id);
    // retorna um array vazio se nao existir partida com aquele id
    if (currentMatch.length === 0) {
      return { status: 404, data: { message: 'Match not found!' }};
    }

    await this.matchesModel.update(data, id);
    
    return { status: 201, data: { message: 'Updated!' }};
  }
}
