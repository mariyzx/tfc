import TeamModel from '../database/models/Team';
import MatchesModel from '../database/models/Matches';

export default class MatchesService {
  constructor(readonly matchesModel = MatchesModel) {}

  async getMatches(inProgress: string | undefined) {
    const matches = await this.matchesModel.findAll({
      include: [{
        model: TeamModel,
        as: 'teamHome',
        attributes: { exclude: ['id'] },
      },
      { model: TeamModel,
        as: 'teamAway',
        attributes: { exclude: ['id'] } },
      ],
    });

    if (inProgress === 'true') {
      return matches.filter((match) => match.inProgress);
    } if (inProgress === 'false') {
      return matches.filter((match) => !match.inProgress);
    }

    return matches;
  }
}
