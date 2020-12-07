const express = require("express");
const router = express.Router();
const moment = require("moment");

const { auth } = require("../middleware/auth");

const Chat = require("../models/chat");
const User = require("../models/user.model");
const Message = require("../models/message");

// get user's chat rooms
router.route('/').get(auth, async (req, res) => {
    try {
        //let foundUser = await (await User.findOne({ netid: req.user.username }))
        let foundUser = await (await User.findOne({ netid: req.user.username }))
            .populate({
                path: "chats",
                populate: {
                    path: "lastMessage"
                }
            }).execPopulate();

        const sortedChats = foundUser.chats.sort((a, b) => {
            const aDate = new Date(a.lastMessage.time)
            const bDate = new Date(b.lastMessage.time)
            return bDate.getTime() - aDate.getTime()
        })

        res.json(sortedChats);
    } catch(err) {
        console.error(err);
        res.status(500).json({
            message: `Error retrieving chats of user: ${req.params.netid}`
        });
    }
})

// get individual chat room
router.route('/:id').get(auth, async (req, res) => {
    try {
        let foundChat = await (await Chat.findById(req.params.id))
            .execPopulate("messages");
        res.json(foundChat);
    } catch(err) {
        console.error(err);
        res.status(500).json({
            message: `Error retrieving chat of id: ${req.params.id}`
        });
    }
})

// delete user from chat room
router.route('/:id').delete(auth, async (req, res) => {
    try {
        let foundUser = await User.findOne({ netid: req.user.username });
        foundUser.chats = foundUser.chats.filter(chat => chat._id.toString() != req.params.id);
        await foundUser.save()

        res.json(foundUser.chats);
    } catch(err) {
        console.error(err);
        res.status(500).json({
            message: "Error deleting user from chat"
        });
    }
})


// create a new chat room
router.route('/').post(auth, async (req, res) => {
    try {
        const details = req.body;
        let newChat = await Chat.create(details.chat);

        details.chat.participants.forEach(async (participant) => {
            const foundUser = await User.findOne({ netid: participant })
            foundUser.chats.push(newChat);
            await foundUser.save();
        });

        const newMessage = await Message.create({
            author: details.message.author,
            value: details.message.value,
        });

        newChat.messages.push(newMessage);
        newChat.lastMessage = newMessage;
        await newChat.save();

        res.json(newChat);
    } catch(err) {
        console.error(err);
        res.status(500).json({
            message: "Error creating new chat"
        });
    }
})


module.exports = router;