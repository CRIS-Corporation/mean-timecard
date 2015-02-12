// app/models/workLog.js
// load the things we need
var mongoose = require('mongoose');
// define the schema for our user model

var workLogSchema = mongoose.Schema({
    
    startTime : Date,
    endTime: Date,
    worker: String,
    project: String

});

module.exports = mongoose.model('workLog', workLogSchema);