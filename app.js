const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");


const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
    const fName = req.body.firstName;
    const lName = req.body.lastName;
    const email = req.body.email;

    const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: fName,
                LNAME: lName
            }
        }]
    }
    const jsonData = JSON.stringify(data);

    const url = "https://us5.api.mailchimp.com/3.0/lists/8aa383a0a7";

    const options = {
        method: "POST",
        auth: "aziz1:6886fff4d24e75d5d695c99c9cf30dae-us5"
    }
    const request = https.request(url, options, function(response) {
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data", function(data) {
            console.log(JSON.parse(data));
        });
    });
    request.write(jsonData);
    request.end();
});

app.post("/failure", function(req, res) {
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function() {
    console.log("server is running on port 3000.");
});


// api key

// 6886fff4d24e75d5d695c99c9cf30dae-us5

// list
// 8aa383a0a7