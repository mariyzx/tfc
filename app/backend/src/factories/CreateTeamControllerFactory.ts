import TeamController from "../controllers/Team.controller";
import { TeamRepository } from "../repositories/Team.repository";
import TeamService from "../services/Team.service";

export class CreateTeamControllerFactory {
  // monta a instância do controller
  static make() {
    const repository = new TeamRepository;
    const service = new TeamService(repository);
    const teamController = new TeamController(service);

    return teamController;
  }
}