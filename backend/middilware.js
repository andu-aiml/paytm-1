const jwt = require('jsonwebtoken');
import { JWT_KEY } from '../config';

function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];

    const token = authHeader.split(' ')[1];

    try{
        foundUser = jwt.verify(token, JWT_KEY)

        req.userId = foundUser._id
        next();
    }catch (error){
        res.send.json("invalid token")
    }
}

module.exports = { authMiddleware }