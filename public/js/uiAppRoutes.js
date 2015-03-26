// public/js/uiAppRoutes.js
    var uiAppRoutes = angular.module('uiAppRoutes', ['ui.router']);
    uiAppRoutes.config(['$locationProvider','$stateProvider', '$urlRouterProvider',function($locationProvider, $stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider

        // home page
        .state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'LoginController'
        })
        .state('worklog', {
            url: '/worklog',
            templateUrl: 'views/worklog.html',
            controller: 'WorklogController'
        })
        .state('entry', {
            url: '/entry',
            templateUrl: 'views/entry.html',
            controller: 'EntryController'
        })
        .state('admin', {
            url: '/admin',
            templateUrl: 'views/admin.html',
            controller: 'AdminController'
        })
        .state('home', {
            url: '/',
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })
        .state('project', {
            url: '/project',
            templateUrl: 'views/project.html',
            controller: 'ProjectController'
        })
    $locationProvider.html5Mode(true);

}]);