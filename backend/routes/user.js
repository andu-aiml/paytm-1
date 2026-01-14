const express = require('express');
const app = express();
import * as z from "zod"
import { Account, User } from "../db";
const jwt = require('jsonwebtoken');
import { JWT_KEY } from '../config';
import { authMiddleware } from '../middilware'

const userSchema = z.object({
    userName: z.string(),
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


const user = express.Router();

user.post('/signup', validation,isAvailable,(req,res) => {
    const { userName, firstName, lastName, password } = req.body;
    User.create({ userName, firstName, lastName, password })
        .then(user => {
            const token = jwt.sign({ id: user._id }, 'secret');
            res.status(201).json({ message: "User created successfully", token:token });
            Account.create({userId : user._id, balance : 1+math.random()*10000})
        })
        .catch(err => {
            res.status(500).json({ message: "Internal server error" });
        });
})


user.post('/signin',validation, async (req, res) => {
    const username = req.body.userName;
    const password = req.body.password;
    

    userFound = await User.findOne({ userName: username, password : password });
    if (!userFound) {
        return res.status(411).json({ message: "Error while logging in.." });
    }

    const token = jwt.sign({ id: user._id }, JWT_KEY);
    res.status(200).json({ message: "Signin successful", token: token });    
}
);

user.post('/', authMiddleware, validation, async (req, res) =>{
    const firstname = req.body.firstName;
    const lastname = req.body.lastName;
    const password = req.body.password;

    try{
        User.updateOne({_id : req.userid},{firstName : firstname, lastName: lastname, password : password})
    }catch(error){
        res.status(500).json({message : "internal server error"})
    }
});


module.exports = { user };
