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
        postCard.style.display = "block"; // Ensure that matched posts are visible
      } else {
        postCard.style.display = "none"; // Hide non-matching posts
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
