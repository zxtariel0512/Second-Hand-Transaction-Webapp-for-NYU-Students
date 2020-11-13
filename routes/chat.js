const express = require("express");
const router = express.Router();

const { auth } = require("../middleware/auth");

const Chat = require("../models/chat");
const User = require("../models/user.model");


// get user's chat rooms
router.route('/').get(auth, async (req, res) => {
    try {
        let foundUser = await (await User.findOne({ netid: req.user.username }))
            .execPopulate("chats");
        res.json(foundUser.chats);
    } catch(err) {
        console.error(err);
        res.status(500).json({
            message: `Error retrieving chats of user: ${req.params.netid}`
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
router.route('/').post(auth, async (req, res) => {
    try {
        console.log(req.user.username)
        let foundUser = await User.findOne({ netid: req.user.username })
        let createdChat = await Chat.create(req.body);

        foundUser.chats.push(createdChat);
        await foundUser.save();

        res.json(createdChat);
    } catch(err) {
        console.error(err);
        res.status(500).json({
            message: "Error creating new chat"
        });
    }
})

module.exports = router;