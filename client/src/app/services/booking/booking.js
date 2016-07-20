angular.module( 'bookingflow.services' )

.factory('booking', ['$http', '$location', function ($http, $location) {
	var reservation = {};
	var finished = false;

	var init = function () {
		reservation = {};
		finished = false;
	};
	
	var setReservation = function (formData) {
		reservation = formData;
		reservation.state = 'pending';
		return reservation;
	};

	var isSlotValid = function (params) {
		if (!isParamsValid(params, reservation) || !reservation.slot) { return false; }
		
		if (!params.date || reservation.slot.date.match(params.date) && 
			(!params.quantity || 
				((+params.quantity) === (+reservation.quantity) && 
					params.quantity <= reservation.slot.vacancies))) {
			return true;
		}
		return false;
	};

	var isCostumerValid = function (params) {
		if (!isParamsValid(params, reservation) || !reservation.customer) { return false; }
		
		if (reservation.customer.firstName && reservation.customer.lastName && 
			reservation.customer.email && reservation.customer.age && 
			reservation.customer.chp) {
			return true;
		}
		return false;
	};

	var isParamsValid = function (params, reservation) {
		if ((!reservation || !reservation.service) || 
			(params.serviceId !== reservation.service._id)) {
			return false;
		}
		return true;
	};

	var isFinished = function () {
		return finished;
	};

	var url = 'http://localhost:3000/api/v1/bookings/';

	var processReservation = function (formData) {
		reservation = formData;

		// prepare API Booking model object
		reservation.slot_id = reservation.slot._id;
		reservation.service_id = reservation.service._id;
		reservation.state = 'finished';

		// delete properties not needed
		delete reservation.slot;
		delete reservation.service;

		// execute reservation process in the server side through API
		return $http.post(url, { data: reservation }).then( function(response) {
			console.log('Response object from REST API POST bookings endpoint', response);

			if (response.data) {
				// if the response is success
				// set finished to true
				finished = true;
				// and return the reservation object 
				console.log('Booking Success', response.data);
				return response.data;
			} else {
				// else return the error
				return new Error('Server Error when processing Booking.', response);
			}
		}, function errorCallback(e) {
			return e;
		});
	};

	var getById = function (id) {
		return $http.get(url + id).then( function(response) {
			console.log('Response object from REST API bookings/:id endpoint', response);

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
		initialize: init,
		saveState: setReservation,
		isSlotValid: isSlotValid,
		isCostumerValid: isCostumerValid,
		processReservation: processReservation,
		isFinished: isFinished,
		findById: getById
	};
}]);
