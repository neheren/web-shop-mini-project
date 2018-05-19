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
                { item: "Grøn trøje med ærmer lavet af stof", desc: "Lavet af det pureste stof", qty: 25, size: "large" },
                { item: "Rød trøje med ærmer lavet af stof", desc: "Lavet af det pureste stof", qty: 25, size: "large" },

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
        db.collection("products").findOne({_id: new mongo.ObjectID(id)} ,function(err, result) {
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