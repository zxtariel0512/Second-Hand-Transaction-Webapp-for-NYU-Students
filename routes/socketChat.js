module.exports = (io) => {
    io.on("connection", (socket) => {
        console.log("user connected")
        socket.emit("welcome", "Welcome to the room")

        socket.on("sendMessage", (message) => {
            io.emit("newMessage", message)
        })

        socket.on("disconnect", () => {
            console.log("user disconnected")
        })
    })
}