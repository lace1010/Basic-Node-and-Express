const { json } = require("body-parser");
var express = require("express");
var app = express();
require("dotenv").config(); // Be sure to put this at top of page to load first
// Make sure to add config variables to heroku in the settings config vars section

var bodyParser = require("body-parser");

// --> 7) Mount the logger middleware here
// We put this logger middlware first because we want it to log for all routes.
app.use((req, res, next) => {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next(); // If next() is not called then your servel will be stuck forever. (Essentially ends the loop)
});

// -->11) Mount the body-parser middleware here. We want middleware functions to be before routes so it works on all routes

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json()); // In order to parse JSON data sent in the POST request,

//** 1) -log Hello World
console.log("Hello World");

/** 2) First Working Express Server (Send a file (string))
app.get("/", function (req, res) {
  res.sendFile("Hello Express");
}); */

//** 3) Serve an HTML file
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

//** 4) Serve Static Assests (middleware functions)
// Middleware syntax - app.use(path, middlewareFunction).
// We must have the "/public" in path before calling express.static for this to work
app.use("/public", express.static(__dirname + "/public"));

/** 5) Serve JSON on a specific route
app.get("/json", (req, res) => {
  // This means if we add /json to the end of the url of our website the json object will be shown on the screen
  res.json({ message: "Hello json" });
}); */

//** 6) use the .env File
// need to create a .env file for this to work.
console.log(process.env.MESSAGE_STYLE, " <= message style");
app.get("/json", (req, res) => {
  var jsonResponse = { message: "Hello json" };
  // Make sure uppercase is a string inside quotes...
  if (process.env.MESSAGE_STYLE === "uppercase") {
    jsonResponse.message = jsonResponse.message.toUpperCase();
  }
  res.json(jsonResponse);
});

//** 7) Implement a Root-Level Request Logger Middleware
// This challenge has to be placed before routes in order to work

//** 8) Chain Middleware to Create a Time Server
app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.json({ time: req.time });
  }
);

//** 9) Get Route Parameter Input from the Client
app.get("/:word/echo", (req, res) => {
  // So in url we can add to our heroku url /anyWordWeWant/echo. Then word will be whatever that word is.
  let word = req.params.word; // req.params = {word: :word} (:word is any word that is put in that url). Thus to get just the word we need to call the key inside the object given from req.params. We do this by using dot notation. e.g. req.params.word
  // In the heroku url with the added /anyWordWeWant/echo. We will respond with this json object with {"echo":"anyWordWeWany"}
  res.json({ echo: word });
});

//** 10) Get Query Parameter Input from the Client
// /name?first=<firstname>&last=<lastname>
app.get("/name", (req, res) => {
  res.json({ name: req.query.first + " " + req.query.last });
});

//** 11) Use body-parser to Parse POST Requests
//Must place it before all of the routes

//** 12) Get data form POST
app.post("/name", (req, res) => {
  // This will be called on when a name in the form is submitted
  res.json({ name: req.body.first + " " + req.body.last });
});

// This last line of code was hesre when I cloned it over
module.exports = app;
