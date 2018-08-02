import jwt from 'jsonwebtoken';
import authConfig from '../config/auth';

export default (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).send({ error: "No token provided" });
    }

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ error: 'Token invalid'});
        }

        req.userId = decoded.id;
        return next();
    });
}