(function(){
	'use strict';

	angular.module('kyle-homepage', ['ui.router'])
	.config(['$stateProvider', '$urlRouterProvider',
		function($stateProvider, $urlRouterProvider){

			$stateProvider.$state('index', {
				url: "/",
				name: "index",
				controller: "MainPageCtrl"
			}).$state('testing', {
				url: "/",
				name: "testing",
				controller: "SteamController"
			})
		}])
	.controller('MainPageCtrl', ['$scope',
		function($scope) {

			if (localStorage["testing"]) {
				$state.go('testing');
			}
			
		}])
	.controller('SteamController', ['$scope', '$http', 
		function($scope, $http) {

			$scope.steamUser = function() {

				return new Promise(function(resolve, reject){

					$http({
						method: 'GET',
						url: 'http://kyle-murphy.co.uk:8000/'
					}).success(function(user_details) {
						console.log(user_details)
						alert(user_details)

					}).error(function(err){
						console.error(err)
					});
				});
			}

		}])

})();
