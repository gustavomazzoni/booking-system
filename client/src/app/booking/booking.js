angular.module( 'bookingflow.booking', [
  'ui.router',
  'pascalprecht.translate',
  'bookingflow.services',
  'booking.widgets.calendar'
])

.run(['$rootScope', '$state', 'booking', function run($rootScope, $state, booking) {
  $rootScope.$state = $state;

  // Listen to '$stateChangeStart' to check if previous state has been filled or not
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
    // check if params has changed
    if (JSON.stringify(fromParams) !== JSON.stringify(toParams)) {
      // Invalidate user session
      // initialize booking service process
      booking.initialize();
    }
    
    switch (toState.name) {
      case 'booking.customer':
        // check if slot object is valid
        if (!booking.isSlotValid(toParams)) {
          event.preventDefault();
          console.log('Request not valid');
          // if not valid
          // Redirect to first state.
          $state.transitionTo('booking.calendar', toParams);
        }
        break;
      case 'booking.payment':
        // check if slot and customer objects are valid
        if (!booking.isSlotValid(toParams) ||
          !booking.isCostumerValid(toParams)) {
          event.preventDefault();
          console.log('Request not valid');
          // if not valid
          // Redirect to first state.
          $state.transitionTo('booking.calendar', toParams);
        }
        break;
      case 'booking.confirmation':
        // check if booking process is finished
        if (!booking.isFinished()) {
          event.preventDefault();
          console.log('Request not valid');
          // if not valid
          // Redirect to first state.
          $state.transitionTo('booking.calendar', toParams);
        }
    }
  });
}])

.config(['$stateProvider', function config( $stateProvider ) {
  $stateProvider.state( 'booking', {
    abstract: true,
    url: '/booking/:serviceId?{date:[0-9]{4}-[0-9]{2}-[0-9]{2}}&{quantity:[0-9]{1,2}}',
    templateUrl: 'booking/booking.tpl.html',
    controller: 'BookingCtrl',
    controllerAs: 'vm',
    resolve: {
      translate: ['$translate', '$translatePartialLoader', function($translate, $translatePartialLoader) {
        $translatePartialLoader.addPart('booking');
        $translate.refresh();
      }],
      // initialize booking service process
      init: ['booking', function(booking) {
        booking.initialize();
      }],
      // Perform http request to API
      // to get the service object
      servicePromise: ['$stateParams', 'service', function($stateParams, service) {
        return service.findById($stateParams.serviceId);
      }]
    },
    data:{ pageTitle: 'Booking', step: 0 }
  });
}])

.controller( 'BookingCtrl', ['$scope', '$state', 'servicePromise', 'booking', 
  function BookingController( $scope, $state, servicePromise, booking ) {
  var vm = this;
  var states = ['booking.calendar', 'booking.customer', 'booking.payment'];

  $scope.formData = {
    slot_id: null,
    customer: {
      firstName: null,
      lastName: null,
      age: null,
      weight: null,
      gender: null,
      chp: null,
      email: null
    },
    price: 0,
    quantity: 1,
    total: 0,
    cupomCode: null,
    state: 'new',
    tax: 0.1,
    service: servicePromise
  };

  vm.processForm = function() {
    // Get current state
    var step = $state.current.data.step;
    
    // if it's the step 2, payment
    if (step === 2) {
      // process the booking reservation 
      booking.processReservation($scope.formData).then( function(result) {
        // go to confirmation view
        $state.go('confirmation', {bookingId: result._id});
      }, function onError(e) {
        // show notification to the user
        console.log(e);
        return;
      });
    } else {
      // save form data in the service
      booking.saveState($scope.formData);

      // prepare the next
      step++;
      // go to next step/state
      $state.go(states[step]);
    }
  };

  vm.getTotal = function() {
    return $scope.formData.total;
  };

}]);

