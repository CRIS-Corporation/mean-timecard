// public/js/services/ProjectService.js
var ProjectService = angular.module('ProjectService', [])
ProjectService.factory('Project', ['$http', function($http) {

    return {
        // call to get all nerds
        get : function(callback) {
            $http.get('http://localhost:3000/api/projects')
            .success(function(data) {
                callback(data);
            }); 
        }


                // these will work when more API routes are defined on the Node side of things
        // call to POST and create a new nerd
        /*create : function(nerdData) {
            return $http.post('/api/users', nerdData);
        },

        // call to DELETE a nerd
        delete : function(id) {
            return $http.delete('/api/users/' + id);
        }*/
    }       

}]);