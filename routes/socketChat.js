const moment = require("moment");

module.exports = (io) => {
    io.on("connection", (socket) => {
        socket.on("joinChats", (chats) => {
            const chatIds = chats.map(chat => chat._id)
            socket.join(chatIds);
            socket.emit("welcome", "Welcome to the chats")
        })

        socket.on("sendMessage", (msg) => {
            io.to(msg.chatId).emit("newMessage", {
                chatId: msg.chatId,
                value: msg.value,
                time: moment().format("h:mm a")
            })
        })

        socket.on("disconnect", () => {
            console.log("user disconnected")
        })
    })
}