module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("user connected")
  })
}