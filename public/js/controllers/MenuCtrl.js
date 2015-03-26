// public/js/controllers/MenuCtrl.js
var MenuCtrl = angular.module('MenuCtrl',[]);
MenuCtrl.controller('MenuController',['$rootScope','$scope','$http','$location','Auth','Menu', function($rootScope,$scope,$http,$location,Auth,Menu) {
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