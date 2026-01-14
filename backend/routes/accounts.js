const express = require('express');
import { Account } from '../db.js';
import { authMiddleware } from '../middilware.js';

const accounts = express.Router();


accounts.get('/balance', authMiddleware ,async (req, res) =>{
    acc = await Account.findOne({userId : req.userId});
    res.json({balance : acc.balance});
});

accounts.post('/transfer', authMiddleware , async (req, res) =>{
    const toUserId = req.body.to;
    const amount = req.body.amount;

    const fromAccount = await Account.findOne({userId : req.userId});
    if (fromAccount.balance < amount){
        return res.status(411).json({message : "Insufficient balance"});
    }else{
        toAccount = await Account.findOne({userId : toUserId});
        if (!toAccount){
            return res.status(411).json({message : "Recipient account not found"});
        }
        Account.updateOne({userId : req.userId}, {$inc : {balance : -amount}});
        Account.updateOne({userId : toUserId}, {$inc : {balance : amount}});
        res.json({message : "Transfer successful"});
    }

});

module.exports = { accounts };



