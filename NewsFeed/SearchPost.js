// Search class
class Search {
  constructor() {
    this.searchInput = document.getElementById("search");
    this.postCardContainer = document.getElementById("postCard");
    this.attachEventListeners();
  }

  attachEventListeners() {
    this.searchInput.addEventListener("input", this.handleSearch.bind(this));
    // Prevent form submission on Enter key press
    this.searchInput.addEventListener(
      "keydown",
      this.handleKeyPress.bind(this)
    );
  }

  handleSearch(event) {
    const searchTerm = event.target.value.trim().toLowerCase();
    const matchedPosts = [];
    this.postCardContainer.querySelectorAll(".card").forEach((postCard) => {
      const title = postCard
        .querySelector(".card-title")
        .textContent.trim()
        .toLowerCase();
      const body = postCard
        .querySelector(".card-text")
        .textContent.trim()
        .toLowerCase();
      const tags = postCard.querySelectorAll(".postTags span");
      let found = false;
      if (title.includes(searchTerm) || body.includes(searchTerm)) {
        found = true;
      }
      tags.forEach((tag) => {
        if (tag.textContent.trim().toLowerCase() === `#${searchTerm}`) {
          found = true;
        }
      });
      if (found) {
        matchedPosts.push(postCard);
        postCard.style.display = "block";
      } else {
        postCard.style.display = "none";
      }
    });
    // Move matched posts to the top
    matchedPosts.forEach((matchedPost) => {
      this.postCardContainer.prepend(matchedPost);
    });
  }
  handleKeyPress(event) {
    // Prevent form submission on Enter key press
    if (event.key === "Enter") {
      event.preventDefault();
    }
  }
}

export default Search;

// ===================== Search API Start ================================
// Function to fetch and display search results
// function searchPosts(query) {
//   // Show loader while fetching data
//   loader.show();

//   // Fetch search results
//   fetch(`https://dummyjson.com/posts/search?q=${query}`)
//     .then((res) => {
//       if (!res.ok) {
//         throw new Error("Failed to fetch search results");
//       }
//       return res.json();
//     })
//     .then((data) => {
//       // Clear previous search results
//       const postCardContainer = document.getElementById("postCard");
//       postCardContainer.innerHTML = "";

//       // Display search results
//       data.forEach((post) => {
//         // Render post card for each result
//         const postCard = createPostCard(post);
//         postCardContainer.appendChild(postCard);
//         attachEventListeners(postCard);
//       });

//       // Hide loader after displaying results
//       loader.hide();
//     })
//     .catch((error) => {
//       console.error("Error searching posts:", error);
//       // Hide loader on error
//       loader.hide();
//     });
// }

// Attach event listener to search input field
// const searchInput = document.getElementById("search");
// searchInput.addEventListener("input", function (event) {
//   const query = event.target.value.trim(); // Get the search query
//   if (query.length >= 3) {
//     // Perform search if query length is at least 3 characters
//     searchPosts(query);
//   } else {
//     // Clear the search results if query length is less than 3 characters
//     const postCardContainer = document.getElementById("postCard");
//     postCardContainer.innerHTML = "";
//     // Fetch and display default posts
//     fetchPosts();
//   }
// });

// ====================== Search API END===============================
