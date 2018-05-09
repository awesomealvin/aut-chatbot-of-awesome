'use strict';
var mongoose = require('mongoose');
var paperInfo = mongoose.model('paperInfo');

exports.processRequest = function (req, res) {
    if (req.body.queryResult.action == "getPaper") {
        getPaper(req, res)
    }
};


function getPaper(req, res) {
    let paperToSearch = req.body.queryResult && req.body.queryResult.parameters && req.body.queryResult.parameters.allPapers ? req.body.queryResult.parameters.allPapers : 'Unknown';
    paperInfo.find({_id:paperToSearch}, function (err, paperExists) {
        if (err) {
            return res.json({
                speech: 'Something went wrong!',
                displayText: 'Something went wrong!',
                source: 'team info1'
            });
        }
        if (paperExists) {
            return res.json({
                speech: paperExists.year,
                displayText: paperExists.year,
                source: 'team info2'
            });
        }
        else {
            return res.json({
                speech: 'Currently I am not having information about this team',
                displayText: 'Currently I am not having information about this team',
                source: 'team info3'
            });
        }
    });
}