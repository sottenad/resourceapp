resourcing.controller('peopleCtrl', function($scope, $firebase, peopleFactory){

	$scope.people = peopleFactory.getAllPeople();
	$scope.orderProp = "firstName";
	$scope.peopleTypes = ["Developer","Designer","Project Manager","Architect"];
	
	$scope.editPeople = false;
	var allPeopleInProjects = $('.project li');
	var allPeopleInPeople = $('.people div');
	

	
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
	
	$scope.showType = function(type){
		for(var person in $scope.people){
			if($scope.people[person].type != type){
				
			}
		}
	}
	
	$scope.totalAllocation = function(key){
		var allAllocations = $scope.people[key].allocations;
		var num = 0;
		for(var thisKey in allAllocations){
			num += allAllocations[thisKey];
		}
		return num
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