// LOADING SCREEN
window.addEventListener('load', () => {
  setTimeout(() => {
    document.querySelector('.loading').classList.add('hidden');
  }, 1000);
});

// CURSOR TRAIL
const dots = document.querySelectorAll('.cursor-dot');
const cursorPos = { x: 0, y: 0 };
const dotPositions = Array(5).fill({ x: 0, y: 0 });

document.addEventListener('mousemove', (e) => {
  cursorPos.x = e.clientX;
  cursorPos.y = e.clientY;
});

function animateDots() {
  let x = cursorPos.x;
  let y = cursorPos.y;

  dots.forEach((dot, i) => {
    dot.style.left = x + 'px';
    dot.style.top = y + 'px';
    dot.style.opacity = '0.6';
    dot.style.transform = `scale(${1 - i * 0.15})`;
    
    const nextDot = dotPositions[i] || { x, y };
    x += (nextDot.x - x) * 0.3;
    y += (nextDot.y - y) * 0.3;
    dotPositions[i] = { x, y };
  });

  requestAnimationFrame(animateDots);
}

animateDots();

// SLIDER
const slides = document.querySelectorAll('.slide');
const sliderDots = document.querySelectorAll('.slider-dot');
let slideIndex = 0;

function showSlide(n) {
  slides[slideIndex].classList.remove('active');
  sliderDots[slideIndex].classList.remove('active');
  slideIndex = (n + slides.length) % slides.length;
  slides[slideIndex].classList.add('active');
  sliderDots[slideIndex].classList.add('active');
}

sliderDots.forEach((dot, i) => {
  dot.addEventListener('click', () => showSlide(i));
});

setInterval(() => showSlide(slideIndex + 1), 5000);

// MOBILE MENU
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
  });
});

// SCROLL EFFECTS
const header = document.querySelector('header');
const scrollTop = document.querySelector('.scroll-top');
const sections = document.querySelectorAll('.section-title, .product-card');

window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  if (window.scrollY > 500) {
    scrollTop.classList.add('visible');
  } else {
    scrollTop.classList.remove('visible');
  }

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      section.classList.add('visible');
    }
  });
});

scrollTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// PRODUCT FILTERS
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const filter = btn.getAttribute('data-filter');
    
    productCards.forEach(card => {
      if (filter === 'all') {
        card.classList.remove('hidden');
      } else {
        if (card.getAttribute('data-category') === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      }
    });
  });
});

// TESTIMONIALS
let testimonialIndex = 0;
const testimonials = document.querySelectorAll('.testimonial');

function changeTestimonial(direction) {
  testimonials[testimonialIndex].classList.remove('active');
  testimonialIndex = (testimonialIndex + direction + testimonials.length) % testimonials.length;
  testimonials[testimonialIndex].classList.add('active');
}

setInterval(() => changeTestimonial(1), 6000);

// NEWSLETTER
function handleNewsletter(e) {
  e.preventDefault();
  const input = e.target.querySelector('input');
  alert(`Thank you for subscribing! We'll send updates to ${input.value}`);
  input.value = '';
}

// PRODUCT IMAGE GALLERY
const mainImage = document.getElementById('mainImage');
const thumbs = document.querySelectorAll('.thumb');
if (mainImage && thumbs.length > 0) {
  thumbs.forEach(img => {
    img.onclick = () => mainImage.src = img.src;
  });
}

// INITIAL TRIGGER
window.dispatchEvent(new Event('scroll'));
