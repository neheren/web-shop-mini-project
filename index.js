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
	console.log("smagen " + products.length)
	if(products.length == 0){
		console.log("No products in db adding new ones")
		db.insertIntoDb();
	}else{
		console.log("products already in db")
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
		return res.redirect('/404')
	}
	db.getProduct(id, function(product, err){
		if(err)
			return res.redirect('/404')
		
		console.log({product});
		res.render("product.html", {product});
	});
})
app.get('/about', function(req, res){
	res.render("about.html");
})

app.get('/cart', function(req, res){
	res.render("cart.html");
})
app.get('/contact', function(req, res){
	res.render("contact.html");
})

app.get('/404', function(req, res){
	res.send('404');
})

app.get('*', function(req, res){
	res.redirect('/404')
})


app.listen(3000); 