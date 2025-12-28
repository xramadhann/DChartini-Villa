document.addEventListener("DOMContentLoaded", () => {
  const mobileNav = document.querySelector(".hamburger");
  const navbar = document.querySelector(".menubar");
  const dropdownToggle = document.querySelector(".dropdown-toggle");

  // Toggle hamburger menu
  if (mobileNav && navbar) {
    mobileNav.addEventListener("click", () => {
      navbar.classList.toggle("active");
      mobileNav.classList.toggle("hamburger-active");
    });
  }

  // Toggle dropdown kontak (mobile friendly)
  if (dropdownToggle) {
    dropdownToggle.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation(); // penting biar tidak nutup menu
      this.nextElementSibling.classList.toggle("show");
    });
  }

  // Tutup dropdown jika klik di luar
  document.addEventListener("click", () => {
    document
      .querySelectorAll(".dropdown-menu.show")
      .forEach(menu => menu.classList.remove("show"));
  });
});
