const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

//dumb way of doing input validation and authentication
app.use(bodyParser.json());

app.get("/", function (req, res) {
    const username = req.headers.username;
    const password = req.headers.password;
    const kidneyId = parseInt(req.query.kidneyId); // ensure it's a number


    //Authentication logic - checkpoint 1
    if (!(username === "ashutosh" && password === "pass")) {
        res.status(403).json({msg: "brother either username or the password is incorrect"});
        return;
    }

    //input validation - checkpoint -2
    if (kidneyId !== 1 && kidneyId !== 2) {
        res.status(400).json({msg: "hey something wrong with param"});
        return;
    }

    res.json({msg: "hey your kidneys are fine"});
});

// Move this to the end, after all route definitions
app.listen(port, function () {
    console.log("server listening at port " + port);
});


/* so this way of input validation and authentication is not good as it violates the DRY prinnciple and as  if there
are 20 routes where i need to do input validation  then ill have to write this same peices of code at 20 plces
* */

/* or better solutions are
creating wrapper function
whenever  i need to do the authetication  i will just  call the function which will have the logic and that will do thet job
*/