//learning about the things like name and password verification through headers
const express = require ('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.listen(port  , function(req , res ){
    console.log({
        msg: "server listening at port " + port
    })
})


app.post ("/", function (req,res){

})