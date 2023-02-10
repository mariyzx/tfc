import { orderClass, returnAllStatistics, returnStatistics } from '../helpers/utils/leaderboard';
import ITeam from '../interfaces/ITeam';
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

    const allMatches = allTeams.map(async (team) => {

      const matches = await this.getMatches(team, type);

      const statistics = await matches!.map((mt) => returnStatistics(
        team.teamName, [mt], type)
      );
      // até aqui, o array statistics tem as informações do time 2x, por isso, pego apenas uma informação:
      const retStat = statistics[statistics.length - 1];

      return { ...retStat };
    });

    const data = await Promise.all(allMatches);

    const orderedData = orderClass(data);
    // ordenando
    return orderedData.reverse();
  }

  async getAll(): Promise<ILeaderboard[]> {
    const data = [] as ILeaderboard[];
    const leaderboard1 = await this.getStatistics('home');
    const leaderboard2 = await this.getStatistics('away');
    const fullData = [...leaderboard1, ...leaderboard2];
    // [...vasco, ....vasco, ...]

    leaderboard1.forEach((tm) => {

      const ret = fullData.filter(({ name }) => tm.name === name);
      // soma as informações dos 2 placares do time
      data.push(returnAllStatistics(ret));
    });

    const orderedData = orderClass(data);
    // ordenando:
    return orderedData.reverse();
  }
}