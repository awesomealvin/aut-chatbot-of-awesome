'use strict';

/**
 * Declorations for server functions
 */

var express  = require('express'),
bodyParser   = require('body-parser'),
http         = require('http'),
config       = require('./config'),
server       = express(),
mongoose     = require('mongoose'),
paperInfo     = require('./API/Models/paperInfo');


mongoose.Promise = global.Promise;
mongoose.connect(config.dbUrl);

/**
 * File called when server stars.
 * registers routes with the server and listens for requests at port:8000.
 * Enables the acceptance of JSON files as requests to the server.
 * @author Thom Bilton
 */

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
var routes = require('./API/Routes/Routes'); //importing route
routes(server); //register the route
server.listen((process.env.PORT || 8000), function () {
    console.log("Server is up and listening on port" + process.env.PORT);
});
