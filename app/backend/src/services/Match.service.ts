import { TeamRepository } from '../repositories/Team.repository';
import { IMatch, IMatchResponse } from '../interfaces/IMatch';
import { MatchRepository } from '../repositories/Match.repository';

export default class MatchesService {
  constructor(
    readonly matchesModel: MatchRepository,
    readonly teamsModel: TeamRepository
    ) {}

  async getMatches(inProgress?: string): Promise<IMatchResponse> {
    const matches = await this.matchesModel.getMatches();

    if (inProgress === 'true') {
      const matchesProgress = await this.matchesModel.getMatchesInProgress();

      return { status: 200, data: matchesProgress };
    } if (inProgress === 'false') {
      const matchesProgress = await this.matchesModel.getMatchesFinished();

      return { status: 200, data: matchesProgress };
    }

    return { status: 200, data: matches };
  }

  async saveMatch({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals }: IMatch)
    : Promise<IMatchResponse> {
    const team1 = await this.teamsModel.findById(homeTeam);
    const team2 = await this.teamsModel.findById(awayTeam);

    if (!team1 || !team2) return { status: 404, data: { 
        message: 'There is no team with such id!'
      }
    };

    if (homeTeam === awayTeam) {
      // 422 - erro semântico
      return { status: 422, data: {
        message: 'It is not possible to create a match with two equal teams' }
      };
    }

    const createdMatch = await this.matchesModel.saveMatch(
      { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals })
      
    return { status: 201, data: createdMatch };
  }

  async finishMatch(id: number): Promise<IMatchResponse> {
    const matches = await this.matchesModel.getMatches();
    const currentMatch = matches.filter((mt) => mt.id === id);

    if (currentMatch.length === 0) {
      return { status: 404, data: { message: 'Match not found!' }};
    }

    await this.matchesModel.update({ inProgress: false }, id);

    return { status: 201, data: { message: 'Finished!' }};
  }

  async updateResult(data: object, id: number): Promise<IMatchResponse>  {
    const matches = await this.matchesModel.getMatches();
    const currentMatch = matches.filter((mt) => mt.id === id);

    if (currentMatch.length === 0) {
      return { status: 404, data: { message: 'Match not found!' }};
    }

    await this.matchesModel.update(data, id);
    
    return { status: 201, data: { message: 'Updated!' }};
  }
}
