const express = require("express");
const http = require("http")
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
    cors: true,
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));
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
const chatRouter = require('./routes/chat');
const messageRouter = require('./routes/message');
const ioRoutes = require('./routes/socketChat')(io)
const categoryRouter = require('./routes/category')

app.use('/user', userRouter);
app.use('/listings', listingRouter);
app.use('/requests',requestRouter);
app.use('/chat', chatRouter);
app.use('/messages', messageRouter);
ioRoutes
app.use('/category', categoryRouter)

server.listen(4000, () => {
    console.log("secondhand server started");
})
