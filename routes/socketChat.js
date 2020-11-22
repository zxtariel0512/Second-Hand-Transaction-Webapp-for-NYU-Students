const moment = require("moment");

const User = require("../models/user.model");
const Chat = require("../models/chat");
const Message = require("../models/message");

module.exports = (io) => {
    io.on("connection", (socket) => {
        socket.on("joinChats", (chats) => {
            const chatIds = chats.map(chat => chat._id)
            socket.join(chatIds);
            socket.emit("welcome", chatIds)
        })

        socket.on("joinNewChat", (id) => {
            socket.join(id);
        })

        socket.on("createChat", async (details) => {
            console.log(details);
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

            socket.join(newChat._id);

            socket.emit("newChat", {
                message: newMessage,
                chat: newChat
            })
        })

        socket.on("sendMessage", async (msg) => {
            console.log(msg.chatId)
            let newMessage = await Message.create({
                author: msg.author,
                value: msg.value,
            });

            let foundChat = await Chat.findById(msg.chatId)

            console.log(foundChat)

            foundChat.messages.push(newMessage)
            foundChat.lastMessage = newMessage
            await foundChat.save()

            io.to(msg.chatId).emit("newMessage", {
                chatId: msg.chatId,
                author: msg.author,
                value: msg.value,
                time: newMessage.time
            })
        })

        socket.on("disconnect", () => {
            console.log("user disconnected")
        })
    })
}