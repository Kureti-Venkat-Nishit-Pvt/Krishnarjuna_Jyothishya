// ============================================================
//  KRISHNARJUNA JYOTHISHA — script.js
//  Enhancements:
//   1. Hero image load-error fallback (shows gradient if image missing)
//   2. Smooth reveal animation for cards and sections on scroll
//   3. WhatsApp button pulse on load
//   4. Active nav highlight (useful if nav is added later)
// ============================================================

document.addEventListener('DOMContentLoaded', function () {

  // ── 1. HERO IMAGE FALLBACK ──────────────────────────────────
  // If krishna-arjuna-vishnu.jpg fails to load, show a rich gradient instead
  const hero = document.querySelector('.hero');
  if (hero) {
    const testImg = new Image();
    testImg.src = 'krishna-arjuna-vishnu.jpg';

    testImg.onerror = function () {
      // Image could not be loaded — apply a beautiful fallback gradient
      hero.style.backgroundImage =
        'linear-gradient(135deg, #1a0a00 0%, #2d1500 30%, #0d0a06 60%, #1a0d00 100%)';
      console.warn(
        'krishna-arjuna-vishnu.jpg could not be loaded. ' +
        'Make sure the image file is in the SAME folder as index.html.'
      );
    };

    testImg.onload = function () {
      // Image loaded successfully — ensure it is applied
      hero.style.backgroundImage = "url('krishna-arjuna-vishnu.jpg')";
    };
  }

  // ── 2. SCROLL REVEAL ANIMATION ─────────────────────────────
  // Cards and sections gently fade + slide up when they enter the viewport
  const revealTargets = document.querySelectorAll(
    '.card, .price-btn, .contact-item, .about, .services, .pricing, .payment'
  );

  // Set initial hidden state
  revealTargets.forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry, i) {
        if (entry.isIntersecting) {
          // Stagger each element slightly
          setTimeout(function () {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, i * 60);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  revealTargets.forEach(function (el) {
    revealObserver.observe(el);
  });

  // ── 3. WHATSAPP BUTTON PULSE ───────────────────────────────
  // Adds a subtle pulse animation to WhatsApp buttons after 2 seconds
  const style = document.createElement('style');
  style.textContent = `
    @keyframes waPulse {
      0%   { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.55); }
      70%  { box-shadow: 0 0 0 14px rgba(37, 211, 102, 0); }
      100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
    }
    .btn.pulse {
      animation: waPulse 1.8s ease-in-out 3;
    }
  `;
  document.head.appendChild(style);

  setTimeout(function () {
    document.querySelectorAll('.btn').forEach(function (btn) {
      btn.classList.add('pulse');
      btn.addEventListener('animationend', function () {
        btn.classList.remove('pulse');
      });
    });
  }, 2000);

  // ── 4. PRICE BUTTON — CLICK FEEDBACK ──────────────────────
  document.querySelectorAll('.price-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      // Briefly highlight the selected plan
      document.querySelectorAll('.price-btn').forEach(function (b) {
        b.style.background = '';
        b.style.color = '';
      });
      btn.style.background = '#f5c842';
      btn.style.color = '#0d0a06';
    });
  });

});
