var AdminService = angular.module('AdminService', []);
AdminService.factory('Admin', ['$location','$http', function($location,$http) {
    return{
    	checkAdmin: function (callback) {
    		$http.get('http://localhost:3000/checkadmin')
	    		.success(function(data) {
	            	if (data=='401'){
	            		$location.url('/');
	            	}
	            	else
	            	{
	            		callback(data);
	            	}
	        	});
		}
	}
}]);