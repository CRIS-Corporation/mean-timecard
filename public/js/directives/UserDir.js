var UserDirective = angular.module('UserDirective',[]);
UserDirective.directive('user', function() {
    var directive = {};
    
    directive.restrict = 'E'; /* restrict this directive to elements */
    directive.templateUrl = "../views/userdir.html";
    
    return directive;
});
UserDirective.controller('UserDirectiveController',['$rootScope','$scope','$http','$location','Auth','Menu', function($rootScope,$scope,$http,$location,Auth,Menu) {
	$rootScope.$on('$routeChangeSuccess',function(){
		$scope.showMenu = Menu.checkMenu();
	});
	Auth.checkUser(function(data){
		$scope.showMenu = Menu.checkMenu();
		$scope.currentUser = data;
	});
	$scope.logout = function(){
		Auth.logout();
		$scope.showMenu = false;
		$location.url('/login');
		
	}
}]);