const menuIcon = document.getElementById("menu-icon");
const navLinks = document.querySelector(".header-ul");
const header = document.getElementById("navbar");
const backToTop = document.getElementById("backToTop");
const navOverlay = document.getElementById("navOverlay");
const toggleBtn = document.querySelector(".toggle");
const scrollProgress = document.getElementById("scrollProgress");
const navLinkEls = document.querySelectorAll(".nav-link[data-section]");

// --- Mobile menu ---
function openMenu() {
  navLinks.classList.add("active");
  navOverlay.classList.add("active");
  toggleBtn.classList.add("open");
  document.body.classList.add("menu-open");
}

function closeMenu() {
  navLinks.classList.remove("active");
  navOverlay.classList.remove("active");
  toggleBtn.classList.remove("open");
  document.body.classList.remove("menu-open");
}

menuIcon.addEventListener("click", (e) => {
  e.stopPropagation();
  navLinks.classList.contains("active") ? closeMenu() : openMenu();
});

navOverlay.addEventListener("click", closeMenu);

document.addEventListener("click", (e) => {
  if (
    navLinks.classList.contains("active") &&
    !e.target.closest(".header-ul") &&
    !e.target.closest("#menu-icon")
  ) {
    closeMenu();
  }
});

document.querySelectorAll(".header-li a").forEach((link) => {
  link.addEventListener("click", () => closeMenu());
});

// --- Scroll: header, progress, back-to-top, active nav ---
const scrollSections = [
  { id: "about-section", nav: "about" },
  { id: "expertise", nav: "about" },
  { id: "gallery", nav: "about" },
  { id: "why-choose", nav: "about" },
  { id: "contact-page", nav: "contact" },
];

function updateOnScroll() {
  const scrollY = window.scrollY;

  header.classList.toggle("scrolled", scrollY > 60);
  backToTop?.classList.toggle("visible", scrollY > 400);

  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  if (scrollProgress && docHeight > 0) {
    scrollProgress.style.width = (scrollY / docHeight) * 100 + "%";
  }

  let current = "home";
  if (scrollY > 200) {
    for (const section of scrollSections) {
      const el = document.getElementById(section.id);
      if (el && scrollY >= el.offsetTop - 120) {
        current = section.nav;
      }
    }
  }

  navLinkEls.forEach((link) => {
    link.classList.toggle("active", link.dataset.section === current);
  });
}

window.addEventListener("scroll", updateOnScroll, { passive: true });
updateOnScroll();

backToTop?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// --- Preloader ---
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  gsap.to(preloader, {
    opacity: 0,
    duration: 0.6,
    delay: 0.3,
    onComplete: () => (preloader.style.display = "none"),
  });
});

// --- Header entrance ---
const tl = gsap.timeline();
tl.from(".header-logo", { y: -60, duration: 0.8, ease: "power3.out", opacity: 0 });
tl.from(".header-li", { y: -40, stagger: 0.08, opacity: 0, duration: 0.6, ease: "power2.out" }, "-=0.4");

// --- Banner carousel ---
$(".owl-carousel").owlCarousel({
  loop: true,
  margin: 0,
  nav: false,
  dots: true,
  autoplay: true,
  autoplayTimeout: 5000,
  autoplayHoverPause: true,
  smartSpeed: 800,
  responsive: { 0: { items: 1 } },
});

function animateBannerOverlay() {
  gsap.fromTo(".owl-item.active .banner-overlay h2", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" });
  gsap.fromTo(".owl-item.active .banner-overlay p", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.15, ease: "power2.out" });
  gsap.fromTo(".owl-item.active .banner-cta", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.3, ease: "power2.out" });
}

$(".owl-carousel").on("changed.owl.carousel", animateBannerOverlay);
setTimeout(animateBannerOverlay, 500);

