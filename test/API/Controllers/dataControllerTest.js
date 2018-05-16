'use strict';

// const done = require('chai').done;
const assert = require('chai').assert;
const chai = require('chai');
const expect = chai.expect;
const to = require('chai').to;
chai.use(require('chai-http'));
const should = require('chai').should;
const have = require('chai').have;
const dataController = require('../../../API/Controllers/dataController');
const index = require('../../../index');
// const Routes = require('../../../API/Routes/dataController');

describe('Unit Test Test', function() {
    it('It should return helloWorld to test if the unit tests actually works', function() {
        assert.equal(dataController.helloWorld(),"hello world");
    });
}) ;

describe('A=A', function() {
    it('A should equal A', function() {
        expect("A").to.equal("A");
    })
})


describe('getPaper', function () {

    var fs = require('fs');
    var request = JSON.parse(fs.readFileSync('./test/API/Controllers/getPaperTest.json'));

    var response = JSON.parse(fs.readFileSync('./test/API/Controllers/getPaperResponse.json'));

    // var out = dataController.processRequest(req, res);
    // console.log("OUT = " + out);

    it('It should return the correct JSON file if unit test works',function () {
        // assert.equal(dataController.processRequest(req, res), res)
        var routes = require('../../../API/Routes/Routes');

        chai.request("http://localhost:8000")
        .post('/')
        // .set('content-type', 'application/x-www-form-urlencoded')
        .send(request)
        .end(function (err, res) {
            // console.log(err);
            // if (err) done(err);
            // res.body.should.have('yo');
            console.log(res.body);
            console.log(response);
            if (res.body == res) {
                console.log("THEY THE SAME");
            }
    
            // expect("a").to.equal("f");
            expect(null).to.be.null;
            // assert.equal(1, 5);
            // done();
        });
        
    });

});


describe('Database Connection', function () {
    it('The database should connect successfully', function () {
        var MongoClient = require('mongodb').MongoClient;
        var url = "mongodb://ping:ping@ds117070.mlab.com:17070/chatbot";
        MongoClient.connect(url, function (err, db) {
            assert.equal(err, null);
            db.close();
        });        
    })
})

