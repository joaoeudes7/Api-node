import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

async function generateToken(id) {
  const secret_key = process.env.SECRET_KEY;
  return jwt.sign({ 'id': id }, secret_key, { expiresIn: 86400 });
}

export { generateToken }
