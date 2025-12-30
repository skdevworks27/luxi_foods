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

// PRODUCT MODAL
const productData = {
  soboluxe: {
    image: 'products/images/sobolo1.png',
    title: 'Soboluxe',
    description: 'Soboluxe is our flagship product, representing the pinnacle of quality and excellence in food processing.',
    details: '<strong>Features:</strong><br>• Premium quality ingredients<br>• Hygienic packaging<br>• Long shelf life<br>• Available now at select retailers',
    link: 'products/soboluxe.html'
  },

  rabbit: {
    image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b8f9d9',
    title: 'Rabbit Meat',
    description: 'Our rabbit meat is sourced from healthy, well-maintained farms and processed under strict hygiene standards.',
    details: '<strong>Coming Soon!</strong><br>• Lean protein<br>• Humanely raised<br>• Carefully processed',
    link: 'products/rabbit.html'
  },

  groundnuts: {
    image: 'https://images.unsplash.com/photo-1627485937980-221c88ac04b3',
    title: 'Roasted Groundnuts',
    description: 'Crunchy, perfectly roasted groundnuts prepared to preserve freshness and taste.',
    details: '<strong>Coming Soon!</strong><br>• Perfectly roasted<br>• No additives<br>• High protein content',
    link: 'products/groundnuts.html'
  }
};

function openModal(product) {
  const modal = document.getElementById('productModal');
  const data = productData[product];

  document.getElementById('modalImage').src = data.image;
  document.getElementById('modalTitle').textContent = data.title;
  document.getElementById('modalDescription').textContent = data.description;
  document.getElementById('modalDetails').innerHTML = data.details;

  // SET PRODUCT PAGE LINK
  const modalLink = document.getElementById('modalLink');
  modalLink.href = data.link;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';

  document.getElementById('modalImage').onclick = () => {
  window.location.href = data.link;
  };
}

function closeModal() {
const modal = document.getElementById('productModal');
modal.classList.remove('active');
document.body.style.overflow = '';
}

document.getElementById('productModal').addEventListener('click', (e) => {
if (e.target.classList.contains('modal')) {
    closeModal();
}
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

const mainImage = document.getElementById('mainImage');
document.querySelectorAll('.thumb').forEach(img => {
img.onclick = () => mainImage.src = img.src;
});

// INITIAL TRIGGER
window.dispatchEvent(new Event('scroll'));



// WHATSAPP ORDER SYSTEM
// Add this to your script.js or create a new whatsapp-order.js file

// Your WhatsApp Business Number (replace with actual number)
const WHATSAPP_NUMBER = '233248781776'; // Format: country code + number (no +)

// Product configurations
const products = {
  soboluxe: {
    name: 'Soboluxe',
    singlePrice: 18,
    bundles: {
      '1': { qty: 1, price: 18, discount: 0 },
      '2': { qty: 2, price: 40, discount: 20 },
      '5': { qty: 5, price: 95, discount: 24 }
    }
  },
  rabbit: {
    name: 'Rabbit Meat',
    singlePrice: 50,
    bundles: {
      '1': { qty: 1, price: 50, discount: 0 }
    }
  },
  groundnuts: {
    name: 'Roasted Groundnuts',
    singlePrice: 15,
    bundles: {
      '1': { qty: 1, price: 15, discount: 0 }
    }
  }
};

// Generate WhatsApp message
function generateWhatsAppMessage(productKey, quantity) {
  const product = products[productKey];
  const bundle = product.bundles[quantity.toString()] || product.bundles['1'];
  
  let message = `Hello Luxi Foods! 👋\n\n`;
  message += `I would like to order:\n`;
  message += `📦 Product: ${product.name}\n`;
  message += `📊 Quantity: ${bundle.qty} ${bundle.qty > 1 ? 'bottles' : 'bottle'}\n`;
  message += `💰 Total: ₵${bundle.price.toFixed(2)}\n`;
  
  if (bundle.discount > 0) {
    message += `🎉 You're saving ${bundle.discount}%!\n`;
  }
  
  message += `\nPlease confirm availability and delivery details. Thank you!`;
  
  return encodeURIComponent(message);
}

// Create WhatsApp order link
function createWhatsAppLink(productKey, quantity = 1) {
  const message = generateWhatsAppMessage(productKey, quantity);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
}

// Initialize order buttons
function initializeOrderButtons() {
  // Get current product from URL or page
  const currentProduct = getCurrentProduct();
  
  // Update all order buttons
  document.querySelectorAll('a[href*="#order"], a[href*="whatsapp"]').forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Get quantity from nearby select or default to 1
      let quantity = 1;
      const selectElement = document.getElementById('qtySelect');
      if (selectElement) {
        const selectedText = selectElement.value;
        if (selectedText.includes('2')) quantity = 2;
        if (selectedText.includes('5')) quantity = 5;
      }
      
      // Open WhatsApp
      const whatsappLink = createWhatsAppLink(currentProduct, quantity);
      window.open(whatsappLink, '_blank');
      
      // Track conversion (optional - for analytics)
      trackOrderClick(currentProduct, quantity);
    });
  });
}

// Detect current product from page
function getCurrentProduct() {
  const path = window.location.pathname;
  if (path.includes('soboluxe')) return 'soboluxe';
  if (path.includes('rabbit')) return 'rabbit';
  if (path.includes('groundnuts')) return 'groundnuts';
  return 'soboluxe'; // default
}

