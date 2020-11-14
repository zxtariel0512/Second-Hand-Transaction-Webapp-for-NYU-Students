const moment = require("moment");

const Chat = require("../models/chat");
const Message = require("../models/message");

module.exports = (io) => {
    io.on("connection", (socket) => {
        socket.on("joinChats", (chats) => {
            const chatIds = chats.map(chat => chat._id)
            socket.join(chatIds);
            socket.emit("welcome", "Welcome to the chats")
        })

        socket.on("sendMessage", async (msg) => {
            let foundChat = await Chat.findById(msg.chatId)
            let newMessage = await Message.create({
                author: "Matthew Fan",
                value: msg.value,
            });

            foundChat.messages.push(newMessage)
            await foundChat.save()

            io.to(msg.chatId).emit("newMessage", {
                chatId: msg.chatId,
                author: newMessage.author,
                value: newMessage.value,
                time: newMessage.time
            })
        })

        socket.on("disconnect", () => {
            console.log("user disconnected")
        })
    })
}