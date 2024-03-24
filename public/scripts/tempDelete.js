<script>alert('oh no');</script>

// // CREATE TWEET
// // Define function called createTweetElement that takes in a tweet as its argument
// const createTweetElement = function(tweet) {
//   // Escape user-generate content
//   const safeName = escapeHTML(tweet.user.name);
//   const safeHandle = escapeHTML(tweet.user.handle);
//   const safeText = escapeHTML(tweet.content.text);

//   // Create a jQuery object for the tweet element
//   const $tweet = $(`
//     <article class="tweet">
//       <header>
//         <!-- User Info -->
//         <div class="user-info">
//           <i class="fas fa-user"></i>
//           <p class="first-name">${safeName}</p>
//         </div>
//         <p class="tweet-username">${safeHandle}</p>
//       </header>
//       <!-- Tweet Content -->
//         <p class="tweet-content">${safeText}</p>
//       <footer>
//           <p class="days-posted-ago">${timeago.format(tweet.created_at)}</p>
//           <div class="action-icons">
//           <!-- Flag Icon -->
//           <i class="fas fa-flag"></i>
//           <!-- Re-Tweet Icon -->
//           <i class="fas fa-retweet"></i>
//           <!-- Heart Icon -->
//           <i class="fas fa-heart"></i>
//           </div>
//       </footer>
//     </article>
//   `);
//   return $tweet;
// };

