const express = require('express');
const app = express();
import * as z from "zod"
import { User } from "../db";
const jwt = require('jsonwebtoken');

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
        })
        .catch(err => {
            res.status(500).json({ message: "Internal server error" });
        });
})


module.exports = { user };
