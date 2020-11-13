const moment = require("moment");

module.exports = (io) => {
    io.on("connection", (socket) => {
        socket.on("joinChat", (chatId) => {
            socket.join(chatId);
            socket.emit("welcome", "Welcome to chat " + chatId)

        })

        socket.on("sendMessage", (msg) => {
            io.to(msg.chatId).emit("newMessage", {
                value: msg.value,
                time: moment().format("h:mm a")
            })
        })

        socket.on("disconnect", () => {
            console.log("user disconnected")
        })
    })
}