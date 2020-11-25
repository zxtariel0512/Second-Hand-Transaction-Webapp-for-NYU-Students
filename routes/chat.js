const express = require("express");
const router = express.Router();
const moment = require("moment");

const { auth } = require("../middleware/auth");

const Chat = require("../models/chat");
const User = require("../models/user.model");


// get user's chat rooms
//router.route('/').get(auth, async (req, res) => {
router.route('/').get(async (req, res) => {
    try {
        //let foundUser = await (await User.findOne({ netid: req.user.username }))
        let foundUser = await (await User.findOne({ netid: "mrf441" }))
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
router.route('/:id').get(async (req, res) => {
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


// create a new chat room
router.route('/').post(async (req, res) => {
    try {
        let foundUser = await User.findOne({ netid: "mrf441" })
        let newChat = await Chat.create(req.body);

        foundUser.chats.push(newChat);
        await foundUser.save();

        res.json(newChat);
    } catch(err) {
        console.error(err);
        res.status(500).json({
            message: "Error creating new chat"
        });
    }
})

module.exports = router;