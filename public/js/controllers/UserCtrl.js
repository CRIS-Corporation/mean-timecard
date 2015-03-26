// public/js/controllers/UserCtrl.js
var UserCtrl = angular.module('UserCtrl', []);
UserCtrl.controller('UserController', function($scope) {

    var getUsers = function(){
		$http.get('http://localhost:3000/api/users')
	    		.success(function(data) {
	            	return data;
	        	}
        	);
	}
	$scope.users = getUsers();

});