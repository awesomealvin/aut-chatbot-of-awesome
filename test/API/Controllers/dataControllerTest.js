const assert = require('chai').assert;
const dataController = require('../../../API/Controllers/dataController');

describe('Unit Test Test', function() {
    it('It should return helloWorld to test if the unit tests actually works', function() {
        assert.equal(dataController.helloWorld(),"hello world");
    });
}) ;



// describe('getPaper', function () {

//     var fs = require('fs');
//     var req = JSON.parse(fs.readFileSync('./test/API/Controllers/getPaperTest.json'));

//     var res = JSON.parse(fs.readFileSync('./test/API/Controllers/getPaperResponse.json'));

//     var out = dataController.processRequest(req, res);
//     console.log("OUT = " + out);

//     it('It should return the correct JSON file if unit test works',function () {
//         assert.equal(dataController.processRequest(req, res), res)
//     });

// });

describe('Database Connection', function () {
    it('The database should connect successfully', function () {
        var MongoClient = require('mongodb').MongoClient;
        var url = "mongodb://ping:ping@ds117070.mlab.com:17070/chatbot";
        MongoClient.connect(url, function (err, db) {
            assert.equal(err, null);
        });        
    })
})

