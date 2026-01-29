// Menu Toggle
function toggleMenu() {
  const menu = document.getElementById("mobile-menu");
  const icon = document.getElementById("menu-icon");

  menu.classList.toggle("hidden");

  if (menu.classList.contains("hidden")) {
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
  } else {
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-times");
  }
}

// Smooth Scroll Function
function scrollToSection(id) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });

    // Close mobile menu if open
    const menu = document.getElementById("mobile-menu");
    if (!menu.classList.contains("hidden")) {
      toggleMenu();
    }
  }
}

// Scroll Event for Navbar
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("bg-[#130428]/95", "backdrop-blur-lg", "shadow-lg");
    navbar.classList.remove("bg-transparent");
  } else {
    navbar.classList.remove("bg-[#130428]/95", "backdrop-blur-lg", "shadow-lg");
    navbar.classList.add("bg-transparent");
  }
});

// Smooth animations on scroll for ALL elements
document.addEventListener("DOMContentLoaded", () => {
  // Map to store original styles for each element
  const elementData = new Map();

  // Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const element = entry.target;

      if (entry.isIntersecting) {
        // Element enters viewport - apply animation
        const data = elementData.get(element);

        if (data) {
          // Reset animation
          element.style.animation = "none";
          element.style.opacity = "0";
          element.style.transform = data.originalTransform;

          // Trigger reflow to restart animation
          void element.offsetWidth;

          // Apply stored animation
          element.style.animation = data.animation;
          element.style.animationDelay = data.delay;
          element.style.opacity = "1";
        }
      } else {
        // Element leaves viewport - reset for next animation
        element.style.animation = "none";
        element.style.opacity = "0";
        element.style.transform = "translateY(30px) translateX(0)";
      }
    });
  }, observerOptions);

  // Animation mapping based on class names
  const animationMap = {
    "animate-fade-in-up": "fadeInUp 0.8s ease-out forwards",
    "animate-slide-left": "slideInFromLeft 0.8s ease-out forwards",
    "animate-slide-right": "slideInFromRight 0.8s ease-out forwards",
    "animate-slide-down": "slideDown 0.5s ease-out forwards",
    "card-hover": "fadeInUp 0.8s ease-out forwards",
  };

  // Select all elements that need animation
  const animatedElements = document.querySelectorAll(
    [
      ".animate-fade-in-up",
      ".animate-fade-in-right",
      ".animate-slide-left",
      ".animate-slide-right",
      ".animate-slide-down",
      ".card-hover",
      ".space-y-12 > div",
      "h2",
      "section > div > div:first-child",
    ].join(", "),
  );

  animatedElements.forEach((el) => {
    // Get animation from class or default
    let animation = "fadeInUp 0.8s ease-out forwards";
    let delay = "0s";

    for (const [className, anim] of Object.entries(animationMap)) {
      if (el.classList.contains(className)) {
        animation = anim;
        delay = el.style.animationDelay || "0s";
        break;
      }
    }

    // Store animation info
    elementData.set(el, {
      animation: animation,
      delay: delay,
      originalTransform: el.style.transform || "none",
    });

    // Set initial state
    el.style.opacity = "0";
    el.style.animation = "none";

    // Observe element
    observer.observe(el);
  });

  // Separate observer for skill bars
  const skillBarObserverOptions = {
    threshold: 0.5,
  };

  const skillBarObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const skillBar = entry.target;

      if (entry.isIntersecting) {
        // Skill bar enters viewport - fill it
        const width = skillBar.getAttribute("data-width");
        skillBar.style.width = width + "%";
      } else {
        // Skill bar leaves viewport - reset it
        skillBar.style.width = "0%";
      }
    });
  }, skillBarObserverOptions);

  // Observe all skill bars
  document.querySelectorAll(".skill-bar").forEach((bar) => {
    // Extract width from inline style if it exists
    const styleWidth = bar.style.width;
    const widthMatch = styleWidth.match(/(\d+)%/);
    const width = widthMatch ? widthMatch[1] : "0";

    bar.setAttribute("data-width", width);
    bar.style.width = "0%"; // Start empty

    skillBarObserver.observe(bar);
  });
});
