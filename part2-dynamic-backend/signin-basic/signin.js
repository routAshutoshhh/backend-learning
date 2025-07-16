const express = require("express");
const jwt = require("jsonwebtoken");
const dummyData = require("./data.js");

const app = express();

function userExists(username, password) {
  //if the userName and password exists then we need to match with the existing userName and Password
  for (let i = 0; i < dummyData.length; i++) {
    if (
      dummyData[i].username === username &&
      dummyData[i].password === password
    ) {
      return true;
      break;
    }

    return false;
  }
}

//todo: write the code to see if user Exists using  find

// this post method return a json web token with the username encryted in it
app.post("/signin", function (req, res) {
  const userName = req.body.username;
  const pass = req.body.password;

  if (!userExists(userName, pass)) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  //sending the token with the username encypted in it
});

//get method returns an arrray of all users if user is signed in (token is valid) and else it return a 403 status code
app.get("/users", function (req, res) {
  //verifying that the token that the user  is sending is valid or not
  //catch the token from the header
  const header = req.headers.authorization;

  //validating using the  jwt.verify method

  try {
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
});
