// public/js/controllers/ProjectCtrl.js
var ProjectCtrl = angular.module('ProjectCtrl', []);
ProjectCtrl.controller('ProjectController', ['$scope','$http','Auth','Project',function($scope,$http,Auth,Project) {

	Auth.checkUser(function(data){
		$scope.currentUser = data;
	});
	Project.get(function(data){
		$scope.projects = data;
	});
	$scope.sendData = function() {
  		$http({
	  		method  : 'POST',
	  		url     : '/api/projects',
	  		data    : $scope.entryData  // pass in data as strings
	  		//headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
 		})
	  	.success(function() {
	    	Project.get(function(data){
				$scope.projects = data;
				$scope.entryData = {};
			});
	    })
  	}
}]);