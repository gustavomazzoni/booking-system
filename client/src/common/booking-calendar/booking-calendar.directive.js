/**
* @desc calendar directive designed for a booking use case
* @example <booking-calendar></booking-calendar>
*/
angular.module('booking.widgets.calendar', [])
  .directive('bookingCalendar', bookingCalendar);

bookingCalendar.$inject = ['calendarFactory', '$filter'];

function bookingCalendar(calendarFactory, $filter) {

  function link(scope, element, attrs) {
    var loadAvailableDates = scope.onMonthChange();
    var dateSelectedCallback = scope.onDateSelected();
    var slotSelectedCallback = scope.onSlotSelected();

    // expose calendar object
    scope.calendar = calendarFactory.initialize(scope.availableDates, scope.selectedDate);

    switchComponents();
    
    // expose methods
    scope.hasPreviousMonth = function() {
      return calendarFactory.hasPreviousMonth();
    };

    scope.previousMonth = function() {
      if (scope.hasPreviousMonth()) {
        scope.calendar.monthDate.setMonth(scope.calendar.monthDate.getMonth()-1);
        
        loadDateByMonth($filter('date')(scope.calendar.monthDate, "yyyy-MM"));
      }
    };

    scope.nextMonth = function() {
      scope.calendar.monthDate.setMonth(scope.calendar.monthDate.getMonth()+1);
      
      loadDateByMonth($filter('date')(scope.calendar.monthDate, "yyyy-MM"));
    };

    function loadDateByMonth(month) {
      loadAvailableDates(month).then( function(result) {
        // Reload calendar with the new Month available dates
        scope.calendar = calendarFactory.reload(result);

        // set open state of calendar
        openCalendar();
      });
    }

    scope.selectDate = function(date) {
      if (!date.past && date.available) {
        scope.selectedDate = date.date;

        // call controller function in the parent scope
        dateSelectedCallback(scope.selectedDate);
      }
    };

    function openCalendar() {
      // put all weeks back
      scope.weeks = scope.calendar.weeks;
      // switch to calendar component
      scope.component = 'calendar';
    }
    scope.openCalendar = openCalendar;

    scope.selectSlot = function(slot) {
      scope.selectedSlot = slot;

      // call controller function in the parent scope
      slotSelectedCallback(slot);
    };

    function showSlots(week) {
      // put only week with selected date
      scope.weeks = [week];
      // switch to slots component
      scope.component = 'slots';
    }

    function switchComponents() {
      if (scope.selectedDate && scope.availableSlots && (scope.availableSlots.length > 0)) {
        var week = calendarFactory.getWeek(scope.selectedDate);
        if (week) {
          showSlots(week);
          return;
        }
      }
      openCalendar();
    }

    element.on('$destroy', function() {
      loadAvailableDates = null;
      dateSelectedCallback = null;
      slotSelectedCallback = null;

      delete scope.calendar;
    });
  }

  return {
    restrict: 'E',
    templateUrl: 'booking-calendar/booking-calendar.tpl.html',
    link: link,
    scope: {
      availableDates: '=',
      selectedDate: '=',
      onMonthChange: '&',
      onDateSelected: '&',
      availableSlots: '=',
      onSlotSelected: '&'
    }
	};
}

