'use strict';
var mongoose = require('mongoose');
var TeamInfo = mongoose.model('paperInfo');

exports.processRequest = function(req, res) {
if (req.body.result.action == "schedule") {
    getTeamSchedule(req,res)
  }
  else if (req.body.result.action == "tell.about")
  {
      getTeamInfo(req,res)
  }
};
