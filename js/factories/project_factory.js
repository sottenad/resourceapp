resourcing.factory('projectFactory', function($firebase, $rootScope, peopleFactory){
	var projectRef = new Firebase("https://resourceapp.firebaseio.com/projects");
	var projects = $firebase(projectRef);
	
	var projectToEdit = null;
	
	return{
		getAllProjects: function(){
			return projects;
		},
		getProject: function(key){
			return projects.$child(key);
		},
		removeProject: function(key){
			projects.$remove(key);
		},
		addProject: function(newProject){		
			projects.$add(newProject);
		},
		updateProject: function(key, newProject){		
			projects.$child(key).$update(newProject);
		},
		addPersonToProject: function(personKey, projectKey, allocation) {
			var thisproject = new Firebase("https://resourceapp.firebaseio.com/projects/"+projectKey);
			var thisprojectRef = $firebase(thisproject);
			var peopleChild = thisprojectRef.$child('people');
			var thisPerson = peopleChild.$child(personKey);
				thisPerson.$set({'allocation':100});
		},
		removePersonFromProject: function(personKey, projectKey) {
			var thesePeople = new Firebase("https://resourceapp.firebaseio.com/projects/"+projectKey+"/people");
			var thesePeopleRef = $firebase(thesePeople);
			thesePeopleRef.$remove(personKey);
		},
		setPersonsAllocation: function(personKey, projectKey, allocation){
			var thisproject = new Firebase("https://resourceapp.firebaseio.com/projects/"+projectKey);
			var thisprojectRef = $firebase(thisproject);
			var peopleChild = thisprojectRef.$child('people');
			var thisPerson = peopleChild.$child(personKey);
				thisPerson.$update({'allocation':allocation});

		},
		setProjectToEdit: function(key){
			$rootScope.$broadcast('UPDATE_EDIT_PROJECT', projects.$child(key));
		}

	}
});