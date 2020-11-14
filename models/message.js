const mongoose = require("mongoose");

var MessageSchema = new mongoose.Schema({
    author: String,
    value: String,
    time: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("Message", MessageSchema)