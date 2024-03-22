/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// CREATE TWEET
// Define function called createTweetElement that takes in a tweet as its argument
const createTweetElement = function(tweet) {
  // Create a jQuery object for the tweet element
  const $tweet = $(`
    <article class="tweet">
      <header>
        <!-- User Info -->
        <div class="user-info">
          <i class="fas fa-user"></i>
          <p class="first-name">${tweet.user.name}</p>
        </div>
        <p class="tweet-username">${tweet.user.handle}</p>
      </header>
      <!-- Tweet Content -->
        <p class="tweet-content">${tweet.content.text}</p>
      <footer>
          <p class="days-posted-ago">${timeago.format(tweet.created_at)}</p>
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
  return $tweet;
};


// POST TWEET
// jQuery ready function to ensure DOM is fully loaded
$(document).ready(function() {
  // Event listener for submit event
  $("form").on("submit", function(event) {
    // prevent default form submission behaviour
    event.preventDefault();

    // Get the tweet text from the textarea
    const tweetText = $('#tweet-text').val();
    
    // Check if tweet is empty
    if (tweetText === '') {
      // Display an error message for empty tweet
      alert("Tweet content cannot be empty.");
      return; // Exit the function to prevent the form submission
    }

    // Check if the tweet text exceed the character limit
    if (tweetText.length > 140) {
      // Display an error message for tweet exceeding character limit
      alert("Tweet content cannot the 140 character limit. Please shorten your tweet.");
      return; // Exit the function to prevent the form submission
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
        $("form")[0].reset(); // Reset the form
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
      renderTweets(response); // Callback to render fetched tweets
    },
    error: function(xhr, status, error) {
      console.error('Error fetching tweets:', error);
    }
  });
};

// jQuery ready function to ensure DOM is fully loaded
$(document).ready(function() {
  // Call loadTweets function on page load
  loadTweets();
});