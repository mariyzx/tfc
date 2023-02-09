import { jwtGen, verify } from '../helpers/utils/jwt';
import UserModel from '../database/models/User';
import { ICredentials, IRole, IVerify } from '../interfaces/ILogin';
import passValidate from '../helpers/validations/passValidate';
import { ILoginRepository } from '../interfaces/repositories/ILoginRepository';

export default class LoginService {
  // Injeção de dependência, não depende da implementação, apenas da abstração.
  constructor(
    readonly loginRepository: ILoginRepository,
  ) {}

  // realiza o login do usuário caso as credenciais estejam corretas;
  async login(cred: ICredentials) {
    // o usuário precisa existir;
    const user = await this.loginRepository.getUser(cred.email);

    if (!user || !passValidate(cred.password, user.password)) {
      return { status: 401, data: { message: 'Incorrect email or password' } }
    };
    
    // se a senha for igual precisa retornar o token:
    const { id, email, role, username } = user;
    const token = jwtGen({ id, email, role, username }); // gera o token com as informações o usuário

    return { status: 200, data: { user: { id, email, role, username }, token } };
  }

  // valida o token de determinado usuário;
  validate = async (token: string) => {
    try {
      // precisa ser tipo IVerify para retornar o email;
      // se falhar vai pro catch
      const { email } = (<IVerify>verify(token));
      const user = await this.loginRepository.getUser(email);

      if (!user) return { status: 404, data: { message: 'User not found!' } };

      const { role } = user;
      return { status: 200, data: { message: role } };
    } catch (err) {
      // só entra no catch quando falha na linha 33
      return { status: 401, data: { message: 'Invalid token!' } };
    }
  };
}
