// Function to fetch user data
async function fetchAuthUserData(token) {
  try {
    const response = await fetch("https://dummyjson.com/auth/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
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
    window.location.href = "../index.html";
  }
}

// Function to periodically check token expiration
function checkTokenExpiration(token) {
  setInterval(async function () {
    await fetchAuthUserData(token);
  }, 30000);
}

export { fetchAuthUserData, checkTokenExpiration };
