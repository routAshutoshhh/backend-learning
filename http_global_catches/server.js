const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 5000;

app.use(express.json()); //express.json() is a built-in middleware function in Express it is to be diefined early here before ALL THE ROUTES. It parses incoming requests with JSON payloads and is based on body-parser.

app.post("/", function (req, res) {
  const kidneys = req.body.kidneys;
  const kidneylength = kidneys.length;
  res.send("you have: " + kidneylength + "kidneys");
});

//explaining the global catches- gloabal catches are nothing but a  another middleware which is after all teh routes and then it handles the error showing ,not showing the  dirty output
app.use(function (err, req, res, next) {
  errCount++;
  res.status(400).json({
    msg: "something is up with our server",
  });
});

app.listen(port);
