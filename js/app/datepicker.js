resourcing.controller("datepickerCtrl", function($scope, $firebase, projectFactory, peopleFactory, dateFactory){
	
	$scope.date = dateFactory.getCurrentDateSpan();
		
	$scope.open = function($event) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope.opened = true;
	};
	
	$scope.dateOptions = {
	'year-format': "'yy'",
	'starting-day': 1,
	'show-weeks':false,
	'show-button-bar':false
	};
	
	$scope.formats = ['MMM dd', 'yyyy/MM/dd', 'shortDate'];
	$scope.format = $scope.formats[0];
	
	$scope.setDateRange = function($evt){
		dateFactory.setStartDate($scope.dt);
		$scope.showPicker = false;
	}
	
});