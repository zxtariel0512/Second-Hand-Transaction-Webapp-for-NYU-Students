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
const stripe = require('stripe')('sk_test_51Ht0mwFHEiDr6rf2Wa8PyVCaNfDXqKBOWvL5GwlAk3vNnDr8oY9eYCOM46i4WCq4nhhxXMGKQKr89x5U9xL718sN00znAUu7JK');

app.post('/create-checkout-session', async (req, res) => {
    console.log(req.body.price);
    console.log(req.body.title);
    console.log(req.body);
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: req.body.title,
                    },
                    unit_amount: parseInt(req.body.price) * 100+ 1,
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: 'http://localhost:3000/home',
        cancel_url: 'https://localhost:3000/home',
    });

    res.json({ id: session.id });
});

server.listen(4000, () => {
    console.log("secondhand server started");
})
