var mongoose = require('mongoose');

var User = require('./app/models/user.js');
var WorkLog = require('./app/models/workLog.js');


exports.createWorkLog = function(req,res,next){
	var newWorkLog = new WorkLog();
	var currentDate = new Date;
	currentDate.setUTCHours(currentDate.getUTCHours() -8);
	// set all of the relevant information
	newWorkLog.created.createdTime = currentDate.getTime();
	newWorkLog.created.createdUser = req.user.google.name;
	newWorkLog.startTime = req.body.startTime;
	newWorkLog.endTime  = req.body.endTime;
	newWorkLog.project = req.body.project;
	newWorkLog.worker = req.user.google.name;
	// save the user
	newWorkLog.save(function(err) {
	    if (err) {
	        console.log('Couldn\'t Save User');
	    }
	    else {
	    	req.workLog = newWorkLog;
	    	console.log('Saved User');
	    	next();
	    }
	});
}

exports.getWorkLogs = function(req,res,next){
        WorkLog.find({},{'worker':1,'project':1,'startTime':1,'endTime':1},function(err,result){
            if (err) {
                console.log('Find was no good');
            }
            else {    
                console.log(result);
                req.result= result;
                next();
            } 
        });
    }
