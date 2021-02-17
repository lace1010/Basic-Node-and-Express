var express = require("express");
var app = express();

// First challenge in basic node and express
console.log("Hello World");

/*  Seond challenge in basic node and express
app.get("/", function (req, res) {
  res.sendFile("Hello Express");
}); */

// Third Challenge in basic node and express
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});
module.exports = app;
