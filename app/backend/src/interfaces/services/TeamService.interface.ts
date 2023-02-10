import { ICredentials, ILoginResponse } from "../ILogin";
import { IMatch } from "../IMatch";
import { ITeamResponse } from "../ITeam";

export interface ITeamService {
  getAllTeams(): Promise<ITeamResponse>

  getTeamsById(id: number): Promise<ITeamResponse>
}