// --- DOM ready ---
document.addEventListener("DOMContentLoaded", function () {
  // Section scroll reveal
  document.querySelectorAll(".section").forEach((section) => {
    new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.08 }
    ).observe(section);
  });

  // Stats bar counter animation
  document.querySelectorAll(".stat-item").forEach((item, i) => {
    new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.from(item, { opacity: 0, y: 24, duration: 0.5, delay: i * 0.1, ease: "power2.out" });
          }
        });
      },
      { threshold: 0.3 }
    ).observe(item);
  });

  // Gallery stagger + lightbox
  const galleryItems = document.querySelectorAll(".gallery-item");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxClose = document.getElementById("lightboxClose");

  galleryItems.forEach((item, i) => {
    new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.from(entry.target, { opacity: 0, scale: 0.9, duration: 0.6, delay: i * 0.08, ease: "back.out(1.2)" });
          }
        });
      },
      { threshold: 0.2 }
    ).observe(item);

    item.style.cursor = "pointer";
    item.setAttribute("role", "button");
    item.setAttribute("tabindex", "0");
    item.addEventListener("click", (e) => {
      if (e.target.closest("a")) return;
      openLightbox(item);
    });
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox(item);
      }
    });
  });

  function openLightbox(item) {
    const img = item.querySelector("img");
    const caption = item.querySelector(".gallery-caption");
    if (!img || !lightbox) return;
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = caption?.textContent || img.alt;
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox?.classList.remove("active");
    document.body.style.overflow = "";
  }

  lightboxClose?.addEventListener("click", closeLightbox);
  lightbox?.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLightbox(); });

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#preloader") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        window.scrollTo({ top: targetElement.offsetTop - 80, behavior: "smooth" });
      }
    });
  });

  // Accordion (mobile only behavior)
  document.querySelectorAll(".accordion-header").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (window.innerWidth >= 769) return;
      const item = btn.closest(".accordion-item");
      const isOpen = item.classList.contains("open");
      document.querySelectorAll(".accordion-item").forEach((i) => {
        i.classList.remove("open");
        i.querySelector(".accordion-header").setAttribute("aria-expanded", "false");
      });
      if (!isOpen) {
        item.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });

  // Form AJAX submit with feedback
  const contactForm = document.getElementById("contactForm");
  const submitBtn = document.getElementById("submitBtn");
  const toast = document.getElementById("toast");
  const toastMessage = document.getElementById("toastMessage");

  function showToast(message, type = "success") {
    if (!toast) return;
    toast.className = `toast ${type}`;
    toast.querySelector("i").className = type === "success" ? "fas fa-check-circle" : "fas fa-exclamation-circle";
    toastMessage.textContent = message;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 4000);
  }

  contactForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    submitBtn.classList.add("loading");
    submitBtn.querySelector(".btn-text").textContent = "Sending...";

    try {
      const res = await fetch(contactForm.action, {
        method: "POST",
        body: new FormData(contactForm),
      });
      const data = await res.json();
      if (data.success) {
        showToast("Message sent! We'll reply within 24 hours.");
        contactForm.reset();
      } else {
        showToast("Something went wrong. Please try again.", "error");
      }
    } catch {
      showToast("Network error. Please try again or call us.", "error");
    } finally {
      submitBtn.classList.remove("loading");
      submitBtn.querySelector(".btn-text").textContent = "Send Message";
    }
  });

  // Input focus animation
  document.querySelectorAll(".form-group input, .form-group textarea").forEach((input) => {
    input.addEventListener("focus", () => gsap.to(input, { scale: 1.01, duration: 0.2 }));
    input.addEventListener("blur", () => gsap.to(input, { scale: 1, duration: 0.2 }));
  });
});

// --- Counter ---
const counterEl = document.getElementById("counter");
const counterBox = document.getElementById("counterBox");
let hasCounted = false;

if (counterBox && counterEl) {
  new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasCounted) {
          hasCounted = true;
          const target = 500;
          const duration = 2000;
          const start = performance.now();
          const step = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const count = Math.floor((1 - Math.pow(1 - progress, 3)) * target);
            counterEl.textContent = count + "+";
            if (progress < 1) requestAnimationFrame(step);
            else counterEl.textContent = target + "+";
          };
          requestAnimationFrame(step);
        }
      });
    },
    { threshold: 0.5 }
  ).observe(counterBox);
}

// Social icon ripple
document.querySelectorAll(".social-icons a").forEach((icon) => {
  icon.addEventListener("mouseenter", () => {
    gsap.fromTo(icon, { boxShadow: "0 0 0 0 rgba(245, 158, 11, 0.4)" }, { boxShadow: "0 0 0 12px rgba(245, 158, 11, 0)", duration: 0.6 });
  });
});
