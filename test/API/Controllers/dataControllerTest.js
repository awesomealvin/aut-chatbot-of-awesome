const assert = require('chai').assert;
const dataController = require('../../../API/Controllers/dataController');

describe('Unit Test Test', function() {
    it('It should return helloWorld to test if the unit tests actually works', function() {
        assert.equal(dataController.helloWorld(),"hello world");
    });
}) ;



describe('getPaper', function () {

    var reqIn = require('test/API/Controllers/getPaperTest.json');
    var req = JSON.parse(reqIn.readFileSync('file', 'utf8'));

    var resIn = require('test/API/Controllers/getPaperResponse');
    var res = JSON.parse(resIn.readFileSync('file', 'utf8'));

    it('It should return the correct JSON file if unit test works',function () {
        assert.equal(dataController.getPaper(req, res), res)
    });

});

