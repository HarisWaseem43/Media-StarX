// Fetch user data based on user ID from the URL
// const urlParams = new URLSearchParams(window.location.search);
// const userId = urlParams.get("userId");
// console.log("UserID: ", userId);

// fetch(`https://dummyjson.com/users/${userId}`)
//   .then((res) => res.json())
//   .then((user) => {
//     console.log("User Data: ", user);
//     const container = document.querySelector(".container");

//     // User Profile Info Card
//     container.innerHTML += `
//       <div class="row justify-content-center my-4">
//         <div class="col-12 col-md-10">
//           <div class="card mb-3">
//             <div class="user-Profile">
//               <div class="main_container d-flex justify-content-center my-4 mt-2">
//                 <div class="user-Data d-lg-flex align-items-center">
//                   <div class="Username d-block d-lg-none text-white fs-3 mb-2 mb-xl-0 text-center border-bottom border-white pb-4">
//                     ${user.username}
//                   </div>
//                   <div class="ps-4 ps-lg-0 mt-lg-0 mt-4">
//                     <img class="user_ProfilePic rounded-circle" src="${user.image}" />
//                   </div>
//                   <div class="text-white">
//                     <div class="card-body">
//                       <div class="info-container d-md-flex justify-content-between align-items-center mb-4">
//                         <div class="Username text-white fs-3 mb-2 mb-xl-0">
//                           ${user.username}
//                         </div>
//                         <div class="Profile_info d-flex justify-content-between align-items-center column-gap-2">
//                           <button class="follow-Btn btn btn-primary">
//                             Follow
//                           </button>
//                           <button class="message-Btn btn btn-dark">
//                             Message
//                           </button>
//                           <button class="Add-Btn btn btn-dark fs-6">
//                             <i class="uil uil-user-plus"></i>
//                           </button>
//                           <div class="Add-Btn fs-4 d-none d-xl-block">
//                             <i class="uil uil-ellipsis-h"></i>
//                           </div>
//                         </div>
//                       </div>
//                       <div class="Profile_Follows w-50 d-lg-flex d-none justify-content-between align-items-center mb-4 column-gap-2 column-gap-xl-2 text-center">
//                         <h6 class="Posts">55 posts</h6>
//                         <h6 class="Followers">98 followers</h6>
//                         <h6 class="Following">9 following</h6>
//                       </div>
//                       <h5 class="card-title pb-1">${user.firstName} ${user.lastName}</h5>
//                       <p class="card-subtitle text-white pb-1">
//                       sc. sheldonquigley0610
//                       </p>
//                       <p class="card-subtitle text-white pb-1">
//                       Digital Creator

//                       </p>
//                       <p class="card-subtitle text-white pb-1">
//                       Bs chal rha hy💀
//                       </p>
//                       <h6 class="card-text mt-1">
//                         Followed by imran.karamat00, daniyal.nadeem88.dn,
//                         waleed_aaay + 6 more
//                       </h6>
//                     </div>
//                     <div class="Profile_Follows w-100 d-flex d-lg-none justify-content-evenly align-items-center column-gap-2 text-center border-top border-white pt-4">
//                       <h6 class="Posts mb-0">55 posts</h6>
//                       <h6 class="Followers mb-0">98 followers</h6>
//                       <h6 class="Following mb-0">9 following</h6>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>`;

//     // Fetch post data for the user with ID 5
//     fetch(`https://dummyjson.com/posts/user/5`)
//       .then((res) => res.json())
//       .then((postData) => {
//         console.log("Post Data: ", postData);

