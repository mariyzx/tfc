import { IUser } from "../ILogin";

export interface ILoginRepository {
  getUser(email: string): Promise<IUser | null>
}