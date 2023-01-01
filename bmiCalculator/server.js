const bodyParser = require("body-parser");
const express = require("express");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
})
app.post("/", function(req,res){
    var height = Number(req.body.height);
    var weight = Number(req.body.weight);
    var bmi = weight/((height/100)*(height/100))
    if (bmi > 24.5){
        res.send("Your BMI is " + bmi.toFixed(2) + " which is overweight.");
    }else if (bmi <24.5 && bmi > 19){
        res.send("Your BMI is " + bmi.toFixed(2) + " which is normal.");
    } else {
        res.send("Your BMI is " + bmi.toFixed(2) + " which is underweight.");
    }
})

app.listen(3000, function(){
    console.log("Server started on port 3000");
})