//         // Iterate over each post and create HTML dynamically
//         postData.posts.forEach((post) => {
//           // Create user post card using innerHTML
//           container.innerHTML += `
//     <div class="row justify-content-center">
//     <div class="col-12 col-md-10">
//       <div class="card mb-3">
//         <div class="userPost">
//           <div
//             class="d-flex justify-content-between align-items-center pe-4"
//           >
//             <div
//               class="card-body p-4 d-flex align-items-center column-gap-2"
//             >
//               <div class="Post-Profile-Pic">
//                 <img
//                 src="${user.image}"
//                   class="card-img-top rounded-circle"
//                   alt="Profile Image"
//                 />
//               </div>
//               <div class="userPost-Info">
//                 <h5 class="card-title mb-0 text-white fs-6">${user.username}</h5>
//                 <p class="card-text text-white fs-6">${user.address.address}</p>
//               </div>
//             </div>
//             <div><i class="uil uil-ellipsis-h fs-3"></i></div>
//           </div>
//           <img
//             src="../images/feed-3.jpg"
//             class="card-img-top px-3 rounded-5"
//             alt="Post Image"
//           />
//           <div
//             class="main d-flex justify-content-between align-items-center px-3"
//           >
//             <div
//               class="threeAction d-flex justify-content-start align-items-center"
//             >
//               <div><i class="uil uil-heart fs-4 text-white"></i></div>
//               <div class="comment-icon">
//                 <i class="uil uil-comment-dots fs-4 text-white"></i>
//               </div>
//               <div><i class="uil uil-share fs-4 text-white"></i></div>
//             </div>
//             <div><i class="uil uil-bookmark-full fs-4 text-white"></i></div>
//           </div>
//           <div class="Reactions">
//             <div class="text-white ps-4 ms-1" id="Reactions">${post.reactions} likes</div>
//           </div>
//           <div class="card-body">
//             <div class="liked-by ps-2 d-flex">
//               <span class="likedImage"
//                 ><img
//                   class="likeImg d-block rounded-circle overflow-hidden"
//                   src="../images/profile-10.jpg"
//               /></span>
//               <span class="likedImage"
//                 ><img
//                   class="likeImg d-block rounded-circle overflow-hidden"
//                   src="../images/profile-4.jpg"
//               /></span>
//               <span class="likedImage"
//                 ><img
//                   class="likeImg d-block rounded-circle overflow-hidden"
//                   src="../images/profile-15.jpg"
//               /></span>
//               <p class="text-white ps-2">
//                 Liked by <b>Benjamin Dwayne</b> and <b>${post.reactions} others</b>
//               </p>
//             </div>
//             <div class="Captions">
//               <p class="text-white mb-0"><b>Micheal</b> ${post.title}</p>
//               <p class="card-text text-white mb-0">${post.body}</p>
//             </div>
//             <p class="postTags text-white">
//               <span>#${post.tags[0]}</span>
//               <span>#${post.tags[0]}</span>
//               <span>#${post.tags[0]}</span>
//             </p>
//             <div class="comments-section mt-3">
//               <ul class="list-unstyled">
//                 <li class="text-white comment-item">
//                   <div
//                     class="d-flex justify-content-between align-items-center"
//                   >
//                     <div>
//                       <b>Micheal</b>
//                       <span class="test">You are my safest place.</span>
//                     </div>
//                     <div class="comment-actions">
//                       <button
//                         class="btn btn-link edit-comment-btn bg-transparent text-white edit-button p-0"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         class="btn btn-link delete-comment-btn bg-transparent text-white edit-button p-0"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </div>
//                 </li>
//               </ul>
//               <p class="text-white mb-0" id="viewAllComments">
//                 View all 132 comments
//               </p>
//             </div>
//             <div class="comment-input-container mt-2 hidden">
//               <input
//                 type="text"
//                 class="form-control comment-input"
//                 placeholder="Write a comment..."
//               />
//             </div>
//             <div class="edit-input-container hidden mt-2">
//               <textarea type="text" class="form-control edit-input">
// Comment</textarea
//               >
//             </div>
//             <p class="card-text text-white text-end mt-2">
//               <small class="text-white">Just now</small>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>`;
//         });
//       })
//       .catch((error) => console.error("Error fetching post data:", error));
//   })
//   .catch((error) => console.error("Error fetching user data:", error));

const username = localStorage.getItem("username");
const firstName = localStorage.getItem("firstName");
const lastName = localStorage.getItem("lastName");
const image = localStorage.getItem("image");

const nameElement = document.getElementById("name");
const usernameElement = document.getElementById("username");

