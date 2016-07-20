/**
* @desc calendar directive designed for a booking use case
* @example <booking-calendar></booking-calendar>
*/
angular.module('booking.widgets.calendar', [])
  .factory('calendarFactory', calendarFactory)
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
    // controller: BookingCalendarController,
    // controllerAs: 'vm',
    // bindToController: true,
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

// BookingCalendarController.$inject = ['calendar'];

// function BookingCalendarController(calendar) {
//     var vm = this;
//     // set calendar object to the scope
//     vm.calendar = calendar.initialize;
// }

// Calendar object responsible to build and manage the calendar properties and behaviors
calendarFactory.$inject = ['$filter'];
function calendarFactory($filter) {

  var today;
  var calendar = {
    monthDate: null,
    weekdays: null,
    weeks: null,
    selectedDate: null
  };
  
  
  // Initialize the calendar; Initialize and build Calendar component
  function initialize(availableDates, selectedDate) {
    today = (new Date()).setHours(0,0,0,0);

    // set weekdays
    calendar.weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    calendar.selectedDate = selectedDate;

    // build calendar
    build(availableDates);

    return calendar;
  }

  /**
   * Build the calendar; Create an array of days with detail information like availability then structure the calendar
   */
  function build(availableDates) {
    var availableDays = [],
      temp,
      days = [],
      index;

    if (availableDates && availableDates[0]) {
      // set month and year
      calendar.monthDate = new Date(availableDates[0]._id.year, availableDates[0]._id.month-1, 1);

      availableDays = availableDates.map( function( item ) {
        return item._id.day;
      });

    } else {
      console.log('No available days for this month');

      if (!calendar.monthDate) {
        // set month and year
        calendar.monthDate = new Date(today);
        calendar.monthDate.setDate(1);
      }
    }

    temp = new Date(calendar.monthDate.getTime());
    
    do {
      index = availableDays.indexOf(temp.getDate());
      days.push({
        date: $filter('date')(temp, "yyyy-MM-dd"),
        day: temp.getDate(),
        past: ( temp.getTime() < today ),
        today: ( temp.getTime() === today ),
        available: ( (temp.getTime() > today) && (index > -1) ),
        details: ( (index > -1) && availableDates ) ? availableDates[index] : null
      });
      temp.setDate(temp.getDate() + 1);
    } while ( temp.getMonth() === calendar.monthDate.getMonth() );

    // set array of weeks with dates inside
    calendar.weeks = structure(days, calendar.monthDate.getDay());

    return calendar;
  }

  /**
   * Structure the calendar; takes an array of days and "pads" before and after, splitting those cells into rows
   * of seven.
   */
  function structure(days, firsWeekday) {
    var rows = [],
      items = [];

    // Some padding at the beginning
    for ( var pb = 0; pb < firsWeekday; pb++ ) {
      items.push({
        day: null
      });
    }
    
    // Merge in the array of days
    items.push.apply( items, days );

    // Some padding at the end if required
    if (items.length % 7) {
      for (var pe = (7 - ( items.length % 7 )); pe > 0; pe--) {
        items.push({
          day : null
        });
      }
    }

    // Split the array into "chunks" of seven
    rows = items.map( function(e, i) { 
      return i % 7 === 0 ? items.slice(i, i + 7) : null; 
    })
    .filter( function(e) { return e; } );

    return rows;
  }

  function hasPreviousMonth() {
    return calendar.monthDate.getTime() > today;
  }

  function getWeek(date) {
    var weekNum = getWeekOfMonth(new Date(date));
    if (weekNum > -1) {
      return calendar.weeks[weekNum];
    }
    return null;
  }

  function getWeekOfMonth(date) {
    // Using UTC methods so the local offset will not affect the results.
    var month = date.getUTCMonth(),
      year = date.getUTCFullYear(),
      firstWeekday = new Date(year, month, 1).getUTCDay(),
      lastDateOfMonth = new Date(year, month + 1, 0).getUTCDate(),
      offsetDate = date.getUTCDate() + firstWeekday - 1,
      index = 0, // start index at 0
      weeksInMonth = index + Math.ceil((lastDateOfMonth + firstWeekday - 7) / 7),
      week = index + Math.floor(offsetDate / 7);
    if (week < 2 + index) { return week; }
    return week === weeksInMonth ? index + 5 : week;
  }
  
  return {
    initialize: initialize,
    reload: build,
    hasPreviousMonth: hasPreviousMonth,
    getWeek: getWeek
  };

}

