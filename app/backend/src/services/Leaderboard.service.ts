import { orderClass, returnAllStatistics, returnStatistics } from '../helpers/utils/leaderboard';
import ITeam from '../interfaces/ITeam';
import { IMatch } from '../interfaces/IMatch';
import { MatchRepository } from '../repositories/Match.repository';
import { TeamRepository } from '../repositories/Team.repository';
import { ILeaderboard } from '../interfaces/ILeaderboard';

export default class LeaderboardService {
  constructor(
    readonly teamModel: TeamRepository,
    readonly matchesModel: MatchRepository,
  ) {}

  async getMatches(team: ITeam, type: string) {
    // essa função auxilia no retorno das partidas de determinado time de acordo
    // com o seu tipo
    let teamsMatches;
    const allMatches = await this.matchesModel.getMatchesFinished();

    if (type === 'home') {
      teamsMatches = allMatches.filter((mt) => mt.homeTeam === team.id);
    } if (type === 'away') {
      teamsMatches = allMatches.filter((mt) => mt.awayTeam === team.id);
    }

    return teamsMatches;
  }

  async getStatistics(type: string): Promise<ILeaderboard[]> {
    const allTeams = await this.teamModel.findAll();
    // compara os ids dos times da casa com todos os ids    
    const allMatches = allTeams.map(async (team) => {
      // pega as partidas desse determinado time
      const matches = await this.getMatches(team, type);
      // calcula suas estatísticas
      const statistics = await matches!.map((mt) => returnStatistics(team.teamName, [mt], type));
      // até aqui, o array statistics tem as informações do time 2x, por isso, pego apenas uma informação:
      const retStat = statistics[statistics.length - 1];

      return { ...retStat };
    });

    const data = await Promise.all(allMatches);
    // aqui está retornando os dados corretos mas em ordem contrária :/
    const orderedData = orderClass(data);
    // revertendo a ordem;
    return orderedData.reverse();
  }

  async getAll(): Promise<ILeaderboard[]> {
    const data = [] as ILeaderboard[];
    const leaderboard1 = await this.getStatistics('home');
    const leaderboard2 = await this.getStatistics('away');
    const fullData = [...leaderboard1, ...leaderboard2];

    leaderboard1.forEach((tm) => {
      // compara o id de todos placares com o placar 1
      const ret = fullData.filter(({ name }) => tm.name === name);
      data.push(returnAllStatistics(ret));
    });

    const orderedData = orderClass(data);

    return orderedData.reverse();
  }
}