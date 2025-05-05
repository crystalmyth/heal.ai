import express from "express"
import auth_router from "./auth/index.route.js"
import workout_plan_router from "./workout-plan.route.js"
import diet_plan_router from "./diet-plan.route.js"
import motivation_advise_router from "./motivation-advise.route.js"

import user_router from "./user/index.route.js"
import activity_level_router from "./activity-level/index.route.js"
import dietary_preference_router from "./dietary-preference/index.route.js"
import primary_goal_router from './primary-goal/index.route.js'

const index_router = express.Router()

index_router.use(auth_router)
index_router.use(workout_plan_router)
index_router.use(diet_plan_router)
index_router.use(motivation_advise_router)
index_router.use(user_router)
index_router.use(activity_level_router)
index_router.use(dietary_preference_router)
index_router.use(primary_goal_router)

index_router.get('/', (req, res) => {
    res.send('Welcome to the Heal.ai Backend API!');
});

export default index_router