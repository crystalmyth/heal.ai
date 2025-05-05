import { GENDER, USER_ROLES } from "../config/constants.js";
import User from "../models/user.model.js";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

export const up = async () => {
    const existingUser = await User.findOne({ where: { email: 'admin@example.com' } });
    if (existingUser) {
        console.log('Admin user already exists');
        return;
    }
    const now = new Date();
    const user = await User.create({
        id: uuidv4(),
        name: 'Admin User',
        email: 'admin@example.com',
        password: await bcrypt.hash('adminpassword', 10),
        age: 30,
        gender: GENDER.MALE,
        height_cm: 180,
        weight_kg: 75,
        activityLevelId: null,
        dietaryPreferenceId: null,
        primaryGoalId: null,
        role: USER_ROLES.ADMIN,
        registrationDate: now,
        createdAt: now,
        updatedAt: now,
    })

    console.log('Admin user created:', user.toJSON());
}

export const down = async() => {
    await User.destroy({
        where: {
            email: 'admin@example.com'
        }
    })

    console.log('Admin user deleted');
}