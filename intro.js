/**
 * AVĀRTĀ — CINEMATIC LUXURY REVEAL SEQUENCE CONTROLLER
 * Sequence:
 *   0.0s  – Spotlight beam & dust motes illuminate heavy red velvet curtains
 *   0.3s  – Subtle camera push-in begins
 *   0.5s  – Red velvet curtains slowly part center-outward, unveiling the gallery hallway page
 *   1.2s  – AVĀRTĀ hero wordmark materializes letter-by-letter out of soft blur into sharp focus
 *   2.0s  – Thin horizontal accent lines illuminate above A's, warm golden glow radiates
 *   2.4s  – CTA button ("ENTER THE GALLERY →") & navbar fade in
 *   3.2s  – Intro completes, smooth fade to interactive home view
 */
(function () {
  'use strict';

  // ── Respect prefers-reduced-motion ─────────────────────────────────────────
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const el = document.getElementById('avarta-intro');
    if (el) {
      el.style.display = 'none';
      document.body.classList.remove('intro-active');
    }
    const letterWraps = document.querySelectorAll('.hero-wordmark .letter-wrap');
    letterWraps.forEach(w => w.classList.add('visible'));
    const cta = document.querySelector('.hero-cta');
    if (cta) cta.classList.add('visible');
    return;
  }

  function initLuxuryReveal() {
    const intro        = document.getElementById('avarta-intro');
    const curtainStage = document.getElementById('intro-curtain-stage');
    const skipBtn      = document.getElementById('intro-skip-btn');
    const canvas       = document.getElementById('intro-fx-canvas');
    const heroWordmark = document.getElementById('hero-wordmark');
    const heroTagline  = document.getElementById('hero-tagline');
    const heroCta      = document.querySelector('.hero-cta');

    if (!intro) return;

    // Lock body scroll during reveal
    document.body.classList.add('intro-active');

    let finished = false;
    let animFrameId = null;

    // ── Canvas Setup (Dust Motes in Spotlight Beam) ────────────────────────────
    let ctx = null;
    let width = window.innerWidth;
    let height = window.innerHeight;

    if (canvas) {
      ctx = canvas.getContext('2d');
      canvas.width = width;
      canvas.height = height;

      window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      });
    }

    // Floating dust particles
    const dustParticles = [];
    const DUST_COUNT = 60;

    for (let i = 0; i < DUST_COUNT; i++) {
      dustParticles.push({
        x: width * 0.5 + (Math.random() - 0.5) * width * 0.55,
        y: Math.random() * height * 0.85,
        radius: Math.random() * 2.2 + 0.8,
        alpha: Math.random() * 0.65 + 0.2,
        speedY: (Math.random() * 0.35 + 0.1) * (Math.random() < 0.5 ? 1 : -1),
        speedX: (Math.random() - 0.5) * 0.25,
        pulseSpeed: Math.random() * 0.03 + 0.01,
        pulseAngle: Math.random() * Math.PI * 2
      });
    }

    function renderFX() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      if (!finished && dustParticles.length > 0) {
        for (let i = 0; i < dustParticles.length; i++) {
          const p = dustParticles[i];
          p.y += p.speedY;
          p.x += Math.sin(p.pulseAngle) * p.speedX;
          p.pulseAngle += p.pulseSpeed;

          if (p.y < 0) p.y = height * 0.85;
          if (p.y > height * 0.85) p.y = 10;

          const currentAlpha = (Math.sin(p.pulseAngle) * 0.3 + 0.7) * p.alpha;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 230, 160, ${currentAlpha.toFixed(3)})`;
          ctx.shadowBlur = 10;
          ctx.shadowColor = 'rgba(229, 193, 88, 0.8)';
          ctx.fill();
        }
      }

      animFrameId = requestAnimationFrame(renderFX);
    }

    renderFX();

    // ── Finish / Skip Handler ──────────────────────────────────────────────────
    function finishIntro() {
      if (finished) return;
      finished = true;

      // Ensure all hero elements are fully revealed
      const letterWraps = heroWordmark ? heroWordmark.querySelectorAll('.letter-wrap') : [];
      letterWraps.forEach(w => w.classList.add('visible'));

      if (heroTagline) heroTagline.classList.add('visible');
      if (heroCta) heroCta.classList.add('visible');
      document.body.classList.add('intro-navbar-visible');

      intro.classList.add('intro-done');

      setTimeout(() => {
        intro.style.display = 'none';
        document.body.classList.remove('intro-active');
        if (animFrameId) cancelAnimationFrame(animFrameId);
      }, 900);
    }

    intro.addEventListener('click', finishIntro, { once: true });
    if (skipBtn) {
      skipBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        finishIntro();
      });
    }

    // ── Sequence Timeline Execution ────────────────────────────────────────────

    // 0.6s: Skip button appears
    setTimeout(() => {
      if (skipBtn) skipBtn.classList.add('visible');
    }, 600);

    // 0.3s: Camera push-in
    setTimeout(() => {
      if (curtainStage) curtainStage.classList.add('push-in');
    }, 300);

    // 0.5s: Curtains slowly part center-outward
    setTimeout(() => {
      if (curtainStage) curtainStage.classList.add('curtain-stage-open');
    }, 500);

    // 1.2s: Letter-by-letter materialization on hero wordmark
    setTimeout(() => {
      const letterWraps = heroWordmark ? heroWordmark.querySelectorAll('.letter-wrap') : [];
      letterWraps.forEach((wrap, idx) => {
        setTimeout(() => {
          wrap.classList.add('visible');
        }, idx * 140);
      });
    }, 1200);

    // 2.1s: Tagline fades in
    setTimeout(() => {
      if (heroTagline) heroTagline.classList.add('visible');
    }, 2100);

    // 2.5s: CTA button & navbar fade in
    setTimeout(() => {
      if (heroCta) heroCta.classList.add('visible');
      document.body.classList.add('intro-navbar-visible');
    }, 2500);

    // 3.4s: Sequence completion
    setTimeout(() => {
      finishIntro();
    }, 3400);
  }

  // Run on DOM load or immediate if ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLuxuryReveal);
  } else {
    initLuxuryReveal();
  }
})();
