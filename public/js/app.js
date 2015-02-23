// public/js/app.js
var crisApp = angular.module('crisApp', ['ngRoute','appRoutes','LoginCtrl','MainCtrl','UserCtrl','WorklogCtrl','AuthService','UserService','WorklogService']);


/*crisApp.controller('MainController', function($scope) {

    $scope.tagline = 'To the moon and back!';   

});
crisApp.controller('UserController', function($scope) {

    //$scope.users = JSON.stringify(UserService.get());
    $scope.tagline = 'Nothing beats a pocket protector!';

});*/