(function(){
	'use strict';

	angular.module('kyle-homepage', ['ui.router'])
	.config(['$stateProvider', '$urlRouterProvider',
		function($stateProvider, $urlRouterProvider){

			$urlRouterProvider.otherwise("/");

			$stateProvider.state('index', {
				url: "/",
				name: "index",
				controller: "MainPageCtrl"
			}).state('testing', {
				url: "/",
				name: "testing",
				controller: "SteamController",
				templateUrl: "static-files/views/steam.html"
			})
		}])
	.controller('MainPageCtrl', ['$scope', '$state',
		function($scope, $state) {

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
						url: 'http://kyle-murphy.co.uk/api/generate_steam_badge/' + $scope.steam_user_id
					}).success(function(response) {
						console.warn(response)

						$scope.user_details = {} || response.user_details.response.players[0];

						$scope.user_details.play_history = response.play_history.response;

					}).error(function(err){
						console.error(err)
					});
				});
			}

		}])

})();
