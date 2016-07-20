
angular.module( 'bookingflow.booking' )

.config(['$stateProvider', function config( $stateProvider ) {
  $stateProvider.state( 'booking.customer', {
    url: '/customer',
    templateUrl: 'booking/customer/customer.tpl.html',
    controller: 'CustomerCtrl',
    controllerAs: 'vm',
    resolve: {
      translate: ['$translate', '$translatePartialLoader', function($translate, $translatePartialLoader) {
        $translatePartialLoader.addPart('customer');
        $translate.refresh();
      }],
      chronicHealthProblemsPromise: ['customer', function(customer) {
        return customer.findAllChronicHealthProblems();
      }]
    },
    data:{ pageTitle: 'Booking - Customer', step: 1 }
  });
}])

.controller( 'CustomerCtrl', ['$scope', 'chronicHealthProblemsPromise', function CustomerController( $scope, chronicHealthProblemsPromise ) {
  var vm = this;

  vm.chronicHealthProblems = chronicHealthProblemsPromise;

}]);

