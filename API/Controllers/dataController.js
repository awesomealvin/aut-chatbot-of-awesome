'use strict';
var mongoose = require('mongoose');
var paperInfo = mongoose.model('paperInfo');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://ping:ping@ds117070.mlab.com:17070/chatbot"

exports.processRequest = function (req, res) {
    if (req.body.queryResult.action == "getPaper") {
        getPaper(req, res)
    }
};

function getPaper(req, res) {
    let paperToSearch = req.body.queryResult && req.body.queryResult.parameters && req.body.queryResult.parameters.allPapers ? req.body.queryResult.parameters.allPapers : 'Unknown';

    console.log(paperToSearch);

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("chatbot");
        dbo.collection("papers").find({_id: paperToSearch}).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);

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

function getMajorPaper(req, res){
  let majorToSearch = req.body.queryResult && req.body.queryResult.parameters && req.body.queryResult.parameters.allMajors ? req.body.queryResult.parameters.allMajors : 'Unknown';

  MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("chatbot");
      dbo.collection("major").find({_id: majorToSearch}).toArray(function (err, result) {
          if (err) throw err;
          console.log(result);

          if (result.length != 0) {

              if (result[0]._id == majorToSearch) {
                  return res.json({
                      'fulfillmentText': "Answer"
                  });
              }
          }
          else{
              return res.json({
                  speech: "that is not a major we offer",
                  fulfullmentText: "that is not a major we offer",
                  source: 'team info1'
              });
          }

          db.close();
      });
  });
}


/*
function getPaper(req, res) {
    let paperToSearch = req.body.queryResult && req.body.queryResult.parameters && req.body.queryResult.parameters.allPapers ? req.body.queryResult.parameters.allPapers : 'Unknown';
    paperInfo.find({_id:"COMP500"}, function (err, paperExists) {
        console.log(paperExists);
        if (err) {
            return res.json({
                speech: 'Something went wrong!',
                displayText: 'Something went wrong!',
                source: 'team info1'
            });
        }
        if (paperExists) {
            console.log(paperExists.year);
            return res.json({
                speech: paperExists.name,
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
*/
