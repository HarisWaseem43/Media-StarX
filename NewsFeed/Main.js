import Search from "./SearchPost.js";
import AuthUserDataFetcher from "./FetchAuthUser.js";
import Loader from "./Loader.js";
import SidebarDrag from "./SidebarDrag.js";
import UserDisplay from "./FetchAllUsers.js";
import RightSidebar from "./userSidebar.js";

// Console All LocalStorage Data
const token = localStorage.getItem("token");
// console.log("Token :", token);
const username = localStorage.getItem("username");
// console.log("username :", username);
const firstName = localStorage.getItem("firstName");
// console.log("firstName :", firstName);
const lastName = localStorage.getItem("lastName");
// console.log("lastName :", lastName);
const email = localStorage.getItem("email");
// console.log("email :", email);
const loginUserID = parseInt(localStorage.getItem("userId"));
console.log("loginUserID :", loginUserID);

const nameElement = document.getElementById("name");
const usernameElement = document.getElementById("username");

// Set values fetched from localStorage
nameElement.textContent = `${firstName} ${lastName}`;
usernameElement.textContent = `@${username}`;

// Set Image
const image = localStorage.getItem("image");
// console.log("Image :", image);
const profileImg = document.getElementById("profile-img");
profileImg.src = image;
const userImage = document.getElementById("userimg");
userImage.src = image;

class PostManager {
  constructor() {
    this.loadingMorePosts = false;
    this.loader = new Loader();
    this.scrollContainer = document.getElementById("middle");
    this.scrollContainer.addEventListener(
      "scroll",
      this.handleScroll.bind(this)
    );
    this.fetchPosts();
  }

