const express = require("express");
const bodyParser = require("body-parser");
const app = express();
//middware
app.use(bodyParser.json());
app.listen(3000); //server runnning on port 3000

//function for sum till n
function addNumbers(n) {
  let sum = 0;
  for (i = 0; i < n; i++) {
    sum += i;
  }
  return sum;
}

//usual way of using the query paramter is  when using an get request -- basically  generallly use get request
// when using query parammeter to get request  and this is hte general way but it depends upon the backend developer , so general case it is
app.get("/test", (req, res) => {
  const data = req.query.val; // getting query parameter as val
  const finalAns = addNumbers(data);
  res.send("hi  your answer is:", finalAns.toString());
});

/*
http://localhost:3000/test?val=909999999999999999999999999999999

http://localhost:3000/test?val=10009472389463264073673642022839745328742397

http://localhost:3000/test?val=10356851327815612508127351268351280651286145087125812587587


*/
