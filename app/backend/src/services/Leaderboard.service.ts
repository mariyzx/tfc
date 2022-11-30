import { returnStatisticsHome,
  orderClass, returnStatisticsAway, returnAllStatistics } from '../helpers/utils/leaderboard';
import MatchesModel from '../database/models/Matches';
import TeamModel from '../database/models/Team';
import ILeaderboard from '../interfaces/ILeaderboard';

export default class LeaderboardService {
  constructor(
    readonly teamModel = TeamModel,
    readonly matchesModel = MatchesModel,
  ) {}

  async getHome() {
    const teams = await this.teamModel.findAll();
    // compara os ids dos times da casa com todos os ids
    const teamsHome = await teams.map(async (team) => {
      const teamsMatches = await this.matchesModel
        .findAll({ where: { homeTeam: team.id, inProgress: false } });
      // calcula suas estatísticas
      const statistics = await teamsMatches.map((mt) => returnStatisticsHome(team.teamName, [mt]));

      const retStat = statistics[statistics.length - 1];

      return { ...retStat };
    });

    const data = await Promise.all(teamsHome);
    // aqui está retornando os dados corretos mas em ordem contrária :/
    const orderedData = orderClass(data);
    // revertendo a ordem;
    return orderedData.reverse();
  }

  async getAway() {
    const teams = await this.teamModel.findAll();

    const teamAway = await teams.map(async (team) => {
      const teamsMatches = await this.matchesModel
        .findAll({ where: { awayTeam: team.id, inProgress: false } });

      const statistics = await teamsMatches.map((mt) => returnStatisticsAway(team.teamName, [mt]));

      const retStat = statistics[statistics.length - 1];

      return { ...retStat };
    });

    const data = await Promise.all(teamAway);

    const orderedData = orderClass(data);

    return orderedData.reverse();
  }

  async getAll() {
    const data = [] as ILeaderboard[];
    const leaderboard1 = await this.getHome();
    const leaderboard2 = await this.getAway();
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
