export class Login {
  constructor() {
    this.init();
  }

  async init() {
    const loginForm = document.getElementById("login-form");
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      await this.login();
    });
  }

  async login() {
    try {
      var username = document.getElementById("email").value;
      var password = document.getElementById("password").value;

      if (!username || !password) {
        throw new Error("Please enter username/email and password.");
      }

      // Fetch API
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password,
          expiresInMins: 60,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.error === "invalid_username_email") {
          throw new Error("Username or email is incorrect.");
        } else if (errorData.error === "invalid_password") {
          throw new Error("Password is incorrect.");
        } else {
          throw new Error("An unknown error occurred.");
        }
      }

      const data = await response.json();
      console.log("Response: ", data);

      localStorage.setItem("token", data.token);
      localStorage.setItem("image", data.image);
      localStorage.setItem("firstName", data.firstName);
      localStorage.setItem("lastName", data.lastName);
      localStorage.setItem("email", data.email);
      localStorage.setItem("username", data.username);
      localStorage.setItem("userId", data.id);

      // If login successful, show success message and redirect
      await Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: "Redirecting to newsfeed page...",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      // Redirect to newsfeed page
      window.location.href = "./NewsFeed/newsfeed.html";
    } catch (error) {
      // If there's an error during the login process, show error message
      await Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message,
      });
      console.error("Login failed:", error.message);
    }
  }
}

// Initialize the login class
const login = new Login();
// new Login();
