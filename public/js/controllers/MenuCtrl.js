// public/js/controllers/MenuCtrl.js
var MenuCtrl = angular.module('MenuCtrl',[]);
MenuCtrl.controller('MenuController',['$scope','$http','$location','Auth', function($scope,$http,$location,Auth) {
	$scope.showMenu = false;
	$scope.$watch('$location.path()',function(){
		if ($location.path() != '/login'){
			$scope.showMenu = true;
		}
		else {
			$scope.showMenu = false;
		}
	});
	Auth.checkUser(function(data){
		$scope.currentUser = data;
	});
	$scope.logout = function(){
		Auth.logout();
		$location.url('/login');
		$scope.showMenu = false;
	}
}]);