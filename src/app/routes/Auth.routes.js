import express from 'express';

import bcrypt from 'bcryptjs';

import User from '../models/User.model';
import { generateToken } from '../utils';

const router = express.Router();

router.post('/', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).select('+password');

  if (!user) {
    return res.status(400).send({ error: 'User not found' });
  }

  if (!await bcrypt.compare(password, user.password)) {
    return res.status(400).send({ error: 'Invalid password' });
  }

  user.password = undefined;
  const access_token = await generateToken(user.id)

  return res.send({ user, access_token });
});

export default router;
