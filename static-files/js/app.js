(function(){
	'use strict';

	angular.module('kyle-homepage', ['ui.router', 'ngMaterial'])
	.config(['$stateProvider', '$urlRouterProvider',
		function($stateProvider, $urlRouterProvider){

			$urlRouterProvider.otherwise("/");

			$stateProvider.state('home', {
				url: "/",
				name: "home",
				controller: "MainPageCtrl",
				templateUrl: "static-files/views/main.html"
			}).state('projects', {
				url: "/projects",
				name: "projects",
				controller: "ProjectController",
				templateUrl: "static-files/views/steam.html"
			}).state('contact', {
				url: "/contact",
				name: "contact",
				controller: "",
				templateUrl: "static-files/views/contact.html"
			})
		}])
	.controller('AppCtrl', ['$scope', '$state',
		function($scope, $state){
			$scope.currentNavItem = "home";
		}])
	.controller('MainPageCtrl', ['$scope', '$state',
		function($scope, $state) {
			
		}])
	.controller('ProjectController', ['$scope', '$http', 
		function($scope, $http) {

			var state = ["Offline","Online","Busy",
			"Away","Snooze", "Looking to trade", "Looking to play"];

			$scope.steamUser = function(id) {

				var image_url = 'http://media.steampowered.com/steamcommunity/public/images/apps/';

				return new Promise(function(resolve, reject){

					if (!id)
						id = $scope.steam_user_id

					$http({
						method: 'GET',
						url: 'http://kyle-murphy.co.uk/api/generate_steam_badge/' + id
					}).success(function(response) {
						console.warn(response)

						$scope.user_details = response.user_details.response.players[0] || {};

						if (response.play_history.response.games){

							response.play_history.response.games.forEach(function(game, game_idx) {
								var img_icon_url = response.play_history.response.games[game_idx].img_icon_url;
								var img_logo_url = response.play_history.response.games[game_idx].img_logo_url;
								var appid = response.play_history.response.games[game_idx].appid;

								response.play_history.response.games[game_idx].img_icon_url = 
									image_url + appid + '/' + img_icon_url + '.jpg';

								response.play_history.response.games[game_idx].img_logo_url = 
									image_url + appid + '/' + img_logo_url + '.jpg';

								response.play_history.response.games[game_idx].link = 
									'http://steamcommunity.com/app/' + appid;

								response.play_history.response.games[game_idx].playtime_2weeks = 
									minutesToHours(response.play_history.response.games[game_idx].playtime_2weeks)

							});

							$scope.user_details.play_history = response.play_history.response;

						}

						$scope.user_details.personastate = state[$scope.user_details.personastate];

					}).error(function(err){
						console.error(err)
					});
				});
			}

			$scope.steamUser('76561197996470719');

			function minutesToHours(minutes) {
				return parseFloat(minutes/60).toFixed(1) + ' Hours';
			}

		}])

})();
