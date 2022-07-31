const mongoose = require('mongoose');

let schema = new mongoose.Schema({
    name:String,
    email:String,
    phone:String,
    password:String
});
const UserModel = mongoose.model('s', schema);
//const userModel = mongoose.model('testCollection3', schema);
exports.UserModel = UserModel;