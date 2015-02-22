// app/models/project.js
// load the things we need
var mongoose = require('mongoose');
// define the schema for our user model
var Schema = mongoose.Schema;
var projectSchema = new Schema({
    
    name: String,
    startDate: Date,
    projectOwner: String,
    location: String

});

module.exports = mongoose.model('Project', projectSchema);