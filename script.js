// ============================================================
//  KRISHNARJUNA JYOTHISHA — script.js
//  Enhancements:
//   1. Hero scroll-driven frame animation (public/frames/KAJ_BG-###.jpg)
//   2. Smooth reveal animation for cards and sections on scroll
//   3. WhatsApp button pulse on load
//   4. Price button click feedback
// ============================================================

document.addEventListener('DOMContentLoaded', function () {

  // ── 1. HERO FRAME ANIMATION ─────────────────────────────────
  // Frames: public/frames/KAJ_BG-001.jpg, KAJ_BG-002.jpg, … (names unchanged)
  const FRAME_COUNT = 150; // KAJ_BG-001.jpg … KAJ_BG-150.jpg in public/frames/
  const FRAMES_BASE = 'public/frames/';

  function framePath(n) {
    return FRAMES_BASE + 'KAJ_BG-' + String(n).padStart(3, '0') + '.jpg';
  }

  const HERO_TEXT_FADE_END = 0.08;
  const heroSection = document.getElementById('hero');
  const canvas = document.getElementById('hero-canvas');
  const heroContent = document.querySelector('.hero-content');

  if (heroSection && canvas) {
    const ctx = canvas.getContext('2d');
    const frames = [];
    let loaded = false;
    let lastFrame = -1;
    let ticking = false;
    let loadedCount = 0;

    function drawFrame(index) {
      const img = frames[index];
      if (!ctx || !img || !img.complete || !img.naturalWidth) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = cw / ch;
      let drawW;
      let drawH;

      if (canvasRatio > imgRatio) {
        drawW = cw;
        drawH = cw / imgRatio;
      } else {
        drawH = ch;
        drawW = ch * imgRatio;
      }

      if (window.innerWidth <= 768) {
        drawW *= 1.3;
        drawH *= 1.3;
      }

      const drawX = (cw - drawW) / 2;
      const drawY = (ch - drawH) / 2;
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, drawX, drawY, drawW, drawH);
    }

    function resizeCanvas() {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      if (lastFrame >= 0) drawFrame(lastFrame);
    }

    function onScroll() {
      if (!loaded || ticking) return;
      ticking = true;

      requestAnimationFrame(function () {
        ticking = false;
        const rect = heroSection.getBoundingClientRect();
        const scrollable = heroSection.offsetHeight - window.innerHeight;
        const progress = scrollable <= 0
          ? 0
          : Math.min(1, Math.max(0, -rect.top / scrollable));

        const frameIndex = Math.min(
          FRAME_COUNT - 1,
          Math.floor(progress * FRAME_COUNT)
        );

        if (frameIndex !== lastFrame) {
          lastFrame = frameIndex;
          drawFrame(frameIndex);
        }

        if (heroContent) {
          const opacity = Math.max(0, 1 - progress / HERO_TEXT_FADE_END);
          heroContent.style.opacity = String(opacity);
          heroContent.style.transform =
            'translateY(' + ((1 - opacity) * 12) + 'px)';
        }
      });
    }

    function tryStart() {
      loadedCount++;
      if (loadedCount < FRAME_COUNT) return;
      loaded = true;
      resizeCanvas();
      drawFrame(0);
      lastFrame = 0;
      onScroll();
    }

    function showGradientFallback() {
      if (!ctx) return;
      resizeCanvas();
      const cw = canvas.width;
      const ch = canvas.height;
      const gradient = ctx.createLinearGradient(0, 0, cw, ch);
      gradient.addColorStop(0, '#1a0a00');
      gradient.addColorStop(0.3, '#2d1500');
      gradient.addColorStop(0.6, '#0d0a06');
      gradient.addColorStop(1, '#1a0d00');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, cw, ch);
      console.warn(
        'Hero frames could not be loaded. Check public/frames/KAJ_BG-001.jpg … KAJ_BG-' +
        String(FRAME_COUNT).padStart(3, '0') + '.jpg'
      );
    }

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = framePath(i);
      img.onload = tryStart;
      img.onerror = tryStart;
      frames[i - 1] = img;
    }

    setTimeout(function () {
      if (!loaded) showGradientFallback();
    }, 15000);

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // ── 2. SCROLL REVEAL ANIMATION ─────────────────────────────
  const revealTargets = document.querySelectorAll(
    '.card, .price-btn, .contact-item, .about, .services, .pricing, .payment'
  );

  revealTargets.forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry, i) {
        if (entry.isIntersecting) {
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
      document.querySelectorAll('.price-btn').forEach(function (b) {
        b.style.background = '';
        b.style.color = '';
      });
      btn.style.background = '#f5c842';
      btn.style.color = '#0d0a06';
    });
  });

});
