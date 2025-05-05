import express from 'express'
import dietaryPreferenceController from '../../controllers/dietary-preference.controller.js'
import authCheck from '../../middlewares/auth-check.middleware.js';
import { body } from 'express-validator';

const dietary_preference_router = express.Router()

const validations = [
    body('preferenceName').notEmpty().withMessage('Preference Name is required'),
]

dietary_preference_router.get('/dietary-preference', authCheck, dietaryPreferenceController.list);
dietary_preference_router.post('/dietary-preference', authCheck, validations, dietaryPreferenceController.create);
dietary_preference_router.put('/dietary-preference/:id', authCheck, validations, dietaryPreferenceController.update);
dietary_preference_router.delete('/dietary-preference/:id', authCheck, dietaryPreferenceController.destroy);

export default dietary_preference_router