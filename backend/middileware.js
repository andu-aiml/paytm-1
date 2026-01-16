import jwt from 'jsonwebtoken';
import { JWT_KEY } from './config.js';

export default async function authMiddileware(req, res, next) {
    const authHeader = req.headers['authorization'];
    

    const token = authHeader.split(' ')[1];


    try{
        
        const foundUser = jwt.verify(token, JWT_KEY)

        req.userId = foundUser.id;
        next();
    }catch (error){
        console.log("Auth Error:", error);
        res.status(401).json({ message: "invalid token" });
    }
}

