var express = require("express");
var app = express();
require("dotenv").config();

// First challenge in basic node and express -log Hello World
console.log("Hello World");

/*  Seond challenge in basic node and express - Send a file (string)
app.get("/", function (req, res) {
  res.sendFile("Hello Express");
}); */

// Third challenge in basic node and express -send HTML file
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// Fourth challenge in basic node and express -Serve Static Assests (middleware functions)
// Middleware syntax - app.use(path, middlewareFunction).
// We must have the "/public" in path before calling express.static for this to work
app.use("/public", express.static(__dirname + "/public"));
module.exports = app;

/* Fifth challenge in basic node and express -Serve JSON on a specific route
app.get("/json", (req, res) => {
  // This means if we add /json to the end of the url of our website the json object will be shown on the screen
  res.json({ message: "Hello json" });
}); */

// Sixth challenge in basic node and express -use the .env File
// need to create a .env file for this to work.
app.get("/json", (req, res) => {
  // Make sure uppercase is a string inside quotes...
  if (process.env.MESSAGE_STYLE === "uppercase") {
    res.json({ message: "HELLO JSON" });
  } else {
    res.json({ message: "hello json" });
  }
});
