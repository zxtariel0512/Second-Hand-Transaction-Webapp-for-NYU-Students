const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
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
    description: {type: String, maxlength: 30},
    chats:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat"
    }]
});

module.exports = mongoose.model('User', userSchema);
