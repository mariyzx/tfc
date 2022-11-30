import { returnStatisticsHome, orderClass } from '../helpers/utils/leaderboard';
import MatchesModel from '../database/models/Matches';
import TeamModel from '../database/models/Team';

export default class LeaderboardService {
  constructor(
    readonly teamModel = TeamModel,
    readonly matchesModel = MatchesModel,
  ) {}

  async getHome() {
    const teams = await this.teamModel.findAll();
    // acha só o times de casa
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
    const orderesData = orderClass(data);
    // revertendo a ordem;
    return orderesData.reverse();
  }
}
