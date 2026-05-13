/* =========================
   MOBILE MENU TOGGLE
========================= */
const menuBtn = document.getElementById('menuBtn');
const mobilePanel = document.getElementById('mobilePanel');

if (menuBtn && mobilePanel) {
  menuBtn.addEventListener('click', () => {
    mobilePanel.classList.toggle('show');
  });
}


/* =========================
   HERO SLIDER
========================= */
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

let current = 0;

function showSlide(index) {
  if (!slides.length) return;

  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });

  current = index;
}

if (dots.length) {
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => showSlide(i));
  });
}

if (slides.length > 0) {
  setInterval(() => {
    showSlide((current + 1) % slides.length);
  }, 6000);
}


/* =========================
   PARTNER SLIDER
========================= */
const partnerSlides = document.querySelectorAll('.partner-slide');
const partnerDots = document.querySelectorAll('.partner-dots .dot');

let partnerIndex = 0;

function showPartner(index) {
  if (!partnerSlides.length) return;

  partnerSlides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });

  partnerDots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });

  partnerIndex = index;
}

if (partnerDots.length) {
  partnerDots.forEach((dot, i) => {
    dot.addEventListener('click', () => showPartner(i));
  });
}

if (partnerSlides.length > 0) {
  setInterval(() => {
    partnerIndex = (partnerIndex + 1) % partnerSlides.length;
    showPartner(partnerIndex);
  }, 4000);
}


/* =========================
   REVEAL ON SCROLL
========================= */
const revealEls = document.querySelectorAll('.reveal');

if (revealEls.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  revealEls.forEach(el => io.observe(el));
}


/* =========================
   CONTACT FORM
========================= */
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Front-end demo only. Connect this form to backend.');
  });
}