const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    netid: {type: String, require: true, unique: true, trim: true},
    username: {type: String, require: true, unique: true, trim: true},
    name: {type: String, required: true, unique: true},
    password: {type: String, required: true, unique: true},
    credit: {type: Number, required: true},
    valid: {type: Boolean, required: true},
    schoolYear: {type: Number},
    major: {type: String},
    phone: {type: String},
    email: {type: String},
    venmo: {type: String},
    instagram: {type: String},
    facebook: {type: String},
    descriptioBn: {type: String, maxlength: 30},
});

module.exports = mongoose.model('User', userSchema);