// Track order clicks (optional)
function trackOrderClick(product, quantity) {
  console.log(`Order initiated: ${product} x${quantity}`);
  // You can integrate Google Analytics or Facebook Pixel here
  // Example: gtag('event', 'order_click', { product, quantity });
}

// Add dynamic pricing based on quantity selection
function updatePricing() {
  const qtySelect = document.getElementById('qtySelect');
  if (!qtySelect) return;
  
  qtySelect.addEventListener('change', function() {
    const currentProduct = getCurrentProduct();
    const product = products[currentProduct];
    
    let quantity = 1;
    if (this.value.includes('2')) quantity = 2;
    if (this.value.includes('5')) quantity = 5;
    
    const bundle = product.bundles[quantity.toString()];
    
    // Update price displays
    document.querySelectorAll('.price-display').forEach(el => {
      el.textContent = `₵${bundle.price.toFixed(2)}`;
    });
    
    // Update savings display
    if (bundle.discount > 0) {
      document.querySelectorAll('.savings-display').forEach(el => {
        el.textContent = `Save ${bundle.discount}%!`;
        el.style.display = 'inline-block';
      });
    }
  });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
  initializeOrderButtons();
  updatePricing();
});

// ADVANCED: Create Order Form Modal (optional)
function createOrderFormModal() {
  const modalHTML = `
    <div id="orderFormModal" style="display:none;position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.8);z-index:9999;align-items:center;justify-content:center;padding:20px">
      <div style="background:#fff;max-width:500px;width:100%;padding:40px;border-radius:25px;position:relative">
        <button onclick="closeOrderForm()" style="position:absolute;top:20px;right:20px;background:none;border:none;font-size:24px;cursor:pointer">&times;</button>
        
        <h2 style="margin-bottom:20px">Complete Your Order</h2>
        
        <form id="orderForm">
          <div style="margin-bottom:20px">
            <label style="display:block;margin-bottom:8px;font-weight:600">Your Name</label>
            <input type="text" id="customerName" required style="width:100%;padding:12px;border:2px solid #ddd;border-radius:10px;font-size:15px">
          </div>
          
          <div style="margin-bottom:20px">
            <label style="display:block;margin-bottom:8px;font-weight:600">Phone Number</label>
            <input type="tel" id="customerPhone" required style="width:100%;padding:12px;border:2px solid #ddd;border-radius:10px;font-size:15px" placeholder="0XX XXX XXXX">
          </div>
          
          <div style="margin-bottom:20px">
            <label style="display:block;margin-bottom:8px;font-weight:600">Delivery Location</label>
            <input type="text" id="customerLocation" required style="width:100%;padding:12px;border:2px solid #ddd;border-radius:10px;font-size:15px" placeholder="City or Area">
          </div>
          
          <div style="margin-bottom:20px">
            <label style="display:block;margin-bottom:8px;font-weight:600">Quantity</label>
            <select id="orderQuantity" style="width:100%;padding:12px;border:2px solid #ddd;border-radius:10px;font-size:15px">
              <option value="1">1 Bottle - ₵18.00</option>
              <option value="2">2 Bottles - ₵40.00 (Save 20%)</option>
              <option value="5">5 Bottles - ₵95.00 (Best Deal!)</option>
            </select>
          </div>
          
          <div style="margin-bottom:25px">
            <label style="display:block;margin-bottom:8px;font-weight:600">Additional Notes (Optional)</label>
            <textarea id="orderNotes" rows="3" style="width:100%;padding:12px;border:2px solid #ddd;border-radius:10px;font-size:15px" placeholder="Any special instructions?"></textarea>
          </div>
          
          <button type="submit" class="btn btn-primary" style="width:100%;padding:15px;font-size:16px">
            <i class="fab fa-whatsapp"></i> Send Order via WhatsApp
          </button>
        </form>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  
  // Form submission
  document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('customerName').value;
    const phone = document.getElementById('customerPhone').value;
    const location = document.getElementById('customerLocation').value;
    const quantity = document.getElementById('orderQuantity').value;
    const notes = document.getElementById('orderNotes').value;
    
    const currentProduct = getCurrentProduct();
    const product = products[currentProduct];
    const bundle = product.bundles[quantity];
    
    let message = `🛒 NEW ORDER FROM WEBSITE\n\n`;
    message += `👤 Name: ${name}\n`;
    message += `📞 Phone: ${phone}\n`;
    message += `📍 Location: ${location}\n\n`;
    message += `📦 Product: ${product.name}\n`;
    message += `📊 Quantity: ${bundle.qty} ${bundle.qty > 1 ? 'bottles' : 'bottle'}\n`;
    message += `💰 Total: ₵${bundle.price.toFixed(2)}\n`;
    
    if (bundle.discount > 0) {
      message += `🎉 Discount: ${bundle.discount}%\n`;
    }
    
    if (notes) {
      message += `\n📝 Notes: ${notes}`;
    }
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    window.open(whatsappLink, '_blank');
    closeOrderForm();
  });
}

function openOrderForm() {
  const modal = document.getElementById('orderFormModal');
  if (modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}

function closeOrderForm() {
  const modal = document.getElementById('orderFormModal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
}

// Initialize order form modal
document.addEventListener('DOMContentLoaded', () => {
  createOrderFormModal();
});

// USAGE:
// You can now call openOrderForm() from any button:
// <button onclick="openOrderForm()">Order Now</button>

// Or keep the direct WhatsApp links - both work!