// public/js/controllers/MainCtrl.js
var MainCtrl =angular.module('MainCtrl', []);
MainCtrl.controller('MainController', ['$scope','$http','Auth',function($scope,$http,Auth) {
	Auth.checkUser(function(data){
		$scope.currentUser = data;
	});
}]);