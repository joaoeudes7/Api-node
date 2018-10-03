import express from 'express';

import User from '../models/User.model';
import { generateToken } from '../utils';

const router = express.Router();

router.post('/', async (req, res, next) => {
  let { username, email } = req.body;

  try {
    if (await User.findOne({ $or: [{ username }, { email }] })) {
      let _msg = 'User already exist.';

      if ([username, email].some(attr => attr == null)) {
        _msg = 'Username or email not exist.';
      }
      return res.status(400).send({ error: _msg });
    }

    const user = await User.create(req.body);
    // user.password = undefined; // Hidden password

    const token = generateToken(user.id);

    return res.send({ user, token });

  } catch (error) {
    res.status(400).send({ error: `Registration failed: ${error.message}` });
  }
});

export default router;
