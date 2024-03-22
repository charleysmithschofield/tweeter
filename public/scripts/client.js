/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

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
          <p class="days-posted-ago">10 days ago</p>
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

renderTweets(data);

// jQuery ready function to ensure DOM is fully loaded
$(document).ready(function() {
  // Function to loadTweets
  const loadTweets = function() {
    // AJAX GET request
    $.ajax({
      url: '/tweets',
      type: 'GET',
      dataType: 'json',
      success: function(response) {
        console.log('Tweets fetched:', response);
        renderTweets(response); // Render fetched tweets
      },
      error: function(xhr, status, error) {
        console.error('Error fetching tweets:', error);
      }
    });
  }
  
  // Call loadTweets function on page load
  loadTweets();
});

// jQuery ready function to ensure DOM is fully loaded
$(document).ready(function() {
  // Event listener for submit event
  $("form").on("submit", function(event) {
    // prevent default form submission behaviour
    event.preventDefault();
  
    // Serialize form data
    const formData = $(this).serialize();

    // AJAX POST request to post form data
    $.ajax({
      type: "POST", // HTTP Method
      url: "/tweets", // Endpoint URL
      data: formData, // serialized formData
      success: function(response) {
        console.log("Form submitted successfully:", response);
      },
      error: function(jqXHR, textStatus, error) {
        console.log("Form submission failed:" + textStatus, error);
      }
    });
  });
});