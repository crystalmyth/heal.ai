import { validationResult } from 'express-validator';
import ActivityLevel from '../models/activity-level.model.js';
import { Op, Sequelize } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

const list = async (req, res) => {
    try {
        const activityLevels = await ActivityLevel.findAll();
        return res.status(200).json(activityLevels);
    } catch (err) {
        console.warn(`error in fetching all activity levels: ${err}`);
        return res.status(500).json({ error: 'Failed to fetch activity levels' });
    }
}

const create = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const exisitingActivityLevel = await ActivityLevel.findOne({
            where: Sequelize.where(
                Sequelize.fn('LOWER', Sequelize.col('levelName')),
                req.body.levelName.toLowerCase()
            )
        });
        if (exisitingActivityLevel) {
            return res.status(400).json({ error: 'Activity level already exists' });
        }

        await ActivityLevel.create({
            id: uuidv4(),
            levelName: req.body.levelName
        });

        const activityLevels = await ActivityLevel.findAll();
        return res.status(200).json(activityLevels);

    } catch (err) {
        console.warn(`error in creating new activity level: ${err}`);
        return res.status(500).json({ error: 'Failed to create activity level' });
    }
}

const update = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const exisitingActivityLevel = await ActivityLevel.findOne({
            where: {
                [Sequelize.Op.and]: [
                    Sequelize.where(
                        Sequelize.fn('LOWER', Sequelize.col('levelName')),
                        req.body.levelName.toLowerCase()
                    ),
                    {
                        id: {
                            [Sequelize.Op.ne]: req.params.id,
                        },
                    },
                ],
            }
        });
        if (exisitingActivityLevel) {
            return res.status(400).json({ error: 'Activity level already exists' });
        }

        await ActivityLevel.update({ levelName: req.body.levelName }, { where: { id: req.params.id } });

        const activityLevels = await ActivityLevel.findAll();
        return res.status(200).json(activityLevels);

    } catch (err) {
        console.warn(`error in updating activity level: ${err}`);
        return res.status(500).json({ error: 'Failed to update activity level' });
    }
}

const destroy = async (req, res) => {
    try {
        const deletedActivityLevel = await ActivityLevel.destroy({ where: { id: req.params.id } });

        if (!deletedActivityLevel) {
            return res.status(404).json({ error: 'Activity level not found' });
        }

        const activityLevels = await ActivityLevel.findAll();
        return res.status(200).json(activityLevels);

    } catch (err) {
        console.warn(`error in deleting activity level: ${err}`);
        return res.status(500).json({ error: 'Failed to delete activity level' });
    }
}



export default {
    list,
    create,
    update,
    destroy
}