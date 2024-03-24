/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Escape function
const escapeHTML = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
// CREATE TWEET
// Define function called createTweetElement that takes in a tweet as its argument
const createTweetElement = function(tweet) {
  // Escape user-generate content
  const safeName = escapeHTML(tweet.user.name);
  const safeHandle = escapeHTML(tweet.user.handle);
  const safeText = escapeHTML(tweet.content.text);

  // Create a jQuery object for the tweet element structure without user content
  const $tweet = $(`
    <article class="tweet">
      <header>
        <!-- User Info -->
        <div class="user-info">
          <i class="fas fa-user"></i>
          <p class="first-name"></p>
        </div>
        <p class="tweet-username"></p>
      </header>
      <!-- Tweet Content -->
      <p class="tweet-content"></p>
      <footer>
        <p class="days-posted-ago"></p>
        <div class="action-icons">
          <!-- Flag Icon -->
          <i class="fas fa-flag"></i>
          <!-- Re-Tweet Icon -->
          <i class="fas fa-retweet"></i>
          <!-- Heart Icon -->
          <i class="fas fa-heart"></i>
        </div>
      </footer>
    </article>
  `);

  // Safely add user-generated content as text
  $tweet.find('.first-name').text(tweet.user.name);
  $tweet.find('.tweet-username').text(tweet.user.handle);
  $tweet.find('.tweet-content').text(tweet.content.text);
  $tweet.find('.days-posted-ago').text(timeago.format(tweet.created_at));

  return $tweet;
};

// TWEET VALIDATION
// Function to check if the tweet is valid
const isTweetValid = function(tweetText) {
  // Hide error container initially
  $(`#error-container`).hide();

  // Check if the tweet text is empty
  if (tweetText === '') {
    // Display an error message for empty tweet
    $('#error-container').text("⚠️ Tweet content cannot be empty. ⚠️").slideDown();
    // Exit the function to prevent the form submission
    return false;
    // Check if the tweet text is longer than 140 character limit
  } else if (tweetText.length > 140) {
    // Display an error message for a tweet that exceeds 140 characters
    $('#error-container').text("⚠️ Tweet content cannot exceed the 140 character limit. Please shorten your tweet. ⚠️").slideDown();
    // Exit the function to prevent the form submission
    return false;
  }
  // If the tweet is valid, return true
  return true;
};


// POST TWEET
// jQuery ready function to ensure DOM is fully loaded
$(document).ready(function() {
  // Event listener for submit event
  $("form").on("submit", function(event) {
    // prevent default form submission behaviour
    event.preventDefault();

    // Get the tweet text value from the textarea
    const tweetText = $('#tweet-text').val().trim();
    
    // Validate tweet content using isTweetValid function call
    if(!isTweetValid(tweetText)) {
      // Exit the function if tweet is invalid
      return;
    }
 
    // Serialize form data
    const formData = $(this).serialize();

    // AJAX POST request to post form data
    $.ajax({
      type: "POST", // HTTP Method
      url: "/tweets", // Endpoint URL
      data: formData, // serialized formData
      success: function(response) {
        console.log("Form submitted successfully:", response);
        // Reset the form only if the post was successful
        $("form")[0].reset();
        loadTweets(); // Reload the tweets
      },
      error: function(jqXHR, textStatus, error) {
        console.log("Form submission failed:" + textStatus, error);
      }
    });
  });
});

// RENDER TWEET
// Declare a function called renderTweets that takes tweets as its argument
const renderTweets = function(tweets) {
  // Loop through each tweet in the array
  tweets.forEach(tweet => {
    // Call createTweetElement to create a tweet element for the current tweet
    const $tweet = createTweetElement(tweet);
    // Prepend the created tweet element to the #tweets-container
    $('#tweets-container').prepend($tweet);
  });
};


// LOAD TWEETS
// Function to loadTweets dynamically from the server
const loadTweets = function() {
  // AJAX GET request to fetch tweets from the server
  $.ajax({
    url: '/tweets',
    type: 'GET',
    dataType: 'json',
    success: function(response) {
      console.log('Tweets fetched:', response);
      $('#tweets-container').empty(); // empty tweets container so old tweets aren't duplicated when new ones are loaded
      renderTweets(response); // Callback to render fetched tweets
    },
    error: function(xhr, status, error) {
      console.error('Error fetching tweets:', error);
    }
  });
};

// Call loadTweets function on page load
loadTweets();