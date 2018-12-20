import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

export default (req, res, next) => {
  dotenv.config();

  const authorization = req.headers.authorization;
  const regex = new RegExp(/^Bearer\s[\w|\W]{10,}$/);

  if (!authorization || !regex.test(authorization)) {
    return res.status(401).send({ error: "No token provided" });
  }

  const token = authorization.split(' ')[1];
  const secret_key = process.env.SECRET_KEY;

  jwt.verify(token, secret_key, (err, decoded) => {
    if (err) {
      return res.status(401).send({ error: 'Token invalid' });
    }

    req.userId = decoded.id;
    return next();
  });
}
