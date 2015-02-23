// public/js/controllers/LoginCtrl.js
var LoginCtrl = angular.module('LoginCtrl',[]);
LoginCtrl.controller('LoginController',['$scope','$http', function($scope,$http) {
	$scope.data={};
	$scope.loggedin = function(){
		$http.get('http://localhost:3000/loggedin')
	    		.success(function(data) {
	            	$scope.data=data;
	            	alert(data);
	        	}
        	);
	}
	$scope.logout = function(){
		$http.get('http://localhost:3000/logout')
	    		.success(function(data) {
	            	alert('Logout');
	        	});
	}
	
}]);