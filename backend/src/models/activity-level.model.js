import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';

class ActivityLevel extends Model {
  static initModel(sequelize) {
    ActivityLevel.init({
      id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      levelName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    }, {
      sequelize,
      modelName: 'ActivityLevel',
      tableName: 'activity_levels',
      timestamps: false,
    });
    return ActivityLevel;
  }
}
ActivityLevel.initModel(sequelize);
export default ActivityLevel;