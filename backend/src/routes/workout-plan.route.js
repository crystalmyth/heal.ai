import express from 'express'
import PlanController from '../controllers/plan.controller.js'
import { body } from 'express-validator';
import authCheck from '../middlewares/auth-check.middleware.js';

const workout_plan_router = express.Router()

const validations = [
    body('height_cm').notEmpty().withMessage('Height is required'),
    body('weight_kg').notEmpty().withMessage('Weight is required'),
    body('age').notEmpty().withMessage('Age is required').isNumeric().withMessage('Age must be a number'),
    body('goal').notEmpty().withMessage('Goal is required'),
]

workout_plan_router.post('/workout-plan', authCheck, validations, PlanController.workoutPlan)

export default workout_plan_router