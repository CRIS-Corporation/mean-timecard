// app/models/worktask.js
// load the things we need
var mongoose = require('mongoose');
// define the schema for our user model
var Schema = mongoose.Schema;
var workTaskSchema = new Schema({
    
    name: String,
    category: String,
    subCategory: String,
    boliGroup: String

});

module.exports = mongoose.model('WorkTask', workTaskSchema);