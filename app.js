const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", (req, res) => {
    const dataShortcut = req.body;
    const fName = dataShortcut.fName;
    const sName = dataShortcut.sName;
    const email = dataShortcut.email;

    const userData = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fName,
                    LNAME: sName
                }
            }
        ]
    }

    const jsonData = JSON.stringify(userData);

    const url = "https://us5.api.mailchimp.com/3.0/lists/80acbe9072";

    const options = {
        method: "POST",
        auth: "Maheshpb:9f037c4b15b8dbb32a0d13ebc8f9d4e2-us5"
    }

    const request = https.request(url, options, (response) => {
        console.log(response.statusCode);
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }


        response.on("data", (data) => {
            console.log(JSON.parse(data));
        });
    });
    request.write(jsonData);
    request.end();
});

app.post("/failure", (req,res) => {
    res.redirect("/");
});


app.listen(process.env.PORT ||  3000, () => {    // here 3000 is going to host our app on our localhost and process.env.PORT for heroku login
    console.log("Server is running");
});


// https://git.heroku.com/mahesh-mail-login-app.git


//https://gentle-dawn-16341.herokuapp.com/ | https://git.heroku.com/gentle-dawn-16341.git