(function(){
	'use strict';

	angular.module('kyle-homepage', ['ngRoute'])
	.controller('SteamController', ['$scope', '$http', 
		function($scope, $http) {

			if (localStorage["testing"]) {
				$scope.testing = true;
			}

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
