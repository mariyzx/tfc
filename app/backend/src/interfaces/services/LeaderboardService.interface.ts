import { ILeaderboard } from "../ILeaderboard";

export interface ILeaderboardService {
  getStatistics(type: string): Promise<ILeaderboard[]>
  getAll(): Promise<ILeaderboard[]>
}