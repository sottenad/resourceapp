resourcing.factory('dateFactory', function($firebase, $rootScope, peopleFactory, projectFactory){

	var dateRef = new Firebase("https://resourceapp.firebaseio.com/currentDate");
	var savedDate = $firebase(dateRef);


	var now = new Date
	var spanObj = createDateSpan(now);
	var currentDateSpan = spanObj

	
	return{
		getCurrentDateSpan: function(){
			return savedDate
		},
		setStartDate:function(date){
			var spanObj = createDateSpan(date);
			savedDate.$set(spanObj);	
		}
	}
	
	function createDateSpan(startDate){
		var start = new Date(startDate);
		var first = start.getDate() - start.getDay();
		var last = first + 6;
		var firstday = new Date(start.setDate(first));
		var lastday = new Date(start.setDate(last));
		return {
				'start':firstday,
				'end':lastday,
				'prettyStart': moment(firstday).format("MMM Do"),
				'prettyEnd':   moment(lastday).format("MMM Do")
		};
	}
});