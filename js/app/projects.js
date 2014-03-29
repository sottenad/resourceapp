resourcing.controller("projectCtrl", function($scope, $firebase, projectFactory, peopleFactory){
	$scope.projects = projectFactory.getAllProjects();
	
	$scope.projectStates = [
		'OnTrack',
		'Warning',
		'Danger'
	];
	
	$scope.editProjects = false;
	$scope.removeProject = function(key){
		projectFactory.removeProject(key);
	}
	$scope.addProject = function(){
		var np = {
			'name': $scope.project.name,
			'budget': $scope.project.budget,
			'status': $scope.project.status,
			'description': $scope.project.description,
			'description2': $scope.project.description2,
			'people': {}
		}
		projectFactory.addProject(np);
		$scope.project = null;
	}
	$scope.updateProject = function(key){
		var np = {
			'name': $scope.projectToEdit.name,
			'budget': $scope.projectToEdit.budget,
			'status': $scope.projectToEdit.status,
			'description': $scope.projectToEdit.description,
		}
		projectFactory.updateProject(key, np);
		$scope.project = null;
	}
	$scope.setProjectToEdit = function(key){
		projectFactory.setProjectToEdit(key);
		$('#editProjectModal').modal();
	}
	
	$scope.$on('UPDATE_EDIT_PROJECT', function ( event, newProjFirebase ) {
		$scope.projectToEdit = newProjFirebase;
	 });
	
	

	$scope.people = peopleFactory.getAllPeople();

	
	$scope.addPersonToProject = function(dragEl, dropEl){
		var personId = $(dragEl).attr('data-key');
		var projectId = $(dropEl).attr('data-key');
		projectFactory.addPersonToProject(personId, projectId);
	}
	$scope.removePersonFromProject = function(personId, projectId){
		 projectFactory.removePersonFromProject(personId, projectId);
		 peopleFactory.removeAllocation(personId, projectId);
	}

	$scope.setPersonsAllocation = function(personId, projectId){
		var input = parseInt(this.project.people[personId].allocation);
		var allocation = 100;
		if(input> 100 || isNaN(input)){
			allocation = 100;
		}else{
			allocation = input
		}
		peopleFactory.setAllocation(personId, projectId, allocation);
		projectFactory.setPersonsAllocation(personId, projectId, allocation);
	}
	
	$scope.formatPrice = function(price){
		var val = parseInt(price);
		if(!isNaN(val)){
			return "$"+val.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
		}else{
			return "Not Valid";
		}
	}
	
	$scope.openModal = function(id){
		$(id).modal('show')
	}
	

	
});