// Wait for contents of document to load before running Javascript
// Long form version of $(function() {})
$(document).ready(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

  $('.saveBtn').on('click', function () {
    // Starting at clicked button element, traverse to its immediate parent (<div id="hour-x" class="row time-block">)
    // Grab id attribute
    var timeBlock = $(this).parent().attr('id'); // could also use data()
    // Starting at clicked button element, traverse to its sibling with class="description"
    // Grab user input
    var userText = $(this).siblings('.description').val();
  

    // Save input in local storage
    localStorage.setItem(timeBlock, userText);
  });

  function printData () {
    for (var i = 9; i < 18; i++) {
      var timeBlockText = localStorage.getItem('hour-'+ i);
      console.log(timeBlockText);
      $('#hour-'+ i + ' .description').val(timeBlockText);
    }
  };

  $('.time-block').each(function(){
    // Get current hour
    var currHour = dayjs().format('H');

    // Get timeblock hour
    var compareHour = $(this).attr('id').split('-')[1];

    if (currHour == compareHour){
      $(this).addClass('present');
    } else if (currHour > compareHour) {
      $(this).addClass('past');
    } else {
      $(this).addClass('future');
    }
  })

  // Display current date in header of page
  function displayDate() {
    var currDate = dayjs();
    $('#currentDay').text(currDate.format('dddd, MMMM DD'));
  }

  // Update displayed date every minute
  setInterval(displayDate, 60000);

  printData();
  displayDate();

});