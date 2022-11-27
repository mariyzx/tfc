import * as bcrypt from 'bcryptjs';
import { jwtGen, verify } from '../helpers/utils/jwt';
import UserModel from '../database/models/User';
import { ICredentials, IRole, IVerify } from '../interfaces/ILogin';

export default class LoginService {
  constructor(
    readonly userModel = UserModel,
  ) {}

  async login(cred: ICredentials) {
    if (!cred.email || !cred.password) {
      return { status: 400, data: { message: 'All fields must be filled' } };
    }
    // o usuário precisa existir;
    const user = await this.userModel.findOne({ where: { email: cred.email } });
    // se nao existir retorna erro;
    if (!user) return { status: 401, data: { message: 'Incorrect email or password' } };
    // se existir precisa comparar as senhas;
    const pass = await bcrypt.compareSync(cred.password, user.password);
    // se a senha for diferente retorna erro;
    if (!pass) return { status: 401, data: { message: 'Incorrect email or password' } };
    // se a senha for igual precisa retornar o token:
    const { id, email, role, username } = user;
    const token = jwtGen({ id, email, role, username });

    return { status: 200, data: { user: { id, email, role, username }, token } };
  }

  validate = async (token: string): Promise<IRole | undefined> => {
    try {
      // precisa ser tipo IVerify para retornar o email;
      const { email } = (<IVerify>verify(token));
      const user = await UserModel.findOne({ where: { email } });

      if (!user) return undefined;

      const { role } = user;
      return { role };
    } catch (err) {
      return undefined;
    }
  };
}
