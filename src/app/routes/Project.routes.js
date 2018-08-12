import express from 'express';
import authMiddleware from '../middlewares/auth';

const router = express.Router();

router.use(authMiddleware); // Validator token

router.get('/', (req, res) => {
  res.send({ user: req.userId });
});

export default router;
