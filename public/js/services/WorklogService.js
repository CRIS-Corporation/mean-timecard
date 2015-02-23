// public/js/services/WorklogService.js
var WorklogService = angular.module('WorklogService', [])
WorklogService.factory('Worklog', ['$http', function($http) {

    return {
        // call to get all nerds
        get : function(callback) {
            $http.get('/api/worklogs')
                .success(function(data) {
                        if (data=='401'){
                            $location.url('/login');
                        }
                        else
                        {
                            callback(data);
                        }
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