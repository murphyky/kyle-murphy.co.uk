(function(){
	'use strict';

	angular.module('kyle-homepage', ['ngRoute'])
	.controller('SteamController', ['$scope', '$http', 
		function($scope, $http) {

			$scope.steamUser = function() {

				return new Promise(function(resolve, reject){

					$http({
						method: 'GET',
						url: 'http://127.0.0.1:5000/api/get_user/'+$scope.steam_user_id
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