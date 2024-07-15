const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    Name: String,
    Email: { type: String, unique: true },
    Pass: String
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
