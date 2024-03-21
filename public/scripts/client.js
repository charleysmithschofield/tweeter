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

// Declare a function called renderTweets that takes tweets as its argument
const renderTweets = function(tweets) {
  // Loop through each tweet in the array
  tweets.forEach(tweet => {
    // Call createTweetElement to create a tweet element for the current tweet
    const $tweet = createTweetElement(tweet);
    // Append the created tweet element to the #tweets-container
    $('#tweets-container').prepend($tweet);
  });
};

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
renderTweets(data);