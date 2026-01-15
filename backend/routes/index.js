import express from "express";
export const router = express.Router();
import { user } from './user.js';
import { accounts } from './accounts.js';

router.use("/user", user);
router.use("/accounts", accounts);







