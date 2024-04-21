// Toggle class active
const navbarNav = document.querySelector(".navbar-nav");

// Ketika hamburger-menu di klik
document.querySelector("#hamburger-menu").onclick = () => {
  navbarNav.classList.toggle("active");
};

// Klik di luar sidebar untuk menghilangkan nav (hamburger-menu)
const hamburger = document.querySelector("#hamburger-menu");

document.addEventListener("click", function (e) {
  if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
});

// untuk animation text header bergerak
const text = "Mari nikmati secangkir kopi";

let index = 0;
function type() {
  document.getElementById("typing-text").textContent = text.slice(0, index);
  index++;
  if (index > text.length) {
    index = 10;
  }
  setTimeout(type, 200);
}
type();
