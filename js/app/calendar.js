resourcing.controller("calendarCtrl", function($scope, $firebase, projectFactory, peopleFactory, dateFactory){
	
	$scope.people = peopleFactory.getAllPeople();
	$scope.date = dateFactory.getCurrentDateSpan()
	
});