import express from 'express'
import userController from '../../controllers/user.controller.js'
import authCheck from '../../middlewares/auth-check.middleware.js';

import user_profile_router from './profile.route.js'

const user_router = express.Router()

user_router.get('/user', authCheck, userController.show);
user_router.use('/user', user_profile_router)

export default user_router