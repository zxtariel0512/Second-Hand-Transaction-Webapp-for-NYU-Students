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
mongoose.connect(process.env.HEROKU_MONGO_URI || db, {
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
const categoryRouter = require('./routes/category');
const purchaseRouter = require('./routes/purchase');
const checkoutRouter = require('./routes/checkout');

app.get("/", (req, res) => {
    res.json({
        message: "this works"
    })
})
app.use('/user', userRouter);
app.use('/listings', listingRouter);
app.use('/requests',requestRouter);
app.use('/chat', chatRouter);
app.use('/messages', messageRouter);
ioRoutes
app.use('/category', categoryRouter);
app.use('/purchases', purchaseRouter)
app.use('/checkout', checkoutRouter);


server.listen(process.env.PORT || 4000, () => {
    console.log("secondhand server started");
})
