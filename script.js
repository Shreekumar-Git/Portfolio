// Theme Toggle
const themeToggle = document.getElementById("theme-toggle");
const html = document.documentElement;
const icon = themeToggle.querySelector("i");
const profileImg = document.querySelector(".profile-img");

// Profile Picture Paths
const lightProfile = "assets/PP.JPG";
const darkProfile = "assets/PP.JPG";

// Check for saved theme preference
const savedTheme = localStorage.getItem("theme") || "light";
html.setAttribute("data-theme", savedTheme);
updateIcon(savedTheme);
updateProfileImg(savedTheme);

themeToggle.addEventListener("click", () => {
  const currentTheme = html.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";

  html.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateIcon(newTheme);
  updateProfileImg(newTheme);
});

function updateIcon(theme) {
  if (theme === "dark") {
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
  } else {
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
  }
}

function updateProfileImg(theme) {
  if (profileImg) {
    profileImg.src = theme === "dark" ? darkProfile : lightProfile;
  }
}

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const mobileNav = document.querySelector(".mobile-nav");
const mobileLinks = document.querySelectorAll(".mobile-nav a");

mobileMenuBtn.addEventListener("click", () => {
  mobileNav.classList.toggle("active");
  const icon = mobileMenuBtn.querySelector("i");
  if (mobileNav.classList.contains("active")) {
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-times");
  } else {
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
  }
});

// Close mobile menu when a link is clicked
mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("active");
    const icon = mobileMenuBtn.querySelector("i");
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
  });
});

// Smooth Scroll for Safari/Older Browsers
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

// Typing Effect
const typingText = document.querySelector(".typing-text");
const textToType = " SHREE KUMAR  M";
let charIndex = 0;
let isDeleting = false;

function type() {
  const currentText = textToType.substring(0, charIndex);
  typingText.textContent = currentText;

  if (!isDeleting && charIndex < textToType.length) {
    charIndex++;
    setTimeout(type, 100);
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(type, 50);
  } else {
    isDeleting = !isDeleting;
    setTimeout(type, isDeleting ? 1000 : 500);
  }
}

// Start typing effect
if (typingText) {
  type();
}

// Scroll Reveal Animation
const revealElements = document.querySelectorAll(
  ".section, .hero-content, .project-card, .skill-category, .timeline-item, .contact-item"
);

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    root: null,
    threshold: 0.15,
    rootMargin: "0px",
  }
);

revealElements.forEach((element) => {
  element.classList.add("hidden");
  revealObserver.observe(element);
});
