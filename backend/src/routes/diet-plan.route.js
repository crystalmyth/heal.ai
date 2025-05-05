import express from 'express'
import PlanController from '../controllers/plan.controller.js'
import { body } from 'express-validator';
import authCheck from '../middlewares/auth-check.middleware.js';

const diet_plan_router = express.Router()

const validations = [
    body('height_cm').notEmpty().withMessage('Height is required'),
    body('weight_kg').notEmpty().withMessage('Weight is required'),
    body('age').notEmpty().withMessage('Age is required').isNumeric().withMessage('Age must be a number'),
    body('activityLevel').notEmpty().withMessage('Activity level is required'),
    body('dietaryPreference').notEmpty().withMessage('Dietary Preference is required'),
]

diet_plan_router.post('/diet-plan', authCheck, validations, PlanController.dietPlan)

export default diet_plan_router