resourcing.controller('peopleCtrl', function($scope, $firebase, peopleFactory){

	$scope.people = peopleFactory.getAllPeople();
	$scope.orderProp = "firstName";
	$scope.peopleTypes = ["Developer","Designer","Project Manager","Architect"];
	
	$scope.editPeople = false;
	
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
	$scope.toggleEdit = function(){
		$scope.editPeople = !$scope.editPeople;
	}

	
})

resourcing.filter('orderObjectBy', function(){
  return function(input, attribute) {
    if (!angular.isObject(input)) return input;

    var array = [];
    for(var objectKey in input) {
      array.push(input[objectKey]);
    }

    function compare(a,b) {
      if (a[attribute] < b[attribute])
        return -1;
      if (a[attribute] > b[attribute])
        return 1;
      return 0;
    }

    array.sort(compare);
    return array;
  }
});