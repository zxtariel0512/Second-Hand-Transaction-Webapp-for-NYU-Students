const mongoose = require("mongoose");

var ChatSchema = new mongoose.Schema({
    name: String,
    participants: [String]
})

module.exports = mongoose.model("Chat", ChatSchema)