angular.module( 'bookingflow.booking' )

.config(['$stateProvider', function config( $stateProvider ) {
  $stateProvider.state( 'booking.payment', {
    url: '/payment',
    templateUrl: 'booking/payment/payment.tpl.html',
    controller: 'PaymentCtrl',
    controllerAs: 'vm',
    resolve: {
      translate: ['$translate', '$translatePartialLoader', function($translate, $translatePartialLoader) {
        $translatePartialLoader.addPart('payment');
        $translate.refresh();
      }]
    },
    data:{ pageTitle: 'Booking - Payment', step: 2 }
  });
}])

.controller( 'PaymentCtrl', ['$scope', function PaymentController( $scope ) {
  var vm = this;

}]);

