// Animation untuk text header Hero Section
const text = "Mari nikmati secangkir kopi";

let index = 0;
function type() {
  document.getElementById("typing-text").textContent = text.slice(0, index);
  index++;
  if (index > text.length) {
    index = 0;
  }
  setTimeout(type, 200);
}
type();

// Toggle class active untuk hamburger menu
const navbarNav = document.querySelector(".navbar-nav");

document.querySelector("#hamburger-menu").onclick = (e) => {
  navbarNav.classList.toggle("active");
  e.preventDefault(e);
};

// Toggle class active untuk search form
const searchForm = document.querySelector(".search-form");
const searchBox = document.querySelector("#search-box");

document.querySelector("#search-button").onclick = (e) => {
  searchForm.classList.toggle("active");
  searchBox.focus();
  e.preventDefault();
};

// Toggle class active untuk shopping cart
const shoppingCart = document.querySelector(".shopping-cart");

document.querySelector("#shopping-cart-button").onclick = (e) => {
  shoppingCart.classList.toggle("active");
  e.preventDefault();
};

// Klik untuk di luar elemen

// Variable hamburger menu
const hm = document.querySelector("#hamburger-menu");
// Variable search button
const sb = document.querySelector("#search-button");
// Variable shopping cart
const sc = document.querySelector("#shopping-cart-button");

document.addEventListener("click", function (e) {
  // Logika untuk hamburger menu
  if (!hm.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
  // Logika untuk search button
  if (!sb.contains(e.target) && !searchForm.contains(e.target)) {
    searchForm.classList.remove("active");
  }
  // Logika untuk shopping cart button
  if (!sc.contains(e.target) && !shoppingCart.contains(e.target)) {
    shoppingCart.classList.remove("active");
  }
});

// Modal Box
const itemDetailModal = document.querySelector("#item-detail-modal");
const itemDetailButtons = document.querySelectorAll(".item-detail-button");

// Logika untuk menampilkan seluruh type Modal Box ketika di klik icon eye
itemDetailButtons.forEach((btn) => {
  btn.onclick = (e) => {
    itemDetailModal.style.display = "flex";
    e.preventDefault(e);
  };
});

// Klik tombol close modal box
document.querySelector(".modal .close-icon").onclick = (e) => {
  itemDetailModal.style.display = "none";
  e.preventDefault(e);
};

// Klik di luar modal box

window.onclick = (e) => {
  if (e.target === itemDetailModal) {
    itemDetailModal.style.display = "none";
  }
};
