'use strict';
var mongoose = require('mongoose');
var paperInfo = mongoose.model('paperInfo');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://ping:ping@ds117070.mlab.com:17070/chatbot"

exports.processRequest = function (req, res) {
    if (req.body.queryResult.action == "getPaper") {
        getPaper(req, res)
    }
    else if(req.body.queryResult.action == "getMajorPaper"){
      getMajorPaper(req, res)
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


function getMajorPaper(req, res){
  let majorToSearch = req.body.queryResult && req.body.queryResult.parameters && req.body.queryResult.parameters.allMajors ? req.body.queryResult.parameters.allMajors : 'Unknown';

  MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("chatbot");
      dbo.collection("papers").find({major: majorToSearch}).toArray(function (err, result) {
          if (err) throw err;
          console.log(result);
    // needs to loop through all results and list all paper names
          if (result.length != 0) {
              var count = 0;
              var num = 0;
              var final = "";
              while(count < result.length){
                  if (result[count].major == majorToSearch) {
                      num++;
                      if(num == 1){
                          final = "The papers required for that major are: "+result[count]._id;
                      }else{
                          final = final + ", " + result[count]._id;
                      }
                  }
                  count++;
              }
              return res.json({
                  'fulfillmentText': final+"."
              });
          }
          else{
              return res.json({

                  'fulfullmentText' : "that is not a major we offer"
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

            var returnString = "";

            if (result.length != 0) {

                if (result[0]._id == paperToSearch) {


                    if(result[0].major == "core")
                    {
                        returnString = "It is a core paper."
                    }
                    else if(result[0].major == "Software Development"){
                        returnString = "It is in the Software Developemnt major.";
                    }
                    else{
                        returnString = "";
                    }


                    return res.json({
                        'fulfillmentText': "Yes, " +paperToSearch +" is a paper that the university offers. \n" +returnString
                    });
                }
            }
            else{
                return res.json({
                    'fulfillmentText': "No, " +paperToSearch +" is not a paper that the university offers."
                });
            }

            db.close();
        });
    });
}
}