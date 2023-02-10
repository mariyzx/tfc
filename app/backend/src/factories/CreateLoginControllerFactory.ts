import LoginController from "../controllers/Login.controller";
import { LoginRepository } from "../repositories/Login.repository";
import LoginService from "../services/Login.service";

export class CreateLoginControllerFactory {
  // monta a instância do controller
  static make() {
    const repository = new LoginRepository;
    const service = new LoginService(repository);
    const loginController = new LoginController(service);

    return loginController;
  }
}