import jwt from 'jsonwebtoken';
import authConfig from '../config/auth';

export default (req, res, next) => {
  const authorization = req.headers.authorization;
  const regex = new RegExp(/^Bearer\s[\w|\W]{10,}$/);

  if (!authorization || !regex.test(authorization)) {
    return res.status(401).send({ error: "No token provided" });
  }

  const token = authorization.split(' ')[1];

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ error: 'Token invalid' });
    }

    req.userId = decoded.id;
    return next();
  });
}
