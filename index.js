'use strict';

var express  = require('express'),
bodyParser   = require('body-parser'),
http         = require('http'),
config       = require('./config'),
server       = express(),
mongoose     = require('mongoose'),
paperInfo     = require('./API/Models/paperInfo');
//created model loading here
// mongoose instance connection url connection

mongoose.Promise = global.Promise;
mongoose.connect(config.dbUrl);
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
var routes = require('./API/Routes/Routes'); //importing route
routes(server); //register the route
server.listen((process.env.PORT || 8000), function () {
    console.log("Server is up and listening on port" + process.env.PORT);
});

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://ping:ping@ds117070.mlab.com:17070/chatbot"

var result;

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("chatbot");
    dbo.collection("papers").find({_id:'COMP500'}, {_id:0, paperName:1, year:0}).toArray(function(err, result2) {
        if (err) throw err;
        result = result2;
        //console.log(result[0]._id);
        db.close();
    });
});






/*MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var query = { _id: "COMP500" };
    dbo.collection("papers").find(query).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
    });
});*/




