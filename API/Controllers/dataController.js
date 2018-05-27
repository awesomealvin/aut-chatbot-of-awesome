'use strict';
var mongoose = require('mongoose');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://ping:ping@ds117070.mlab.com:17070/chatbot";

/**
 * Function that receives the requests that decides which intent to fall into
 * @author Thom Bilton
 */
module.exports.processRequest = function (req, res) {
    if (req.body.queryResult.action == "getPaper") {
        getPaper(req, res);
    } else if (req.body.queryResult.action == "getMajorPaper") {
        getMajorPaper(req, res)
    } else if (req.body.queryResult.action == "preReq") {
        preReq(req, res);
    } else if (req.body.queryResult.action == "coReq") {
        coReq(req, res);
    } else if (req.body.queryResult.action == "failedPaper") {
        failPaper(req, res);
    } else if (req.body.queryResult.action == "semester") {
        semester(req, res);
    } else if (req.body.queryResult.action == "jobsMajor") {
        majorJobs(req, res);
    }
}

/**
 * A simple function that tests our unit tests
 * @author Alvin Tang
 * @return {string} Hello World!
 */
exports.helloWorld = function () {
    return "hello world";
}

/**
 * Logic for the fail paper question.
 * @author Alvin Tang
 * @return {json} JSON string
 */
function failPaper(req, res) {
    let paperToSearch = req.body.queryResult && req.body.queryResult.parameters && req.body.queryResult.parameters.allPapers ? req.body.queryResult.parameters.allPapers : 'Unknown';

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("chatbot");


        dbo.collection("papers").find().toArray(function (err, result) {
            var postRequisites = [];

            result.forEach(element => {
                var str = String(element.preReq);

                // console.log(element.preReq + " | " + paperToSearch);
                if (str.includes(paperToSearch)) {
                    postRequisites.push(element._id);
                }
            });

            if (postRequisites.length != 0) {
                var output = "If you fail " + paperToSearch + ", then you cannot take ";

                for (var i = 0; i < postRequisites.length; i++) {
                    output += postRequisites[i];
                    if (i == postRequisites.length - 1) {
                        output += ".";
                    } else if (i == postRequisites.length - 2) {
                        output += " and ";
                    } else {
                        output += ", ";
                    }
                }

                return res.json({
                    'fulfillmentText': output,
                });
            } else {
                return res.json({
                    'fulfillmentText': "That is not a paper that we offer.",
                });
            }

        });

        db.close();
    });
}

/**
* Logic for the preReq question
* @author Alvin Tang
* @return {json} JSON string
*/
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

                    var name = result[0]._id + ", " + result[0].paperName;

                    // If there prerequisite value is NOT empty
                    if (result[0].preReq) {
                        var output = "The pre-requisite(s) for " + name + " are " + result[0].preReq + ".";

                        return res.json({
                            'fulfillmentText': output,
                        });
                    } else {
                        var output = name + " does not have any pre-requisites.";
                        return res.json({
                            'fulfillmentText': output,
                        });
                    }

                }
            }
            else {
                return res.json({
                    'fulfillmentText': "That is not a paper that we offer.",
                });
            }

            db.close();
        });
    });

}

/**
* Logic to return the answer when a user tries to find out the papers required for a major.
* @author Calli Bates
* @return {json} JSON string
*/
function getMajorPaper(req, res) {
    let majorToSearch = req.body.queryResult && req.body.queryResult.parameters && req.body.queryResult.parameters.allMajors ? req.body.queryResult.parameters.allMajors : "Unknown";

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
                while (count < result.length) {
                    if (result[count].major == majorToSearch) {
                        num++;
                        if (num == 1) {
                            final = "The papers required for that major are: " + result[count]._id;
                        } else {
                            final = final + ", " + result[count]._id;
                        }
                    }
                    count++;
                }
                return res.json({
                    'fulfillmentText': final + "."
                });
            }
            else {
                if (majorToSearch == "Unknown") {
                    return res.json({
                        'fulfillmentText': "Unfortunately, that major does not exist.",
                    });
                } else {
                    return res.json({

                        'fulfillmentText': "Currently, " + majorToSearch + " does not have papers listed.",
                    });
                }

            }

            db.close();
        });
    });
}

