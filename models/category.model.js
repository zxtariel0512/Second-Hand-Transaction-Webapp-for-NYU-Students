const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name:{
        type: String,
        require: true,
        unique: true
    },
    level:{
        type: String,
        require: true
    },
    parent:{
        type: mongoose.Schema.Types.ObjectID,
        ref:'Category'
    },
    child:[{
        type: mongoose.Schema.Types.ObjectID,
        ref:'Category'
    }],
    listings:[{
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Listing'
    }],
    requests:[{
        type: mongoose.Schema.Types.ObjectID,
        ref: 'request'
    }]
})

module.exports = mongoose.model('Category', categorySchema);