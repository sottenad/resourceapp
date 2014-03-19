resourcing.factory('projectFactory', function($firebase, peopleFactory){
	var projectRef = new Firebase("https://resourceapp.firebaseio.com/projects");
	var projects = $firebase(projectRef);
	
	
	return{
		getAllProjects: function(){
			return projects;
		},
		removeProject: function(key){
			projects.$remove(key);
		},
		addProject: function(newProject){		
			projects.$add(newProject);
		},
		addPersonToProject: function(personKey, projectKey) {
			var thisproject = new Firebase("https://resourceapp.firebaseio.com/projects/"+projectKey);
			var thisprojectRef = $firebase(thisproject);
			var peopleChild = thisprojectRef.$child('people');
			var thisPerson = peopleChild.$child(personKey);
				thisPerson.$set(true);
		},
		removePersonFromProject: function(personKey, projectKey) {
			var thesePeople = new Firebase("https://resourceapp.firebaseio.com/projects/"+projectKey+"/people");
			var thesePeopleRef = $firebase(thesePeople);
			thesePeopleRef.$remove(personKey);
			
		}
	}
});