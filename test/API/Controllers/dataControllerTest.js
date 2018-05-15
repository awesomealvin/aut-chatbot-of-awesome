const assert = require('chai').assert;
const dataController = require('../../../API/Controllers/dataController');

describe('Unit Test Test', function() {
    it('It should return helloWorld to test if the unit tests actually works', function() {
        assert.equal(dataController.helloWorld(),"hello world");
    });
}) ;

