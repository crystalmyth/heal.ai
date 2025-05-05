import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';

class DietaryPreference extends Model {
  static initModel(sequelize) {
    DietaryPreference.init({
      id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      preferenceName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    }, {
      sequelize,
      modelName: 'DietaryPreference',
      tableName: 'dietary_preferences',
      timestamps: false,
    });
    return DietaryPreference;
  }
}
DietaryPreference.initModel(sequelize);
export default DietaryPreference;