/**
* Logic to return the answer when a user tries to find out about what semester and location a paper is offered at
* @author Calli Bates
* @return {json} JSON string
*/
function semester(req, res) {
    let paperToSearch = req.body.queryResult && req.body.queryResult.parameters && req.body.queryResult.parameters.allPapers ? req.body.queryResult.parameters.allPapers : 'Unknown';

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("chatbot");
        dbo.collection("papers").find({_id: paperToSearch}).toArray(function (err, result) {
            if (err) throw err;
            // console.log(result);

            if (result.length != 0) {

                if (result[0]._id == paperToSearch) {

                    var name = result[0]._id + ", " + result[0].paperName;

                    var s1c = result[0].semesters.s1c;
                    console.log(s1c);//these are returning undefined
                    var s1s = result[0].semesters.s1s;
                    console.log(s1s);
                    var s2c = result[0].semesters.s2c;
                    var s2s = result[0].semesters.s2s;

                    //variables for if papers are offered at all in these semesters (regardless of location)
                    var s1 = s1c || s1s;
                    console.log(s1);
                    var s2 = s2c || s2s;

                    //variables for if the papers are offered at both campuses IF they are offered at either
                    //note: if the paper isn't offered at either, true will be returned so only use these
                    //values in the situation that a paper is verified offered during that semester
                    var s1b = s1c && s1s;
                    var s2b = s2c && s2s;

                    if (s1 && s2) {
                        var output = "";
                        if (s1b && s2b) {
                            output = name + " is offered at City and South campuses during both semesters."
                        } else if (s1b) {
                            var resu = "";
                            if (s2c) {
                                resu = "City";
                            } else {
                                resu = "South";
                            }
                            output = name + " is offered at City and South campuses during Semester 1, but only " + resu + " campus during Semester 2.";
                        } else if (s2b) {
                            var resu = "";
                            if (s1c) {
                                resu = "City";
                            } else {
                                resu = "South";
                            }
                            output = name + " is offered at City and South campuses during Semester 2, but only " + resu + " campus during Semester 1.";
                        } else if (s1c) {
                            if (s2c) {
                                output = name + " is offered at the City campus during both semesters.";
                            } else {
                                output = name + " is offered at the City campus in Semester 1 and South campus in Semester 2";
                            }
                        } else if (s1s) {
                            if (s2s) {
                                output = name + " is offered at the South campus during both semesters.";
                            } else {
                                output = name + " is offered at the South campus in Semester 1 and City campus in Semester 2";

                            }
                        } else {
                            output = "error, pls fix me - calli";
                        }
                        console.log("output:" + output);
                        return res.json({
                            'fulfillmentText': output,
                        });
                    } else if (s1) {
                        var output = "";
                        if (s1b) {
                            output = name + " is offered during Semester 1 at both campuses";
                        } else if (s1c) {
                            output = name + " is offered during Semester 1 at the City campus.";
                        } else {
                            output = name + " is offered during Semester 1 at the South campus.";
                        }
                        return res.json({
                            'fulfillmentText': output,
                        });
                    } else if (s2) {
                        var output = "";
                        if (s2b) {
                            output = name + " is offered during Semester 2 at both campuses";
                        } else if (s2c) {
                            output = name + " is offered during Semester 2 at the City campus.";
                        } else {
                            output = name + " is offered during Semester 2 at the South campus.";
                        }
                        return res.json({
                            'fulfillmentText': output,
                        });
                    } else {
                        var output = name + " is not offered at all, unfortunately.";
                        return res.json({
                            'fulfillmentText': output,
                        });
                    }

                }
            }
            else {
                return res.json({
                    'fulfillmentText': "That is not a paper that we offer.",
                });
            }

            db.close();
        });
    });
}

/**
* Logic to return the answer when a user tries to find out the coReq's for a paper
* @author Alvin Tang
* @return {json} JSON string
*/
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

                    var name = result[0]._id + ", " + result[0].paperName;

                    // If there prerequisite value is NOT empty
                    if (result[0].coReq) {
                        var output = "The co-requisite(s) for " + name + " are " + result[0].coReq + ".";

                        return res.json({
                            'fulfillmentText': output,
                        });
                    } else {
                        var output = name + " does not have any co-requisites.";
                        return res.json({
                            'fulfillmentText': output,
                        });
                    }

                }
            }
            else {
                return res.json({
                    'fulfillmentText': "That is not a paper that we offer.",
                });
            }

            db.close();
        });
    });

}

