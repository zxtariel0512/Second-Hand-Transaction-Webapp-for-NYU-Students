const moment = require("moment");

const Chat = require("../models/chat");
const Message = require("../models/message");

module.exports = (io) => {
    io.on("connection", (socket) => {
        socket.on("joinChats", (chats) => {
            const chatIds = chats.map(chat => chat._id)
            socket.join(chatIds);
            socket.emit("welcome", chatIds)
        })

        socket.on("sendMessage", async (msg) => {
            let newMessage = await Message.create({
                author: msg.author,
                value: msg.value,
            });

            let foundChat = await Chat.findById(msg.chatId)

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