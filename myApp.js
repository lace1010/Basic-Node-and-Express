var express = require("express");
var app = express();

// First challenge in basic node and express -log Hello World
console.log("Hello World");

/*  Seond challenge in basic node and express - Send a file (string)
app.get("/", function (req, res) {
  res.sendFile("Hello Express");
}); */

// Third challenge in basic node and express -send HTML file
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// Fourth challenge in basic node and express -Serve Static Assests (middleware functions)
// Middleware syntax - app.use(path, middlewareFunction).
// We must have the "/public" in path before calling express.static for this to work
app.use("/public", express.static(__dirname + "/public"));
module.exports = app;

// Fifth challenge in basic node and express -Serve JSON on a specific route
app.get("/json", (req, res) => {
  res.json({ message: "Hello json" });
});
