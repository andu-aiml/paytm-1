const express = require('express');
const app = express();
import { user } from './user.js';
import { accounts } from './accounts.js';

app.use("/api/v1/user", user);
app.use("/api/v1/accounts", accounts);

const router = express.Router();



module.exports = { router };

