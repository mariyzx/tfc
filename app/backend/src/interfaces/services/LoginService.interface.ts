import { ICredentials, ILoginResponse } from "../ILogin";

export interface ILoginService {
  login(credentials: ICredentials): Promise<ILoginResponse>

  validate(token: string): Promise<ILoginResponse>
}