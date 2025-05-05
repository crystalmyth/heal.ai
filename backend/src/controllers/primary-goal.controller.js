import { validationResult } from 'express-validator';
import PrimaryGoal from '../models/primary-goal.model.js';
import { Op, Sequelize } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

const list = async (req, res) => {
    try {
        const primaryGoals = await PrimaryGoal.findAll();
        return res.status(200).json(primaryGoals);
    } catch (err) {
        console.warn(`error in fetching all primary goals: ${err}`);
        return res.status(500).json({ error: 'Failed to fetch primary goals' });
    }
}

const create = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const exisitingPrimaryGoal = await PrimaryGoal.findOne({
            where: Sequelize.where(
                Sequelize.fn('LOWER', Sequelize.col('goalName')),
                req.body.goalName.toLowerCase()
            )
        });
        if (exisitingPrimaryGoal) {
            return res.status(400).json({ error: 'Primary goal already exists' });
        }

        await PrimaryGoal.create({
            id: uuidv4(),
            goalName: req.body.goalName
        });

        const primaryGoals = await PrimaryGoal.findAll();
        return res.status(200).json(primaryGoals);

    } catch (err) {
        console.warn(`error in creating new primary goal: ${err}`);
        return res.status(500).json({ error: 'Failed to create primary goal' });
    }
}

const update = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const exisitingPrimaryGoal = await PrimaryGoal.findOne({ 
            where: {
                [Sequelize.Op.and]: [
                    Sequelize.where(
                        Sequelize.fn('LOWER', Sequelize.col('goalName')),
                        req.body.goalName.toLowerCase()
                    ),
                    {
                        id: {
                            [Sequelize.Op.ne]: req.params.id,
                        },
                    },
                ],
            }
        });
        if (exisitingPrimaryGoal) {
            return res.status(400).json({ error: 'Primary goal already exists' });
        }

        await PrimaryGoal.update({ goalName: req.body.goalName }, { where: { id: req.params.id } });

        const primaryGoals = await PrimaryGoal.findAll();
        return res.status(200).json(primaryGoals);

    } catch (err) {
        console.warn(`error in updating primary goal: ${err}`);
        return res.status(500).json({ error: 'Failed to update primary goal' });
    }
}

const destroy = async (req, res) => {
    try {
        const deletedPrimaryGoal = await PrimaryGoal.destroy({ where: { id: req.params.id } });

        if (!deletedPrimaryGoal) {
            return res.status(404).json({ error: 'Primary goal not found' });
        }

        const primaryGoals = await PrimaryGoal.findAll();
        return res.status(200).json(primaryGoals);

    } catch (err) {
        console.warn(`error in deleting primary goal: ${err}`);
        return res.status(500).json({ error: 'Failed to delete primary goal' });
    }
}



export default {
    list,
    create,
    update,
    destroy
}