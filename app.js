const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

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


app.listen(4000, () => {
  console.log("secondhand server started");
})