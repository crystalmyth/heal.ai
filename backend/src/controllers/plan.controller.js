import { validationResult } from "express-validator";
import User from "../models/user.model.js";
import PrimaryGoal from "../models/primary-goal.model.js";
import { generateWorkoutPlan } from "../services/workout-plan.service.js";
import { generateMotivationalAdvice } from "../services/motivational-advice.service.js";
import { generateDietPlan } from "../services/diet-plan.service.js";
import { calculateBMI } from "../utils/helpers.js";
import ActivityLevel from "../models/activity-level.model.js";
import DietaryPreference from "../models/dietary-preference.model.js";
import { v4 as uuidv4 } from 'uuid';
import { Sequelize } from "sequelize";
import { GENDER } from "../config/constants.js";


const workoutPlan = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { height_cm, weight_kg, age, goal } = req.body;
  
  let primaryGoal = null
  if(goal) {
    const exisitingPrimaryGoal = await PrimaryGoal.findOne({
      where: {
        [Sequelize.Op.or]: [
          { id: goal },
          Sequelize.where(
            Sequelize.fn('LOWER', Sequelize.col('goalName')),
            goal.toLowerCase()
          ),
        ]
       }
    })
    if (!exisitingPrimaryGoal) {
      const newPrimaryGoal = await PrimaryGoal.create({
        id: uuidv4(),
        goalName: goal
      })
      primaryGoal = newPrimaryGoal
    } else {
      primaryGoal = exisitingPrimaryGoal
    }
  }
  

  const user = await User.findOne({id: req.user.id});

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const workoutInputData = {
    user_name: user.name,
    height_cm,
    weight_kg,
    age,
    goal: primaryGoal.goalName,
  };

  const { workout_plan } = await generateWorkoutPlan(workoutInputData);

  if (!workout_plan) {
    return res.status(400).json({ error: 'Failed to generate workout plan' });
  }

  user.weight_kg = weight_kg;
  user.height_cm = height_cm;
  const { bmi_category } = calculateBMI(height_cm, weight_kg);
  user.bmi_category = bmi_category;
  user.primaryGoalId = primaryGoal.id;

  await user.save();

  res.json(workout_plan);


}

const dietPlan = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { activityLevel, dietaryPreference, dietaryRestriction, height_cm, weight_kg, age } = req.body;


  const user = await User.findOne({id: req.user.id});
  
  let activity_level = null;
  if (activityLevel) {
    const exisitingActivityLevel = await ActivityLevel.findOne({
      where: { 
        [Sequelize.Op.or]: [
          { id: activityLevel },
          Sequelize.where(
            Sequelize.fn('LOWER', Sequelize.col('levelName')),
            activityLevel.toLowerCase()
          )
        ]
       }
    })

    if (!exisitingActivityLevel) {
      const newActivityLevel = await ActivityLevel.create({
        id: uuidv4(),
        levelName: activityLevel
      })
      activity_level = newActivityLevel
    } else {
      activity_level = exisitingActivityLevel
    }
  }

  let dietary_preference = null
  if (dietaryPreference) {
    const exisitingDietaryPreference = await DietaryPreference.findOne({
      where: { 
        [Sequelize.Op.or]: [
          { id: dietaryPreference },
          Sequelize.where(
            Sequelize.fn('LOWER', Sequelize.col('preferenceName')),
            dietaryPreference.toLowerCase()
          )
        ]
       }
    })

    if (!exisitingDietaryPreference) {
      const newDietaryPreference = await DietaryPreference.create({
        id: uuidv4(),
        preferenceName: dietaryPreference
      })
      dietary_preference = newDietaryPreference
    } else {
      dietary_preference = exisitingDietaryPreference
    }
  }
  const { diet_plan } = await generateDietPlan({
    name: user.name,
    height_cm: height_cm,
    weight_kg: weight_kg,
    age: age,
    gender: Object.entries(GENDER).find(([key, value]) => value === user.gender || 0)[0],
    dietary_restrictions: dietaryRestriction,
    activity_level: activity_level.levelName,
    dietary_preference: dietary_preference.preferenceName
  });

  user.height_cm = height_cm;
  user.weight_kg = weight_kg;
  user.age = age;
  user.activityLevelId = activity_level.id;
  user.dietaryPreferenceId = dietary_preference.id;
  await user.save();

  if (!diet_plan) {
    return res.status(400).json({ error: 'Failed to generate diet plan' });
  }
  res.json(diet_plan);
}

const motivationAdvise = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { activityLevel, primaryGoal, currentChallenges } = req.body;
  
  let activity_level = null;
  if (activityLevel) {
    const exisitingActivityLevel = await ActivityLevel.findOne({
      where: { 
        [Sequelize.Op.or]: [
          { id: activityLevel },
          Sequelize.where(
            Sequelize.fn('LOWER', Sequelize.col('levelName')),
            activityLevel.toLowerCase()
          )
        ]
       }
    })

    if (!exisitingActivityLevel) {
      const newActivityLevel = await ActivityLevel.create({
        id: uuidv4(),
        levelName: activityLevel
      })
      activity_level = newActivityLevel
    } else {
      activity_level = exisitingActivityLevel
    }
  }

  let primary_goal = null;
  if (primaryGoal) {
    const exisitingPrimaryGoal = await PrimaryGoal.findOne({
      where: { 
        [Sequelize.Op.or]: [
          { id: primaryGoal },
          Sequelize.where(
            Sequelize.fn('LOWER', Sequelize.col('goalName')),
            primaryGoal.toLowerCase()
          )
        ]
       }
    })

    if (!exisitingPrimaryGoal) {
      const newPrimaryGoal = await PrimaryGoal.create({
        id: uuidv4(),
        goalName: primaryGoal
      })
      primary_goal = newPrimaryGoal
    } else {
      primary_goal = exisitingPrimaryGoal
    }
  }


  const user = await User.findByPk(req.user.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  const { motivational_advice } = await generateMotivationalAdvice({ 
    height_cm: user.height_cm, 
    weight_kg: user.weight_kg, 
    age: user.age, 
    name: user.name, 
    gender: Object.entries(GENDER).find(([key, value]) => value === user.gender || 0)[0],
    activity_level: activity_level.levelName, 
    wellness_goal: primary_goal.goalName, 
    current_challenges: currentChallenges
  });
  
  if (!motivational_advice) {
    return res.status(400).json({ error: 'Failed to generate motivational advice' });
  }
  res.json(motivational_advice);
}
export default {
  workoutPlan,
  dietPlan,
  motivationAdvise
}