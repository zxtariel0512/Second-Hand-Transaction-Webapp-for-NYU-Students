const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

app.use(express.json())
app.use(express.urlencoded({extended: true}))


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
const requestRouter = require('./routes/request')

app.use('/user', userRouter);
app.use('/listings', listingRouter);
app.use('/requests',requestRouter)

app.listen(4000, () => {
  console.log("secondhand server started");
})
