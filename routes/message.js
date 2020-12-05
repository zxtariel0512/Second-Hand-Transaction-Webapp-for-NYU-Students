const express = require("express");
const router = express.Router();

const Chat = require("../models/chat");
const Message = require("../models/message");

// get all the messages in a chat
router.route("/:chatId").get(async (req, res) => {
    try {
        let foundChat = await (await Chat.findById(req.params.chatId))
            .execPopulate("messages");
        res.json(foundChat.messages);
    } catch(err) {
        console.error(err);
        res.status(500).json({
            message: "Unable to load messages"
        })
    }
})

// create a new message under the specified chatId
router.route("/:chatId").post(async (req, res) => {
    try {
        let foundChat = await Chat.findById(req.params.chatId);
        let newMessage = await Message.create(req.body);

        foundChat.messages.push(newMessage);
        foundChat.lastMessage = newMessage;
        await foundChat.save();

        res.json(newMessage);
    } catch(err) {
        console.error(err);
        res.status(500).json({
            message: "Unable to send message"
        })
    }
})

module.exports = router;