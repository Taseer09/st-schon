/* ==========================================================================
   ST-SCHON USA LLC - MAIN APP CONTROLLER & PAGE TRANSITIONS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  setupNavbar();
  setupMobileNav();
  setupPageTransitions();
});

function setupNavbar() {
  const header = document.querySelector('.header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

function setupMobileNav() {
  const btn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');

  if (btn && navLinks) {
    btn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }
}

/* Smooth Luxury Page Transition Controller */
function setupPageTransitions() {
  let overlay = document.querySelector('.page-transition-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'page-transition-overlay';
    document.body.appendChild(overlay);
  }

  // Intercept internal page link clicks for smooth transitions
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (
      href &&
      !href.startsWith('#') &&
      !href.startsWith('http') &&
      !href.startsWith('mailto:') &&
      !href.startsWith('tel:') &&
      !href.startsWith('javascript:')
    ) {
      link.addEventListener('click', (e) => {
        if (e.ctrlKey || e.metaKey || e.shiftKey) return;
        
        e.preventDefault();
        overlay.classList.add('active');
        
        setTimeout(() => {
          window.location.href = href;
        }, 380);
      });
    }
  });
}

window.showToast = function (msg) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `✓ ${msg}`;

  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
};
