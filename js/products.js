/* ==========================================================================
   ST-SCHON USA LLC - PRODUCT DATASET & INTERACTIVE CATALOG ENGINE
   ========================================================================== */

const ST_SCHON_PRODUCTS = [
  {
    id: 'st-lamp-01',
    title: 'ST-SCHON Smart Ambient Desk Lamp & Sound Machine',
    category: 'home',
    categoryName: 'Home & Living',
    price: '$69.99',
    oldPrice: '$89.99',
    rating: 4.9,
    reviewsCount: 384,
    image: 'assets/lamp.png',
    badge: 'BEST SELLER',
    amazonPrime: true,
    description: 'Elevate your workspace or bedside with warm touch-dimmable gold illumination and built-in Bluetooth audio sound machine. Engineered for daily eye comfort.',
    features: [
      'Touch control with 5 brightness levels & color aura',
      'Integrated 10W high-fidelity Bluetooth speaker',
      'USB-C fast charging port for smartphone power',
      'Aircraft-grade aluminum chassis with matte black finish'
    ]
  },
  {
    id: 'st-container-02',
    title: 'ST-SCHON Minimalist Glass & Terracotta Storage Jar 32oz',
    category: 'home',
    categoryName: 'Home & Living',
    price: '$24.95',
    oldPrice: '$32.95',
    rating: 4.8,
    reviewsCount: 512,
    image: 'assets/organizer.png',
    badge: 'AMAZON CHOICE',
    amazonPrime: true,
    description: 'Keep dry goods, coffee, or bath essentials fresh and neatly stored. High borosilicate glass with silicone-sealed terracotta ceramic lid.',
    features: [
      'Airtight silicone seal keeps food and essentials fresh',
      'Lead-free food-grade high borosilicate glass jar',
      'Minimalist terracotta aesthetic for modern homes',
      'USA LLC quality inspection guaranteed'
    ]
  },
  {
    id: 'st-band-03',
    title: 'ST-SCHON Pro Health & Fitness Smart Tracker',
    category: 'wearables',
    categoryName: 'Smart Wearables',
    price: '$89.00',
    oldPrice: '$119.00',
    rating: 4.9,
    reviewsCount: 290,
    image: 'assets/smartband.png',
    badge: 'NEW RELEASE',
    amazonPrime: true,
    description: 'Monitor daily heart rate, oxygen levels, sleep stages, and workout telemetry on an ultra-vivid AMOLED curved display with 14-day battery life.',
    features: [
      '1.47-inch High Definition AMOLED touchscreen',
      'IP68 50M waterproof rating for daily swimming',
      'Comprehensive sleep quality & stress score analysis',
      'Compatible with iOS & Android ST-SCHON Companion App'
    ]
  },
  {
    id: 'st-pad-04',
    title: 'ST-SCHON Minimalist Aluminum Desk Tech Pad',
    category: 'tech',
    categoryName: 'Office & Tech',
    price: '$49.99',
    oldPrice: '$59.99',
    rating: 4.7,
    reviewsCount: 198,
    image: 'assets/organizer.png',
    badge: 'PREMIUM',
    amazonPrime: true,
    description: 'Reclaim your desk organization. Features dual 15W wireless fast-charging pads, magnetic pen slot, and genuine dark walnut accent tray.',
    features: [
      'Simultaneous 15W phone & 5W earbud wireless charging',
      'Weighted non-slip silicone base with CNC aluminum trim',
      'Precision magnetic alignment for MagSafe devices',
      'Clean cable management system built-in'
    ]
  }
];

document.addEventListener('DOMContentLoaded', () => {
  renderProductCards(ST_SCHON_PRODUCTS);
  setupCategoryFilters();
});

