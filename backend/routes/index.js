const express = require('express');
const app = express();
import { user } from './user.js';

app.use("/api/v1/user", user);

const router = express.Router();



module.exports = { router };

