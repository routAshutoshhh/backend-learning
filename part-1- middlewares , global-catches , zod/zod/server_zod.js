const express = require("express");
const ZOD = require("zod");
const bodyParser = require("body-parser");
const app = express();
const port = 5000;

app.use(express.json());
const schema = ZOD.array(ZOD.number());

app.post("/", function (req, res) {
  const kidneys = req.body.kidneys;
  const response = schema.safeParse(kidneys);
  // handling the response
  if (response.success == false) {
    return res.status(411).json({
      error: "your input is not valid ",
    });
  } else {
    res.send({
      response,
    });
  }
});

app.listen(port);
