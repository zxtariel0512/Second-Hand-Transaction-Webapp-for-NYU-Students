const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
const socketio = require("socket.io");
require("dotenv").config();

const app = express();
const server = http.createServer(app)
const io = socketio(server)

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors());

const db = process.env.MONGO_URI;
console.log(db)
mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true
})
  .then(() => console.log("connected to database"))
  .catch(err => console.error(err))

const userRouter = require('./routes/user');
const listingRouter = require('./routes/listing');
const requestRouter = require('./routes/request');
const ioRoutes = require('./routes/chat')(io)

app.use('/user', userRouter);
app.use('/listings', listingRouter);
app.use('/requests',requestRouter)
ioRoutes

app.listen(4000, () => {
  console.log("secondhand server started");
})
