// public/js/appRoutes.js
    angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider',function($routeProvider, $locationProvider) {
    $routeProvider

        // home page
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginController'
        })
        .when('/worklog', {
            templateUrl: 'views/worklog.html',
            controller: 'WorklogController'
        })
        // nerds page that will use the NerdController
        /*.when('/profile', {
            templateUrl: 'views/users.html',
            controller: 'UserController'
        })*/
        .otherwise({
            templateUrl: 'views/home.html',
            controller: 'MainController'
        });

    $locationProvider.html5Mode(true);

}]);