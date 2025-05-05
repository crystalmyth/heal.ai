import ActivityLevel from "../models/activity-level.model.js"
import DietaryPreference from "../models/dietary-preference.model.js"
import PrimaryGoal from "../models/primary-goal.model.js"
import User from "../models/user.model.js"
import { v4 as uuidv4 } from 'uuid';

export const fetchUserwithAssociatedData = async (req) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.user.id
            },
            attributes: ['name', 'email', 'age', 'gender', 'height_cm', 'weight_kg'],
            include: [
                {
                    model: ActivityLevel,
                    as: 'activityLevel',
                    attributes: ['id', 'levelName']
                },
                {
                    model: DietaryPreference,
                    as: 'dietaryPreference',
                    attributes: ['id', 'preferenceName']
                },
                {
                    model: PrimaryGoal,
                    as: 'primaryGoal',
                    attributes: ['id', 'goalName']
                },
            ]
        });

        const userData = user.toJSON();
        const activityLevels = await ActivityLevel.findAll();
        const dietaryPreferences = await DietaryPreference.findAll();
        const primaryGoals = await PrimaryGoal.findAll();

        userData.activityLevels = activityLevels;
        userData.dietaryPreferences = dietaryPreferences;
        userData.primaryGoals = primaryGoals;
        
        return userData
    } catch (err) {
        console.warn(`error in profileService: ${err}`);
        return null
    }
}

export const fetchUser = async (req) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.user.id
            },
            attributes: ['name', 'email', 'age', 'gender', 'height_cm', 'weight_kg', 'activityLevelId', 'dietaryPreferenceId', 'primaryGoalId']
        })

        return user
    } catch (err) {
        console.warn(`error in showService: ${err}`)
        return null        
    }
}


export const updateUser = async(req) => {
    let primaryGoal = null
    if(req.body.primaryGoal) {
        const exisitingPrimaryGoal = await PrimaryGoal.findOne({
            where: { id: req.body.primaryGoal }
        })
        if (!exisitingPrimaryGoal) {
            const newPrimaryGoal = await PrimaryGoal.create({
                id: uuidv4(),
                goalName: req.body.primaryGoal
            })
            primaryGoal = newPrimaryGoal.id
        } else {
            primaryGoal = req.body.primaryGoal
        }
    }

    let activityLevel = null
    if(req.body.activityLevel) {
        const exisitingActivityLevel = await ActivityLevel.findOne({
            where: { id: req.body.activityLevel }
        })
        if (!exisitingActivityLevel) {
            const newActivityLevel = await ActivityLevel.create({
                id: uuidv4(),
                levelName: req.body.activityLevel
            })
            activityLevel = newActivityLevel.id
        } else {
            activityLevel = req.body.activityLevel
        }
    }

    let dietaryPreference = null
    if(req.body.dietaryPreference) {
        const exisitingDietaryPreference = await DietaryPreference.findOne({
            where: { id: req.body.dietaryPreference }
        })
        if (!exisitingDietaryPreference) {
            const newDietaryPreference = await DietaryPreference.create({
                id: uuidv4(),
                preferenceName: req.body.dietaryPreference
            })
            dietaryPreference = newDietaryPreference.id
        } else {
            dietaryPreference = req.body.dietaryPreference
        }
    }
    try {
        await User.update({
            name: req.body.name,
            age: req.body.age,
            gender: req.body.gender,
            height_cm: req.body.height_cm,
            weight_kg: req.body.weight_kg,
            primaryGoalId: primaryGoal,
            activityLevelId: activityLevel,
            dietaryPreferenceId: dietaryPreference
        }, {
            where: {
                id: req.user.id
            }
        })

        const userData = await fetchUserwithAssociatedData(req);

        return userData

    } catch (err) {
        console.warn(`error in updateService: ${err}`)
        return null        
    }
}