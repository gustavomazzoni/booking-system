angular.module( 'bookingflow.booking' )

.config(['$stateProvider', function config( $stateProvider ) {
  $stateProvider.state( 'confirmation', {
    url: '/bookings',
    params: {
      bookingId: null
    },
    templateUrl: 'booking/confirmation/confirmation.tpl.html',
    controller: 'ConfirmationCtrl',
    controllerAs: 'vm',
    resolve: {
      translate: ['$translate', '$translatePartialLoader', function($translate, $translatePartialLoader) {
        $translatePartialLoader.addPart('confirmation');
        $translate.refresh();
      }],
      // Perform http request to API
      // to get Booking registration
      bookingPromise: ['$stateParams', 'booking', function($stateParams, booking) {
        return booking.findById($stateParams.bookingId);
      }]
    },
    data:{ pageTitle: 'Booking - Confirmation' }
  });
}])

.controller( 'ConfirmationCtrl', ['$scope', 'bookingPromise', function ConfirmationController( $scope, bookingPromise ) {
  var vm = this;

  vm.booking = bookingPromise;

}]);

