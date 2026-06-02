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
  // Frames: Public/Frames/KAJ_BG-001.jpg … KAJ_BG-150.jpg (names unchanged)
  const FRAME_COUNT = 150;
  const FRAME_PATHS = [
    'Public/Frames/KAJ_BG-',
    './Public/Frames/KAJ_BG-',
    'public/frames/KAJ_BG-',
    './public/frames/KAJ_BG-'
  ];

  function framePath(n, pathIndex) {
    const base = FRAME_PATHS[pathIndex !== undefined ? pathIndex : 0];
    return base + String(n).padStart(3, '0') + '.jpg';
  }

  const HERO_TEXT_FADE_END = 0.25;
  const heroSection = document.getElementById('hero');
  const canvas = document.getElementById('hero-canvas');
  const heroContent = document.querySelector('.hero-content');

  if (heroSection && canvas) {
    const ctx = canvas.getContext('2d');
    const frames = new Array(FRAME_COUNT);
    let heroReady = false;
    let lastFrame = -1;
    let ticking = false;
    let loadedCount = 0;
    let successCount = 0;
    const BATCH_SIZE = 12;

    function getFrameImage(index) {
      if (frames[index] && frames[index].naturalWidth) {
        return frames[index];
      }
      for (let i = index; i >= 0; i--) {
        if (frames[i] && frames[i].naturalWidth) {
          return frames[i];
        }
      }
      for (let j = index + 1; j < FRAME_COUNT; j++) {
        if (frames[j] && frames[j].naturalWidth) {
          return frames[j];
        }
      }
      return null;
    }

    function drawFrame(index) {
      const img = getFrameImage(index);
      if (!ctx || !img) return;

      const cw = canvas.clientWidth;
      const ch = canvas.clientHeight;
      if (!cw || !ch) return;

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
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (heroReady && lastFrame >= 0) {
        drawFrame(lastFrame);
      }
    }

    function enableHero() {
      if (heroReady) return;
      heroReady = true;
      resizeCanvas();
      onScroll();
    }

    function frameIndexForProgress(progress) {
      if (progress <= 0) return 0;
      if (progress >= 1) return FRAME_COUNT - 1;
      return Math.min(
        FRAME_COUNT - 1,
        Math.max(0, Math.round(progress * (FRAME_COUNT - 1)))
      );
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(function () {
        ticking = false;
        const rect = heroSection.getBoundingClientRect();
        const scrollable = heroSection.offsetHeight - window.innerHeight;
        const progress = scrollable <= 0
          ? 0
          : Math.min(1, Math.max(0, -rect.top / scrollable));

        if (heroReady) {
          const frameIndex = frameIndexForProgress(progress);
          if (frameIndex !== lastFrame) {
            lastFrame = frameIndex;
            drawFrame(frameIndex);
          }
        }

        if (heroContent) {
          if (progress < 0.04) {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
          } else {
            const opacity = Math.max(0.35, 1 - progress / HERO_TEXT_FADE_END);
            heroContent.style.opacity = String(opacity);
            heroContent.style.transform =
              'translateY(' + ((1 - opacity) * 12) + 'px)';
          }
        }
      });
    }

    function onFrameSettled() {
      loadedCount++;
      if (loadedCount >= FRAME_COUNT && successCount === 0) {
        showGradientFallback();
      }
    }

    function loadFrame(index, pathTry) {
      const img = new Image();
      img.onload = function () {
        frames[index] = img;
        successCount++;
        onFrameSettled();
        if (index === 0) {
          enableHero();
        } else if (heroReady && index === lastFrame) {
          drawFrame(index);
        }
      };
      img.onerror = function () {
        if (pathTry + 1 < FRAME_PATHS.length) {
          loadFrame(index, pathTry + 1);
        } else {
          onFrameSettled();
        }
      };
      img.src = framePath(index + 1, pathTry);
    }

    function loadFrameBatch(start) {
      const end = Math.min(start + BATCH_SIZE, FRAME_COUNT);
      for (let i = start; i < end; i++) {
        loadFrame(i, 0);
      }
      if (end < FRAME_COUNT) {
        window.setTimeout(function () {
          loadFrameBatch(end);
        }, 40);
      }
    }

    function showGradientFallback() {
      if (!ctx || heroReady) return;
      heroReady = true;
      lastFrame = 0;
      resizeCanvas();
      const cw = canvas.clientWidth;
      const ch = canvas.clientHeight;
      const gradient = ctx.createLinearGradient(0, 0, cw, ch);
      gradient.addColorStop(0, '#1a0a00');
      gradient.addColorStop(0.3, '#2d1500');
      gradient.addColorStop(0.6, '#0d0a06');
      gradient.addColorStop(1, '#1a0d00');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, cw, ch);
      if (heroContent) {
        heroContent.style.opacity = '1';
      }
      console.warn(
        'Hero frames could not be loaded. Check Public/Frames/KAJ_BG-001.jpg … KAJ_BG-' +
        String(FRAME_COUNT).padStart(3, '0') + '.jpg'
      );
    }

    if (heroContent) {
      heroContent.style.opacity = '1';
    }

    resizeCanvas();
    loadFrame(0, 0);
    window.setTimeout(function () {
      loadFrameBatch(1);
    }, 0);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', resizeCanvas);
    onScroll();

    window.setTimeout(function () {
      if (!heroReady) showGradientFallback();
    }, 8000);
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
