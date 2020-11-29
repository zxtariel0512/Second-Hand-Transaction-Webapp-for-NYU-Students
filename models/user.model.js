const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    netid: {type: String, require: true, unique: true, trim: true},
    avatarUrl: { type: String, unique: false, default: "https://www.minervastrategies.com/wp-content/uploads/2016/03/default-avatar.jpg"},
    username: {type: String, require: true, unique: true, trim: true},
    name: {type: String, required: true},
    password: {type: String, required: true},
    credit: {type: Number, required: true},
    valid: {type: Boolean, required: true},
    reviews: [{type: mongoose.Schema.Types.ObjectID, ref: 'Review'}],
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
