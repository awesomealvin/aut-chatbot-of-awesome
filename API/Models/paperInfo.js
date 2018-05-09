var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var paperInfo = new Schema({
  _id: String,
  paperName: String,
  semesters: {
    s1c: Boolean,
    s1s: Boolean,
    s2c: Boolean,
    s2s: Boolean
  },
  year: String,
  preReq: String,
  coReq: String,
  major: String,
  value: String
});

module.exports = mongoose.model('paperInfo', paperInfo);
