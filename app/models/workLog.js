// app/models/workLog.js
// load the things we need
var mongoose = require('mongoose');
// define the schema for our user model
var Schema = mongoose.Schema;
var workLogSchema = new Schema({
    
    createdTime : Date,
    startTime : String,
    endTime: String,
    worker: String,
    project: String

});

module.exports = mongoose.model('WorkLog', workLogSchema);