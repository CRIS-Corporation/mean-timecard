var User = require('./app/models/user.js');
var mongoose = require('mongoose');

var workLogSchema = mongoose.Schema({
    
    startTime : Date,
    endTime: Date,
    worker: String,
    project: String

});

module.exports = mongoose.model('workLog', workLogSchema);