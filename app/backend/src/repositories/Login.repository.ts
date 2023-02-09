import UserModel from "../database/models/User";
import { IUser } from "../interfaces/ILogin";
import { ILoginRepository } from "../interfaces/repositories/ILoginRepository";

export class LoginRepository implements ILoginRepository {
  async getUser(email: string): Promise<IUser | null> {
    return (await UserModel.findOne({
      where: { email }
    }))
  }
}