function renderProductCards(products) {
  const container = document.getElementById('products-grid-container');
  if (!container) return;

  container.innerHTML = '';

  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('data-category', product.category);

    const starsHtml = generateStars(product.rating);

    card.innerHTML = `
      <div class="product-badge">${product.badge}</div>
      ${product.amazonPrime ? '<div class="amazon-badge"><i class="fa-solid fa-bolt"></i> PRIME</div>' : ''}
      <div class="product-img-wrapper">
        <img src="${product.image}" alt="${product.title}" class="product-img" loading="lazy" />
      </div>
      <div class="product-content">
        <span class="product-category">${product.categoryName}</span>
        <h3 class="product-title">${product.title}</h3>
        <div class="product-rating">
          <span class="stars">${starsHtml}</span>
          <span>${product.rating} (${product.reviewsCount} Amazon Reviews)</span>
        </div>
        <div class="product-footer">
          <div class="product-price">${product.price} <span>${product.oldPrice}</span></div>
          <button class="btn btn-outline quick-view-btn" data-id="${product.id}">
            <i class="fa-solid fa-eye"></i> Quick View
          </button>
        </div>
      </div>
    `;

    container.appendChild(card);
  });

  // Attach Quick View Click Handler
  document.querySelectorAll('.quick-view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      openQuickViewModal(id);
    });
  });
}

function setupCategoryFilters() {
  const tabBtns = document.querySelectorAll('.filter-tabs .tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      if (filter === 'all') {
        renderProductCards(ST_SCHON_PRODUCTS);
      } else {
        const filtered = ST_SCHON_PRODUCTS.filter(p => p.category === filter);
        renderProductCards(filtered);
      }
    });
  });
}

function generateStars(rating) {
  let stars = '';
  const fullStars = Math.floor(rating);
  for (let i = 0; i < fullStars; i++) {
    stars += '<i class="fa-solid fa-star"></i>';
  }
  if (rating % 1 !== 0) {
    stars += '<i class="fa-solid fa-star-half-stroke"></i>';
  }
  return stars;
}

function openQuickViewModal(productId) {
  const product = ST_SCHON_PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const modalOverlay = document.getElementById('quick-view-modal');
  const modalBody = document.getElementById('modal-body-content');

  if (!modalOverlay || !modalBody) return;

  const starsHtml = generateStars(product.rating);

  modalBody.innerHTML = `
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: center; padding: 2rem;">
      <div style="background: radial-gradient(circle, rgba(30,41,59,0.8), rgba(15,23,42,0.9)); padding: 2rem; border-radius: 16px; text-align: center;">
        <img src="${product.image}" alt="${product.title}" style="max-width: 100%; max-height: 280px; object-fit: contain; filter: drop-shadow(0 15px 25px rgba(0,0,0,0.5));" />
      </div>
      <div>
        <span style="font-size: 0.8rem; color: var(--accent-gold); text-transform: uppercase; font-weight: 700;">${product.categoryName}</span>
        <h2 style="font-size: 1.6rem; margin: 0.5rem 0 0.8rem 0;">${product.title}</h2>
        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem; color: var(--text-muted); font-size: 0.9rem;">
          <span style="color: var(--accent-gold);">${starsHtml}</span>
          <span>${product.rating} rating on Amazon USA</span>
        </div>
        <div style="font-size: 1.75rem; font-weight: 800; color: var(--text-main); margin-bottom: 1rem;">
          ${product.price} <span style="font-size: 1rem; color: var(--text-dim); text-decoration: line-through;">${product.oldPrice}</span>
        </div>
        <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1.5rem;">${product.description}</p>
        
        <h4 style="font-size: 0.95rem; margin-bottom: 0.5rem; color: var(--text-main);">Key Specifications:</h4>
        <ul style="list-style: none; padding-left: 0; margin-bottom: 2rem;">
          ${product.features.map(f => `<li style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.4rem; display: flex; align-items: center; gap: 0.5rem;"><i class="fa-solid fa-check" style="color: var(--accent-emerald);"></i> ${f}</li>`).join('')}
        </ul>

        <div style="display: flex; gap: 1rem;">
          <a href="https://www.amazon.com" target="_blank" class="btn btn-primary" style="flex: 1;">
            <i class="fa-brands fa-amazon"></i> Buy on Amazon USA
          </a>
          <a href="contact.html?service=product-demo#booking-wizard" class="btn btn-outline">
            <i class="fa-solid fa-calendar-check"></i> Book Consultation
          </a>
        </div>
      </div>
    </div>
  `;

  modalOverlay.classList.add('active');
}

function closeQuickViewModal() {
  const modalOverlay = document.getElementById('quick-view-modal');
  if (modalOverlay) {
    modalOverlay.classList.remove('active');
  }
}
