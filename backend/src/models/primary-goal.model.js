import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';

class PrimaryGoal extends Model {
  static initModel(sequelize) {
    PrimaryGoal.init({
      id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      goalName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    }, {
      sequelize,
      modelName: 'PrimaryGoal',
      tableName: 'primary_goals',
      timestamps: false,
    });
    return PrimaryGoal;
  }
}
PrimaryGoal.initModel(sequelize);
export default PrimaryGoal;