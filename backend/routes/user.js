import express from "express";
const app = express();
import * as z from "zod"
import { Account, User } from "../db.js";
import jwt from 'jsonwebtoken';
import { JWT_KEY } from '../config.js';
import authMiddileware from "../middileware.js";


const userSchema = z.object({
    userName: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
    password: z.string()
});

function validation(req, res, next){
   const result = userSchema.safeParse(req.body);
   if (!result.success) {
       return res.status(411).json({ message: "incorrect inputs" });
   }
   next();
}

async function isAvailable(req ,res, next){
    const username = req.body.userName;
    const user = await User.findOne({userName : username});
    if (user) {
        return res.status(411).json({ message: "User already exists" });
    }
    next();
}


export const user = express.Router();

user.post('/signup', validation,isAvailable,async (req,res) => {
    const { userName, firstName, lastName, password } = req.body;
    User.create({ userName, firstName, lastName, password })
        .then(async (user) => {
            const token = jwt.sign({ id: user._id }, JWT_KEY);
            res.status(201).json({ message: "User created successfully", token: token });
            await Account.create({ userId: user._id, balance: 1 + Math.random() * 10000 });
        })
        .catch(err => {
            res.status(500).json({ message: "Internal server error" });
        });
})


user.post('/signin', async (req, res) => {
    const username = req.body.userName;
    const password = req.body.password;
    

    const userFound = await User.findOne({ userName: username, password : password });
    if (!userFound) {
        return res.status(411).json({ message: "Error while logging in.." });
    }

    const token = jwt.sign({ id: userFound._id }, JWT_KEY);
    res.status(200).json({ message: "Signin successful", token: token });    
}
);

user.post('/', authMiddileware, validation, async (req, res) =>{
    const firstname = req.body.firstName;
    const lastname = req.body.lastName;
    const password = req.body.password;

    try{
        await User.updateOne({_id : req.userid},{firstName : firstname, lastName: lastname, password : password});
        res.status(200).json({message : "User updated successfully"});
    }catch(error){
        res.status(500).json({message : "internal server error"})
    }
});


user.get('/all', authMiddileware, async (req, res) =>{
    const search = req.query.search || "";
    try {
        const users = await User.find({'userName' : new RegExp(search, 'i')});
        res.status(200).json(users.filter(user => user._id != req.userId));
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

user.get('/me', authMiddileware, async (req, res) =>{

    try {
        const user = await User.findById(req.userId);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
