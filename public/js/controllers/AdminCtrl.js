// public/js/controllers/AdminCtrl.js
var AdminCtrl = angular.module('AdminCtrl', []);
AdminCtrl.controller('AdminController', ['$scope','$http','Auth','Admin','User','Worklog',function($scope,$http,Auth,Admin,User,Worklog) {
	Admin.checkAdmin(function(data){
		$scope.currentUser = data;
	});
	Worklog.get(function(data){
		$scope.worklogs = data;
	});
	User.get(function(data){
		$scope.users = data;
	});
	$scope.deleteWorklog = function (id) {
		var confirmation = confirm('Delete record: ' + id + '?');
		if (confirmation) {
			Worklog.delete(id,function(){
				Worklog.get(function(data){
					$scope.worklogs = data;
				});
			});
		}
	}
}]);