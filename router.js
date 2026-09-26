/**
 * AVĀRTĀ — Client-Side Page Router & Cinematic Blackout Transition
 * Handles smooth fade-to-black view swaps between Home and About pages.
 * Fully supports browser history, hash navigation, and prefers-reduced-motion.
 */

(function () {
  const transitionOverlay = document.getElementById('page-transition');
  const homeView = document.getElementById('home-view');
  const aboutView = document.getElementById('about-view');
  const collectionView = document.getElementById('collection-view');
  const exploreView = document.getElementById('explore-view');
  const beyondView = document.getElementById('beyond-view');
  const quizView = document.getElementById('quiz-view');
  const guessView = document.getElementById('guess-view');
  const beyondAvartaView = document.getElementById('beyond-avarta-view');
  const waterCanvas = document.getElementById('water-canvas');
  const ambientOverlay = document.querySelector('.overlay');
  const navLinks = document.querySelectorAll('.nav-item');

  let isTransitioning = false;
  let currentRoute = 'home';
  let verticalGalleryInstance = null;

  // ==========================================================================
  // HERO BACKGROUND AUDIO ENGINE
  // ==========================================================================
  const heroAudio = {
    _audio: null,
    _muteBtn: null,
    _isMuted: false,
    _isPlaying: false,
    _volume: 0.3,

    init() {
      this._audio = new Audio('./audio/kids_stranger_things.mp3');
      this._audio.loop = true;
      this._audio.volume = this._volume;
      this._audio.preload = 'auto';

      // Restore mute preference
      const saved = localStorage.getItem('avarta_hero_audio_muted');
      if (saved === 'true') {
        this._isMuted = true;
        this._audio.muted = true;
      }

      this._createMuteButton();

      // Handle audio errors gracefully
      this._audio.addEventListener('error', () => {
        console.warn('[AVĀRTĀ Hero Audio] Failed to load hero section audio file.');
      });
    },

    play() {
      if (this._isPlaying || !this._audio) return;
      this._isPlaying = true;

      const playPromise = this._audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn(`[AVĀRTĀ Hero Audio] Autoplay blocked: ${err.message}`);
          this._isPlaying = false;
        });
      }
      this._showButton();
    },

    stop() {
      if (!this._audio) return;
      this._audio.pause();
      this._audio.currentTime = 0;
      this._isPlaying = false;
      this._hideButton();
    },

    toggleMute() {
      this._isMuted = !this._isMuted;
      if (this._audio) {
        this._audio.muted = this._isMuted;
      }
      localStorage.setItem('avarta_hero_audio_muted', String(this._isMuted));
      this._updateIcon();
    },

    _createMuteButton() {
      const btn = document.createElement('button');
      btn.id = 'heroAudioToggle';
      btn.setAttribute('aria-label', 'Toggle background music');
      btn.title = 'Toggle background music';

      Object.assign(btn.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: '9999',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        background: 'rgba(0, 0, 0, 0.55)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        color: 'rgba(255, 255, 255, 0.75)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0',
        transition: 'all 0.3s ease',
        boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
        opacity: '0',
        pointerEvents: 'none'
      });

      btn.addEventListener('mouseenter', () => {
        btn.style.background = 'rgba(0, 0, 0, 0.75)';
        btn.style.borderColor = 'rgba(255, 255, 255, 0.3)';
        btn.style.transform = 'scale(1.08)';
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.background = 'rgba(0, 0, 0, 0.55)';
        btn.style.borderColor = 'rgba(255, 255, 255, 0.15)';
        btn.style.transform = 'scale(1)';
      });
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleMute();
      });

      document.body.appendChild(btn);
      this._muteBtn = btn;
      this._updateIcon();
    },

    _showButton() {
      if (this._muteBtn) {
        this._muteBtn.style.opacity = '1';
        this._muteBtn.style.pointerEvents = 'auto';
      }
    },

    _hideButton() {
      if (this._muteBtn) {
        this._muteBtn.style.opacity = '0';
        this._muteBtn.style.pointerEvents = 'none';
      }
    },

    _updateIcon() {
      if (!this._muteBtn) return;
      if (this._isMuted) {
        this._muteBtn.innerHTML = `
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <line x1="23" y1="9" x2="17" y2="15"></line>
            <line x1="17" y1="9" x2="23" y2="15"></line>
          </svg>`;
        this._muteBtn.setAttribute('aria-label', 'Unmute background music');
      } else {
        this._muteBtn.innerHTML = `
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
          </svg>`;
        this._muteBtn.setAttribute('aria-label', 'Mute background music');
      }
    }
  };

  // Initialize Vertical Slide Gallery when collection view is activated
  function ensureVerticalGallery() {
    if (!verticalGalleryInstance && window.VerticalSlideGallery) {
      verticalGalleryInstance = new window.VerticalSlideGallery({
        target: '#vertical-gallery-mount',
        leftPanel: {
          logo: 'AVĀRTĀ ®',
          badge: 'VISUAL STUDIO',
          tag: 'Curated Collection',
          ctaText: 'Enter the Gallery',
          ctaHref: 'categories.html'
        },
        rightPanel: {
          metaLabel: 'Curated Archive',
          seeAllText: 'All Categories',
          onSeeAll: () => { window.location.href = 'categories.html'; }
        }
      });
      window.avartaVerticalGallery = verticalGalleryInstance;
    }
  }

  // Check user preference for reduced motion
  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  // Update navbar active state indicator
  function updateNav(targetRoute) {
    const isExploreRoute = targetRoute === 'explore' || targetRoute === 'beyond-the-frame' || targetRoute === 'beyond' || targetRoute === 'quiz' || targetRoute === 'guess-painting' || targetRoute === 'guess' || targetRoute === 'guess-the-original' || targetRoute === 'beyond-avarta' || targetRoute === 'museums';
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === '#explore' || link.id === 'nav-explore' || link.id === 'nav-explore-btn') {
        if (isExploreRoute) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      } else if (href === `#${targetRoute}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    const beyondDropdownItem = document.getElementById('explore-beyond-frame');
    if (beyondDropdownItem) {
      if (targetRoute === 'beyond-the-frame' || targetRoute === 'beyond') {
        beyondDropdownItem.classList.add('active-item');
      } else {
        beyondDropdownItem.classList.remove('active-item');
      }
    }

    const quizDropdownItem = document.getElementById('explore-quiz');
    if (quizDropdownItem) {
      if (targetRoute === 'quiz') {
        quizDropdownItem.classList.add('active-item');
      } else {
        quizDropdownItem.classList.remove('active-item');
      }
    }

    const guessDropdownItem = document.getElementById('explore-guess-painting');
    if (guessDropdownItem) {
      if (targetRoute === 'guess-painting' || targetRoute === 'guess' || targetRoute === 'guess-the-original') {
        guessDropdownItem.classList.add('active-item');
      } else {
        guessDropdownItem.classList.remove('active-item');
      }
    }

    const beyondAvartaDropdownItem = document.getElementById('explore-beyond-avarta');
    if (beyondAvartaDropdownItem) {
      if (targetRoute === 'beyond-avarta' || targetRoute === 'museums') {
        beyondAvartaDropdownItem.classList.add('active-item');
      } else {
        beyondAvartaDropdownItem.classList.remove('active-item');
      }
    }

    if (window.avartaDock && typeof window.avartaDock.setActive === 'function') {
      const dockKey = isExploreRoute ? 'explore' : targetRoute;
      window.avartaDock.setActive(dockKey);
    }
  }

  // Helper to hide all views cleanly
  function hideAllViews() {
    [homeView, aboutView, collectionView, exploreView, beyondView, quizView, guessView, beyondAvartaView].forEach(v => {
      if (v) {
        v.classList.remove('active');
        v.setAttribute('aria-hidden', 'true');
      }
    });

    document.body.classList.remove(
      'page-about-mode',
      'page-explore-mode',
      'page-beyond-mode',
      'page-quiz-mode',
      'page-guess-mode',
      'page-beyond-avarta-mode'
    );
  }

  // Switch the DOM views and body scroll modes
  function setView(targetRoute) {
    currentRoute = targetRoute;
    hideAllViews();

    if (targetRoute === 'collection') {
      if (collectionView) {
        collectionView.classList.add('active');
        collectionView.removeAttribute('aria-hidden');
      }

      if (waterCanvas) {
        waterCanvas.style.opacity = '0';
        waterCanvas.style.visibility = 'hidden';
      }
      if (ambientOverlay) {
        ambientOverlay.style.opacity = '0';
        ambientOverlay.style.visibility = 'hidden';
      }
      if (window.avartaFluid && typeof window.avartaFluid.pause === 'function') {
        window.avartaFluid.pause();
      }
      if (window.avartaCorridor && typeof window.avartaCorridor.pause === 'function') {
        window.avartaCorridor.pause();
      }
      if (window.avartaCards && typeof window.avartaCards.disable === 'function') {
        window.avartaCards.disable();
      }

      window.scrollTo(0, 0);
      ensureVerticalGallery();
    } else if (targetRoute === 'about') {
      if (aboutView) {
        aboutView.classList.add('active');
        aboutView.removeAttribute('aria-hidden');
      }

      document.body.classList.add('page-about-mode');

      if (waterCanvas) {
        waterCanvas.style.opacity = '0';
        waterCanvas.style.visibility = 'hidden';
      }
      if (ambientOverlay) {
        ambientOverlay.style.opacity = '0';
        ambientOverlay.style.visibility = 'hidden';
      }

      window.scrollTo(0, 0);

      if (window.avartaFluid && typeof window.avartaFluid.pause === 'function') {
        window.avartaFluid.pause();
      }
      if (window.avartaCards && typeof window.avartaCards.enable === 'function') {
        window.avartaCards.enable();
      }
      if (window.avartaCorridor && typeof window.avartaCorridor.resume === 'function') {
        window.avartaCorridor.resume();
        window.avartaCorridor.goToIndex(0);
      }
    } else if (targetRoute === 'explore') {
      if (exploreView) {
        exploreView.classList.add('active');
        exploreView.removeAttribute('aria-hidden');
      }

      document.body.classList.add('page-explore-mode');

      if (waterCanvas) {
        waterCanvas.style.opacity = '0';
        waterCanvas.style.visibility = 'hidden';
      }
      if (ambientOverlay) {
        ambientOverlay.style.opacity = '0';
        ambientOverlay.style.visibility = 'hidden';
      }

      window.scrollTo(0, 0);

      if (window.avartaFluid && typeof window.avartaFluid.pause === 'function') {
        window.avartaFluid.pause();
      }
      if (window.avartaCorridor && typeof window.avartaCorridor.pause === 'function') {
        window.avartaCorridor.pause();
      }
      if (window.avartaCards && typeof window.avartaCards.disable === 'function') {
        window.avartaCards.disable();
      }
    } else if (targetRoute === 'beyond-the-frame' || targetRoute === 'beyond') {
      if (beyondView) {
        beyondView.classList.add('active');
        beyondView.removeAttribute('aria-hidden');
      }

      document.body.classList.add('page-beyond-mode');

      if (waterCanvas) {
        waterCanvas.style.opacity = '0';
        waterCanvas.style.visibility = 'hidden';
      }
      if (ambientOverlay) {
        ambientOverlay.style.opacity = '0';
        ambientOverlay.style.visibility = 'hidden';
      }

      window.scrollTo(0, 0);

      if (window.avartaFluid && typeof window.avartaFluid.pause === 'function') {
        window.avartaFluid.pause();
      }
      if (window.avartaCorridor && typeof window.avartaCorridor.pause === 'function') {
        window.avartaCorridor.pause();
      }
      if (window.avartaCards && typeof window.avartaCards.disable === 'function') {
        window.avartaCards.disable();
      }
    } else if (targetRoute === 'quiz') {
      if (quizView) {
        quizView.classList.add('active');
        quizView.removeAttribute('aria-hidden');
      }

      document.body.classList.add('page-quiz-mode');

      if (waterCanvas) {
        waterCanvas.style.opacity = '0';
        waterCanvas.style.visibility = 'hidden';
      }
      if (ambientOverlay) {
        ambientOverlay.style.opacity = '0';
        ambientOverlay.style.visibility = 'hidden';
      }

      window.scrollTo(0, 0);

      if (window.avartaFluid && typeof window.avartaFluid.pause === 'function') {
        window.avartaFluid.pause();
      }
      if (window.avartaCorridor && typeof window.avartaCorridor.pause === 'function') {
        window.avartaCorridor.pause();
      }
      if (window.avartaCards && typeof window.avartaCards.disable === 'function') {
        window.avartaCards.disable();
      }
    } else if (targetRoute === 'guess-painting' || targetRoute === 'guess' || targetRoute === 'guess-the-original') {
      if (guessView) {
        guessView.classList.add('active');
        guessView.removeAttribute('aria-hidden');
      }

      document.body.classList.add('page-guess-mode');

      if (waterCanvas) {
        waterCanvas.style.opacity = '0';
        waterCanvas.style.visibility = 'hidden';
      }
      if (ambientOverlay) {
        ambientOverlay.style.opacity = '0';
        ambientOverlay.style.visibility = 'hidden';
      }

      window.scrollTo(0, 0);

      if (window.avartaFluid && typeof window.avartaFluid.pause === 'function') {
        window.avartaFluid.pause();
      }
      if (window.avartaCorridor && typeof window.avartaCorridor.pause === 'function') {
        window.avartaCorridor.pause();
      }
      if (window.avartaCards && typeof window.avartaCards.disable === 'function') {
        window.avartaCards.disable();
      }
    } else if (targetRoute === 'beyond-avarta' || targetRoute === 'museums') {
      if (beyondAvartaView) {
        beyondAvartaView.classList.add('active');
        beyondAvartaView.removeAttribute('aria-hidden');
      }

      document.body.classList.add('page-beyond-avarta-mode');

      if (waterCanvas) {
        waterCanvas.style.opacity = '0';
        waterCanvas.style.visibility = 'hidden';
      }
      if (ambientOverlay) {
        ambientOverlay.style.opacity = '0';
        ambientOverlay.style.visibility = 'hidden';
      }

      window.scrollTo(0, 0);

      if (window.avartaFluid && typeof window.avartaFluid.pause === 'function') {
        window.avartaFluid.pause();
      }
      if (window.avartaCorridor && typeof window.avartaCorridor.pause === 'function') {
        window.avartaCorridor.pause();
      }
      if (window.avartaCards && typeof window.avartaCards.disable === 'function') {
        window.avartaCards.disable();
      }
    } else {
      // Home route
      if (homeView) {
        homeView.classList.add('active');
        homeView.removeAttribute('aria-hidden');
      }

      if (window.avartaCorridor && typeof window.avartaCorridor.pause === 'function') {
        window.avartaCorridor.pause();
      }
      if (window.avartaCards && typeof window.avartaCards.disable === 'function') {
        window.avartaCards.disable();
      }

      if (waterCanvas) {
        waterCanvas.style.opacity = '1';
        waterCanvas.style.visibility = 'visible';
      }
      if (ambientOverlay) {
        ambientOverlay.style.opacity = '1';
        ambientOverlay.style.visibility = 'visible';
      }

      const warpOverlay = document.getElementById('portal-world-warp');
      if (warpOverlay && warpOverlay.classList.contains('warping')) {
        warpOverlay.classList.remove('warping');
        warpOverlay.classList.add('dissolving');
        setTimeout(() => {
          warpOverlay.classList.remove('dissolving');
        }, 850);
      }

      window.scrollTo(0, 0);

      if (window.avartaFluid && typeof window.avartaFluid.resume === 'function') {
        window.avartaFluid.resume();
      }
    }

    updateNav(targetRoute);
  }

  function resolveRouteFromHash(hash) {
    if (!hash || hash === '#' || hash === '#home') return 'home';
    if (hash === '#about') return 'about';
    if (hash === '#collection') return 'collection';
    if (hash === '#explore') return 'explore';
    if (hash === '#quiz') return 'quiz';
    if (hash === '#guess-painting' || hash === '#guess' || hash === '#guess-the-original') return 'guess-painting';
    if (hash === '#beyond-avarta' || hash === '#museums') return 'beyond-avarta';
    if (hash === '#beyond-the-frame' || hash === '#beyond') return 'beyond-the-frame';
    return 'home';
  }

  function getHashForRoute(route) {
    if (route === 'about') return '#about';
    if (route === 'collection') return '#collection';
    if (route === 'explore') return '#explore';
    if (route === 'quiz') return '#quiz';
    if (route === 'guess-painting' || route === 'guess' || route === 'guess-the-original') return '#guess-painting';
    if (route === 'beyond-avarta' || route === 'museums') return '#beyond-avarta';
    if (route === 'beyond-the-frame' || route === 'beyond') return '#beyond-the-frame';
    return '#home';
  }

  // Cinematic Fade-to-Black Page Transition
  function navigateTo(targetRoute, updateHistory = true) {
    if (window.CollectionDetailView && typeof window.CollectionDetailView.close === 'function' && window.CollectionDetailView.isOpen) {
      window.CollectionDetailView.close(true);
    }

    if (targetRoute === currentRoute) {
      if (targetRoute === 'about' && window.avartaCards) {
        window.avartaCards.goToCard(0);
      }
      return;
    }

    if (isTransitioning) return;

    if (updateHistory) {
      const hash = getHashForRoute(targetRoute);
      history.pushState({ route: targetRoute }, '', hash);
    }

    // Instant switch if user prefers reduced motion
    if (prefersReducedMotion() || !transitionOverlay) {
      setView(targetRoute);
      return;
    }

    isTransitioning = true;

    // Phase 1: Fade overlay to solid black (~450ms)
    transitionOverlay.classList.add('active');

    setTimeout(() => {
      // Phase 2: Underneath black screen, swap page DOM and reset scroll position
      setView(targetRoute);

      // Phase 3: Fade overlay back out (~550ms)
      setTimeout(() => {
        transitionOverlay.classList.remove('active');

        // Allow click interactions once fade out finishes
        setTimeout(() => {
          isTransitioning = false;
        }, 550);
      }, 50);
    }, 450);
  }

  // Intercept navigation links
  function initNavigation() {
    document.addEventListener('click', function (e) {
      // Check if clicking the portal gate toggle on Card 10
      const gateBtn = e.target.closest('#gate-enter-toggle');
      if (gateBtn) {
        e.preventDefault();
        gateBtn.classList.add('is-clicked');

        if (window.avartaCorridor && typeof window.avartaCorridor.enterWorldAnimation === 'function') {
          window.avartaCorridor.enterWorldAnimation(() => {
            window.location.href = 'categories.html';
          });
        } else {
          window.location.href = 'categories.html';
        }
        return;
      }

      const link = e.target.closest('a[href^="#"]');
      if (!link) return;

      const hash = link.getAttribute('href');
      const targetRoute = resolveRouteFromHash(hash);
      
      e.preventDefault();
      navigateTo(targetRoute);
    });

    // Handle browser back/forward buttons
    window.addEventListener('popstate', function () {
      const hash = window.location.hash;
      const targetRoute = resolveRouteFromHash(hash);
      navigateTo(targetRoute, false);
    });

    // Initial route check on page load
    const initialHash = window.location.hash;
    setView(resolveRouteFromHash(initialHash));

    // Navbar glass tint on scroll
    const navbar = document.getElementById('site-navbar');
    window.addEventListener('scroll', function () {
      if (navbar) {
        if (window.scrollY > 40) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }
    }, { passive: true });

    // Initialize hero background audio
    heroAudio.init();

    // Start background music on first user interaction (required by browsers)
    let heroAudioStarted = false;
    function startHeroAudioOnInteraction() {
      if (heroAudioStarted) return;
      heroAudioStarted = true;
      heroAudio.play();
      document.removeEventListener('click', startHeroAudioOnInteraction);
      document.removeEventListener('touchstart', startHeroAudioOnInteraction);
      document.removeEventListener('keydown', startHeroAudioOnInteraction);
    }
    document.addEventListener('click', startHeroAudioOnInteraction, { once: false });
    document.addEventListener('touchstart', startHeroAudioOnInteraction, { once: false });
    document.addEventListener('keydown', startHeroAudioOnInteraction, { once: false });
  }

  // Initialize once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavigation);
  } else {
    initNavigation();
  }

  // Expose global navigate method for external triggers if needed
  window.avartaNavigate = navigateTo;
})();
