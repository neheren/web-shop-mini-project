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
db.getProducts(function(products) {
	if(products == null){
		console.log("No products in db adding new ones")
		db.insertIntoDb();
	}
});

// Define a route that renders the index view
app.get("/", function (req, res) {
	db.getProducts(function(products) {
		console.log(products);
		res.render("index.html", {products});
	});
});

app.get('/product/:id', function(req, res){
	id = req.params.id;
	console.log(id)
	if(id== null){
		res.redirect('/404')
	}
	db.getProduct(id, function(product){
		console.log({product});
		res.render("product.html", {product});
	});
})

app.get('/404', function(req, res){
	res.send('404')
})

app.listen(3000); 