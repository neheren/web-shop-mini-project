const database = require('./db');
var express = require("express");
const consolidate = require("consolidate");
const Handlebars = require("handlebars");
var app = express();

database.insertIntoDb();
db = database.startConnection;



// Configure the Handlebars engine
app.engine("html", consolidate.handlebars);
app.set("view engine", "html");
app.set("views", __dirname + "/views");


// Define a route that renders the index view
app.get("/", function (req, res) {
    res.render("index.html", {
        hello: "Hello",
        world: "World"
    });
});

app.listen(3000);