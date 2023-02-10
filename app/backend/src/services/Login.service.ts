import { jwtGen, verify } from '../helpers/utils/jwt';
import { ICredentials, ILoginResponse, IRole, IVerify } from '../interfaces/ILogin';
import passValidate from '../helpers/validations/passValidate';
import { ILoginRepository } from '../interfaces/repositories/ILoginRepository';
import { IError } from '../interfaces/IError';

export default class LoginService {
  // Injeção de dependência, não depende da implementação, apenas da abstração.
  constructor(
    readonly loginRepository: ILoginRepository,
  ) {}

  async login(cred: ICredentials): Promise<ILoginResponse | IError> {
    const user = await this.loginRepository.getUser(cred.email);

    if (!user || !passValidate(cred.password, user.password)) {
      return { status: 401, data: { message: 'Incorrect email or password' } }
    };
    
    const { id, email, role, username } = user;
    const token = jwtGen({ id, email, role, username }); // gera o token com as informações o usuário

    return { status: 200, data: { id, email, role, username, token } };
  }

  async validate(token: string): Promise<ILoginResponse | IError> {
    try {
      const { role } = (<IVerify>verify(token));

      return { status: 200, data: { message: role } };
    } catch (err) {
      
      return { status: 401, data: { message: 'Invalid token!' } };
    }
  };
}
