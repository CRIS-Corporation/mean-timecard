angular.module('LoginService', []).factory('Login', ['$http', function($http) {

    return{
    	login: function () {
    		$http.get('http://localhost:3000/auth/google').success(function(data) {
            	return(data);
        });
}
}

}]);
