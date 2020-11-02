const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const reviewSchema = new Schema({
//     rating: {type: Number, required: true},
//     description: {type: String, optional: true},
// });

var userSchema = new mongoose.Schema({
    netid: {type: String, require: true, unique: true, trim: true},
    name: {type: String, required: true, unique: true},
    password: {type: String, required: true, unique: true},
    credit: {type: Number, required: true},
    schoolYear: {type: Number},
    major: {type: String},
    phone: {type: String},
    email: {type: String},
    venmo: {type: String},
    instagram: {type: String},
    facebook: {type: String},
    description: {type: String, maxlength: 30},
    // reviews: {type: [reviewSchema], optional: true}
});

module.exports = mongoose.model('User', userSchema);