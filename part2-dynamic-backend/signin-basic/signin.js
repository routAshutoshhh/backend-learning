const express = require("express");
const jwt = require("jsonwebtoken");
const jwtPassword =  "123456" ;  //  it should be a bit more secure 
const dummyData = require("./data.js"); // Importing the dummy data from data.js-

//initiating  the application .
const app = express();
app.use(express.json ())


//function to check if the user exists  in the dummy data
function userExists(username, password) {
  //if the userName and password exists then we need to match with the existing userName and Password
  for (let i = 0; i < dummyData.length; i++) {
    if (
      dummyData[i].username  === username &&
      dummyData[i].password === password
    ) {
      return true;
    }
    return false;
  }
}


//write the code to see if user Exists using  find method in  javascript
function userExistsOrNot(username, pass) {
  //using the find method to check  if the user exits or not
  const user = dummyData.find ((u )=>(u.username === username && u.password === pass)
)
	//now if we have the user and then we can return true so if user does not have any kind of value then we can return false
  if (user == undefined) return false;
  return true;
}




// this post method return a json web token with the username encryted in it
app.post("/signin", function (req, res) {
  const username = req.body.username;
  const pass = req.body.password;

  if (!userExistsOrNot(username, pass)) {
    return res.status(401).json({ message: "Invalid credentials  , user does not exits in our  in memory db" });
  }
  
  //sending the token with the username encypted in it
  const token = jwt.sign({username : username} , jwtPassword); // encrypting the username with the jwtPassword
  res.json({
	message :"here is  your token : "+ token , 
  })
}); 



//since now we have send the user token --- now further we can ask for the token in the header 
//get method returns an arrray of all users if user is signed in (token is valid) and else it return a 403 status code
app.get("/users", function (req, res) {
  //verifying that the token that the user  is sending is valid or not
  //catch the token from the header
  const headerToken  = req.headers.authorization;
  try {
	//in this try block we are tryiing to verify the token and show some data  
	const decodedToken  = jwt.verify(headerToken, jwtPassword); // so we need to pass the header authorization and the jwtPassword
	const decodedUserName = decodedToken.username;
	const otherUsers = dummyData.filter((u) => u.username !== decodedUserName);

	res.json({
		message: " here is the list of user apart from the ",
        users: otherUsers
	})
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
});


//server starting 
app.listen(3000);