var MenuService = angular.module('MenuService', []);
MenuService.factory('Menu', ['$location','$http', function($location,$http) {
    var showMenu = false;

    return{
    	checkMenu: function () {
    		if ($location.path()=='/login'){
    			showMenu = false;
    		}
	    	else {
	    		showMenu = true;
	    	}
	    	return showMenu;
		}
	};
}]);