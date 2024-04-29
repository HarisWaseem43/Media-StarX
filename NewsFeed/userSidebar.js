// RightSidebar.js
export default class RightSidebar {
  constructor(userIconId, rightSidebarId, closeButtonId) {
    this.userIcon = document.getElementById(userIconId);
    this.rightSidebar = document.getElementById(rightSidebarId);
    this.closeButton = document.getElementById(closeButtonId);

    // Bind event listeners
    this.userIcon.addEventListener("click", this.toggleSidebar.bind(this));
    this.closeButton.addEventListener("click", this.closeSidebar.bind(this));
  }

  toggleSidebar() {
    this.rightSidebar.classList.toggle("open");
  }

  closeSidebar() {
    this.rightSidebar.classList.remove("open");
  }
}
