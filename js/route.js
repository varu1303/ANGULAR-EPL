angular
        .module('routemod', ['ngRoute'])
        .config(function($routeProvider){
            
            $routeProvider
                    .when('/', {
			         templateUrl: 'templates/home.html',
			         controller: 'MainCtrl',
                     controllerAs: 'main'
		              })
                    .when('/view2015', {
			         templateUrl: 'templates/view1.html',
			         controller: 'v15Ctrl',
                     controllerAs: 'v15'
		              })
                    .when('/table2015', {
			         templateUrl: 'templates/tab15.html',
			         controller: 't15Ctrl',
                     controllerAs: 't15'
		              })
                    .when('/match1Stat', {
			         templateUrl: 'templates/match1.html',
			         controller: 'stat1Ctrl',
                     controllerAs: 'stat1'
		              })
                    .when('/team1Stat', {
			         templateUrl: 'templates/team1.html',
			         controller: 'teamstat1Ctrl',
                     controllerAs: 'teamstat1'
		              })
                    .otherwise({
                      redirectTo: '/'
                      });
})
;