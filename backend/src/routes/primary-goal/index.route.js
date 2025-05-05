import express from 'express'
import primaryGoalController from '../../controllers/primary-goal.controller.js'
import authCheck from '../../middlewares/auth-check.middleware.js';
import { body } from 'express-validator';

const primary_goal_router = express.Router()

const validations = [
    body('goalName').notEmpty().withMessage('Goal Name is required'),
]

primary_goal_router.get('/primary-goal', authCheck, primaryGoalController.list);
primary_goal_router.post('/primary-goal', authCheck, validations, primaryGoalController.create);
primary_goal_router.put('/primary-goal/:id', authCheck, validations, primaryGoalController.update);
primary_goal_router.delete('/primary-goal/:id', authCheck, primaryGoalController.destroy);

export default primary_goal_router