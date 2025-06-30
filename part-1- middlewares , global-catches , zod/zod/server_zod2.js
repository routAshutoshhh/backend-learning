const express = require("express");
const bodyParser = require("body-parser");
const zod = require("zod");

const app = express();
const port = 5001;

app.use(express.json());
//defining schema using zod for email validation

const schema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(7),
  country: zod.literal("US").or(zod.literal("IN")).or(zod.literal("UK")),
});

app.post("/", function (req, res) {
  const body = req.body;
  const response = schema.safeParse(body);
  if (response.success) {
    res.send({
      response,
    });
  } else {
    return res.status(411).json({ messsage: "invalid hai response " });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
