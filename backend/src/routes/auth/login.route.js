import express from 'express'
import authController from '../../controllers/auth.controller.js'

const login_router = express.Router()

login_router.post('/login', authController.login)

export default login_router