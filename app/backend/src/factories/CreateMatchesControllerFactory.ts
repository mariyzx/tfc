import { MatchRepository } from "../repositories/Match.repository";
import MatchesService from "../services/Match.service";
import MatchesController from "../controllers/Match.controller";


export class CreateMatchesControllerFactory {
  // monta a instância do controller
  static make() {
    const repository = new MatchRepository;
    const service = new MatchesService(repository);
    const matchController = new MatchesController(service);

    return matchController;
  }
}