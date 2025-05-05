import express from 'express'
import userController from '../../controllers/user.controller.js'
import authCheck from '../../middlewares/auth-check.middleware.js';
import { body } from 'express-validator';
const user_profile_router = express.Router()

user_profile_router.get('/profile', authCheck, userController.profile);

const validations = [
    body('name').notEmpty().withMessage('Name is required'),
    body('age').notEmpty().withMessage('Age is required').isNumeric().withMessage('Age Should be a number'),
    body('gender').notEmpty().withMessage('Gender is required'),
    body('height_cm').notEmpty().withMessage('Height is required'),
    body('weight_kg').notEmpty().withMessage('Weight is required'),
]
user_profile_router.put('/profile', authCheck, validations, userController.update);

export default user_profile_router