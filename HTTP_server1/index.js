const bodyParser = require("body-parser");
const express = require("express");
//create an express server
const port = 3000;
const app = express();
//anytime the body has some json , this guy will extract  the data and  put it here
app.use(bodyParser.json());

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//  listen means actually on a fixed port that we assign to the server and on that port - this logic is working
app.listen(port, () => {
  console.log("hey i am listening on port", port);
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//just a simple example for a post request
app.post("/post", (req, response) => {
  /*
  api : http://localhost:3000/post
  body : {
    "msg": "hello world"
  }
  */
  const message = req.body.msg;
  console.log(message);

  response.send("hello i have got your post request");
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//handling the body of any post request  lets say we are handling an authorisation header
app.post("/testing", (req, res) => {
  console.log(req.headers);
  res.send({
    message: "Authorisation header ",
  });
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// passing data using the query parameters

app.post("/backend-query", (req, res) => {
  //another way to send datas to the backend USING query parameters

  //usual way of using the query paramter is  when using an [get] request -- basically  generallly use get request
  // when using query parammeter to get request  and this is hte general way but it depends upon the backend developer , so general case it is
  //api = http://localhost:3000/backend-query?msg=123
  const mess = req.query.msg;
  console.log(mess);

  res.send("hello i have got your backend-query  request");
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//basic get request understading
app.get("/", (req, res) => {
  res.json({
    name: "bhad khau",
  });
});
