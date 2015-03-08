// public/js/services/WorklogService.js
var WorklogService = angular.module('WorklogService', [])
WorklogService.factory('Worklog', ['$http', function($http) {

    return {
        // call to get all nerds
        get : function(callback) {
            $http.get('/api/worklogs')
                .success(function(data) {
                    callback(data);
                })
        },
        post : function(data) {
            return $http.post('/api/createWorklog',data);
        },
        delete : function(id,callback) {
            $http.delete('/api/worklogs/' + id)
                .success(function(data) {
                    callback();
                })
        }
    }       

}]);