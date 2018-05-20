'use strict';

// const done = require('chai').done;
const assert = require('chai').assert;
const jsonEqual = require('chai').chaiJsonEqual;
const chai = require('chai');
const expect = chai.expect;
// const deep = require('chai').deep;
const to = require('chai').to;
chai.use(require('chai-http'));
const end = require('chai').end;
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

    it('It should return the correct JSON file if unit test works',function (done) {

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
            // if (res.body == response) {
            //     console.log("THEY THE SAME");
            // }
            // assert.to.deep.equal(res.body, response);
            // expect(res.body).to.jsonEqual(response);
            // expect(JSON.stringify(res.body)).to.equal(JSON.stringify(response));
            // expect("a").to.equal("f");
            // expect(res.body).to.be.null;
            // assert.equal(1, 5); 
            expect(res.body).to.deep.equal(response);
            
            done();
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

