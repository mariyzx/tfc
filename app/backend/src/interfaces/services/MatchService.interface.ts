import { IMatch, IMatchResponse } from "../IMatch"

export interface IMatchService {
  getMatches(inProgress?: string): Promise<IMatchResponse>
  saveMatch(match: IMatch): Promise<IMatchResponse>
  finishMatch(id: number): Promise<IMatchResponse>
  updateResult(data: object, id: number): Promise<IMatchResponse>
}