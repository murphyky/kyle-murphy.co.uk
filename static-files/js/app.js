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
			}).state('projects', {
				url: "/projects",
				name: "projects",
				controller: "ProjectController",
				templateUrl: "static-files/views/steam.html"
			})
		}])
	.controller('MainPageCtrl', ['$scope', '$state',
		function($scope, $state) {

			
		}])
	.controller('ProjectController', ['$scope', '$http', 
		function($scope, $http) {

			$scope.steamUser = function() {

				var image_url = 'http://media.steampowered.com/steamcommunity/public/images/apps/';

				return new Promise(function(resolve, reject){

					$http({
						method: 'GET',
						url: 'http://kyle-murphy.co.uk/api/generate_steam_badge/' + $scope.steam_user_id
					}).success(function(response) {
						console.warn(response)

						$scope.user_details = {} || response.user_details.response.players[0];

						response.play_history.response.games.forEach(function(game, game_idx) {
							var img_icon_url = response.play_history.response.games[game_idx].img_icon_url;
							var img_logo_url = response.play_history.response.games[game_idx].img_logo_url;
							var appid = response.play_history.response.games[game_idx].appid;

							response.play_history.response.games[game_idx].img_icon_url = 
								image_url + appid + '/' + img_icon_url + '.jpg';

							response.play_history.response.games[game_idx].img_logo_url = 
								image_url + appid + '/' + img_logo_url + '.jpg';
						});

						$scope.user_details.play_history = response.play_history.response;

					}).error(function(err){
						console.error(err)
					});
				});
			}

		}])

})();
