'use strict';

/**
 * @author Thom Bilton
 * The controller class for sending requests around the server.
 * When a JSON request is sent to the server address it is routed to /Controllers/dataController and proccessed there.
 * If other routes were needed for other reuqests they would be defined here.
 **/


var express = require('express');
module.exports = function(app) {
  var dataController = require('../Controllers/dataController');
var apiRoutes =  express.Router();
app.get('/',function(req,res){
    res.send('We are happy to see you using Chat Bot Webhook');
  });
// registerUser Route
  app.route('/')
    .post(dataController.processRequest);
};
