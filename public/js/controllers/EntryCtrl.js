// public/js/controllers/UserCtrl.js
var EntryCtrl = angular.module('EntryCtrl', ['ui.bootstrap']);
EntryCtrl.controller('EntryController', ['$scope','$http','Auth','Worklog',function($scope,$http,Auth,Worklog) {
	//Test time picker
	
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
		{label: '32', value: 31},
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
	$scope.firstYear = 2010;
	
	$scope.currentDate = new Date();
	$scope.currentDate.setUTCHours($scope.currentDate.getUTCHours() -8);

	$scope.entryData = {};
	$scope.entryData.startTime = {};
	$scope.entryData.startTime.year = $scope.yearOptions[$scope.currentDate.getFullYear() - $scope.firstYear];
	$scope.entryData.startTime.month = $scope.monthOptions[$scope.currentDate.getMonth()];
	$scope.entryData.startTime.day = $scope.dayOptions[$scope.currentDate.getDay()];
	$scope.entryData.startTime.amPm = 'AM';
	$scope.entryData
	$scope.from24 = function (hour){
		if (hour > 12){
			hour = hour - 12;
			$scope.entryData.startTime.amPm = 'PM';
		}
		else if (hour == 12){
			$scope.entryData.startTime.amPm = 'PM';
		}
		else {
			$scope.entryData.startTime.amPm = 'AM';
		}
		return hour;
	}
	$scope.to24 = function (hour){
		if ($scope.entryData.startTime.amPm == 'PM'){
			hour = hour + 12;
		}
		return hour;
	}
	$scope.entryData.startTime.hour = $scope.hourOptions[$scope.from24($scope.currentDate.getUTCHours())-1];
	$scope.entryData.startTime.minute = $scope.minuteOptions[0];
	$scope.updateStartTime = function () {
		$scope.entryData.startTime.dateString = $scope.entryData.startTime.year.label + '-' + $scope.entryData.startTime.month.label + '-' + $scope.entryData.startTime.day.label;
		$scope.entryData.startTime.timeString = $scope.entryData.startTime.hour.label + ':' + $scope.entryData.startTime.minute.label + $scope.entryData.startTime.amPm;
		$scope.entryData.startTime.dateObject = new Date($scope.entryData.startTime.year.value,$scope.entryData.startTime.month.value,$scope.entryData.startTime.day.value,$scope.to24($scope.entryData.startTime.hour.value),$scope.entryData.startTime.minute.value);
		$scope.entryData.startTime.dateObject.setUTCHours($scope.entryData.startTime.dateObject.getUTCHours() +16);
	}
	$scope.updateStartTime();
	/*$scope.selectedDateString = $scope.selectedMonth.label + '-' + $scope.selectedDay.label + '-' + $scope.selectedYear.label;
	$scope.$watch($scope.selectedDay,function(){
		$scope.selectedDateString = $scope.selectedMonth.label + '-' + $scope.selectedDay.label + '-' + $scope.selectedYear.label;
	})
	$scope.$watch($scope.selectedMonth,function(){
		$scope.selectedDateString = $scope.selectedMonth.label + '-' + $scope.selectedDay.label + '-' + $scope.selectedYear.label;
	})
	$scope.$watch($scope.selectedYear,function(){
		$scope.selectedDateString = $scope.selectedMonth.label + '-' + $scope.selectedDay.label + '-' + $scope.selectedYear.label;
	})
	$scope.open = function($event) {
	    $event.preventDefault();
	    $event.stopPropagation();

	    $scope.opened = true;
  	};
	$scope.selectedDay = $scope.dayOptions[$scope.currentDate.getDay()];
	$scope.selectedYear = $scope.yearOptions[$scope.currentDate.getFullYear() - $scope.firstYear];
	$scope.selectedMonth = $scope.monthOptions[$scope.currentDate.getMonth()];
	$scope.selectedHour = $scope.hourOptions[$scope.from24($scope.currentDate.getUTCHours())-1];
  	*/

	
	//$scope.entryData.startTime.hours = new Date($scope.currentDate.getFullYear(),$scope.currentDate.getMonth(),$scope.currentDate.getDay(),$scope.currentDate.getUTCHours()-8,0,0,0);
	Auth.checkUser(function(data){
		$scope.currentUser = data;
	});
	Worklog.get(function(data){
		$scope.worklogs = data;
	});
	/*$scope.submit = function(){
		$scope.entryData = {
			'startTime': $scope.startTime,
			'endTime': $scope.endTime,
			'project': $scope.project
		};
		alert(JSON.stringify(worklog));
		Worklog.post(worklog);
		Worklog.get(function(data){
			$scope.worklogs = data;
		});
	}*/
	$scope.sendData = function() {
  		$http({
	  		method  : 'POST',
	  		url     : '/api/worklogs',
	  		data    : $scope.entryData  // pass in data as strings
	  		//headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
 		})
	  	.success(function() {
	    	Worklog.get(function(data){
				$scope.worklogs = data;
				$scope.entryData = {};
			});
	    })
  	}
}]);