import { IError } from "../IError";
import { ICredentials, ILoginResponse } from "../ILogin";

export interface ILoginService {
  login(credentials: ICredentials): Promise<ILoginResponse | IError>

  validate(token: string): Promise<ILoginResponse | IError>
}