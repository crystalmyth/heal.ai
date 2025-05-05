import { validationResult } from 'express-validator';
import DietaryPreference from '../models/dietary-preference.model.js';
import { Op, Sequelize } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

const list = async (req, res) => {
    try {
        const dietaryPreferences = await DietaryPreference.findAll();
        return res.status(200).json(dietaryPreferences);
    } catch (err) {
        console.warn(`error in fetching all dietary preferences: ${err}`);
        return res.status(500).json({ error: 'Failed to fetch dietary preferences' });
    }
}

const create = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const exisitingDietaryPreference = await DietaryPreference.findOne({
            where: Sequelize.where(
                Sequelize.fn('LOWER', Sequelize.col('preferenceName')),
                req.body.preferenceName.toLowerCase()
            )
        });
        if (exisitingDietaryPreference) {
            return res.status(400).json({ error: 'Dietary Preference already exists' });
        }

        await DietaryPreference.create({
            id: uuidv4(),
            preferenceName: req.body.preferenceName
        });

        const dietaryPreferences = await DietaryPreference.findAll();
        return res.status(200).json(dietaryPreferences);

    } catch (err) {
        console.warn(`error in creating new dietary preference: ${err}`);
        return res.status(500).json({ error: 'Failed to create dietary preference' });
    }
}

const update = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const exisitingDietaryPreference = await DietaryPreference.findOne({
            where: {
                [Sequelize.Op.and]: [
                    Sequelize.where(
                        Sequelize.fn('LOWER', Sequelize.col('preferenceName')),
                        req.body.preferenceName.toLowerCase()
                    ),
                    {
                        id: {
                            [Sequelize.Op.ne]: req.params.id,
                        },
                    },
                ],
            },
        });
        if (exisitingDietaryPreference) {
            return res.status(400).json({ error: 'Dietary Preference already exists' });
        }

        await DietaryPreference.update({ preferenceName: req.body.preferenceName }, { where: { id: req.params.id } });

        const dietaryPreferences = await DietaryPreference.findAll();
        return res.status(200).json(dietaryPreferences);

    } catch (err) {
        console.warn(`error in updating dietary preference: ${err}`);
        return res.status(500).json({ error: 'Failed to update dietary preference' });
    }
}

const destroy = async (req, res) => {
    try {
        const deletedDietaryPreference = await DietaryPreference.destroy({ where: { id: req.params.id } });

        if (!deletedDietaryPreference) {
            return res.status(404).json({ error: 'Dietary Preference not found' });
        }

        const dietaryPreferences = await DietaryPreference.findAll();
        return res.status(200).json(dietaryPreferences);

    } catch (err) {
        console.warn(`error in deleting dietary preference: ${err}`);
        return res.status(500).json({ error: 'Failed to delete dietary preference' });
    }
}



export default {
    list,
    create,
    update,
    destroy
}