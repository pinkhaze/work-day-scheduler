// Wait for contents of document to load before running Javascript
// Long form version of $(function() {})
$(document).ready(function () {
  // Add event listener to save button 
  $('.saveBtn').on('click', function () {
    // Starting at clicked button element, traverse to its immediate parent (<div id="hour-x" class="row time-block">)
    // Grab 'hour-x' id of timeblock where the save button was clicked
    var timeBlock = $(this).parent().attr('id'); 
    // Starting at clicked button element, traverse to its sibling with class="description"
    // Grab user input
    var userText = $(this).siblings('.description').val();

    // Save user input in local storage
    localStorage.setItem(timeBlock, userText);
  });

  // Jili Jiang (tutor) helped write this function
  // Display user input in corresponding timeblock
  function printData () {
    for (var i = 9; i < 18; i++) {
      var timeBlockText = localStorage.getItem('hour-'+ i);
      console.log(timeBlockText);
      $('#hour-'+ i + ' .description').val(timeBlockText);
    }
  };

  // Change background color of timeblocks
  $('.time-block').each(function(){
    // Get current hour
    var currHour = dayjs().format('H');

    // Get id attribute and split string at hyphen; grab right hand side
    var compareHour = $(this).attr('id').split('-')[1];

    // If current hour is the same as the timeblock, change background color to red
    if (currHour == compareHour){
      $(this).addClass('present');
      // If current hour comes after timeblock, change background color to green
    } else if (currHour > compareHour) {
      $(this).addClass('past');
    } else {
      // Otherwise, change background color to gray
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