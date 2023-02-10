import { MatchRepository } from "../repositories/Match.repository";
import MatchesService from "../services/Match.service";
import MatchesController from "../controllers/Match.controller";
import { TeamRepository } from "../repositories/Team.repository";


export class CreateMatchesControllerFactory {
  // monta a instância do controller
  static make() {
    const matchRepository = new MatchRepository;
    const teamRepository = new TeamRepository
    const service = new MatchesService(matchRepository, teamRepository);
    const matchController = new MatchesController(service);

    return matchController;
  }
}