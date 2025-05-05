import express from 'express'
import login_router from './login.route.js'
import signup_router from './signup.route.js'

const auth_router = express.Router()

auth_router.use('/auth', login_router)
auth_router.use('/auth', signup_router)

export default auth_router