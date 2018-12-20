import express from 'express';
import authMiddleware from '../middlewares/auth';
import User from '../models/User.model';

const router = express.Router();
router.use(authMiddleware);

router.get('/', async (req, res) => {
  User.find({}).then((users) => res.send(users))
});

router.get('/:username', async (req, res) => {
  const username = req.params.username;
  User.find({ name: RegExp(`^${username}`) })
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  User.find({ _id: id })
    .then(result => res.send(result))
});

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const userUpdated = req.body;
  User.update({ _id: id }, { $set: userUpdated })
    .then(result => res.send(result));
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  User.remove({ _id: id })
    .then(result => res.send(result))
});

export default router;