/**
* Logic to return the answer when a user tries to find out if a paper exists
* @author Thom Bilton
* @return {json} JSON string
*/
function getPaper(req, res) {
    let paperToSearch = req.body.queryResult && req.body.queryResult.parameters && req.body.queryResult.parameters.allPapers ? req.body.queryResult.parameters.allPapers : 'Unknown';
    // console.log(paperToSearch);
    var output = "";
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("chatbot");

        dbo.collection("papers").find({_id: paperToSearch}).toArray(function (err, result) {
            if (err) throw err;
            // console.log(result);

            var returnString = "";

            if (result.length != 0) {

                if (result[0]._id == paperToSearch) {


                    if (result[0].major == "core") {
                        returnString = "It is a core paper."
                    }
                    else if (result[0].major == "Software Development") {
                        returnString = "It is in the Software Developemnt major.";
                    }
                    else {
                        returnString = "";
                    }
                    // var result = "Yes, " + paperToSearch + " is an paper that the university offers. \n" + returnString;
                    // output = "{\"fulfillmentText\": \"" + result + "\"}";
                    // res.type('json');
                    // res.send(front);
                    return res.json({
                        'fulfillmentText': "Yes, " + paperToSearch + " is a paper that the university offers. \n" + returnString
                    });
                }
            }
            else {
                res.json({
                    'fulfillmentText': "No, " + paperToSearch + " is not a paper that the university offers."
                });
            }

            db.close();
        });
    });
    // return output;
}

/**
 * Logic to return the answer when a user tries to find out what jobs are available for each major
 * @author Thom Bilton
 * @return {json} a random JSON string, from a set of 3 strings.
 */
function majorJobs(req, res) {
    let majorToSearch = req.body.queryResult && req.body.queryResult.parameters && req.body.queryResult.parameters.allMajors ? req.body.queryResult.parameters.allMajors : 'Unknown';
    let degreeToSearch = req.body.queryResult && req.body.queryResult.parameters && req.body.queryResult.parameters.Degree ? req.body.queryResult.parameters.Degree : 'Unknown';

    let responseNo = getRandomInt(2);


    if (majorToSearch == "Software Development") {

        let responses = [
            "As a software developer you can get into game programming, front end development and application design.",
            "If you finish the software development major you could work for companies like Google, designing and building the next big app.",
            "Jobs that include front end development, application design, full stack development and testing could be interesting for you to look at."
        ]

        res.json({
            'fulfillmentText': responses[responseNo]
        });


    } else if (majorToSearch == "Networks") {
        let responses = [
            "With a major in networking you could become a networks admin or engineer",
            "If your interested in networking an exciting job for you could be a cyber security tester",
            "There are exciting opportunities working for businesses or even the armed forces as a network engineer"
        ]

        res.json({
            'fulfillmentText': responses[responseNo]
        });


    } else if (majorToSearch == "AI") {
        let responses = [
            "You could work with businesses building chatbots like me",
            "You could be interested in working for game businesses building AI for video games",
            "You could work for Google researching machine learning"
        ]

        res.json({
            'fulfillmentText': responses[responseNo]
        });

    } else if (majorToSearch == "CompSci") {
        let responses = [
            "You could become an entrepreneur, be your own boss",
            "If you could get into research",
            "Software and algorithm designer could be your future title"
        ]

        res.json({
            'fulfillmentText': responses[responseNo]
        });

    } else if (majorToSearch == "Service Science") {
        let responses = [
            "You could get a job as a call centre manager",
            "It sounds like you love supporting people, why don't you look at jobs in IT support",
            "A big picture kinda person huh, how about a solutions architect"
        ]

        res.json({
            'fulfillmentText': responses[responseNo]
        });

    } else if (majorToSearch == "Computational Intelligence") {
        let responses = [
            "Sounds like you've got a love for data, why not look for a role as a Data analyst",
            "If you're into business too, a job as a Technical or business analyst would suit you quite nicely",
            "You could become a project leader."
        ]

        res.json({
            'fulfillmentText': responses[responseNo]
        });
    } else if(majorToSearch == "Test Major"){
        res.json({
            "fulfillmentText": "As a Test Major you are helping to check if the function works."
        });
    }

}

/**
 * Generates a random number between 0 and max
 * @author Thom Bilton
 * @param {number} max The max number that can be generated
 * @return {number} The random generated number
 */
function getRandomInt(max) {
    return Math.floor(Math.random() * (max - 0) );
}
