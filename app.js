const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const Listing = require("./models/listing");
const User = require("./models/user.model");

const db = process.env.MONGO_URI;

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


app.get("/listings", async (req, res) => {
  let foundListings = await Listing.find();
  res.json(foundListings);
})

app.post("/listings", async (req, res) => {
  let newListing = await Listing.create(req.body);
  res.json(newListing)
})

app.get("/user", async(req, res) => {
  let foundUsers = await User.find();
  res.json(foundUsers);
})

app.post("/user/register", async(req, res) => {
  let newUser = await User.create(req.body);
  res.json(newUser);
})



app.listen(4000, () => {
  console.log("secondhand server started");
})
