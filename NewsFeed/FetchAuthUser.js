// AuthUserDataFetcher.js
class AuthUserDataFetcher {
  constructor(token) {
    this.token = token;
  }

  // Function to fetch user data
  async fetchUserData() {
    try {
      const response = await fetch("https://dummyjson.com/auth/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const userData = await response.json();
      console.log("Get User Data:", userData);
      return userData;
    } catch (error) {
      console.error("Error fetching user data:", error.message);
      throw error; // Propagate the error to handle it outside
    }
  }

  // Function to start periodically checking token expiration
  startCheckingTokenExpiration() {
    this.intervalId = setInterval(async () => {
      try {
        await this.fetchUserData();
      } catch (error) {
        clearInterval(this.intervalId); // Stop checking on error
        window.location.href = "../index.html";
      }
    }, 30000);
  }

  // Function to stop checking token expiration
  stopCheckingTokenExpiration() {
    clearInterval(this.intervalId);
  }
}

export default AuthUserDataFetcher;
