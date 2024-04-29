// SidebarDrag.js

class SidebarDrag {
  constructor(sidebar) {
    this.sidebar = sidebar;
    this.initialTouchX = 0;
    this.sidebarStartX = 0;

    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);

    this.sidebar.addEventListener("touchstart", this.handleTouchStart);
    this.sidebar.addEventListener("touchmove", this.handleTouchMove);
    this.sidebar.addEventListener("touchend", this.handleTouchEnd);
  }

  handleTouchStart(event) {
    this.initialTouchX = event.touches[0].clientX;
    this.sidebarStartX = this.sidebar.getBoundingClientRect().left;
    this.sidebar.classList.add("dragging");
  }

  handleTouchMove(event) {
    const touchX = event.touches[0].clientX;
    const offsetX = touchX - this.initialTouchX;
    this.sidebar.style.transform = `translateX(${
      this.sidebarStartX + offsetX
    }px)`;
  }

  handleTouchEnd() {
    this.sidebar.classList.remove("dragging");
  }
}

export default SidebarDrag;

// const sidebar = document.getElementById("sidebar");

// // Variables to store initial touch position and sidebar position
// let initialTouchX = 0;
// let sidebarStartX = 0;

// // Function to handle touch start event
// function handleTouchStart(event) {
//   initialTouchX = event.touches[0].clientX;
//   sidebarStartX = sidebar.getBoundingClientRect().left;
//   sidebar.classList.add("dragging");
// }

// // Function to handle touch move event
// function handleTouchMove(event) {
//   const touchX = event.touches[0].clientX;
//   const offsetX = touchX - initialTouchX;
//   sidebar.style.transform = `translateX(${sidebarStartX + offsetX}px)`;
// }

// // Function to handle touch end event
// function handleTouchEnd() {
//   sidebar.classList.remove("dragging");
// }

// // Add event listeners for touch events
// sidebar.addEventListener("touchstart", handleTouchStart);
// sidebar.addEventListener("touchmove", handleTouchMove);
// sidebar.addEventListener("touchend", handleTouchEnd);
