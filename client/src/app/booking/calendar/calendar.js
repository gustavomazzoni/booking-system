
angular.module( 'bookingflow.booking' )

.config(['$stateProvider', function config( $stateProvider ) {
  $stateProvider.state( 'booking.calendar', {
    url: '',
    templateUrl: 'booking/calendar/calendar.tpl.html',
    controller: 'CalendarCtrl',
    controllerAs: 'vm',
    resolve: {
      translate: ['$translate', '$translatePartialLoader', function($translate, $translatePartialLoader) {
        $translatePartialLoader.addPart('calendar');
        $translate.refresh();
      }],
      // Perform http request to API
      // to get available dates
      datesPromise: ['$stateParams', 'availability', function($stateParams, availability) {
        return availability.findAvailableDaysForMonth($stateParams.serviceId, $stateParams.date, $stateParams.quantity);
      }],
      // Perform http request to API
      // to get available slots when date is selected
      slotsPromise: ['$stateParams', 'availability', function($stateParams, availability) {
        if ($stateParams.date) {
          return availability.findAvailableSlotsForDay($stateParams.serviceId, $stateParams.date, $stateParams.quantity);
        }
      }],
      // number of adventurous
      quantities: function() {
        return [1,2,3,4,5,6,7,8,9];
      }
    },
    data:{ pageTitle: 'Booking - Calendar', step: 0 }
  });
}])

.controller( 'CalendarCtrl', ['$scope', '$state', '$stateParams', 'slotsPromise', 'datesPromise', 'quantities', 'availability',
  function CalendarController( $scope, $state, $stateParams, slotsPromise, datesPromise, quantities, availability ) {
  var vm = this;
  vm.slots = slotsPromise;
  vm.quantities = quantities;

  vm.selectedDate = $stateParams.date;
  vm.selectedQuantity = $stateParams.quantity || vm.quantities[0];
  vm.availableDates = datesPromise;

  // set quantity in formData inherited scope
  setQuantity(vm.selectedQuantity);

  vm.selectDate = function(date) {
    $state.go('.',{date: date});
  };

  vm.loadDatesMonth = function(month) {
    return availability.findAvailableDaysForMonth($stateParams.serviceId, month, $stateParams.quantity);
  };

  vm.selectSlot = function(slot) {
    // Set slot object inside formData object on inherited scope
    $scope.formData.slot = slot;

    $scope.formData.price = slot.price;
    var subtotal = ($scope.formData.slot.price * $scope.formData.quantity);
    var tax = subtotal * $scope.formData.tax;
    $scope.formData.total = subtotal + tax;
  };

  function setQuantity(quantity) {
    // Set quantity inside formData object on inherited scope
    $scope.formData.quantity = (+quantity);
  }

}]);

