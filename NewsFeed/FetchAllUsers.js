// userDisplay.js

class UserDisplay {
  constructor() {
    this.usersContainer = document.getElementById("users");
  }

  fetchAndDisplayUsers() {
    fetch("https://dummyjson.com/users")
      .then((res) => res.json())
      .then((users) => {
        this.displayUsers(users.users); // Display only the first 10 users
        this.addEventListeners(); // Add event listeners after displaying users
      })
      .catch((error) => console.error("Error fetching users:", error));
  }

  displayUsers(users) {
    console.log("Users:", users);
    users.forEach((user) => {
      const userDiv = document.createElement("div");
      userDiv.classList.add("users");

      // Create a link around user information
      const userLink = document.createElement("a");
      userLink.href = `../NewsFeed/UserPost.html?userId=${user.id}`; // Add user ID to URL
      userLink.classList.add("user-link");
      userLink.innerHTML = `
          <div class="profile-photo position-relative overflow-visible">
            <img class="UserImg rounded-circle" src="${user.image}" />
          </div>
          <div class="message-body">
            <h5 class="mb-0 fs-6">${user.firstName} ${user.lastName}</h5>
            <p class="fs-6 text-white">${user.username}</p>
          </div>
        `;

      userDiv.appendChild(userLink);
      this.usersContainer.appendChild(userDiv);
    });
  }

  // Add event listener to handle user link clicks
  addEventListeners() {
    this.usersContainer.addEventListener("click", (event) => {
      if (event.target.classList.contains("user-link")) {
        event.preventDefault(); // Prevent default link behavior
        const userId = event.target.href.split("=")[1]; // Extract user ID from URL
        window.location.href = `../NewsFeed/UserPost.html?userId=${userId}`; // Redirect to UserPost.html with user ID
      }
    });
  }
}

export default UserDisplay;
