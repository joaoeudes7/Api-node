import jwt from 'jsonwebtoken';
import authConfig from './config/auth';

function generateToken(id) {
  return jwt.sign({ 'id': id }, authConfig.secret, { expiresIn: 86400 });
}

export { generateToken }
