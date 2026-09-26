/**
 * AVĀRTĀ — BEYOND AVĀRTĀ (WORLD MUSEUMS & GALLERIES DIRECTORY)
 * Curated directory of the world's most prestigious art institutions.
 */

(function (global) {
  'use strict';

  const MUSEUMS_DATABASE = [
    {
      id: 'louvre',
      name: 'Louvre Museum',
      city: 'Paris',
      country: 'France',
      region: 'Europe',
      officialUrl: 'https://www.louvre.fr/en',
      desc: 'The world\'s most visited art museum, home to the Mona Lisa, Venus de Milo, and Winged Victory of Samothrace.',
      bgImage: 'louvre_museum.jpg'
    },
    {
      id: 'met',
      name: 'The Metropolitan Museum of Art',
      city: 'New York',
      country: 'United States',
      region: 'Americas',
      officialUrl: 'https://www.metmuseum.org',
      desc: 'Over 5,000 years of art from every corner of the world, situated along Fifth Avenue at the edge of Central Park.',
      bgImage: 'metropolitan_museum.jpg'
    },
    {
      id: 'moma',
      name: 'Museum of Modern Art (MoMA)',
      city: 'New York',
      country: 'United States',
      region: 'Americas',
      officialUrl: 'https://www.moma.org',
      desc: 'Pioneering institution celebrating modern and contemporary art, architecture, photography, and design.',
      bgImage: 'moma_museum.jpg'
    },
    {
      id: 'tate',
      name: 'Tate',
      city: 'London',
      country: 'United Kingdom',
      region: 'Europe',
      officialUrl: 'https://www.tate.org.uk',
      desc: 'A family of four world-renowned galleries including Tate Modern on Bankside and Tate Britain on Millbank.',
      bgImage: 'tate_museum.jpg'
    },
    {
      id: 'rijksmuseum',
      name: 'Rijksmuseum',
      city: 'Amsterdam',
      country: 'Netherlands',
      region: 'Europe',
      officialUrl: 'https://www.rijksmuseum.nl/en',
      desc: 'The national museum of the Netherlands dedicated to Dutch masterworks by Rembrandt, Vermeer, and Frans Hals.',
      bgImage: 'rijksmuseum.jpg'
    },
    {
      id: 'uffizi',
      name: 'Uffizi Galleries',
      city: 'Florence',
      country: 'Italy',
      region: 'Europe',
      officialUrl: 'https://www.uffizi.it/en',
      desc: 'The cradle of the Italian Renaissance featuring Botticelli’s Birth of Venus, Michelangelo, Raphael, and Da Vinci.',
      bgImage: 'uffizi_galleries.jpg'
    },
    {
      id: 'prado',
      name: 'Museo del Prado',
      city: 'Madrid',
      country: 'Spain',
      region: 'Europe',
      officialUrl: 'https://www.museodelprado.es/en',
      desc: 'Spain\'s premier national art museum housing the definitive masterpieces of Velázquez, Goya, and El Greco.',
      bgImage: 'prado_museum.jpg'
    },
    {
      id: 'national_gallery',
      name: 'National Gallery',
      city: 'London',
      country: 'United Kingdom',
      region: 'Europe',
      officialUrl: 'https://www.nationalgallery.org.uk',
      desc: 'Over 2,300 paintings spanning Western European art from the mid-13th century to 1900 in Trafalgar Square.',
      bgImage: 'national_gallery.jpg'
    },
    {
      id: 'artic',
      name: 'Art Institute of Chicago',
      city: 'Chicago',
      country: 'United States',
      region: 'Americas',
      officialUrl: 'https://www.artic.edu',
      desc: 'Renowned for one of the world\'s largest permanent collections of Impressionist and Post-Impressionist art.',
      bgImage: 'artic_museum.jpg'
    },
    {
      id: 'guggenheim',
      name: 'Guggenheim Museum',
      city: 'New York',
      country: 'United States',
      region: 'Americas',
      officialUrl: 'https://www.guggenheim.org',
      desc: 'Frank Lloyd Wright\'s architectural marvel housing world-class modern masterpieces along its spiral ramp.',
      bgImage: 'guggenheim_museum.jpg'
    },
    {
      id: 'orsay',
      name: 'Musée d\'Orsay',
      city: 'Paris',
      country: 'France',
      region: 'Europe',
      officialUrl: 'https://www.musee-orsay.fr/en',
      desc: 'Housed in a grand Beaux-Arts railway station, showcasing Impressionist and Post-Impressionist French masterpieces.',
      bgImage: 'orsay_museum.jpg'
    },
    {
      id: 'vatican',
      name: 'Vatican Museums',
      city: 'Vatican City',
      country: 'Vatican City',
      region: 'Europe',
      officialUrl: 'https://www.museivaticani.va',
      desc: 'Monumental papal collections including the Sistine Chapel frescoes and Raphael Rooms.',
      bgImage: 'vatican_museums.jpg'
    }
  ];

  class BeyondAvartaController {
    constructor() {
      this.museums = MUSEUMS_DATABASE;
      this.currentFilter = 'all';

      this._initElements();
      this._bindEvents();
      this.renderMuseums();
    }

    _initElements() {
      this.gridContainer = document.getElementById('beyondAvartaGrid');
      this.filterBtns = document.querySelectorAll('.museum-filter-btn');
    }

    _bindEvents() {
      if (this.filterBtns) {
        this.filterBtns.forEach((btn) => {
          btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter') || 'all';
            this.setFilter(filter);
          });
        });
      }
    }

    setFilter(filter) {
      this.currentFilter = filter;
      if (this.filterBtns) {
        this.filterBtns.forEach((btn) => {
          if (btn.getAttribute('data-filter') === filter) {
            btn.classList.add('active');
          } else {
            btn.classList.remove('active');
          }
        });
      }
      this.renderMuseums();
    }

    renderMuseums() {
      if (!this.gridContainer) return;

      const filtered = this.currentFilter === 'all'
        ? this.museums
        : this.museums.filter((m) => m.region.toLowerCase() === this.currentFilter.toLowerCase());

      this.gridContainer.innerHTML = filtered.map((museum) => `
        <article class="museum-card${museum.bgImage ? ' museum-card--has-bg' : ''}" data-id="${museum.id}" data-region="${museum.region.toLowerCase()}"${museum.bgImage ? ` style="--card-bg-image: url('${museum.bgImage}')"` : ''}>


          <div class="museum-card-main">
            <h2 class="museum-name">${museum.name}</h2>
            <div class="museum-location">
              <svg class="museum-location-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <span>${museum.city}, ${museum.country}</span>
            </div>
            <p class="museum-short-desc">${museum.desc}</p>
          </div>

          <div class="museum-card-footer">
            <a href="${museum.officialUrl}" 
               target="_blank" 
               rel="noopener noreferrer" 
               class="museum-website-btn" 
               aria-label="Visit official website of ${museum.name}">
              <span>VISIT WEBSITE</span>
              <span class="btn-arrow" aria-hidden="true">→</span>
            </a>
          </div>
        </article>
      `).join('');
    }
  }

  // Initialize once DOM is ready
  function init() {
    window.avartaBeyondDirectory = new BeyondAvartaController();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})(window);
