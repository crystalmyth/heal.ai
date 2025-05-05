import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';
import ActivityLevel from './activity-level.model.js';
import DietaryPreference from './dietary-preference.model.js';
import PrimaryGoal from './primary-goal.model.js';
import { GENDER, USER_ROLES } from '../config/constants.js';

class User extends Model {
  static initModel(sequelize) {
    User.init({
      id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isInt: true,
          min: 0,
        },
        defaultValue: 0
      },
      gender: {
        type: DataTypes.NUMBER,
        allowNull: true,
        validate: {
          isIn: [Object.values(GENDER)],
        },
      },
      height_cm: {
        type: DataTypes.FLOAT,
        allowNull: true,
        validate: {
          isFloat: true,
          min: 0,
        },
      },
      weight_kg: {
        type: DataTypes.FLOAT,
        allowNull: true,
        validate: {
          isFloat: true,
          min: 0,
        },
      },
      activityLevelId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: ActivityLevel,
          key: 'id',
        },
      },
      dietaryPreferenceId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: DietaryPreference,
          key: 'id',
        },
      },
      primaryGoalId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: PrimaryGoal,
          key: 'id',
        },
      },
      registrationDate: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
      },
      role: {
        type: DataTypes.NUMBER,
        allowNull: false,
        defaultValue: 0,
        isIn: {
          args: [Object.values(USER_ROLES)],
        }
      }
    }, {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      timestamps: true,
    });
    return User;
  }
}

User.initModel(sequelize);

User.belongsTo(ActivityLevel, { foreignKey: 'activityLevelId', as: 'activityLevel' });
User.belongsTo(DietaryPreference, { foreignKey: 'dietaryPreferenceId', as: 'dietaryPreference' });
User.belongsTo(PrimaryGoal, { foreignKey: 'primaryGoalId', as: 'primaryGoal' });

export default User;