const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://anandu:Test123@cluster0.atjcmwf.mongodb.net/paytm');

const userSchema = new mongoose.Schema({userName: String, firstName: String, lastName: String, password: String });
const accountSchema = new mongoose.Schema({ userId :{type : mongoose.Schema.Types.ObjectId, ref:'User'}, balance : Number });
const User = mongoose.model('User', userSchema);
const Account = mongoose.model('Account', accountSchema);

module.exports = { User, Account };

