// public/js/controllers/MainCtrl.js
var MainCtrl =angular.module('MainCtrl', []);
MainCtrl.controller('MainController', ['$scope','$http','Auth',function($scope,$http,Auth) {
	
	Auth.checkUser(function(data){
		$scope.currentUser = data;
	});
    $scope.tagline = 'To the moon and back!';   
    var getUsers = function(){
		$http.get('http://localhost:3000/api/users')
	    		.success(function(data) {
	            	$scope.users = data;
	        	}
        	);
	}
	getUsers();
}]);