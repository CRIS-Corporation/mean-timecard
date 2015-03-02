var mongoose = require('mongoose');

var User = require('./app/models/user.js');
var WorkLog = require('./app/models/workLog.js');
var Project = require('./app/models/project.js');


exports.createWorkLog = function(req,res,next){
	var newWorkLog = new WorkLog();
	var currentDate = new Date;
	currentDate.setUTCHours(currentDate.getUTCHours() -8);
	// set all of the relevant information
	newWorkLog.created.createdTime = currentDate.getTime();
	newWorkLog.created.createdUser = req.user.name;
	newWorkLog.startTime = req.body.startTime.dateObject;
	newWorkLog.endTime  = req.body.endTime;
	newWorkLog.project = req.body.project;
	newWorkLog.worker = req.user.name;
	// save the user
	newWorkLog.save(function(err) {
	    if (err) {
	        console.log('Couldn\'t Save Worklog');
	    }
	    else {
	    	req.workLog = newWorkLog;
	    	console.log('Saved Worklog');
	    	next();
	    }
	});
}

exports.getWorkLogs = function(req,res,next){
        WorkLog.find({},{'worker':1,'project':1,'startTime':1,'endTime':1,'created.createdTime':1},function(err,result){
            if (err) {
                console.log('Work log find was no good');
            }
            else {    
                req.result= result;
                next();
            } 
        });
    }

exports.createProject = function(req,res,next){
	var newProject = new Project();
	var currentDate = new Date;
	//currentDate.setUTCHours(currentDate.getUTCHours() -8);
	// set all of the relevant information
	//newWorkLog.created.createdTime = currentDate.getTime();
	newProject.name = req.body.name;
	newProject.startTime = req.body.startTime;
	//newWorkLog.endTime  = req.body.endTime;
	newProject.location = req.body.location;
	newProject.projectOwner = req.user.name;
	//newWorkLog.worker = req.user.name;
	// save the user
	newProject.save(function(err) {
	    if (err) {
	        console.log('Couldn\'t Save Project');
	    }
	    else {
	    	req.project = newProject;
	    	console.log('Saved Project');
	    	next();
	    }
	});
}
exports.getProjects = function(req,res,next){
        Project.find({},{'name':1,'startTime':1,'projectOwner':1,'location':1},function(err,result){
            if (err) {
                console.log('Project find was no good');
            }
            else {    
                req.result= result;
                next();
            } 
        });
    }
