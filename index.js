const db = require('./db');
var express = require("express");
const consolidate = require("consolidate");
const Handlebars = require("handlebars");
var app = express();

// Configure the Handlebars engine
app.engine("html", consolidate.handlebars);
app.set("view engine", "html");
app.set("views", __dirname + "/views");
app.use("/", express.static(__dirname + '/'));

//inserting the products into the mongo db. 
db.insertIntoDb();
// Define a route that renders the index view
app.get("/", function (req, res) {
	db.getProducts(function(products) {
		console.log(products)
		res.render("index.html", {products});
	});
});
app.get('/product/:id', function(req, res){
	
})

app.listen(3000); 