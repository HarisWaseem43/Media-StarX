// Check if the user is authenticated
function checkAuthentication() {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "../index.html";
  }
}

window.onload = checkAuthentication;

// class Authentication {
//   constructor() {
//     // Check authentication when the window loads
//     window.onload = this.checkAuthentication.bind(this);
//   }

//   // Check if the user is authenticated
//   checkAuthentication() {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       window.location.href = "../index.html";
//     }
//   }
// }

// // Instantiate the Authentication class
// const auth = new Authentication();
