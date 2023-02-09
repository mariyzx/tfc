import { MatchRepository } from "../repositories/Match.repository";
import LeaderboardService from "../services/Leaderboard.service";
import { TeamRepository } from "../repositories/Team.repository";
import LeaderboardController from "../controllers/Leaderboard.controller";

export class CreateLeaderboardControllerFactory {
  // monta a instância do controller
  static make() {
    const matchRepository = new MatchRepository
    const teamRepository = new TeamRepository
    const service = new LeaderboardService(teamRepository, matchRepository);
    const loginController = new LeaderboardController(service);

    return loginController
  }
}