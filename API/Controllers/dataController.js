'use strict';
var mongoose = require('mongoose');
var paperInfo = mongoose.model('paperInfo');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://ping:ping@ds117070.mlab.com:17070/chatbot"

exports.processRequest = function (req, res) {
    if (req.body.queryResult.action == "getPaper") {
        getPaper(req, res)
    } else if (req.body.queryResult.action == "preReq") {
        preReq(req, res);
    } else if (req.body.queryResult.action == "coReq") {
        coReq(req, res);
};

function preReq(req, res) {
    let paperToSearch = req.body.queryResult && req.body.queryResult.parameters && req.body.queryResult.parameters.allPapers ? req.body.queryResult.parameters.allPapers : 'Unknown';

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("chatbot");
        dbo.collection("papers").find({_id: paperToSearch}).toArray(function (err, result) {
            if (err) throw err;
            // console.log(result);

            if (result.length != 0) {

                if (result[0]._id == paperToSearch) {

                    var name = result[0]._id+", " + result[0].paperName;

                    // If there prerequisite value is NOT empty
                    if (result[0].preReq) {
                        var output = "The pre-requisite(s) for " +  name + " are "+result[0].preReq +".";

                        return res.json({
                            'fulfillmentText': output,
                        });
                    } else {
                        var output = name+" does not have any pre-requisites.";
                        return res.json({
                            'fulfillmentText': output,
                        });
                    }
                   
                }
            }
            else{
                return res.json({
                    'fulfillmentText': "That is not a paper that we offer.",
                });
            }

            db.close();
        });
    });
    
}

function coReq(req, res) {
    let paperToSearch = req.body.queryResult && req.body.queryResult.parameters && req.body.queryResult.parameters.allPapers ? req.body.queryResult.parameters.allPapers : 'Unknown';

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("chatbot");
        dbo.collection("papers").find({_id: paperToSearch}).toArray(function (err, result) {
            if (err) throw err;
            // console.log(result);

            if (result.length != 0) {

                if (result[0]._id == paperToSearch) {

                    var name = result[0]._id+", " + result[0].paperName;

                    // If there prerequisite value is NOT empty
                    if (result[0].coReq) {
                        var output = "The co-requisite(s) for " +  name + " are "+result[0].coReq +".";

                        return res.json({
                            'fulfillmentText': output,
                        });
                    } else {
                        var output = name+" does not have any co-requisites.";
                        return res.json({
                            'fulfillmentText': output,
                        });
                    }
                   
                }
            }
            else{
                return res.json({
                    'fulfillmentText': "That is not a paper that we offer.",
                });
            }

            db.close();
        });
    });
    
}

function getPaper(req, res) {
    let paperToSearch = req.body.queryResult && req.body.queryResult.parameters && req.body.queryResult.parameters.allPapers ? req.body.queryResult.parameters.allPapers : 'Unknown';

    // console.log(paperToSearch);

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("chatbot");
        dbo.collection("papers").find({_id: paperToSearch}).toArray(function (err, result) {
            if (err) throw err;
            // console.log(result);

            if (result.length != 0) {

                if (result[0]._id == paperToSearch) {
                    return res.json({
                        'fulfillmentText': "Answer"
                    });
                }
            }
            else{
                return res.json({
                    speech: "that is not a paper we offer",
                    fulfullmentText: "that is not a paper we offer",
                    source: 'team info1'
                });
            }

            db.close();
        });
    });
}
}