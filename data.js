var mongoose = require('mongoose');

var User = require('./app/models/user.js');
var WorkLog = require('./app/models/workLog.js');


exports.createWorkLog = function(req,res,next){
	var newWorkLog = new WorkLog();
	var currentDate = new Date;
	currentDate.setUTCHours(currentDate.getUTCHours() -8);
	console.log('Made Log');
	// set all of the relevant information
	newWorkLog.createdTime = currentDate.getTime();
	console.log('Set Date');
	newWorkLog.startTime = req.body.startTime;
	console.log('Set Start Time');
	newWorkLog.endTime  = req.body.endTime;
	console.log('Set End Time');
	newWorkLog.worker = req.user.google.name;
	console.log('Set Name');
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
