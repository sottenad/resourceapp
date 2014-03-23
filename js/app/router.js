resourcing.config([
		'$stateProvider', '$urlRouterProvider',
		function($stateProvider, $urlRouterProvider)
		{

			$stateProvider.state('dashboard', {
				views:{
					'content':{
					  templateUrl: '/pages/projectList.html'
					},
					'sidebar': {
					  templateUrl: '/pages/peopleList.html'
					}
				},
				url:''
			}).
			state('calendar',{
				views:{
					'fullwidth':{
						templateUrl: 'pages/calendar.html'
					}
					
				},
				url: '/calendar'
			});
		}
		]
	);