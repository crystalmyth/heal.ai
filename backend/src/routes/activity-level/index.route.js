import express from 'express'
import activityLevelController from '../../controllers/activity-level.controller.js'
import authCheck from '../../middlewares/auth-check.middleware.js'
import { body } from 'express-validator'

const activity_level_router = express.Router()

const validations = [
    body('levelName').notEmpty().withMessage('Activity level is required'),
]

activity_level_router.get('/activity-level', authCheck, activityLevelController.list);
activity_level_router.post('/activity-level', authCheck, validations, activityLevelController.create);
activity_level_router.put('/activity-level/:id', authCheck, validations, activityLevelController.update);
activity_level_router.delete('/activity-level/:id', authCheck, activityLevelController.destroy);

export default activity_level_router