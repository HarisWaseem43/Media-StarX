// ------ For Loader ------
// Show loader function
function showLoader() {
  const loader = document.getElementById("loader");
  loader.style.display = "block";
}

// Hide loader function
function hideLoader() {
  const loader = document.getElementById("loader");
  loader.style.display = "none";
}
// ------ For Loader ------

export { showLoader, hideLoader };
