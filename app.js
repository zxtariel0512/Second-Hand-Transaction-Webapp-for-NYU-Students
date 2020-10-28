const express = require("express");
const app = express();

app.get("/test", (req, res) => {
  res.json({
    message: "hello"
  })
})


app.listen(4000, () => {
  console.log("secondhand server started");
})