// Loader.js
class Loader {
  constructor() {
    this.loader = document.getElementById("loader");
  }

  // Show loader method
  show() {
    this.loader.style.display = "block";
  }

  // Hide loader method
  hide() {
    this.loader.style.display = "none";
  }
}

export default Loader;
