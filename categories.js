/**
 * VISION [INDEX] — MASTER ARCHIVE & PAINTING LIBRARY ENGINE
 * Supports:
 * 1. Cinematic Parallax Landing Page (5 Masterpieces)
 * 2. 20-Category 3D Coverflow Home Screen
 * 3. Dedicated Painting Library with 20 Categories, Grid Explorer, and Lightbox
 */

(function () {
  'use strict';

  // ==========================================================================
  // 20 CURATED CATEGORIES & PAINTINGS DATABASE
  // ==========================================================================
  const CATEGORIES = [
    {
      id: 'historical',
      num: '01',
      name: 'Historical',
      titleMain: 'HISTORICAL',
      titleSub: '— CHRONICLES',
      tag: 'HISTORICAL',
      subtitle: 'Chronicles of human triumph, revolution, and epochal transformations.',
      image: './assets/categories/cat1_historical.jpg',
      audio: './audio/history.mp3',
      paintings: [
        {
          title: 'The Night Watch',
          artist: 'Rembrandt van Rijn',
          year: '1642',
          era: 'Dutch Golden Age',
          medium: 'Oil on canvas',
          museum: 'Rijksmuseum, Amsterdam',
          image: './assets/categories/cat1_historical.jpg',
          description: 'Rembrandt’s monumental masterwork portraying Captain Frans Banning Cocq and his civic guard company.'
        }
      ]
    },
    {
      id: 'mythological',
      num: '02',
      name: 'Mythological',
      titleMain: 'MYTHOLOGICAL',
      titleSub: '— PANTHEON',
      tag: 'MYTHOLOGICAL',
      subtitle: 'Immortal deities, heroic allegories, and ancient folklore.',
      image: './assets/categories/cat2_mythological.jpg',
      audio: './audio/mystical.mp3',
      paintings: [
        {
          title: 'The Birth of Venus',
          artist: 'Sandro Botticelli',
          year: 'c. 1485',
          era: 'Early Renaissance',
          medium: 'Tempera on canvas',
          museum: 'Uffizi Gallery, Florence',
          image: './assets/categories/cat2_mythological.jpg',
          description: 'Venus emerging from the sea foam as a fully grown woman arriving at the seashore upon a giant scallop shell.'
        }
      ]
    },
    {
      id: 'royalty',
      num: '03',
      name: 'Royalty',
      titleMain: 'ROYALTY',
      titleSub: '— MONARCHY',
      tag: 'ROYALTY',
      subtitle: 'Regal portraits, coronation robes, and imperial court splendor.',
      image: './assets/categories/cat3_royalty.jpg',
      audio: './audio/royal.mp3',
      paintings: [
        {
          title: 'Portrait of Louis XIV',
          artist: 'Hyacinthe Rigaud',
          year: '1701',
          era: 'Baroque',
          medium: 'Oil on canvas',
          museum: 'Musée du Louvre, Paris',
          image: './assets/categories/cat3_royalty.jpg',
          description: 'The definitive grand state portrait of the Sun King in ceremonial coronation robes adorned with fleurs-de-lis.'
        }
      ]
    },
    {
      id: 'battle',
      num: '04',
      name: 'Battle & Warfare',
      titleMain: 'BATTLE & WARFARE',
      titleSub: '— MARTIAL',
      tag: 'BATTLE & WARFARE',
      subtitle: 'Epic clashes of civilizations, military valor, and heroic conquests.',
      image: './assets/categories/cat4_battle.jpg',
      audio: './audio/battle and warfare.mp3',
      paintings: [
        {
          title: 'Liberty Leading the People',
          artist: 'Eugène Delacroix',
          year: '1830',
          era: 'Romanticism',
          medium: 'Oil on canvas',
          museum: 'Musée du Louvre, Paris',
          image: './assets/categories/cat4_battle.jpg',
          description: 'An iconic commemoration of the July Revolution of 1830 personifying Liberty leading fighters into battle.'
        }
      ]
    },
    {
      id: 'landscapes',
      num: '05',
      name: 'Landscapes',
      titleMain: 'LANDSCAPES',
      titleSub: '— VISTAS',
      tag: 'LANDSCAPES',
      subtitle: 'Sublime mountain horizons, misty valleys, and romantic vistas.',
      image: './assets/categories/cat5_landscapes.jpg',
      audio: './audio/landscape.mp3',
      paintings: [
        {
          title: 'Wanderer above the Sea of Fog',
          artist: 'Caspar David Friedrich',
          year: '1818',
          era: 'Romanticism',
          medium: 'Oil on canvas',
          museum: 'Hamburger Kunsthalle, Germany',
          image: './assets/categories/cat5_landscapes.jpg',
          description: 'A solitary traveler standing atop a precipice gazing into the sublime mystery of a sea of fog.'
        }
      ]
    },
    {
      id: 'seascapes',
      num: '06',
      name: 'Seascapes',
      titleMain: 'SEASCAPES',
      titleSub: '— OCEANS',
      tag: 'SEASCAPES',
      subtitle: 'Towering ocean swells, tempestuous tides, and coastal poetry.',
      image: './assets/categories/cat6_seascapes.jpg',
      audio: './audio/seascape.mp3',
      paintings: [
        {
          title: 'The Great Wave off Kanagawa',
          artist: 'Katsushika Hokusai',
          year: 'c. 1831',
          era: 'Edo Period (Ukiyo-e)',
          medium: 'Woodblock print',
          museum: 'Tokyo National Museum / Met NYC',
          image: './assets/categories/cat6_seascapes.jpg',
          description: 'A towering cresting wave framing Mount Fuji with timeless dynamic Japanese composition.'
        }
      ]
    },
    {
      id: 'nature',
      num: '07',
      name: 'Nature',
      titleMain: 'NATURE',
      titleSub: '— COSMOS',
      tag: 'NATURE',
      subtitle: 'Lush water lilies, vibrant botanical groves, and organic nature harmonies.',
      image: './assets/categories/cat7_nature.jpg',
      audio: './audio/nature.mp3',
      paintings: [
        {
          title: 'Water Lilies (Nymphéas)',
          artist: 'Claude Monet',
          year: '1916',
          era: 'Impressionism',
          medium: 'Oil on canvas',
          museum: 'Musée de l\'Orangerie, Paris',
          image: './assets/categories/cat7_nature.jpg',
          description: 'Monet’s luminous impressionist depiction of water lilies floating gently upon the serene waters of Giverny.'
        }
      ]
    },
    {
      id: 'wildlife',
      num: '08',
      name: 'Wildlife',
      titleMain: 'WILDLIFE',
      titleSub: '— FAUNA',
      tag: 'WILDLIFE',
      subtitle: 'Fierce jungle predators, untamed creatures, and wilderness vitality.',
      image: './assets/categories/cat8_wildlife.jpg',
      audio: './audio/wildlife.mp3',
      paintings: [
        {
          title: 'Tiger in a Tropical Storm (Surprised!)',
          artist: 'Henri Rousseau',
          year: '1891',
          era: 'Post-Impressionism / Naïve',
          medium: 'Oil on canvas',
          museum: 'National Gallery, London',
          image: './assets/categories/cat8_wildlife.jpg',
          description: 'A tiger illuminated by a flash of lightning preparing to pounce in a lush windblown jungle.'
        }
      ]
    },
    {
      id: 'floral',
      num: '09',
      name: 'Floral Art',
      titleMain: 'FLORAL ART',
      titleSub: '— BOTANICAL',
      tag: 'FLORAL ART',
      subtitle: 'Golden sunflowers, delicate blossoms, and rich botanical still-lifes.',
      image: './assets/categories/cat9_floral.jpg',
      audio: './audio/floral.mp3',
      paintings: [
        {
          title: 'Sunflowers (Tournesols)',
          artist: 'Vincent van Gogh',
          year: '1888',
          era: 'Post-Impressionism',
          medium: 'Oil on canvas',
          museum: 'National Gallery, London',
          image: './assets/categories/cat9_floral.jpg',
          description: 'A vibrant symphony of yellows and ochres expressing gratitude and optimism through luminous flowers.'
        }
      ]
    },
    {
      id: 'portraits',
      num: '10',
      name: 'Portraits',
      titleMain: 'PORTRAITS',
      titleSub: '— FACES',
      tag: 'PORTRAITS',
      subtitle: 'Intimate human gazes, enigmatic expressions, and psychological depth.',
      image: './assets/categories/cat10_portraits.jpg',
      audio: './audio/portrait.mp3',
      paintings: [
        {
          title: 'Girl with a Pearl Earring',
          artist: 'Johannes Vermeer',
          year: 'c. 1665',
          era: 'Dutch Golden Age',
          medium: 'Oil on canvas',
          museum: 'Mauritshuis, The Hague, Netherlands',
          image: './assets/categories/cat10_portraits.jpg',
          description: 'Vermeer’s masterwork tronie capturing an alluring over-the-shoulder glance and gleaming oriental pearl.'
        }
      ]
    },
    {
      id: 'figurative',
      num: '11',
      name: 'Figurative Art',
      titleMain: 'FIGURATIVE ART',
      titleSub: '— HUMAN FORM',
      tag: 'FIGURATIVE ART',
      subtitle: 'Mastery of anatomy, expressive gesture, and Renaissance proportions.',
      image: './assets/categories/cat11_figurative.jpg',
      audio: './audio/figureative.mp3',
      paintings: [
        {
          title: 'Mona Lisa (La Gioconda)',
          artist: 'Leonardo da Vinci',
          year: '1503–1519',
          era: 'High Renaissance',
          medium: 'Oil on poplar panel',
          museum: 'Musée du Louvre, Paris',
          image: './assets/categories/cat11_figurative.jpg',
          description: 'The world’s most celebrated portrait, famed for its subtle sfumato technique and enigmatic smile.'
        }
      ]
    },
    {
      id: 'romance',
      num: '12',
      name: 'Romance & Love',
      titleMain: 'ROMANCE & LOVE',
      titleSub: '— DEVOTION',
      tag: 'ROMANCE & LOVE',
      subtitle: 'Passionate embraces, golden leaf symbolism, and eternal devotion.',
      image: './assets/categories/cat12_romance.jpg',
      audio: './audio/romantic.mp3',
      paintings: [
        {
          title: 'The Kiss (Der Kuss)',
          artist: 'Gustav Klimt',
          year: '1907–1908',
          era: 'Vienna Secession / Art Nouveau',
          medium: 'Oil and gold leaf on canvas',
          museum: 'Österreichische Galerie Belvedere, Vienna',
          image: './assets/categories/cat12_romance.jpg',
          description: 'The pinnacle of Klimt’s Golden Phase, depicting an ecstatic couple embracing on a meadow of wildflowers.'
        }
      ]
    },
    {
      id: 'drama',
      num: '13',
      name: 'Drama & Emotion',
      titleMain: 'DRAMA & EMOTION',
      titleSub: '— EXPRESSION',
      tag: 'DRAMA & EMOTION',
      subtitle: 'Raw psychological tension, angst, passion, and intense color contrast.',
      image: './assets/categories/cat13_drama.jpg',
      audio: './audio/dramatic.mp3',
      paintings: [
        {
          title: 'The Scream (Skrik)',
          artist: 'Edvard Munch',
          year: '1893',
          era: 'Expressionism',
          medium: 'Oil, tempera & pastel on cardboard',
          museum: 'National Museum, Oslo, Norway',
          image: './assets/categories/cat13_drama.jpg',
          description: 'An agonizing figure against a blood-red sky embodying modern human existential dread and psychological tension.'
        }
      ]
    },
    {
      id: 'spirituality',
      num: '14',
      name: 'Spirituality',
      titleMain: 'SPIRITUALITY',
      titleSub: '— SACRED',
      tag: 'SPIRITUALITY',
      subtitle: 'Divine touch, celestial frescoes, and transcendent sacred devotion.',
      image: './assets/categories/cat14_spirituality.jpg',
      audio: './audio/sspritual.mp3',
      paintings: [
        {
          title: 'The Creation of Adam',
          artist: 'Michelangelo Buonarroti',
          year: 'c. 1512',
          era: 'High Renaissance',
          medium: 'Fresco',
          museum: 'Sistine Chapel, Vatican Museums, Rome',
          image: './assets/categories/cat14_spirituality.jpg',
          description: 'The iconic moment God breathes life into Adam with the near-touching of their fingertips on the Sistine ceiling.'
        }
      ]
    },
    {
      id: 'culture',
      num: '15',
      name: 'Culture & Traditions',
      titleMain: 'CULTURE & TRADITIONS',
      titleSub: '— HERITAGE',
      tag: 'CULTURE & TRADITIONS',
      subtitle: 'Folk festivities, community celebrations, and timeless cultural heritage.',
      image: './assets/categories/cat15_culture.jpg',
      audio: './audio/cultural.mp3',
      paintings: [
        {
          title: 'A Sunday on La Grande Jatte',
          artist: 'Georges Seurat',
          year: '1884–1886',
          era: 'Pointillism / Post-Impressionism',
          medium: 'Oil on canvas',
          museum: 'Art Institute of Chicago',
          image: './assets/categories/cat15_culture.jpg',
          description: 'A monument of Neo-Impressionism portraying Parisian leisure culture and social tradition along the banks of the Seine.'
        }
      ]
    },
    {
      id: 'ancient',
      num: '16',
      name: 'Ancient Civilizations',
      titleMain: 'ANCIENT CIVILIZATIONS',
      titleSub: '— ANTIQUITY',
      tag: 'ANCIENT CIVILIZATIONS',
      subtitle: 'Philosophical harmony, classical architecture, and ancient intellect.',
      image: './assets/categories/cat16_ancient.jpg',
      audio: './audio/ancient.mp3',
      paintings: [
        {
          title: 'The School of Athens',
          artist: 'Raphael Sanzio',
          year: '1509–1511',
          era: 'High Renaissance',
          medium: 'Fresco',
          museum: 'Apostolic Palace, Vatican City, Rome',
          image: './assets/categories/cat16_ancient.jpg',
          description: 'Plato and Aristotle leading a grand assembly of antiquity’s greatest thinkers under monumental classical arches.'
        }
      ]
    },
    {
      id: 'architecture',
      num: '17',
      name: 'Architecture',
      titleMain: 'ARCHITECTURE',
      titleSub: '— MONUMENTS',
      tag: 'ARCHITECTURE',
      subtitle: 'Monumental towers, cathedral geometries, and urban perspectives.',
      image: './assets/categories/cat17_architecture.jpg',
      audio: './audio/architecture.mp3',
      paintings: [
        {
          title: 'The Tower of Babel',
          artist: 'Pieter Bruegel the Elder',
          year: '1563',
          era: 'Northern Renaissance',
          medium: 'Oil on panel',
          museum: 'Kunsthistorisches Museum, Vienna',
          image: './assets/categories/cat17_architecture.jpg',
          description: 'A colossal multi-tiered spiral citadel rising into the clouds with astonishing architectural masonry detail.'
        }
      ]
    },
    {
      id: 'fantasy',
      num: '18',
      name: 'Fantasy & Imagination',
      titleMain: 'FANTASY & IMAGINATION',
      titleSub: '— VISIONARY',
      tag: 'FANTASY & IMAGINATION',
      subtitle: 'Surreal dreamscapes, fantastical creatures, and visionary wonder.',
      image: './assets/categories/cat18_fantasy.jpg',
      audio: './audio/fantasy.mp3',
      paintings: [
        {
          title: 'The Garden of Earthly Delights',
          artist: 'Hieronymus Bosch',
          year: '1490–1510',
          era: 'Early Netherlandish',
          medium: 'Oil on oak triptych',
          museum: 'Museo del Prado, Madrid',
          image: './assets/categories/cat18_fantasy.jpg',
          description: 'An astounding surrealist visionary triptych teeming with bizarre hybrid creatures, towers, and symbolic wonder.'
        }
      ]
    },
    {
      id: 'abstract',
      num: '19',
      name: 'Abstract Art',
      titleMain: 'ABSTRACT ART',
      titleSub: '— ABSTRACTION',
      tag: 'ABSTRACT ART',
      subtitle: 'Pure color vibrations, dynamic geometric forms, and musical rhythm.',
      image: './assets/categories/cat19_abstract.jpg',
      audio: './audio/abstract.mp3',
      paintings: [
        {
          title: 'Composition VII',
          artist: 'Wassily Kandinsky',
          year: '1913',
          era: 'Abstract Expressionism / Bauhaus',
          medium: 'Oil on canvas',
          museum: 'State Tretyakov Gallery, Moscow',
          image: './assets/categories/cat19_abstract.jpg',
          description: 'A masterpiece of non-objective art orchestrating swirling colors, energetic lines, and spiritual resonance.'
        }
      ]
    },
    {
      id: 'stilllife',
      num: '20',
      name: 'Still Life',
      titleMain: 'STILL LIFE',
      titleSub: '— STILLNESS',
      tag: 'STILL LIFE',
      subtitle: 'Ripened fruits, delicate glass vessels, and contemplative stillness.',
      image: './assets/categories/cat20_stilllife.jpg',
      audio: './audio/still life.mp3',
      paintings: [
        {
          title: 'Basket of Fruit (Canestra di frutta)',
          artist: 'Caravaggio (Michelangelo Merisi)',
          year: 'c. 1599',
          era: 'Baroque',
          medium: 'Oil on canvas',
          museum: 'Pinacoteca Ambrosiana, Milan, Italy',
          image: './assets/categories/cat20_stilllife.jpg',
          description: 'A revolutionary still life elevated to high art, depicting wicker basket brimming with realistic fruit.'
        }
      ]
    }
  ];

  // --- Global Application State ---
  const state = {
    currentView: 'home', // 'landing' | 'home' | 'library'
    landingSlideIndex: 0,
    totalLandingSlides: 5,
    homeCardIndex: 0,
    activeLibraryCategory: 'all',
    searchQuery: '',
    isLandingAnimating: false,
    isHomeAnimating: false,
    isDragging: false,
    dragStartX: 0,
    dragStartY: 0,
    dragDistance: 0,
    lastScrollTime: 0,
    // Vintage Diary State
    diaryIndex: 0,
    isDiaryFlipping: false,
    isDiaryClosed: false,
    // Audio state
    currentAudioCategoryId: null,
    isMuted: false
  };

  // ==========================================================================
  // BACKGROUND AUDIO ENGINE
  // Default: kids_stranger_things.mp3 (Landing, 3D Carousel, All Categories)
  // Per-Category: Category-specific audio tracks for each of the 20 categories
  // ==========================================================================
  const audioEngine = {
    _audio: null,
    _currentSrc: null,
    _currentCategory: null,
    _volume: 0.3,
    _muteBtn: null,
    _started: false,
    _defaultTrack: './audio/kids_stranger_things.mp3',

    init() {
      this._audio = new Audio();
      this._audio.loop = true;
      this._audio.volume = this._volume;
      this._audio.preload = 'auto';

      // Restore mute preference
      const savedMute = localStorage.getItem('avarta_hero_audio_muted');
      if (savedMute === 'true') {
        state.isMuted = true;
        this._audio.muted = true;
      }

      this._audio.addEventListener('error', (e) => {
        console.warn('[AVĀRTĀ Audio] Audio playback error:', e);
      });

      this._createMuteButton();

      // Start on first user interaction (browser autoplay policy)
      const self = this;
      function onFirstInteraction() {
        if (self._started) return;
        self._started = true;
        if (state.currentView === 'library' && state.activeLibraryCategory && state.activeLibraryCategory !== 'all') {
          self.playForCategory(state.activeLibraryCategory);
        } else {
          self.playDefault();
        }
        document.removeEventListener('click', onFirstInteraction);
        document.removeEventListener('touchstart', onFirstInteraction);
        document.removeEventListener('keydown', onFirstInteraction);
      }
      document.addEventListener('click', onFirstInteraction);
      document.addEventListener('touchstart', onFirstInteraction);
      document.addEventListener('keydown', onFirstInteraction);
    },

    _playSource(src, categoryId = null) {
      if (!this._audio) return;
      if (this._currentSrc === src && !this._audio.paused) return;

      this._currentSrc = src;
      this._currentCategory = categoryId;
      state.currentAudioCategoryId = categoryId;

      this._audio.src = src;
      this._audio.loop = true;
      this._audio.volume = this._volume;
      this._audio.muted = state.isMuted;

      const p = this._audio.play();
      if (p !== undefined) {
        p.catch((err) => {
          console.warn('[AVĀRTĀ Audio] Autoplay blocked:', err.message);
        });
      }
      if (this._muteBtn) {
        this._muteBtn.style.opacity = '1';
        this._muteBtn.style.pointerEvents = 'auto';
      }
    },

    playDefault() {
      this._playSource(this._defaultTrack, null);
    },

    playForCategory(categoryId) {
      if (!categoryId || categoryId === 'all') {
        this.playDefault();
        return;
      }
      const cat = CATEGORIES.find(c => c.id === categoryId);
      if (cat && cat.audio) {
        this._playSource(cat.audio, categoryId);
      } else {
        this.playDefault();
      }
    },

    stop() {
      if (this._audio) {
        this._audio.pause();
      }
    },

    toggleMute() {
      state.isMuted = !state.isMuted;
      if (this._audio) this._audio.muted = state.isMuted;
      localStorage.setItem('avarta_hero_audio_muted', String(state.isMuted));
      this._updateIcon();
    },

    _createMuteButton() {
      const btn = document.createElement('button');
      btn.id = 'avartaAudioToggle';
      btn.setAttribute('aria-label', 'Toggle background music');
      btn.title = 'Toggle background music';
      Object.assign(btn.style, {
        position: 'fixed', bottom: '20px', right: '20px', zIndex: '9999',
        width: '40px', height: '40px', borderRadius: '50%',
        border: '1px solid rgba(255,255,255,0.15)',
        background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)', color: 'rgba(255,255,255,0.75)',
        cursor: 'pointer', display: 'flex', alignItems: 'center',
        justifyContent: 'center', padding: '0', transition: 'all 0.3s ease',
        boxShadow: '0 2px 12px rgba(0,0,0,0.3)', opacity: '0', pointerEvents: 'none'
      });
      btn.addEventListener('mouseenter', () => {
        btn.style.background = 'rgba(0,0,0,0.75)';
        btn.style.borderColor = 'rgba(255,255,255,0.3)';
        btn.style.transform = 'scale(1.08)';
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.background = 'rgba(0,0,0,0.55)';
        btn.style.borderColor = 'rgba(255,255,255,0.15)';
        btn.style.transform = 'scale(1)';
      });
      btn.addEventListener('click', (e) => { e.stopPropagation(); this.toggleMute(); });
      document.body.appendChild(btn);
      this._muteBtn = btn;
      this._updateIcon();
    },

    _updateIcon() {
      if (!this._muteBtn) return;
      if (state.isMuted) {
        this._muteBtn.innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>';
        this._muteBtn.setAttribute('aria-label', 'Unmute background music');
      } else {
        this._muteBtn.innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>';
        this._muteBtn.setAttribute('aria-label', 'Mute background music');
      }
    }
  };

  // --- DOM Elements ---
  const DOM = {
    body: document.body,
    landingView: document.getElementById('landingScreenView'),
    homeView: document.getElementById('homeScreenView'),
    libraryView: document.getElementById('libraryScreenView'),
    
    // Header
    viewIndicatorPill: document.getElementById('viewIndicatorPill'),
    headerHomeBtn: document.getElementById('headerHomeBtn'),
    headerLibraryBtn: document.getElementById('headerLibraryBtn'),
    
    // Landing Slides
    landingSlides: document.querySelectorAll('.landing-screen-view .slide'),
    scrollToHomeIndicator: document.getElementById('scrollToHomeIndicator'),
    
    // 3D Home Screen
    carouselScene: document.getElementById('carouselScene'),
    cardsTrack: document.getElementById('cardsTrack'),
    prevBtn: document.getElementById('prevBtn'),
    nextBtn: document.getElementById('nextBtn'),
    pagContainer: document.getElementById('carouselPagination'),
    currentCatNum: document.getElementById('currentCatNum'),
    currentCatName: document.getElementById('currentCatName'),
    returnToLandingBtn: document.getElementById('returnToLandingBtn'),
    openAllLibraryBtn: document.getElementById('openAllLibraryBtn'),
    ambientCurrent: document.getElementById('ambientBgCurrent'),
    ambientNext: document.getElementById('ambientBgNext'),
    
    // Vintage Diary Archive
    libraryBackToHomeBtn: document.getElementById('libraryBackToHomeBtn'),
    libraryActiveCategoryHeading: document.getElementById('libraryActiveCategoryHeading'),
    libraryActiveCategorySubheading: document.getElementById('libraryActiveCategorySubheading'),
    vintageDiaryStage: document.getElementById('vintageDiaryStage'),
    vintageDiaryBook: document.getElementById('vintageDiaryBook'),
    vintageDiaryClosedBook: document.getElementById('vintageDiaryClosedBook'),
    diaryStampNum: document.getElementById('diaryStampNum'),
    diaryStampCat: document.getElementById('diaryStampCat'),
    diaryMainPolaroid: document.getElementById('diaryMainPolaroid'),
    diaryPolaroidImg: document.getElementById('diaryPolaroidImg'),
    diaryPolaroidTitle: document.getElementById('diaryPolaroidTitle'),
    diaryPolaroidArtist: document.getElementById('diaryPolaroidArtist'),
    diaryLeftPageNum: document.getElementById('diaryLeftPageNum'),
    diaryRightPageNum: document.getElementById('diaryRightPageNum'),
    diaryPrevArrowBtn: document.getElementById('diaryPrevArrowBtn'),
    diaryNextArrowBtn: document.getElementById('diaryNextArrowBtn'),
    diaryNoteTag: document.getElementById('diaryNoteTag'),
    diaryNoteTitle: document.getElementById('diaryNoteTitle'),
    diaryNoteSubtitle: document.getElementById('diaryNoteSubtitle'),
    diaryStoryText: document.getElementById('diaryStoryText'),
    diaryProvEra: document.getElementById('diaryProvEra'),
    diaryProvMedium: document.getElementById('diaryProvMedium'),
    diaryProvMuseum: document.getElementById('diaryProvMuseum'),
    diaryAnnotationText: document.getElementById('diaryAnnotationText'),
    diaryIndicatorCounter: document.getElementById('diaryIndicatorCounter'),
    diaryIndicatorTag: document.getElementById('diaryIndicatorTag'),
    diaryPageFlipLeaf: document.getElementById('diaryPageFlipLeaf'),
    flipFaceFront: document.getElementById('flipFaceFront'),
    flipFaceBack: document.getElementById('flipFaceBack'),
    
    // Inspect Lightbox Modal
    artworkInspectModal: document.getElementById('artworkInspectModal'),
    artworkModalBackdrop: document.getElementById('artworkModalBackdrop'),
    closeArtworkModalBtn: document.getElementById('closeArtworkModalBtn'),
    lightboxImage: document.getElementById('lightboxImage'),
    lightboxCategory: document.getElementById('lightboxCategory'),
    lightboxTitle: document.getElementById('lightboxTitle'),
    lightboxArtist: document.getElementById('lightboxArtist'),
    lightboxDescription: document.getElementById('lightboxDescription'),
    lightboxEra: document.getElementById('lightboxEra'),
    lightboxMedium: document.getElementById('lightboxMedium'),
    lightboxMuseum: document.getElementById('lightboxMuseum')
  };

  // --- Initialize App ---
  function init() {
    setupLandingSlides();
    build3DHomeCards();
    renderDiaryCategory(state.diaryIndex);
    setupInitialHomeBackdrop();
    updateHomeCarousel();
    bindGlobalEvents();

    // Initialize Background Audio Engine
    audioEngine.init();

    // Smooth Entrance Reveal
    setTimeout(() => {
      DOM.body.classList.remove('is-loading');
      DOM.body.classList.add('is-loaded');
      if (state.currentView === 'landing' && DOM.landingSlides && DOM.landingSlides[0]) {
        animateLandingSlideIn(DOM.landingSlides[0], 1, true);
      }
    }, 150);
  }

  // ==========================================================================
  // VIEW SWITCHING (LANDING <-> 3D HOME <-> PAINTING LIBRARY)
  // ==========================================================================
  function switchView(targetView, categoryId = null) {
    if (state.currentView === targetView && categoryId === null) return;

    state.currentView = targetView;
    DOM.body.classList.remove('view-landing', 'view-home', 'view-library');
    DOM.landingView.classList.remove('is-active-view');
    DOM.homeView.classList.remove('is-active-view');
    DOM.libraryView.classList.remove('is-active-view');

    if (targetView === 'landing') {
      DOM.body.classList.add('view-landing');
      DOM.landingView.classList.add('is-active-view');
      if (DOM.viewIndicatorPill) DOM.viewIndicatorPill.textContent = 'LANDING GALLERY';
      goToLandingSlide(0, 1, true);
      audioEngine.playDefault();
    } else if (targetView === 'home') {
      DOM.body.classList.add('view-home');
      DOM.homeView.classList.add('is-active-view');
      if (DOM.viewIndicatorPill) DOM.viewIndicatorPill.textContent = '3D CATEGORIES';
      updateHomeCarousel();
      audioEngine.playDefault();
    } else if (targetView === 'library') {
      DOM.body.classList.add('view-library');
      DOM.libraryView.classList.add('is-active-view');
      if (DOM.viewIndicatorPill) DOM.viewIndicatorPill.textContent = 'CURATOR’S DIARY';

      if (categoryId && categoryId !== 'all') {
        const foundIdx = CATEGORIES.findIndex(c => c.id === categoryId);
        if (foundIdx !== -1) state.diaryIndex = foundIdx;
      }
      renderDiaryCategory(state.diaryIndex);
      audioEngine.playForCategory(CATEGORIES[state.diaryIndex].id);
    }
  }

  // ==========================================================================
  // VIEW 1: LANDING PAGE SLIDESHOW
  // ==========================================================================
  function setupLandingSlides() {
    DOM.landingSlides.forEach((slide, index) => {
      if (index === 0) {
        slide.classList.add('is-active');
        slide.style.opacity = '1';
        slide.style.visibility = 'visible';
      } else {
        slide.classList.remove('is-active');
        slide.style.opacity = '0';
        slide.style.visibility = 'hidden';
      }
    });
  }

  function goToLandingSlide(targetIndex, direction = null, forceImmediate = false) {
    if (state.isLandingAnimating && !forceImmediate) return;

    // After scrolling all 5 images on landing page -> GO TO 3D HOME SCREEN!
    if (targetIndex >= state.totalLandingSlides) {
      switchView('home');
      return;
    }

    if (targetIndex < 0) {
      targetIndex = 0;
      return;
    }

    const fromIndex = state.landingSlideIndex;
    const toIndex = targetIndex;

    if (forceImmediate || fromIndex === toIndex) {
      DOM.landingSlides.forEach((slide, idx) => {
        if (idx === toIndex) {
          slide.classList.add('is-active');
          slide.style.opacity = '1';
          slide.style.visibility = 'visible';
          const title = slide.querySelector('.slide-main-title');
          const bg = slide.querySelector('.slide-bg');
          const badge = slide.querySelector('.slide-script-badge');
          if (title) { title.style.transform = 'none'; title.style.opacity = '1'; title.style.filter = 'none'; }
          if (bg) { bg.style.transform = 'scale(1)'; bg.style.filter = 'none'; }
          if (badge) { badge.style.transform = 'none'; badge.style.opacity = '1'; }
        } else {
          slide.classList.remove('is-active');
          slide.style.opacity = '0';
          slide.style.visibility = 'hidden';
        }
      });
      state.landingSlideIndex = toIndex;
      return;
    }

    state.isLandingAnimating = true;
    const dir = direction !== null ? direction : (toIndex > fromIndex ? 1 : -1);

    const currentSlide = DOM.landingSlides[fromIndex];
    const nextSlide = DOM.landingSlides[toIndex];

    animateLandingSlideOut(currentSlide, dir);
    animateLandingSlideIn(nextSlide, dir);

    state.landingSlideIndex = toIndex;

    setTimeout(() => {
      currentSlide.classList.remove('is-active');
      currentSlide.style.visibility = 'hidden';
      currentSlide.style.opacity = '0';

      const outTitle = currentSlide.querySelector('.slide-main-title');
      const outBg = currentSlide.querySelector('.slide-bg');
      const outBadge = currentSlide.querySelector('.slide-script-badge');

      if (outTitle) { outTitle.style.transform = ''; outTitle.style.opacity = ''; outTitle.style.filter = ''; }
      if (outBg) { outBg.style.transform = ''; outBg.style.filter = ''; }
      if (outBadge) { outBadge.style.transform = ''; outBadge.style.opacity = ''; }

      state.isLandingAnimating = false;
    }, 1100);
  }

  function animateLandingSlideOut(slide, direction) {
    const title = slide.querySelector('.slide-main-title');
    const bg = slide.querySelector('.slide-bg');
    const badge = slide.querySelector('.slide-script-badge');

    slide.style.zIndex = '5';
    slide.style.transition = 'opacity 0.9s cubic-bezier(0.25, 1, 0.5, 1)';
    slide.style.opacity = '0.4';

    if (title) {
      title.style.transition = 'transform 1.05s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.8s ease, filter 0.8s ease';
      const scaleVal = direction > 0 ? 2.6 : 0.6;
      const yVal = direction > 0 ? -120 : 100;
      const xVal = direction > 0 ? -80 : 40;
      title.style.transform = `translate3d(${xVal}px, ${yVal}px, 0) scale(${scaleVal})`;
      title.style.opacity = '0';
      title.style.filter = 'blur(10px)';
    }

    if (bg) {
      bg.style.transition = 'transform 1.1s cubic-bezier(0.19, 1, 0.22, 1), filter 1s ease';
      const bgY = direction > 0 ? -8 : 8;
      bg.style.transform = `scale(1.2) translateY(${bgY}%)`;
      bg.style.filter = 'brightness(0.5) blur(4px)';
    }

    if (badge) {
      badge.style.transition = 'transform 0.75s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.6s ease';
      badge.style.transform = `translate3d(50px, ${direction > 0 ? -30 : 30}px, 0)`;
      badge.style.opacity = '0';
    }
  }

  function animateLandingSlideIn(slide, direction, isInitial = false) {
    slide.classList.add('is-active');
    slide.style.zIndex = '10';
    slide.style.visibility = 'visible';
    slide.style.opacity = '1';

    const title = slide.querySelector('.slide-main-title');
    const bg = slide.querySelector('.slide-bg');
    const badge = slide.querySelector('.slide-script-badge');

    if (isInitial) {
      if (title) { title.style.transform = 'translate3d(0, 0, 0) scale(1)'; title.style.opacity = '1'; title.style.filter = 'none'; }
      if (bg) { bg.style.transform = 'scale(1) translateY(0)'; bg.style.filter = 'brightness(1)'; }
      if (badge) { badge.style.transform = 'translate3d(0, 0, 0)'; badge.style.opacity = '1'; }
      return;
    }

    if (title) {
      const startScale = direction > 0 ? 0.75 : 1.8;
      const startY = direction > 0 ? 90 : -90;
      title.style.transition = 'none';
      title.style.transform = `translate3d(0, ${startY}px, 0) scale(${startScale})`;
      title.style.opacity = '0';
      title.style.filter = 'blur(12px)';
    }

    if (bg) {
      const startBgY = direction > 0 ? 10 : -10;
      bg.style.transition = 'none';
      bg.style.transform = `scale(1.22) translateY(${startBgY}%)`;
      bg.style.filter = 'brightness(0.4) blur(6px)';
    }

    if (badge) {
      badge.style.transition = 'none';
      badge.style.transform = 'translate3d(30px, 20px, 0)';
      badge.style.opacity = '0';
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (title) {
          title.style.transition = 'transform 1.1s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.9s ease 0.1s, filter 0.9s ease 0.1s';
          title.style.transform = 'translate3d(0, 0, 0) scale(1)';
          title.style.opacity = '1';
          title.style.filter = 'blur(0px)';
        }

        if (bg) {
          bg.style.transition = 'transform 1.3s cubic-bezier(0.19, 1, 0.22, 1), filter 1.1s ease';
          bg.style.transform = 'scale(1.03) translateY(0)';
          bg.style.filter = 'brightness(1) blur(0px)';
        }

        if (badge) {
          badge.style.transition = 'transform 0.9s cubic-bezier(0.19, 1, 0.22, 1) 0.18s, opacity 0.8s ease 0.18s';
          badge.style.transform = 'translate3d(0, 0, 0)';
          badge.style.opacity = '1';
        }
      });
    });
  }

  // ==========================================================================
  // VIEW 2: 3D COVERFLOW HOME SCREEN (20 CATEGORIES)
  // ==========================================================================
  function build3DHomeCards() {
    DOM.cardsTrack.innerHTML = '';
    DOM.pagContainer.innerHTML = '';

    CATEGORIES.forEach((cat, index) => {
      // 1. Create 3D Card
      const card = document.createElement('article');
      card.className = 'carousel-card';
      card.setAttribute('data-index', index);
      card.setAttribute('data-category-id', cat.id);
      card.id = `card-${index}`;

      card.innerHTML = `
        <div class="card-arch-wrap">
          <div class="card-arch-glow" aria-hidden="true"></div>
          <div class="card-arch-border" aria-hidden="true"></div>
          <div class="card-arch-frame">
            <div class="card-image-bg" style="background-image: url('${cat.image}');"></div>
            <div class="card-arch-inner-shadow" aria-hidden="true"></div>
          </div>
        </div>
        <div class="card-content">
          <h2 class="card-title">
            <span class="card-title-main">${cat.titleMain}</span>
          </h2>
          <p class="card-subtitle">${cat.subtitle}</p>
          <span class="card-enter-hint">ENTER THE GALLERY &rarr;</span>
        </div>
      `;


      // Click card to open Sanctuary
      card.addEventListener('click', () => {
        if (state.homeCardIndex === index) {
          // Open Library for this category!
          switchView('library', cat.id);
        } else {
          goToHomeCard(index);
        }
      });

      DOM.cardsTrack.appendChild(card);

      // 2. Create Pagination Dot with Luxury Hover/Active Tooltip
      const dot = document.createElement('button');
      dot.className = `pag-dot ${index === 0 ? 'active' : ''}`;
      dot.setAttribute('data-index', index);
      dot.setAttribute('aria-label', `Category ${cat.name}`);
      dot.addEventListener('click', () => goToHomeCard(index));

      const tooltip = document.createElement('span');
      tooltip.className = 'dot-tooltip';
      tooltip.textContent = cat.tag || cat.name.toUpperCase();
      dot.appendChild(tooltip);

      DOM.pagContainer.appendChild(dot);
    });
  }

  function setupInitialHomeBackdrop() {
    if (DOM.ambientCurrent && CATEGORIES.length > 0) {
      DOM.ambientCurrent.style.backgroundImage = `url('${CATEGORIES[0].image}')`;
      DOM.ambientCurrent.style.opacity = '1';
    }
  }

  function updateAmbientBackdrop(index) {
    if (!DOM.ambientCurrent || !DOM.ambientNext || !CATEGORIES[index]) return;

    const newImage = `url('${CATEGORIES[index].image}')`;
    DOM.ambientNext.style.backgroundImage = newImage;
    DOM.ambientNext.style.opacity = '1';
    DOM.ambientNext.style.transform = 'scale(1.12)';

    setTimeout(() => {
      DOM.ambientCurrent.style.backgroundImage = newImage;
      DOM.ambientNext.style.opacity = '0';
      DOM.ambientNext.style.transform = 'scale(1.08)';
    }, 550);
  }

  function updateHomeCarousel() {
    const total = CATEGORIES.length;
    const current = state.homeCardIndex;
    const cards = DOM.cardsTrack.querySelectorAll('.carousel-card');
    const dots = DOM.pagContainer.querySelectorAll('.pag-dot');

    cards.forEach((card, index) => {
      let offset = index - current;
      if (offset > total / 2) offset -= total;
      else if (offset < -total / 2) offset += total;

      let transform = '';
      let opacity = 0;
      let zIndex = 1;
      let filter = 'brightness(0.18)';

      if (offset === 0) {
        transform = 'translate3d(0, 0, 0) rotateY(0deg) scale(1)';
        opacity = 1;
        zIndex = 10;
        filter = 'brightness(1.08) contrast(1.05)';
        card.classList.add('is-active');
      } else if (offset === -1) {
        transform = 'translate3d(calc(-92% - 15px), 0, -120px) rotateY(16deg) scale(0.88)';
        opacity = 0.65;
        zIndex = 8;
        filter = 'brightness(0.38) contrast(0.92)';
        card.classList.remove('is-active');
      } else if (offset === 1) {
        transform = 'translate3d(calc(92% + 15px), 0, -120px) rotateY(-16deg) scale(0.88)';
        opacity = 0.65;
        zIndex = 8;
        filter = 'brightness(0.38) contrast(0.92)';
        card.classList.remove('is-active');
      } else if (offset <= -2) {
        transform = 'translate3d(calc(-178% - 30px), 0, -240px) rotateY(28deg) scale(0.76)';
        opacity = 0.40;
        zIndex = 6;
        filter = 'brightness(0.20) contrast(0.88)';
        card.classList.remove('is-active');
      } else if (offset >= 2) {
        transform = 'translate3d(calc(178% + 30px), 0, -240px) rotateY(-28deg) scale(0.76)';
        opacity = 0.40;
        zIndex = 6;
        filter = 'brightness(0.20) contrast(0.88)';
        card.classList.remove('is-active');
      }

      card.style.transform = transform;
      card.style.opacity = opacity;
      card.style.zIndex = zIndex;
      card.style.filter = filter;
    });

    // Update Pagination Dots & Progress Fill
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === current);
    });

    const pagFill = document.getElementById('carouselProgressFill');
    if (pagFill && total > 1) {
      const pct = (current / (total - 1)) * 100;
      pagFill.style.width = `${pct}%`;
    }

    // Update Top Counter Badge
    if (DOM.currentCatNum) DOM.currentCatNum.textContent = String(current + 1).padStart(2, '0');
    if (DOM.currentCatName && CATEGORIES[current]) DOM.currentCatName.textContent = CATEGORIES[current].name.toUpperCase();

    // Update Ambient Blurred Backdrop
    updateAmbientBackdrop(current);
  }

  function goToHomeCard(targetIndex) {
    if (state.isHomeAnimating) return;
    let newIndex = targetIndex % CATEGORIES.length;
    if (newIndex < 0) newIndex += CATEGORIES.length;
    if (newIndex === state.homeCardIndex) return;

    state.isHomeAnimating = true;
    state.homeCardIndex = newIndex;
    updateHomeCarousel();

    setTimeout(() => {
      state.isHomeAnimating = false;
    }, 700);
  }

  // ==========================================================================
  // VIEW 3: VINTAGE DIARY ENGINE (20 CATEGORIES WITH INTERACTIVE PAGE FLIP)
  // ==========================================================================
  function renderDiaryCategory(index) {
    if (index < 0 || index >= CATEGORIES.length) return;
    const cat = CATEGORIES[index];
    const p = (cat.paintings && cat.paintings[0]) || {
      title: cat.name,
      artist: 'Master Artist',
      year: '',
      era: 'Classical',
      medium: 'Oil on canvas',
      museum: 'AVĀRTĀ National Collection',
      image: cat.image,
      description: cat.subtitle
    };

    const leftNum = (index * 2 + 1).toString().padStart(2, '0');
    const rightNum = (index * 2 + 2).toString().padStart(2, '0');
    const counterText = `${(index + 1).toString().padStart(2, '0')} / ${CATEGORIES.length.toString().padStart(2, '0')}`;

    // Update Left Page
    if (DOM.diaryStampNum) DOM.diaryStampNum.textContent = `№ ${cat.num}`;
    if (DOM.diaryStampCat) DOM.diaryStampCat.textContent = cat.name.toUpperCase();
    if (DOM.diaryPolaroidImg) {
      DOM.diaryPolaroidImg.src = p.image;
      DOM.diaryPolaroidImg.alt = p.title;
    }
    if (DOM.diaryPolaroidTitle) DOM.diaryPolaroidTitle.textContent = p.title.toUpperCase();
    if (DOM.diaryPolaroidArtist) DOM.diaryPolaroidArtist.textContent = `${p.artist} • ${p.year || 'Archive'}`;
    if (DOM.diaryLeftPageNum) DOM.diaryLeftPageNum.textContent = `P. ${leftNum}`;

    // Update Right Page
    const subClean = (cat.titleSub || cat.tag || '').replace(/^[—–-]\s*/, '').toUpperCase();
    if (DOM.diaryNoteTag) DOM.diaryNoteTag.textContent = `ARCHIVE ENTRY • VOL. ${cat.num}`;
    if (DOM.diaryNoteTitle) DOM.diaryNoteTitle.textContent = cat.titleMain;
    if (DOM.diaryNoteSubtitle) DOM.diaryNoteSubtitle.textContent = subClean;
    if (DOM.diaryStoryText) DOM.diaryStoryText.textContent = p.description || cat.subtitle;
    if (DOM.diaryProvEra) DOM.diaryProvEra.textContent = (p.era || 'Classical Masterpiece').toUpperCase();
    if (DOM.diaryProvMedium) DOM.diaryProvMedium.textContent = (p.medium || 'Oil on canvas').toUpperCase();
    if (DOM.diaryProvMuseum) DOM.diaryProvMuseum.textContent = (p.museum || 'AVĀRTĀ Curatorial Archive').toUpperCase();
    if (DOM.diaryAnnotationText) {
      const observations = [
        "Observation: Masterful compositional chiaroscuro capturing transformative epochal shifts.",
        "Observation: Luminous mythological grace and ethereal presence preserved in tempera.",
        "Observation: Regal ceremonial drapery and imperial majesty rendered with commanding fidelity.",
        "Observation: Dynamic turbulent diagonals expressing raw martial intensity and heroic sacrifice.",
        "Observation: Sacred monumental fresco harmony bridging earthly devotion and celestial light.",
        "Observation: Vivid folk vibrancy documenting living traditions and festive celebratory spirit.",
        "Observation: Swirling impasto brushwork translating cosmic rhythm and emotional transcendence.",
        "Observation: Atmospheric marine luminosity and tumultuous wave dynamics recorded en plein air.",
        "Observation: Romantic sublime contemplation before the infinite expanse of nature.",
        "Observation: Nuanced chiaroscuro and intimate psychological depth in gaze execution.",
        "Observation: Anatomical precision and majestic untamed power captured with vitality.",
        "Observation: Exquisite delicacy in petals, verdant flora, and seasonal bloom harmonies.",
        "Observation: Piercing existential vulnerability rendered with haunting expressive intensity.",
        "Observation: Gilded ornamental embrace fusing tactile tenderness and sacred eternity.",
        "Observation: Serene domestic radiance and quiet contemplation in ordinary moments.",
        "Observation: Classical intellectual harmony framed by monumental Roman vaulted arches.",
        "Observation: Astounding masonry perspective and towering structural citadel complexity.",
        "Observation: Visionary surrealist triptych teeming with bizarre symbolic marvels.",
        "Observation: Pure non-objective color vibrations echoing musical counterpoint.",
        "Observation: Dramatic tenebrism elevating humble natural bounty to transcendent art."
      ];
      DOM.diaryAnnotationText.textContent = observations[index] || "Observation recorded in gallery catalogue under natural raking light.";
    }
    if (DOM.diaryRightPageNum) DOM.diaryRightPageNum.textContent = `P. ${rightNum}`;

    // Update Header Counter
    if (DOM.diaryIndicatorCounter) DOM.diaryIndicatorCounter.textContent = counterText;
    if (DOM.diaryIndicatorTag) DOM.diaryIndicatorTag.textContent = cat.name.toUpperCase();
    if (DOM.vintageDiaryBook) DOM.vintageDiaryBook.setAttribute('data-category', cat.id);
  }

  function closeDiaryBook() {
    if (state.isDiaryFlipping || !DOM.vintageDiaryStage) return;
    state.isDiaryFlipping = true;
    state.isDiaryClosed = true;

    DOM.vintageDiaryStage.classList.add('is-closing-diary');

    setTimeout(() => {
      DOM.vintageDiaryStage.classList.remove('is-closing-diary');
      DOM.vintageDiaryStage.classList.add('is-closed');
      state.isDiaryFlipping = false;
      if (DOM.diaryIndicatorCounter) DOM.diaryIndicatorCounter.textContent = 'CLOSED • 20/20';
      if (DOM.diaryIndicatorTag) DOM.diaryIndicatorTag.textContent = 'JOURNAL COMPLETE';
      audioEngine.playDefault();
    }, 450);
  }

  function openDiaryBook(targetIndex = 0) {
    if (state.isDiaryFlipping || !DOM.vintageDiaryStage) return;
    state.isDiaryFlipping = true;
    state.isDiaryClosed = false;

    state.diaryIndex = targetIndex;
    renderDiaryCategory(state.diaryIndex);

    DOM.vintageDiaryStage.classList.remove('is-closed');
    DOM.vintageDiaryStage.classList.add('is-opening-diary');

    setTimeout(() => {
      DOM.vintageDiaryStage.classList.remove('is-opening-diary');
      state.isDiaryFlipping = false;
      audioEngine.playForCategory(CATEGORIES[state.diaryIndex].id);
    }, 450);
  }

  function flipDiary(direction) {
    if (state.isDiaryFlipping) return;

    if (state.isDiaryClosed) {
      // Swiping or clicking while closed re-opens the diary
      if (direction > 0) openDiaryBook(0);
      else openDiaryBook(CATEGORIES.length - 1);
      return;
    }

    if (!DOM.vintageDiaryBook) return;

    const total = CATEGORIES.length;

    if (direction > 0) {
      // If at the 20th category, close the book!
      if (state.diaryIndex >= total - 1) {
        closeDiaryBook();
        return;
      }

      state.isDiaryFlipping = true;
      const nextIdx = state.diaryIndex + 1;
      DOM.vintageDiaryBook.classList.add('is-flipping-next');

      setTimeout(() => {
        state.diaryIndex = nextIdx;
        renderDiaryCategory(state.diaryIndex);
        audioEngine.playForCategory(CATEGORIES[state.diaryIndex].id);
      }, 260);

      setTimeout(() => {
        DOM.vintageDiaryBook.classList.remove('is-flipping-next');
        state.isDiaryFlipping = false;
      }, 540);
    } else {
      // Backward turning
      if (state.diaryIndex <= 0) {
        // Already at category 1
        return;
      }

      state.isDiaryFlipping = true;
      const prevIdx = state.diaryIndex - 1;
      DOM.vintageDiaryBook.classList.add('is-flipping-prev');

      setTimeout(() => {
        state.diaryIndex = prevIdx;
        renderDiaryCategory(state.diaryIndex);
        audioEngine.playForCategory(CATEGORIES[state.diaryIndex].id);
      }, 260);

      setTimeout(() => {
        DOM.vintageDiaryBook.classList.remove('is-flipping-prev');
        state.isDiaryFlipping = false;
      }, 540);
    }
  }

  // ==========================================================================
  // MASTERPIECE INSPECT LIGHTBOX MODAL
  // ==========================================================================
  function openArtworkInspectModal(painting) {
    if (!DOM.artworkInspectModal) return;

    DOM.lightboxImage.src = painting.image;
    DOM.lightboxImage.alt = painting.title;
    DOM.lightboxCategory.textContent = `⚜ ${(painting.categoryTag || painting.categoryName || 'MASTERPIECE').toUpperCase()} ⚜`;
    DOM.lightboxTitle.textContent = painting.title;
    DOM.lightboxArtist.textContent = `${painting.artist} • ${painting.year}`;
    DOM.lightboxDescription.textContent = painting.description;
    DOM.lightboxEra.textContent = painting.era;
    DOM.lightboxMedium.textContent = painting.medium;
    DOM.lightboxMuseum.textContent = painting.museum;

    DOM.artworkInspectModal.classList.add('is-open');
  }

  function closeArtworkInspectModal() {
    if (DOM.artworkInspectModal) {
      DOM.artworkInspectModal.classList.remove('is-open');
    }
  }

  // ==========================================================================
  // EVENT BINDINGS
  // ==========================================================================
  function bindGlobalEvents() {
    // 1. Header Navigation View Switches
    if (DOM.headerHomeBtn) DOM.headerHomeBtn.addEventListener('click', () => switchView('home'));
    if (DOM.headerLibraryBtn) DOM.headerLibraryBtn.addEventListener('click', () => switchView('library', 'all'));
    if (DOM.libraryBackToHomeBtn) DOM.libraryBackToHomeBtn.addEventListener('click', () => switchView('home'));
    if (DOM.returnToLandingBtn) {
      DOM.returnToLandingBtn.addEventListener('click', (e) => {
        window.location.href = 'index.html';
      });
    }
    if (DOM.openAllLibraryBtn) DOM.openAllLibraryBtn.addEventListener('click', () => switchView('library', 'all'));
    if (DOM.scrollToHomeIndicator) DOM.scrollToHomeIndicator.addEventListener('click', () => switchView('home'));

    // 1. Vintage Diary Interactive Polaroids & Inspection
    if (DOM.diaryMainPolaroid) {
      DOM.diaryMainPolaroid.addEventListener('click', (e) => {
        e.stopPropagation();
        const cat = CATEGORIES[state.diaryIndex];
        if (cat && cat.paintings && cat.paintings[0]) {
          openArtworkInspectModal(cat.paintings[0]);
        }
      });
    }

    // Direct Page Turn Click Zones (clicking anywhere on right page turns forward, left turns back)
    if (DOM.vintageDiaryBook) {
      DOM.vintageDiaryBook.addEventListener('click', (e) => {
        if (DOM.artworkInspectModal && DOM.artworkInspectModal.classList.contains('is-open')) return;
        if (state.isDiaryFlipping) return;
        if (e.target.closest('#diaryMainPolaroid') || e.target.closest('.modal-content')) return;

        const rect = DOM.vintageDiaryBook.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        if (clickX > rect.width * 0.55) {
          flipDiary(1); // Clicked right page -> turn next
        } else if (clickX < rect.width * 0.45) {
          flipDiary(-1); // Clicked left page -> turn prev
        }
      });
    }

    // Closed Diary Book click listener to reopen
    if (DOM.vintageDiaryClosedBook) {
      DOM.vintageDiaryClosedBook.addEventListener('click', (e) => {
        e.stopPropagation();
        openDiaryBook(0);
      });
    }

    // 2. Mouse Wheel Scroll Handling across all views
    window.addEventListener('wheel', (e) => {
      if (DOM.artworkInspectModal && DOM.artworkInspectModal.classList.contains('is-open')) return;

      const now = Date.now();
      if (now - state.lastScrollTime < 550) return;

      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(delta) < 18) return;

      state.lastScrollTime = now;

      if (state.currentView === 'landing') {
        if (delta > 0) goToLandingSlide(state.landingSlideIndex + 1, 1);
        else goToLandingSlide(state.landingSlideIndex - 1, -1);
      } else if (state.currentView === 'home') {
        if (delta > 0) goToHomeCard(state.homeCardIndex + 1);
        else goToHomeCard(state.homeCardIndex - 1);
      } else if (state.currentView === 'library') {
        // In Vintage Diary mode, scrolling turns pages like a book
        if (delta > 0) flipDiary(1);
        else flipDiary(-1);
      }
    }, { passive: true });

    // 3. Mouse Drag Gesture (Home 3D Carousel & Vintage Diary Page Swiping)
    window.addEventListener('mousedown', (e) => {
      if (DOM.artworkInspectModal && DOM.artworkInspectModal.classList.contains('is-open')) return;

      state.isDragging = true;
      state.dragStartX = e.clientX;
      state.dragStartY = e.clientY;
      state.dragDistance = 0;
      if (state.currentView === 'home' && DOM.carouselScene) {
        DOM.carouselScene.classList.add('is-dragging');
      }
    });

    window.addEventListener('mousemove', (e) => {
      if (!state.isDragging) return;
      state.dragDistance = e.clientX - state.dragStartX;
    });

    window.addEventListener('mouseup', (e) => {
      if (!state.isDragging) return;
      state.isDragging = false;
      if (DOM.carouselScene) DOM.carouselScene.classList.remove('is-dragging');

      const deltaY = e.clientY - state.dragStartY;
      const deltaX = e.clientX - state.dragStartX;
      const primaryDelta = Math.abs(deltaY) > Math.abs(deltaX) ? deltaY : deltaX;

      if (state.currentView === 'landing') {
        if (Math.abs(primaryDelta) > 50) {
          if (primaryDelta < 0) goToLandingSlide(state.landingSlideIndex + 1, 1);
          else goToLandingSlide(state.landingSlideIndex - 1, -1);
        }
      } else if (state.currentView === 'home') {
        if (Math.abs(state.dragDistance) > 40) {
          if (state.dragDistance < 0) goToHomeCard(state.homeCardIndex + 1);
          else goToHomeCard(state.homeCardIndex - 1);
        }
      } else if (state.currentView === 'library') {
        // Drag swipe on Vintage Diary
        if (Math.abs(deltaX) > 35) {
          if (deltaX < 0) {
            flipDiary(1); // Swiped Left -> Turn Page Forward
          } else {
            flipDiary(-1); // Swiped Right -> Turn Page Back
          }
        }
      }
    });

    // 4. Touch Swipe (Mobile & Touch Devices - Swipe Left to Turn Diary Page)
    window.addEventListener('touchstart', (e) => {
      if (DOM.artworkInspectModal && DOM.artworkInspectModal.classList.contains('is-open')) return;

      const touch = e.touches[0];
      state.dragStartY = touch.clientY;
      state.dragStartX = touch.clientX;
      state.dragDistance = 0;
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      state.dragDistance = e.touches[0].clientX - state.dragStartX;
    }, { passive: true });

    window.addEventListener('touchend', (e) => {
      if (DOM.artworkInspectModal && DOM.artworkInspectModal.classList.contains('is-open')) return;

      const touch = e.changedTouches[0];
      const deltaY = touch.clientY - state.dragStartY;
      const deltaX = touch.clientX - state.dragStartX;
      const primaryDelta = Math.abs(deltaY) > Math.abs(deltaX) ? deltaY : deltaX;

      if (state.currentView === 'landing') {
        if (Math.abs(primaryDelta) > 40) {
          if (primaryDelta < 0) goToLandingSlide(state.landingSlideIndex + 1, 1);
          else goToLandingSlide(state.landingSlideIndex - 1, -1);
        }
      } else if (state.currentView === 'home') {
        if (Math.abs(state.dragDistance) > 35) {
          if (state.dragDistance < 0) goToHomeCard(state.homeCardIndex + 1);
          else goToHomeCard(state.homeCardIndex - 1);
        }
      } else if (state.currentView === 'library') {
        // Touch swipe on Vintage Diary: Swipe Left turns page forward!
        if (Math.abs(deltaX) > 30) {
          if (deltaX < 0) {
            flipDiary(1); // Swipe Left -> Turn Page Forward
          } else {
            flipDiary(-1); // Swipe Right -> Turn Page Back
          }
        }
      }
    }, { passive: true });

    // 5. Keyboard Navigation across all views
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeArtworkInspectModal();
        return;
      }
      if (DOM.artworkInspectModal && DOM.artworkInspectModal.classList.contains('is-open')) return;
      if (document.activeElement === DOM.librarySearchInput) return;

      if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        if (state.currentView === 'landing') goToLandingSlide(state.landingSlideIndex + 1, 1);
        else if (state.currentView === 'home') goToHomeCard(state.homeCardIndex + 1);
        else if (state.currentView === 'library') flipDiary(1);
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        if (state.currentView === 'landing') goToLandingSlide(state.landingSlideIndex - 1, -1);
        else if (state.currentView === 'home') goToHomeCard(state.homeCardIndex - 1);
        else if (state.currentView === 'library') flipDiary(-1);
      }
    });

    // 6. Home 3D Chevrons
    if (DOM.prevBtn) DOM.prevBtn.addEventListener('click', () => goToHomeCard(state.homeCardIndex - 1));
    if (DOM.nextBtn) DOM.nextBtn.addEventListener('click', () => goToHomeCard(state.homeCardIndex + 1));

    // 7. Library Search Input
    if (DOM.librarySearchInput) {
      DOM.librarySearchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value;
        renderLibraryGrid();
      });
    }

    // 8. Lightbox Modal Close
    if (DOM.closeArtworkModalBtn) DOM.closeArtworkModalBtn.addEventListener('click', closeArtworkInspectModal);
    if (DOM.artworkModalBackdrop) DOM.artworkModalBackdrop.addEventListener('click', closeArtworkInspectModal);
  }

  // Bootstrap on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
