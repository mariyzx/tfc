import { IMatch } from "../IMatch";

export interface IMatchRepository {
  getMatches(): Promise<IMatch[]>
  saveMatch(match: IMatch): Promise<IMatch>
  update(data: object, id: number): Promise<void>
}