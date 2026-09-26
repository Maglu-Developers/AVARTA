/**
 * NAV MAGNIFICATION (macOS DOCK STYLE)
 * Adds physics-based hover magnification wave to nav toggle buttons
 * (Home, Collection, About, Explore) without altering their styling or layout flow.
 */

(function () {
  'use strict';

  const CONFIG = {
    maxScale: 1.25,      // Peak magnification for closest button (1.15 - 1.3)
    minScale: 1.0,       // Base scale when unaffected
    distance: 140,       // Influence radius in pixels
    lerpSpeed: 0.24,     // Spring response speed (~150-200ms snappy feel)
    verticalFalloff: 1.3 // Extra damping on vertical distance
  };

  class NavDockMagnifier {
    constructor(container, itemSelector) {
      this.container = typeof container === 'string' ? document.querySelector(container) : container;
      if (!this.container) return;

      this.itemSelector = itemSelector;
      this.items = [];
      this.scales = [];
      this.mouseX = Infinity;
      this.mouseY = Infinity;
      this.isHovered = false;
      this.animating = false;

      this._init();
    }

    _init() {
      this._refreshItems();
      if (this.items.length === 0) return;

      this.container.addEventListener('mousemove', (e) => {
        this.isHovered = true;
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
        if (!this.animating) {
          this.animating = true;
          this._tick();
        }
      }, { passive: true });

      this.container.addEventListener('mouseleave', () => {
        this.isHovered = false;
        this.mouseX = Infinity;
        this.mouseY = Infinity;
        if (!this.animating) {
          this.animating = true;
          this._tick();
        }
      });
    }

    _refreshItems() {
      this.items = Array.from(this.container.querySelectorAll(this.itemSelector));
      this.scales = this.items.map(() => 1.0);
      this.items.forEach((item) => {
        item.style.transformOrigin = 'center center';
        item.style.willChange = 'transform';
      });
    }

    _tick() {
      if (this.items.length === 0) {
        this.animating = false;
        return;
      }

      let stillMoving = false;

      for (let i = 0; i < this.items.length; i++) {
        const item = this.items[i];
        let targetScale = CONFIG.minScale;

        if (this.isHovered && this.mouseX !== Infinity) {
          const rect = item.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;

          const dx = this.mouseX - centerX;
          const dy = (this.mouseY - centerY) * CONFIG.verticalFalloff;
          const dist = Math.hypot(dx, dy);

          if (dist < CONFIG.distance) {
            // Smooth cosine bell curve for natural magnification wave
            const ratio = dist / CONFIG.distance;
            const factor = Math.cos((ratio * Math.PI) / 2);
            targetScale = CONFIG.minScale + (CONFIG.maxScale - CONFIG.minScale) * factor;
          }
        }

        // Spring interpolation (lerp)
        const diff = targetScale - this.scales[i];
        if (Math.abs(diff) > 0.001) {
          this.scales[i] += diff * CONFIG.lerpSpeed;
          stillMoving = true;
        } else {
          this.scales[i] = targetScale;
        }

        const scale = this.scales[i];
        if (scale > 1.002) {
          item.style.transform = `scale(${scale.toFixed(3)})`;
          item.style.zIndex = Math.round(scale * 10);
        } else {
          item.style.transform = '';
          item.style.zIndex = '';
        }
      }

      if (stillMoving) {
        requestAnimationFrame(() => this._tick());
      } else {
        this.animating = false;
      }
    }
  }

  // Attach to window
  window.NavDockMagnifier = NavDockMagnifier;

  // Auto-initialize on site nav and observe for dynamic containers
  function initMagnifiers() {
    const siteNav = document.querySelector('.nav-menu');
    if (siteNav) {
      new NavDockMagnifier(siteNav, '.nav-item');
    }

    const cdvNav = document.querySelector('.cdv-nav-links');
    if (cdvNav) {
      new NavDockMagnifier(cdvNav, '.cdv-nav-link');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMagnifiers);
  } else {
    initMagnifiers();
  }

  // Also hook into detail view opening to ensure detail view nav is active
  window.addEventListener('cdvOpened', () => {
    const cdvNav = document.querySelector('.cdv-nav-links');
    if (cdvNav) {
      new NavDockMagnifier(cdvNav, '.cdv-nav-link');
    }
  });

})();
