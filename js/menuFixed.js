const nav = document.querySelector(".menu-bg");
const header = document.querySelector(".header-bg");

window.addEventListener("scroll", () => {
  const headerHeight = header.offsetHeight;
  if (window.scrollY >= headerHeight) {
    nav.classList.add("menu-fixed");
  } else {
    nav.classList.remove("menu-fixed");
  }
});
