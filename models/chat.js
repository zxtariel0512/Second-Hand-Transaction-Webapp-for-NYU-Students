const mongoose = require("mongoose");

var ChatSchema = new mongoose.Schema({
    name: String,
    participants: [String],
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    }]
})

module.exports = mongoose.model("Chat", ChatSchema)