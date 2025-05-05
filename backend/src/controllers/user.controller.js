import { validationResult } from 'express-validator';
import { fetchUserwithAssociatedData, fetchUser, updateUser } from '../services/user.service.js';

const show = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const user = await fetchUser(req);

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
}

const profile = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const user = await fetchUserwithAssociatedData(req);

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
}

const update = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const user = await updateUser(req);

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
}


export default {
    show,
    profile,
    update
}