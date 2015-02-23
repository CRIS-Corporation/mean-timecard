// public/js/controllers/UserCtrl.js
var WorklogCtrl = angular.module('WorklogCtrl', []);
WorklogCtrl.controller('WorklogController', ['$scope','$http','Auth','Worklog',function($scope,$http,Auth,Worklog) {

	Auth.checkUser(function(data){
		$scope.currentUser = data;
	});
	Worklog.get(function(data){
		$scope.worklogs = data;
		alert($scope.worklogs);
	});


}]);