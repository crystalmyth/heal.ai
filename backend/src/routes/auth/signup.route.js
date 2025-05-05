import express from 'express'
import authController from '../../controllers/auth.controller.js'
import { body } from 'express-validator';

const signup_router = express.Router()

const validations = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email'),
    body('password').notEmpty().withMessage('Password is required'),
]

signup_router.post('/signup', validations, authController.signup)

export default signup_router