const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const mongo = require('mongodb');

// Connection URL
const url = 'mongodb://localhost:27017';
 
// Database Name
const dbName = 'web-shop';
 
// Use connect method to connect to the server

function insertIntoDb(){
	MongoClient.connect(url, function(err, client) {
		assert.equal(null, err);
		console.log("Connected to db");
        const db = client.db(dbName);
        db.collection("products").drop(function(err, delOK) {
            db.collection("products").insertMany([
                { item: "Black Sweatshirt Billionaire Bays Club", desc: "Featuring printed Billionaire Boys Club logo and on front chest.", img: "../images/Image_1.jpg", mat: "Made of 100% cotton", qty: 25, size: ["Small","Medium","Large"], price: "DKK 500,00"},
                { item: "Grey Sweatshirt Billionaire Bays Club", desc: "Featuring printed Billionaire Boys Club logo and on front chest.", img: "../images/Image_2.jpg", mat: "Made of 100% cotton", qty: 25, size: ["Small","Medium"], price: "DKK 500,00"},
                { item: "White T-Shirt Billionaire Bays Club", desc: "Featuring printed Billionaire Boys Club logo and on front chest.", img: "../images/Image_3.jpg", mat: "Made of 100% cotton", qty: 25, size: ["Small"], price: "DKK 300,00" },
                { item: "Grey T-Shirt Billionaire Bays Club", desc: "Featuring printed Billionaire Boys Club logo and on front chest.", img: "../images/Image_4.jpg", mat: "Made of 100% cotton", qty: 25, size: ["Small"], price: "DKK 300,00" },
                { item: "Black Long Sleeve T-Shirt Billionaire Bays Club", desc: "Featuring orange gradient Billionaire Boys Club print.", img: "../images/Image_5.jpg", mat: "Made of 100% cotton", qty: 25, size: ["Small","Medium","Large"], price: "DKK 400,00" },
                { item: "Red T-Shirt Billionaire Bays Club", desc: "Featuring printed Billionaire Boys Club logo and on front chest.", img: "../images/Image_6.jpg", mat: "Made of 100% cotton", qty: 25, size: ["Large"], price: "DKK 300,00" },
                { item: "Sand Shirt Libertine Libertine", desc: "Sand coloured loose fit shirt featuring two flap chest pockets.", img: "../images/Image_7.jpg", mat: "Made of 70% cotton, 30% polyester", qty: 25, size: ["Small","X-Medium","X-Large"], price: "DKK 600,00" },
                { item: "Navy Shirt Libertine Libertine", desc: "Navy coloured loose fit shirt featuring two flap chest pockets.", img: "../images/Image_8.jpg", mat: "Made of 70% cotton, 30% polyester", qty: 25, size: ["Small","Medium","Large"], price: "DKK 600,00" },
                { item: "White T-Shirt Libertine Libertine", desc: "Featuring navy cloud and thunder embroidery on chest. ", img: "../images/Image_9.jpg", mat: "Made of 100% cotton", qty: 25, size: ["Small","Medium","Large"], price: "DKK 300,00" },
            ]);
            client.close();
        });
	});
}

function getProducts(callback){
    MongoClient.connect(url, function(err, client) {
		assert.equal(null, err);
		const db = client.db(dbName);
        db.collection("products").find({}).toArray(function(err, result) {
            callback(result);
            if (err) throw err;
            client.close();
        });
	});
}

function getProduct(id, callback){
    MongoClient.connect(url, function(err, client) {
		assert.equal(null, err);
        const db = client.db(dbName);
        try{
            oid = new mongo.ObjectID(id);
        }
        catch(err){
            return callback("", err);
        }
        db.collection("products").findOne({_id: oid} ,function(err, result) {
            callback(result);
            if (err) throw err;
            client.close();
        });
	});
}

module.exports = {
    insertIntoDb,
    getProducts,
    getProduct,
}