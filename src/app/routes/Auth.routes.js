import express from 'express';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import authConfig from '../config/auth';

import User from '../models/User.model';

const router = express.Router();

router.post('/register', async (req, res) => {
    let { email } = req.body;
    try {
        if (await User.findOne({ email })) {
            return res.status(400).send({ error: 'User already exist' });
        }

        const user = await User.create(req.body);

        const token = generateToken(user.id);

        return res.send({ user, token });

    } catch (error) {
        res.status(400).send({ error: `Registration failed: ${error.message}`});
    }
});

router.post('/authenticate', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return res.status(400).send({ error: 'User not found'});
    }

    if (!await bcrypt.compare(password, user.password)) {
        return res.status(400).send({ error: 'Invalid password' });
    }

    user.password = undefined;

    return res.send({ user, token: generateToken(user.id) });
});

function generateToken(id) {
    return jwt.sign({ 'id': id }, authConfig.secret, { expiresIn: 86400 });
}

export default router;