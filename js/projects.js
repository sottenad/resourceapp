resourcing.controller("projectCtrl", function($scope, $firebase, projectFactory, peopleFactory){
	$scope.projects = projectFactory.getAllProjects();
	
	$scope.removeProject = function(key){
		projectFactory.removeProject(key);
	}
	$scope.addProject = function(){
		var np = {
			'name': $scope.project.name,
			'budget': $scope.project.budget,
			'people': {}
		}
		projectFactory.addProject(np);
		$scope.project = null;
	}
	
	$scope.formatPrice = function(price){
		var val = parseInt(price);
		if(!isNaN(val)){
			return "$"+val.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
		}else{
			return "Not Valid";
		}
	}
	$scope.people = peopleFactory.getAllPeople();

	
	$scope.addPersonToProject = function(dragEl, dropEl){
		var personId = $(dragEl).attr('data-key');
		var projectId = $(dropEl).attr('data-key');
		projectFactory.addPersonToProject(personId, projectId);
	}
	$scope.removePersonFromProject = function(personId, projectId){
		 projectFactory.removePersonFromProject(personId, projectId);
	}
});