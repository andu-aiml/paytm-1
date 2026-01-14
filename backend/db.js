const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://anandu:Test123@cluster0.atjcmwf.mongodb.net/paytm');

const userSchema = new mongoose.Schema({userName: String, firstName: String, lastName: String, password: String });

const User = mongoose.model('User', userSchema);

module.exports = { User }

