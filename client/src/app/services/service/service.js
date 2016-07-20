angular.module( 'bookingflow.services' )

.factory('service', ['$http', '$location', function ($http, $location) {

	var getById = function (id) {
		return $http.get('http://localhost:3000/api/v1/services/' + id).then( function(response) {
			console.log('Response object from REST API services/id endpoint', response);

			if (!response.data) {
				// if service not found redirect to 404 page
				$location.url('/404');
			}

			return response.data;
		}, function errorCallback(e) {
			return e;
		});
	};

	return {
		findById: getById
	};
}]);
