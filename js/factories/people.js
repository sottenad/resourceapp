resourcing.factory('peopleFactory', function($firebase){
	var peopleRef = new Firebase("https://resourceapp.firebaseio.com/people");
	var people = $firebase(peopleRef);
	
	return{
		getAllPeople: function(){
			return people;
		}, 
		addPerson: function(newPerson){
			people.$add(newPerson);
		},
		removePerson: function(key){
			people.$remove(key);
		},
		setAllocation: function(personId, projectId, allocation){
			var personsAllocations = people.$child(personId).$child('allocations').$child(projectId);
				personsAllocations.$set(allocation);
		},
		removeAllocation: function(personId, projectId){
			people.$child(personId).$child('allocations').$remove(projectId);
		}
	}

})