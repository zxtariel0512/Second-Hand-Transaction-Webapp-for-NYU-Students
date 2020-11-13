const express = require("express");
const router = express.Router();

const Chat = require("../models/chat");

// get all chats
router.route('/').get(async (req, res) => {
    try {
        let foundChats = await Chat.find();
        res.json(foundChats);
    } catch(err) {
        console.error(err);
        res.status(500).json({
            message: "Error retrieving all chats"
        });
    }
})

// get individual chat room
router.route('/:id').get(async (req, res) => {
    try {
        let foundChat = await Chat.findById(req.params.id);
        res.json(foundChat);
    } catch(err) {
        console.error(err);
        res.status(500).json({
            message: `Error retrieving chat of id: ${req.params.id}`
        });
    }
})

// create a new chat room
router.route('/').post(async (req, res) => {
    try {
        let createdChat = await Chat.create(req.body);
        res.json(createdChat);
    } catch(err) {
        console.error(err);
        res.status(500).json({
            message: "Error creating new chat"
        });
    }
})

module.exports = router;