// Set values fetched from localStorage
nameElement.textContent = `${firstName} ${lastName}`;
usernameElement.textContent = `@${username}`;
const profileImg = document.getElementById("profile-img");
profileImg.src = image;

class UserProfile {
  constructor() {
    this.container = document.querySelector(".container");
    this.init();
  }

  async init() {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("userId");

    try {
      const userData = await this.fetchUserData(userId);
      this.renderUserProfile(userData);

      const postData = await this.fetchUserPosts(userId);
      this.renderUserPosts(userData, postData);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async fetchUserData(userId) {
    const response = await fetch(`https://dummyjson.com/users/${userId}`);
    return response.json();
  }

  async fetchUserPosts(userId) {
    const response = await fetch(`https://dummyjson.com/posts/user/${userId}`);
    return response.json();
  }

  renderUserProfile(user) {
    this.container.innerHTML += `
      <div class="row my-4">
      <div class="">
        <div class=" mb-3">
          <div class="user-Profile">
            <div class="main_container d-flex justify-content-center my-4 mt-2">
              <div class="user-Data d-lg-flex align-items-center">
                <div class="Username d-block d-lg-none text-white fs-3 mb-2 mb-xl-0 text-center border-bottom border-white pb-4">
                  ${user.username}
                </div>
                <div class="ps-4 ps-lg-0 mt-lg-0 mt-4">
                  <img class="user_ProfilePic rounded-circle" src="${user.image}" />
                </div>
                <div class="text-white">
                  <div class="card-body">
                    <div class="info-container d-md-flex justify-content-between align-items-center mb-4">
                      <div class="Username text-white fs-3 mb-2 mb-xl-0">
                        ${user.username}
                      </div>
                      <div class="Profile_info d-flex justify-content-between align-items-center column-gap-2">
                        <button class="follow-Btn btn btn-primary">
                          Follow
                        </button>
                        <button class="message-Btn btn btn-dark">
                          Message
                        </button>
                        <button class="Add-Btn btn btn-dark fs-6">
                          <i class="uil uil-user-plus"></i>
                        </button>
                        <div class="Add-Btn fs-4 d-none d-xl-block">
                          <i class="uil uil-ellipsis-h"></i>
                        </div>
                      </div>
                    </div>
                    <div class="Profile_Follows w-50 d-lg-flex d-none justify-content-between align-items-center mb-4 column-gap-2 column-gap-xl-2 text-center">
                      <h6 class="Posts">55 posts</h6>
                      <h6 class="Followers">98 followers</h6>
                      <h6 class="Following">9 following</h6>
                    </div>
                    <h5 class="card-title pb-1">${user.firstName} ${user.lastName}</h5>
                    <p class="card-subtitle text-white pb-1">
                    sc.${user.username}0610
                    </p>
                    <p class="card-subtitle text-white pb-1">
                    Digital Creator

                    </p>
                    <p class="card-subtitle text-white pb-1">
                    Bs chal rha hy💀
                    </p>
                    <h6 class="card-text mt-1 mb-4">
                      Followed by imran.karamat00, daniyal.nadeem88.dn,
                      waleed_aaay + 6 more
                    </h6>
                  </div>
                  <div class="Profile_Follows w-100 d-flex d-lg-none justify-content-evenly align-items-center column-gap-2 text-center border-top border-white pt-4">
                    <h6 class="Posts mb-0">55 posts</h6>
                    <h6 class="Followers mb-0">98 followers</h6>
                    <h6 class="Following mb-0">9 following</h6>
                  </div>
                  </div>
                  </div>
                  </div>
                  </div>
                  <div class="border-top"></div>
                  <div class="d-flex flex-wrap">
                  <div class="p-3 text-white">
                  <img class="user_Story border border-4 border-light rounded-circle" src="../images/profile-17.jpg" />
                  <p class="text-center">Highlights</p>
                  </div>
                  <div class="p-3 text-white">
                  <img class="user_Story border border-4 border-light rounded-circle" src="../images/profile-6.jpg" />
                  <p class="text-center">Highlights</p>
                  </div>
                  <div class="p-3 text-white">
                  <img class="user_Story border border-4 border-light rounded-circle" src="../images/profile-8.jpg" />
                  <p class="text-center">Highlights</p>
                  </div>
                  </div>
                  </div>
                  </div>
    </div>`;
  }

  renderUserPosts(user, postData) {
    postData.posts.forEach((post) => {
      this.container.innerHTML += `
        <div class="row ">
        <div class="">
          <div class="card mb-3">
            <div class="userPost">
              <div
                class="d-flex justify-content-between align-items-center pe-4"
              >
                <div
                  class="card-body p-4 d-flex align-items-center column-gap-2"
                >
                  <div class="Post-Profile-Pic">
                    <img
                    src="${user.image}"
                      class="card-img-top rounded-circle"
                      alt="Profile Image"
                    />
                  </div>
                  <div class="userPost-Info">
                    <h5 class="card-title mb-0 text-white fs-6">${user.username}</h5>
                    <p class="card-text text-white fs-6">${user.address.address}</p>
                  </div>
                </div>
                <div><i class="uil uil-ellipsis-h fs-3"></i></div>
              </div>
              <img
                src="../images/feed-3.jpg"
                class="card-img-top px-3 rounded-5"
                alt="Post Image"
              />
              <div
                class="main d-flex justify-content-between align-items-center px-3"
              >
                <div
                  class="threeAction d-flex justify-content-start align-items-center"
                >
                  <div><i class="uil uil-heart fs-4 text-white"></i></div>
                  <div class="comment-icon">
                    <i class="uil uil-comment-dots fs-4 text-white"></i>
                  </div>
                  <div><i class="uil uil-share fs-4 text-white"></i></div>
                </div>
                <div><i class="uil uil-bookmark-full fs-4 text-white"></i></div>
              </div>
              <div class="Reactions">
                <div class="text-white ps-4 ms-1" id="Reactions">${post.reactions} likes</div>
              </div>
              <div class="card-body">
                <div class="liked-by ps-2 d-flex">
                  <span class="likedImage"
                    ><img
                      class="likeImg d-block rounded-circle overflow-hidden"
                      src="../images/profile-10.jpg"
                  /></span>
                  <span class="likedImage"
                    ><img
                      class="likeImg d-block rounded-circle overflow-hidden"
                      src="../images/profile-4.jpg"
                  /></span>
                  <span class="likedImage"
                    ><img
                      class="likeImg d-block rounded-circle overflow-hidden"
                      src="../images/profile-15.jpg"
                  /></span>
                  <p class="text-white ps-2">
                    Liked by <b>Benjamin Dwayne</b> and <b>${post.reactions} others</b>
                  </p>
                </div>
                <div class="Captions">
                  <p class="text-white mb-0"><b>Micheal</b> ${post.title}</p>
                  <p class="card-text text-white mb-0">${post.body}</p>
                </div>
                <p class="postTags text-white">
                  <span>#${post.tags[0]}</span>
                  <span>#${post.tags[0]}</span>
                  <span>#${post.tags[0]}</span>
                </p>
                <div class="comments-section mt-3">
                  <ul class="list-unstyled">
                    <li class="text-white comment-item">
                      <div
                        class="d-flex justify-content-between align-items-center"
                      >
                        <div>
                          <b>Micheal</b>
                          <span class="test">You are my safest place.</span>
                        </div>
                        <div class="comment-actions">
                          <button
                            class="btn btn-link edit-comment-btn bg-transparent text-white edit-button p-0"
                          >
                            Edit
                          </button>
                          <button
                            class="btn btn-link delete-comment-btn bg-transparent text-white edit-button p-0"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <p class="text-white mb-0" id="viewAllComments">
                    View all 132 comments
                  </p>
                </div>
                <div class="comment-input-container mt-2 hidden">
                  <input
                    type="text"
                    class="form-control comment-input"
                    placeholder="Write a comment..."
                  />
                </div>
                <div class="edit-input-container hidden mt-2">
                  <textarea type="text" class="form-control edit-input">
    Comment</textarea
                  >
                </div>
                <p class="card-text text-white text-end mt-2">
                  <small class="text-white">Just now</small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>`;
    });
  }
}

const userProfile = new UserProfile();