  async fetchUserById(userId) {
    try {
      const response = await fetch(`https://dummyjson.com/users/${userId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch user with ID ${userId}`);
      }
      const userData = await response.json();
      return userData;
    } catch (error) {
      console.error(error.message);
      return null;
    }
  }

  async fetchPosts() {
    try {
      const response = await fetch("https://dummyjson.com/posts");

      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }

      const postsData = await response.json();
      // console.log("Get All Post :", postsData.posts);

      // Clear previous posts
      const postCardContainer = document.getElementById("postCard");
      postCardContainer.innerHTML = "";

      // Get the first 10 posts
      const firstTenPosts = postsData.posts.slice(0, 10);

      for (const post of firstTenPosts) {
        try {
          const commentsResponse = await fetch(
            `https://dummyjson.com/comments/post/${post.id}`
          );
          if (!commentsResponse.ok) {
            throw new Error(`Failed to fetch comments for post ${post.id}`);
          }
          const commentsData = await commentsResponse.json();
          const userData = await this.fetchUserById(post.userId);
          // console.log(`Comments for Post ${post.id}:`, commentsData);
          if (userData) {
            const postCard = this.createPostCard(
              post,
              commentsData.comments,
              userData
            );
            postCardContainer.appendChild(postCard);
            this.attachEventListeners(postCard);
          }
        } catch (error) {
          console.error(error.message);
        }
      }

      loader.hide();
    } catch (error) {
      console.error("Error fetching posts:", error.message);
      loader.hide();
    }
  }

  async fetchMorePosts() {
    try {
      loader.show();
      const response = await fetch("https://dummyjson.com/posts");

      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }

      const postsData = await response.json();
      // console.log("Get More Posts :", postsData.posts);

      // Get the next 10 posts
      const nextTenPosts = postsData.posts.slice(10, 20);

      const postCardContainer = document.getElementById("postCard");

      for (const post of nextTenPosts) {
        try {
          const commentsResponse = await fetch(
            `https://dummyjson.com/comments/post/${post.id}`
          );
          if (!commentsResponse.ok) {
            throw new Error(`Failed to fetch comments for post ${post.id}`);
          }
          const commentsData = await commentsResponse.json();
          // console.log(`Comments for Post ${post.id}:`, commentsData.comments);
          const userData = await this.fetchUserById(post.userId);
          if (userData) {
            const postCard = this.createPostCard(
              post,
              commentsData.comments,
              userData
            );
            postCardContainer.appendChild(postCard);
            this.attachEventListeners(postCard);
          }
        } catch (error) {
          console.error(error.message);
        }
      }

      loader.hide();
      this.loadingMorePosts = false;
    } catch (error) {
      console.error("Error fetching more posts:", error.message);
      loader.hide();
      loadingMorePosts = false;
    }
  }

  handleScroll() {
    const scrollTop = scrollContainer.scrollTop;
    const scrollHeight = scrollContainer.scrollHeight;
    const clientHeight = scrollContainer.clientHeight;

    const distanceToBottom = scrollHeight - (scrollTop + clientHeight);

    const threshold = 200;

    if (distanceToBottom < threshold && !this.loadingMorePosts) {
      this.loadingMorePosts = true;
      loader.show();

      setTimeout(() => {
        this.fetchMorePosts().then(() => {
          loader.hide();
          this.loadingMorePosts = false;

          scrollContainer.removeEventListener("scroll", this.handleScroll);
        });
      }, 10000);
    }
  }

  toggleAddCommentInputField(postCard) {
    const inputFieldContainer = postCard.querySelector(
      ".comment-input-container"
    );
    inputFieldContainer.classList.toggle("hidden");
  }

  postComment(postCard) {
    const inputField = postCard.querySelector(".comment-input");
    const commentText = inputField.value.trim();
    if (commentText !== "") {
      // Make a POST request to add the comment
      console.log("Add comment UserId: ", loginUserID);
      fetch("https://dummyjson.com/comments/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          body: commentText,
          postId: postCard.dataset.postId,
          userId: loginUserID,
        }),
      })
        .then((response) => {
          if (response.ok) {
            // Clear the input field
            inputField.value = "";
            // Hide the input field
            this.toggleAddCommentInputField(postCard);
            Swal.fire({
              icon: "success",
              title: "Comment Added",
              text: "Your comment has been added successfully!",
            });
            return response.json();
          } else {
            throw new Error("Failed to add comment");
          }
        })
        .then((data) => {
          // Create the new comment HTML element
          const newCommentElement = document.createElement("li");
          newCommentElement.className = "text-white comment-item";
          newCommentElement.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <b>${username}</b> <span class="test">${commentText}</span>
              </div>
              <div class="comment-actions">
                <button class="btn btn-link edit-comment-btn bg-transparent text-white edit-button p-0">Edit</button>
                <button class="btn btn-link delete-comment-btn bg-transparent text-white edit-button p-0">Delete</button>
              </div>
            </div>
          `;

          // Append the new comment HTML element to the comments container
          const commentsContainer = postCard.querySelector(
            ".comments-section ul"
          );
          commentsContainer.appendChild(newCommentElement);

          // Attach event listeners to the edit buttons of the new comment
          const editButton =
            newCommentElement.querySelector(".edit-comment-btn");
          editButton.addEventListener("click", () => {
            const commentTextElement = newCommentElement.querySelector(".test");
            const commentText = commentTextElement.textContent.trim();

            this.toggleEditCommentInputField(postCard, commentText);
            console.log(newCommentElement.querySelector(".test"));
          });
        })
        .catch((error) => {
          console.error("Error:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to add comment. Please try again later.",
          });
        });
    }
  }

  toggleEditCommentInputField(postCard, commentText) {
    const inputFieldContainer = postCard.querySelector(".edit-input-container");
    const inputField = inputFieldContainer.querySelector(".edit-input");
    inputField.value = commentText; // Populate input field with current comment data
    inputFieldContainer.classList.toggle("hidden");
  }

  editComment(postCard, commentId) {
    const inputField = postCard.querySelector(".edit-input");
    const editText = inputField.value.trim(); // Get the edit text

    if (editText !== "") {
      // API call to update the comment
      fetch(`https://dummyjson.com/comments/${loginUserID}`, {
        method: "PUT", // or 'PATCH'
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          body: editText,
        }),
      })
        .then((res) => {
          if (res.ok) {
            console.log("Successful Updated: ", res.status);
            Swal.fire({
              icon: "success",
              title: "Comment Updated",
              text: `Comment has been updated successfully!`,
            });
            return res.json();
          }
          throw new Error("Failed to update comment");
        })
        .then((data) => console.log("Updated Comment: ", data.body))
        .catch((error) => {
          console.error("Error:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to update comment. Please try again later.",
          });
        });

      inputField.value = ""; // Clear the input field
      this.toggleEditCommentInputField(postCard); // Hide the input field
    }
  }

  deleteComment(postCard) {
    fetch(`https://dummyjson.com/comments/${postCard.dataset.postId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          // If the response is successful, remove the comment from the UI
          console.log("Successful Deleted: ", response.status);
          const commentItem = postCard.querySelector(
            `[data-comment-id="${postCard.dataset.postId}"]`
          );
          if (commentItem) {
            commentItem.remove();
          }
          // Show SweetAlert
          Swal.fire({
            icon: "success",
            title: "Comment Deleted",
            text: `Comment has been deleted successfully!`,
          });
        } else {
          throw new Error("Failed to delete comment");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to delete comment. Please try again later.",
        });
      });
  }

  attachEventListeners(postCard) {
    // Event listener for comment icon
    const commentIcon = postCard.querySelector(".comment-icon");
    if (commentIcon) {
      commentIcon.addEventListener("click", () =>
        this.toggleAddCommentInputField(postCard)
      );
    }
    // Event listener for edit buttons of hidden comments
    const viewAllComments = postCard.querySelector("#viewAllComments");
    if (viewAllComments) {
      viewAllComments.addEventListener("click", () => {
        const hiddenEditButtons =
          postCard.querySelectorAll(".edit-comment-btn");
        hiddenEditButtons.forEach((hiddenEditButton, index) => {
          hiddenEditButton.addEventListener("click", () => {
            const commentText = postCard
              .querySelectorAll(".comment-item")
              [index].querySelector(".test")
              .textContent.trim();
            toggleEditCommentInputField(postCard, commentText);
          });
        });
      });
    }
  }

  createPostCard(post, comments, userData) {
    const visibleComments = comments.slice(0, 2);
    const hiddenComments = comments.slice(2);

    const postCard = document.createElement("div");
    postCard.className = "card mb-3 mt-3";
    postCard.dataset.postId = post.id;
    postCard.dataset.userId = post.userId;

    // Add HTML content for the post card
    postCard.innerHTML = `
            <div class="d-flex justify-content-between align-items-center pe-4">
              <div class="card-body d-flex align-items-center column-gap-2">
                <div class="Post-Profile-Pic">
                  <img
                    src=${userData.image}
                    class="card-img-top rounded-circle"
                    alt="Profile Image"
                  />
                </div>
                <div class="userPost-Info">
                  <h5 class="card-title mb-0 text-white fs-6">${
                    userData.username
                  }</h5>
                  <p class="card-text text-white fs-6">${
                    userData.address.address
                  }</p>
                </div>
              </div>
              <div><i class="uil uil-ellipsis-h fs-3"></i></div>
            </div>
            <img
              src="../images/feed-3.jpg"
              class="card-img-top px-3 rounded-5"
              alt="Post Image"
            />
            <div class="main d-flex justify-content-between align-items-center px-3">
              <div class="threeAction d-flex justify-content-start align-items-center">
                <div><i class="uil uil-heart fs-4 text-white"></i></div>
                <div class="comment-icon"><i class="uil uil-comment-dots fs-4 text-white"></i></div>
                <div><i class="uil uil-share fs-4 text-white"></i></div>
              </div>
              <div><i class="uil uil-bookmark-full fs-4 text-white"></i></div>
            </div>
            <div class="Reactions">
              <div class="text-white ps-4 ms-1" id="Reactions">${
                post.reactions
              } likes</div>
            </div>
            <div class="card-body">
            <div class="liked-by ps-2 d-flex">
            <span class="likedImage"
            ><img class="d-block rounded-circle overflow-hidden" src="../images/profile-10.jpg"
          /></span>
          <span class="likedImage"
            ><img class="d-block rounded-circle overflow-hidden" src="../images/profile-4.jpg"
          /></span>
          <span class="likedImage"
            ><img class="d-block rounded-circle overflow-hidden" src="../images/profile-15.jpg"
          /></span>
          <p class="text-white ps-2">
          Liked by <b>Benjamin Dwayne</b> and <b>${post.reactions} others</b>
        </p>
            </div>
            <div class""Captions>
            <p class="text-white mb-0"><b>Micheal</b> ${post.title}</p>
            <p class="card-text text-white mb-0"> ${post.body}.</p>
            </div>
            <p class="postTags text-white">
            <span>#${post.tags[0]}</span>
            <span>#${post.tags[1]}</span>
            <span>#${post.tags[2]}</span>
            </p>
            <div class="comments-section mt-3">
              <ul class="list-unstyled">
                ${visibleComments
                  .map(
                    (comment, index) => `
                    <li class="text-white comment-item">
                      <div class="d-flex justify-content-between align-items-center">
                        <div>
                          <b>${
                            comment.user.username
                          }</b> <span class="test" data-comment-id="${
                      comment.id
                    }">${comment.body}</span>
                        </div>
                        <div class="comment-actions">
                        ${
                          comment.user.id === loginUserID
                            ? `<button class="btn btn-link edit-comment-btn bg-transparent text-white edit-button p-0" data-comment-id="${comment.id}">Edit</button>
                              <button class="btn btn-link delete-comment-btn bg-transparent text-white edit-button p-0">Delete</button>`
                            : ""
                        }
                        </div>
                      </div>
                    </li>
                  `
                  )
                  .join("")}
                  
              </ul>
              ${
                hiddenComments.length > 0
                  ? `<p class="text-white mb-0" id="viewAllComments">View all ${comments.length} comments</p>`
                  : ""
              }
            </div>
              <!-- Add Comment Input Field -->
              <div class="comment-input-container mt-2 hidden">
                <input type="text" class="form-control comment-input" placeholder="Write a comment...">
                <!-- <button class="btn btn-primary post-btn">Post</button> -->
              </div>
              <!-- Edit Comment Input Field -->
            ${visibleComments
              .map(
                (comment, index) => `
                    <div class="edit-input-container hidden mt-2">
                      <textarea type="text" class="form-control edit-input" data-comment-id="${comment.id}">${comment.body}</textarea>
                    </div>
                  `
              )
              .join("")}
              <p class="card-text text-white text-end mt-2">
                <small class="text-white">Just now</small>
              </p>
            </div>
          `;

    // Event listener to toggle visibility of hidden comments
    const viewAllComments = postCard.querySelector("#viewAllComments");
    if (viewAllComments) {
      viewAllComments.addEventListener("click", () => {
        const hiddenCommentsContainer =
          postCard.querySelector(".list-unstyled");
        hiddenCommentsContainer.innerHTML += hiddenComments
          .slice(0, 5) // Show only the hidden comments
          .map(
            (comment) =>
              `<li class="text-white comment-item">
            <div class="d-flex justify-content-between align-items-center">
              <div >
                <b>${comment.user.username}</b> <span class="test">${
                comment.body
              }</span>
              </div>
              <div class="comment-actions">
              ${
                comment.user.id === loginUserID
                  ? `<button class="btn btn-link edit-comment-btn bg-transparent text-white edit-button p-0">Edit</button>
                    <button class="btn btn-link delete-comment-btn bg-transparent text-white edit-button p-0">Delete</button>`
                  : ""
              }
              </div>
            </div>
          </li>`
          )
          .join("");

        // Hide the "View all comments" link and show the "Hide comments" button
        viewAllComments.style.display = "none";
        const hideCommentsButton = document.createElement("button");
        hideCommentsButton.className = "btn btn-link text-white mb-0 ps-0";
        hideCommentsButton.textContent = "Hide comments";
        hideCommentsButton.addEventListener("click", () => {
          // Remove all but the first two comments from the hidden comments container
          const hiddenComments = hiddenCommentsContainer.querySelectorAll("li");
          for (let i = 2; i < hiddenComments.length; i++) {
            hiddenComments[i].remove();
          }
          hideCommentsButton.style.display = "none"; // Hide the "Hide comments" button
          viewAllComments.style.display = "block"; // Show the "View all comments" link again
        });
        hiddenCommentsContainer.parentNode.appendChild(hideCommentsButton);
      });
    }

    // Event listener for edit button
    const editButtons = postCard.querySelectorAll(".edit-comment-btn");
    editButtons.forEach((editButton, index) => {
      editButton.addEventListener("click", () => {
        // Find the parent post card
        const postCard = editButton.closest(".card");
        if (postCard) {
          // Find the comment item associated with this edit button
          const commentItem = editButton.closest(".comment-item");
          if (commentItem) {
            // Find the comment text within the comment item
            const commentText = commentItem
              .querySelector(".test")
              .textContent.trim();
            // Toggle the edit comment input field with the captured comment text
            postManager.toggleEditCommentInputField(postCard, commentText);
          }
        }
      });
    });

    return postCard;
  }
}

// Create an instance of PostManager to start managing posts and comments
const postManager = new PostManager();

// Function to handle Enter key press for adding or editing comments
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    // Get the active element
    const activeElement = document.activeElement;
    // Check if the active element is an input field with class "comment-input" or "edit-input"
    if (
      activeElement &&
      (activeElement.classList.contains("comment-input") ||
        activeElement.classList.contains("edit-input"))
    ) {
      // Get the parent post card of the input field
      const postCard = activeElement.closest(".card");
      if (postCard) {
        // Check if the active element is an input field for adding comments
        if (activeElement.classList.contains("comment-input")) {
          // Call postComment function with the parent post card
          postManager.postComment(postCard); // Fixed here
        }
        // Check if the active element is an input field for editing comments
        else if (activeElement.classList.contains("edit-input")) {
          // Get the comment ID associated with this input field
          const commentId = activeElement.dataset.commentId;
          // Call editComment function with the parent post card and comment ID
          postManager.editComment(postCard, commentId); // Fixed here
        }
      }
    }
  }
});

// Event listener for delete button
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-comment-btn")) {
    const postCard = event.target.closest(".card");
    const commentId = event.target.closest(".comment-item").dataset.id;
    postManager.deleteComment(postCard, commentId);
  }
});

const scrollContainer = document.getElementById("middle");

// Create an instance of Loader
const loader = new Loader();

// Instantiate the Search class
const search = new Search();

// Create an instance of AuthUserDataFetcher
const userDataFetcher = new AuthUserDataFetcher(token);

// Fetch user data
userDataFetcher.fetchUserData();

// Start checking token expiration periodically
userDataFetcher.startCheckingTokenExpiration();

// Create an instance of UserDisplay
const userDisplay = new UserDisplay();

// Fetch and display users
userDisplay.fetchAndDisplayUsers();

// Logout Functionality
class LogoutManager {
  constructor() {
    this.logoutLink = document.getElementById("logout");
    this.logoutLink.addEventListener("click", this.logout.bind(this));
  }

  logout() {
    localStorage.clear();
    window.location.href = "../index.html";
  }
}
const logoutManager = new LogoutManager();

// Assuming sidebarElement is the reference to your sidebar DOM element
const sidebarElement = document.getElementById("sidebar");
const sidebar = new SidebarDrag(sidebarElement);

// Right Sidebar Toggle
document.addEventListener("DOMContentLoaded", function () {
  new RightSidebar("userIcon", "rightSidebar", "closeButton");
});
