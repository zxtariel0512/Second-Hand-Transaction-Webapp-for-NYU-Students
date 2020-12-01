const mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({
    reviewer:{
        type: String,
        required: true
    },

    target: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'User',
        required: true
    },
    rating:{
        type: Number,
        required: true
    },
    description: {
        type: String
    }
})

module.exports = mongoose.model("Review", reviewSchema);