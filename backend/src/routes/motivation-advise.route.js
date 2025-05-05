import express from 'express'
import PlanController from '../controllers/plan.controller.js'
import { body } from 'express-validator';
import authCheck from '../middlewares/auth-check.middleware.js';

const motivation_advise_router = express.Router()

const validations = [
    body('activityLevel').notEmpty().withMessage('Activity level is required'),
    body('primaryGoal').notEmpty().withMessage('Primary goal is required'),
    body('currentChallenges').notEmpty().withMessage('Current challenges is required'),
]

motivation_advise_router.post('/motivation-advise', authCheck, validations, PlanController.motivationAdvise)

export default motivation_advise_router