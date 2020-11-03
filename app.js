const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const Listing = require("./models/listing");
const User = require("./models/user.model");

const db = process.env.MONGO_URI;
console.log(db)
mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("connected to database"))
  .catch(err => console.error(err))


app.get("/test", (req, res) => {
  res.json({
    message: "hello"
  })
})


const userRouter = require('./routes/user');
const listingRouter = require('./routes/listing');

app.use('/user', userRouter);
app.use('/listings', listingRouter);

app.listen(4000, () => {
  console.log("secondhand server started");
})
