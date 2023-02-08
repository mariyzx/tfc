import { DataTypes, Model } from 'sequelize';
import db from '.';
import TeamModel from './Team';

// A camada de model representa a tabela no banco de dados, é responsável pelo acesso e
// modelagem dos dados. Informa ao Sequelize várias coisas sobre a entidade, como o nome da tabela,
// quais colunas ela possui (e seus tipos), e suas relações;

export default class MatchesModel extends Model {
  declare id: number;
  declare homeTeam: number;
  declare homeTeamGoals: number;
  declare awayTeam: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

MatchesModel.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  homeTeam: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeam: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  } }, {
  sequelize: db,
  underscored: true,
  modelName: 'matches',
  timestamps: false,
});

MatchesModel.belongsTo(TeamModel, { foreignKey: 'homeTeam', as: 'teamHome' });
MatchesModel.belongsTo(TeamModel, { foreignKey: 'awayTeam', as: 'teamAway' });

TeamModel.hasMany(MatchesModel, { foreignKey: 'homeTeam', as: 'homeMatches' });
TeamModel.hasMany(MatchesModel, { foreignKey: 'awayTeam', as: 'awayMatches' });
