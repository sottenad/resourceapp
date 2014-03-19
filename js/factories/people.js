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
		}
	}

})