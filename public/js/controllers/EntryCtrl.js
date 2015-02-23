// public/js/controllers/UserCtrl.js
var EntryCtrl = angular.module('EntryCtrl', []);
EntryCtrl.controller('EntryController', ['$scope','$http','Auth','Worklog',function($scope,$http,Auth,Worklog) {
	$scope.entryData = {};
	Auth.checkUser(function(data){
		$scope.currentUser = data;
	});
	Worklog.get(function(data){
		$scope.worklogs = data;
	});
	/*$scope.submit = function(){
		$scope.entryData = {
			'startTime': $scope.startTime,
			'endTime': $scope.endTime,
			'project': $scope.project
		};
		alert(JSON.stringify(worklog));
		Worklog.post(worklog);
		Worklog.get(function(data){
			$scope.worklogs = data;
		});
	}*/
	$scope.sendData = function() {
  		$http({
	  		method  : 'POST',
	  		url     : '/api/worklogs',
	  		data    : $scope.entryData  // pass in data as strings
	  		//headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
 		})
	  	.success(function() {
	    	Worklog.get(function(data){
				$scope.worklogs = data;
				$scope.entryData = {};
			});
	    })
  	}
}]);