var EntryDirective = angular.module('EntryDirective',[]);
EntryDirective.controller('EntryDirectiveController', ['$scope','$http','Auth','Worklog','Project',function($scope,$http,Auth,Worklog,Project) {
	//Test time picker
	Auth.checkUser(function(data){
		$scope.currentUser = data;
	});
	

	
	Worklog.get(function(data){
		$scope.worklogs = data;
	});
	Project.get(function(data){
		$scope.projects = data;
		$scope.entryData.project = $scope.projects[0];
	});
	$scope.dayOptions = [
		{label: '1', value: 0},
		{label: '2', value: 1},
		{label: '3', value: 2},
		{label: '4', value: 3},
		{label: '5', value: 4},
		{label: '6', value: 5},
		{label: '7', value: 6},
		{label: '8', value: 7},
		{label: '9', value: 8},
		{label: '10', value: 9},
		{label: '11', value: 10},
		{label: '12', value: 11},
		{label: '13', value: 12},
		{label: '14', value: 13},
		{label: '15', value: 14},
		{label: '16', value: 15},
		{label: '17', value: 16},
		{label: '18', value: 17},
		{label: '19', value: 18},
		{label: '20', value: 19},
		{label: '21', value: 20},
		{label: '22', value: 21},
		{label: '23', value: 22},
		{label: '24', value: 23},
		{label: '25', value: 24},
		{label: '26', value: 25},
		{label: '27', value: 26},
		{label: '28', value: 27},
		{label: '29', value: 28},
		{label: '30', value: 29},
		{label: '31', value: 30},
		{label: '32', value: 31}
	];

	$scope.monthOptions = [
		{label: '1', value: 0},
		{label: '2', value: 1},
		{label: '3', value: 2},
		{label: '4', value: 3},
		{label: '5', value: 4},
		{label: '6', value: 5},
		{label: '7', value: 6},
		{label: '8', value: 7},
		{label: '9', value: 8},
		{label: '10', value: 9},
		{label: '11', value: 10},
		{label: '12', value: 11}
	];

	$scope.yearOptions = [
		{label: '2010', value: 2010},
		{label: '2011', value: 2011},
		{label: '2012', value: 2012},
		{label: '2013', value: 2013},
		{label: '2014', value: 2014},
		{label: '2015', value: 2015}
	];

	$scope.hourOptions = [
		{label: '1', value: 1},
		{label: '2', value: 2},
		{label: '3', value: 3},
		{label: '4', value: 4},
		{label: '5', value: 5},
		{label: '6', value: 6},
		{label: '7', value: 7},
		{label: '8', value: 8},
		{label: '9', value: 9},
		{label: '10', value: 10},
		{label: '11', value: 11},
		{label: '12', value: 12}
	];
	$scope.minuteOptions = [
		{label: '00', value: 0},
		{label: '15', value: 15},
		{label: '30', value: 30},
		{label: '45', value: 45}
	];
	$scope.amPmOptions = [
		{label: 'AM', value: 0},
		{label: 'PM', value: 1}
	];
	$scope.parseAmPm = function (amPm) {
		if (amPm == 'AM') {
			return 0;
		}
		else {
			return 1;
		}
	}
	$scope.firstYear = 2010;
	$scope.entryData = {};
	$scope.currentDate = new moment(new Date()).minutes(0);
	$scope.startDate = new moment(new Date()).minutes(0);
	$scope.endDate = new moment(new Date()).minutes(0);
	$scope.entryData.startTime = {};
	$scope.entryData.endTime = {};

	$scope.initClockDate = function(clock, moment){
		clock.year = $scope.yearOptions[moment.format('YYYY') - $scope.firstYear];
		clock.month = $scope.monthOptions[moment.format('M')-1];
		clock.day = $scope.dayOptions[moment.format('D')-1];
		clock.hourMinute = moment.format('h:mm A');
		clock.string = clock.month.label + '-' + clock.day.label + '-' + clock.year.label + ' ' + clock.hourMinute;
		clock.dateObject = new Date(clock.string);
		//clock.startTime.hourMinute = moment.minutes(0).format('h:mm A');
	}

	$scope.updateClockDate = function(clock){
		clock.string = clock.month.label + '-' + clock.day.label + '-' + clock.year.label + ' ' + clock.hourMinute;
		clock.dateObject = new Date(clock.string);
	}

	$scope.updateStartTime = function () {	
		$scope.updateClockDate($scope.entryData.startTime);
		$scope.startDate = moment($scope.entryData.startTime.dateObject);
		$scope.adjustTimeDif();
	}

	$scope.updateEndTime = function () {
		$scope.updateClockDate($scope.entryData.endTime);
		$scope.endDate = moment($scope.entryData.endTime.dateObject);
		//$scope.adjustTimeDif();
	}
	
	$scope.adjustTimeDif = function () {
		if ($scope.endDate <= $scope.startDate) {
			$scope.endDate = $scope.startDate;
			$scope.endDate.add(15, 'minutes');
			$scope.entryData.endTime.hourMinute = $scope.endDate.format('h:mm A');
			$scope.initClockDate($scope.entryData.endTime,$scope.endDate);
		}
	}
	$scope.initClockDate($scope.entryData.startTime,$scope.startDate);
	$scope.initClockDate($scope.entryData.endTime,$scope.endDate);
	$scope.updateEndTime();
	$scope.updateStartTime();
	
	
	$scope.startClock = $('.start-time').clockpicker({
		"default": $scope.entryData.startTime.hourMinute.toString()
	});
	$scope.endClock = $('.end-time').clockpicker({
		"default": ($scope.entryData.endTime.hourMinute).toString()
	});
	$scope.sendData = function() {
  		console.log($scope.entryData);
  		$http({
	  		method  : 'POST',
	  		url     : '/api/worklogs',
	  		data    : $scope.entryData  // pass in data as strings
	  		//headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
 		})
	  	.success(function() {
	    	Worklog.get(function(data){
				$scope.worklogs = data;
				//$scope.entryData = {};
			});
	    })
  	}
}]);
EntryDirective.directive('timeentry', function() {
    return {
    	templateUrl: "../views/entrydir.html"
    }
});