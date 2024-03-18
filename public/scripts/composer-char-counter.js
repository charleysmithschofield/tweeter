// composer-char-counter.js

$(document).ready(function() {
  $('.new-tweet textarea').on('input', function(event) {
    // Determine the value of the textarea that fired the event
    let inputValue = $(this).val();
    // Determine the length of the input value
    let inputLength = inputValue.length;
    // Calculate the number of characters left
    let charactersLeft = 140 - inputLength;

    // Create a jQuery object using this, traverse up the DOM tree to the nearest form
    const form = $(this).closest('form');

    // Find the counter within the form
    const counter = form.find('output[name="counter"]');

    // Update the counter text
    counter.text(charactersLeft);

    // Check if the characters left are less than zero (negative)
    if (charactersLeft < 0) {
      // Add CSS class to make the counter text red
      counter.addClass('negative');
    } else {
      // Remove CSS class if the characters left is not negative
      counter.removeClass('negative');
    }
  });
});