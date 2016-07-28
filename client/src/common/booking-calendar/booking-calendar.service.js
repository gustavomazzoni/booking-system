angular.module('booking.widgets.calendar')
.factory('calendarFactory', calendarFactory);

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
