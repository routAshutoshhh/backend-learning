// instead of using database and working on that we will work onthis

let users = [
  {
    name: "Alice",
    kidneys: [
      {
        healthy: true,
      },
      {
        healthy: true,
      },
    ],
  },
];

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
app.use(bodyParser.json());

app.listen(port, function (req, res) {
  console.log("sever up and running on port " + port);
});

//so here user will get to know the  information regarding his kidneys
app.get("/", (req, res) => {
  const jhonKidney = users[0].kidneys; // john ki kidney  ka information
  const noOfKidneys = jhonKidney.length; // john ki kidney ka number
  let healthyKidneys = 0;
  //to count the no  of healthy kidney possesed by jhon(without using filter so basically verbose WAY )
  for (let i = 0; i < noOfKidneys; i++) {
    if (jhonKidney[i].healthy) {
      healthyKidneys++;
    }
  }
  const unhealthyKidneys = noOfKidneys - healthyKidneys; // unhealthy kidneys
  res.send(
    "no of kidneys jhon has: " +
      noOfKidneys +
      " heathy kdineys : " +
      healthyKidneys +
      " no of unhealthy Kidneys:" +
      unhealthyKidneys
  );
});

//for the post request we will add a new kidney to the jhon only - and  that person can choose type of kidney one since its a post request the user  will do do post request using body
app.post("/", (req, res) => {
  const newKidney = req.body.kidneyVal[0];
  let token = 0;
  //insert the data for kidney which will change dynamicallly
  if (newKidney && newKidney.healthy == true) {
    token = 1;
    users[0].kidneys.push({
      healthy: true,
    });
  } else if (newKidney && newKidney.healthy == false) {
    users[0].kidneys.push({
      healthy: false,
    });
  }

  //different responses for different kidney insertion
  if (token == 1) {
    res.send("healthy kidney added"); //for healthy kidney
  } else {
    res.send("unhealthy kidney added"); //for healthy kidney
  }
});

//put request
app.put("/", (req, res) => {
  for (let i = 0; i < users[0].kidneys.length; i++) {
    users[0].kidneys[i].healthy = true; // making all the unhealhtyy kidneys to  be healthy
  }
  res.send("all kidneys are healthy now");
});

//coding for the delete request
app.delete("/", function (req, res) {
  //we have to put a check here that if only atleast one kidney is unhealthy then do this else return 411
  if (unhealthykdineyCheck()) {
    const freshkid = []; //fresh naye kidney ke liye kdney
    for (let i = 0; i < users[0].kidneys.length; i++) {
      if (users[0].kidneys[i].healthy) {
        freshkid.push({
          healthy: true,
        });
      }
    }
    users[0].kidneys = freshkid; // fresh kidney ko assign kar diya

    res.send("done bhai sari buri kidney remove kardi");
  } else {
    res.status(411).send("no unhealthy kidney found"); // if no unhealthy kidney foun
  }
});

//function to check that if there is one unhealthykidney

function unhealthykdineyCheck() {
  let atleastoneunhealthy = false;
  for (let i = 0; i < users[0].kidneys.length; i++) {
    if (users[0].kidneys[i].unhealthy) {
      atleastoneunhealthy = true;
    }
  }
  return atleastoneunhealthy;
}
