import { DataTypes, Model } from 'sequelize';
import db from '.';

export default class TeamModel extends Model {
  declare id: number;
  declare teamName: string;
}

TeamModel.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  underscored: true,
  modelName: 'teams',
  timestamps: false,
});
