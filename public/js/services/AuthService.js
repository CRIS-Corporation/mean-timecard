var AuthService = angular.module('AuthService', []);
AuthService.factory('Auth', ['$location','$http', function($location,$http) {
    return{
    	checkUser: function (callback) {
    		$http.get('http://localhost:3000/loggedin')
	    		.success(function(data) {
	            	if (data=='401'){
	            		$location.url('/login');
	            	}
	            	else
	            	{
	            		callback(data);
	            	}
	        	});
		},
		logout: function(){
			$http.get('http://localhost:3000/logout')
	    		.success(function(data) {
	            	$location.url('/login');
	        	});
		}
	}
}]);