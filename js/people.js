resourcing.controller('peopleCtrl', function($scope, $firebase, peopleFactory){

	$scope.people = peopleFactory.getAllPeople();
	$scope.orderProp = "firstName";
	$scope.peopleTypes = ["Developer","Designer","Project Manager","Architect"];
	
	$scope.addPerson = function(){
		var np = {
			'firstName': $scope.person.firstName,
			'lastName': $scope.person.lastName,
			'type': $scope.person.type
		}
		peopleFactory.addPerson(np);
		$scope.person = null;
	}
	
	$scope.removePerson = function(key){
		peopleFactory.removePerson(key);
	}

	
})

