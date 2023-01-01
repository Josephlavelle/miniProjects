const bodyParser = require("body-parser");
const express = require("express");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
})
app.post("/", function(req,res){
    res.send("The result of the calculation is " + (Number(req.body.num1) + Number(req.body.num2)));
})

app.listen(3000, function(){
    console.log("Server started on port 3000");
})