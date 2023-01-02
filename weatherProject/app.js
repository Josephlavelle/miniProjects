const https = require("https");
const express = require("express");
const bodyParser = require("body-parser");


const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");

})

app.post("/",function(req,res){
    const apiKey = "dee5e0a00ea6a074a1d4f67ade7d9aad";
    const location = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=" + apiKey+ "&units=metric";
    
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const weatherDescription = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageUrl = "http://openweathermap.org/img/wn/" + icon +"@2x.png"
            res.write("<h1>The weather in "+ location + " is currently: </h1>")
            res.write("<h3>" + Number(temp).toFixed(0) + "C and " + weatherDescription + "</h3>")
            res.write("<img src="+imageUrl+">")
            res.send()
        })
    })
    
})


app.listen(3000,function(){
    console.log("Server is running on port 3000");
})