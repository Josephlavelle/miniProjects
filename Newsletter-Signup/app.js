const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const request = require("request");
const e = require("express");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res){
    const listId = "4c38939faf";
    const apiKey = "87a18e803ec50c1ec8620d2d6cf9c7c9-us21";
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);
    const url = "https://us21.api.mailchimp.com/3.0/lists/"+listId;
    const options = {
        method:"POST",
        auth: "joeL:"+apiKey
    }
    const request = https.request(url,options,function(response){

        if(response.statusCode=== 200){
            res.sendFile(__dirname + "/success.html");
        }else{
            res.sendFile(__dirname + "/failure.html");
        }
        console.log(data);
    })
    //request.write(jsonData);
    request.end();
})

app.post("/failure",function(req,res){
    res.redirect("/");
})
app.listen(3000,function(){
    console.log("Server Running On Port 3000");
})