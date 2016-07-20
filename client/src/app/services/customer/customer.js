angular.module( 'bookingflow.services' )

// Define Service
.factory('customer', ['$http', function ($http) {

	var getAllChronicHealthProblems = function () {
		var url = 'http://localhost:3000/api/v1/chronicHealthProblems';
		return $http.get(url).then( function(response) {
			return response.data;
		}, function errorCallback(e) {
			var newMessage = 'XHR Failed';
			if (e.data && e.data.description) {
				newMessage = newMessage + '\n' + e.data.description;
			}
			e.data.description = newMessage;
			console.log(newMessage);
			return e;
		});
	};

	return {
		findAllChronicHealthProblems: getAllChronicHealthProblems
	};
}]);