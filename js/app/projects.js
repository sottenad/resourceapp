resourcing.controller("projectCtrl", function($scope, $firebase, projectFactory, peopleFactory, dateFactory){
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
		var datespan = dateFactory.getCurrentDateSpan();
		var allocationData = {
			'datespan': datespan, 
			'allocationPercent':100
		};
		projectFactory.addPersonToProject(personId, projectId, allocationData);
	}
	$scope.removePersonFromProject = function(personId, projectId){
		 projectFactory.removePersonFromProject(personId, projectId);
		 peopleFactory.removeAllocation(personId, projectId);
	}

	$scope.setPersonsAllocation = function(personId, projectId){
		var input = parseInt(this.project.people[personId].allocation.allocationPercent);
		var allocation = 100;
		if(input> 100 || isNaN(input)){
			allocation = 100;
		}else{
			allocation = input
		}
		var datespan = dateFactory.getCurrentDateSpan();
		var allocationData = {
			'datespan': datespan, 
			'allocationPercent':allocation
		};
		peopleFactory.setAllocation(personId, projectId, allocationData);
		projectFactory.setPersonsAllocation(personId, projectId, allocationData);
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