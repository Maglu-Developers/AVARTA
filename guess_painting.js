/**
 * AVĀRTĀ — GUESS THE ORIGINAL PAINTING GAME CONTROLLER
 * 20-Round Masterpiece vs AI-Generated Challenge with randomized A/B positioning.
 */

(function (global) {
  'use strict';

  // 20 Curated Original vs AI-Generated Painting Pairs
  const PAINTING_PAIRS = [
    {
      id: 1,
      title: 'Mona Lisa',
      artist: 'Leonardo da Vinci',
      year: '1503',
      originalImg: './assets/guess_paintings/original/1o.webp',
      aiImg: './assets/guess_paintings/ai/1ai.png'
    },
    {
      id: 2,
      title: 'The Starry Night',
      artist: 'Vincent van Gogh',
      year: '1889',
      originalImg: './assets/guess_paintings/original/2o.jpg',
      aiImg: './assets/guess_paintings/ai/2ai.png'
    },
    {
      id: 3,
      title: 'Girl with a Pearl Earring',
      artist: 'Johannes Vermeer',
      year: '1665',
      originalImg: './assets/guess_paintings/original/3o.jpg',
      aiImg: './assets/guess_paintings/ai/3ai.png'
    },
    {
      id: 4,
      title: 'The Kiss',
      artist: 'Gustav Klimt',
      year: '1908',
      originalImg: './assets/guess_paintings/original/4o.jpg',
      aiImg: './assets/guess_paintings/ai/4ai.png'
    },
    {
      id: 5,
      title: 'The Birth of Venus',
      artist: 'Sandro Botticelli',
      year: '1485',
      originalImg: './assets/guess_paintings/original/5o.jpg',
      aiImg: './assets/guess_paintings/ai/5ai.png'
    },
    {
      id: 6,
      title: 'The Great Wave off Kanagawa',
      artist: 'Katsushika Hokusai',
      year: '1831',
      originalImg: './assets/guess_paintings/original/6o.jpg',
      aiImg: './assets/guess_paintings/ai/6ai.png'
    },
    {
      id: 7,
      title: 'The Scream',
      artist: 'Edvard Munch',
      year: '1893',
      originalImg: './assets/guess_paintings/original/7o.jpg',
      aiImg: './assets/guess_paintings/ai/7ai.png'
    },
    {
      id: 8,
      title: 'Wanderer above the Sea of Fog',
      artist: 'Caspar David Friedrich',
      year: '1818',
      originalImg: './assets/guess_paintings/original/8o.jpg',
      aiImg: './assets/guess_paintings/ai/8ai.png'
    },
    {
      id: 9,
      title: 'Water Lilies',
      artist: 'Claude Monet',
      year: '1916',
      originalImg: './assets/guess_paintings/original/9o.jpg',
      aiImg: './assets/guess_paintings/ai/9ai.png'
    },
    {
      id: 10,
      title: 'The Night Watch',
      artist: 'Rembrandt van Rijn',
      year: '1642',
      originalImg: './assets/guess_paintings/original/10o.jpg',
      aiImg: './assets/guess_paintings/ai/10ai.png'
    },
    {
      id: 11,
      title: 'A Sunday on La Grande Jatte',
      artist: 'Georges Seurat',
      year: '1884',
      originalImg: './assets/guess_paintings/original/11o.jpg',
      aiImg: './assets/guess_paintings/ai/11ai.png'
    },
    {
      id: 12,
      title: 'The School of Athens',
      artist: 'Raphael',
      year: '1511',
      originalImg: './assets/guess_paintings/original/12o.jpg',
      aiImg: './assets/guess_paintings/ai/12ai.png'
    },
    {
      id: 13,
      title: 'Liberty Leading the People',
      artist: 'Eugène Delacroix',
      year: '1830',
      originalImg: './assets/guess_paintings/original/13o.jpg',
      aiImg: './assets/guess_paintings/ai/13ai.png'
    },
    {
      id: 14,
      title: 'Las Meninas',
      artist: 'Diego Velázquez',
      year: '1656',
      originalImg: './assets/guess_paintings/original/14o.jpg',
      aiImg: './assets/guess_paintings/ai/14ai.png'
    },
    {
      id: 15,
      title: 'Lady with an Ermine',
      artist: 'Leonardo da Vinci',
      year: '1489',
      originalImg: './assets/guess_paintings/original/15o.jpg',
      aiImg: './assets/guess_paintings/ai/15ai.png'
    },
    {
      id: 16,
      title: 'The Milkmaid',
      artist: 'Johannes Vermeer',
      year: '1658',
      originalImg: './assets/guess_paintings/original/16o.webp',
      aiImg: './assets/guess_paintings/ai/16ai.png'
    },
    {
      id: 17,
      title: 'The Blue Boy',
      artist: 'Thomas Gainsborough',
      year: '1770',
      originalImg: './assets/guess_paintings/original/17o.jpg',
      aiImg: './assets/guess_paintings/ai/17ai.png'
    },
    {
      id: 18,
      title: 'Primavera',
      artist: 'Sandro Botticelli',
      year: '1482',
      originalImg: './assets/guess_paintings/original/18o.webp',
      aiImg: './assets/guess_paintings/ai/18ai.png'
    },
    {
      id: 19,
      title: 'Portrait of Baldassare Castiglione',
      artist: 'Raphael',
      year: '1515',
      originalImg: './assets/guess_paintings/original/19o.jpg',
      aiImg: './assets/guess_paintings/ai/19ai.png'
    },
    {
      id: 20,
      title: 'Portrait of Louis XIV',
      artist: 'Hyacinthe Rigaud',
      year: '1701',
      originalImg: './assets/guess_paintings/original/20o.jpg',
      aiImg: './assets/guess_paintings/ai/20ai.png'
    }
  ];

  class GuessPaintingController {
    constructor() {
      this.pairs = [...PAINTING_PAIRS];
      this.totalRounds = 20;
      this.currentRound = 0;
      this.score = 0;
      this.selectedOption = null;
      this.answered = false;
      this.currentSides = { A: null, B: null, originalSide: 'A' };

      this._initElements();
      this._bindEvents();
      this.renderRound();
    }

    _initElements() {
      this.view = document.getElementById('guess-view');
      this.stageCard = document.getElementById('guessStageCard');
      this.resultsCard = document.getElementById('guessResultsCard');

      // Progress elements
      this.progressText = document.getElementById('guessProgressText');
      this.progressFill = document.getElementById('guessProgressFill');

      // Artwork Cards
      this.cardA = document.getElementById('guessCardA');
      this.cardB = document.getElementById('guessCardB');
      this.imgA = document.getElementById('guessImgA');
      this.imgB = document.getElementById('guessImgB');
      this.badgeA = document.getElementById('guessBadgeA');
      this.badgeB = document.getElementById('guessBadgeB');

      // Artwork Title/Meta Info
      this.artworkInfo = document.getElementById('guessArtworkInfo');

      // Feedback & Controls
      this.feedbackStatus = document.getElementById('guessFeedbackStatus');
      this.feedbackDetail = document.getElementById('guessFeedbackDetail');
      this.nextBtn = document.getElementById('guessNextBtn');

      // Results Screen
      this.scoreNumber = document.getElementById('guessScoreNumber');
      this.scorePercent = document.getElementById('guessScorePercent');
      this.correctCountEl = document.getElementById('guessCorrectCount');
      this.incorrectCountEl = document.getElementById('guessIncorrectCount');
      this.performanceQuote = document.getElementById('guessPerformanceQuote');
      this.playAgainBtn = document.getElementById('guessPlayAgainBtn');
    }

    _bindEvents() {
      if (this.cardA) {
        this.cardA.addEventListener('click', () => this.handleSelection('A'));
      }
      if (this.cardB) {
        this.cardB.addEventListener('click', () => this.handleSelection('B'));
      }
      if (this.nextBtn) {
        this.nextBtn.addEventListener('click', () => this.handleNextRound());
      }
      if (this.playAgainBtn) {
        this.playAgainBtn.addEventListener('click', () => this.restartGame());
      }
    }

    renderRound() {
      const pair = this.pairs[this.currentRound];
      if (!pair) return;

      this.answered = false;
      this.selectedOption = null;

      // Randomly assign whether Original is A or B (50/50 probability)
      const isOriginalA = Math.random() < 0.5;
      this.currentSides = {
        A: isOriginalA ? { type: 'original', src: pair.originalImg } : { type: 'ai', src: pair.aiImg },
        B: isOriginalA ? { type: 'ai', src: pair.aiImg } : { type: 'original', src: pair.originalImg },
        originalSide: isOriginalA ? 'A' : 'B'
      };

      // Update Progress
      if (this.progressText) {
        this.progressText.textContent = `PAINTING ${this.currentRound + 1} / ${this.totalRounds}`;
      }
      if (this.progressFill) {
        const percent = ((this.currentRound + 1) / this.totalRounds) * 100;
        this.progressFill.style.width = `${percent}%`;
      }

      // Update Artwork Info
      if (this.artworkInfo) {
        this.artworkInfo.textContent = `${pair.title} • ${pair.artist} (${pair.year})`;
      }

      // Reset Card States
      [this.cardA, this.cardB].forEach((card) => {
        if (card) {
          card.classList.remove(
            'revealed',
            'is-selected-correct',
            'is-selected-incorrect',
            'is-the-original',
            'is-disabled'
          );
        }
      });

      // Set Image Sources
      if (this.imgA) {
        this.imgA.src = this.currentSides.A.src;
        this.imgA.alt = `Option A: ${pair.title}`;
      }
      if (this.imgB) {
        this.imgB.src = this.currentSides.B.src;
        this.imgB.alt = `Option B: ${pair.title}`;
      }

      // Reset Badges Text
      if (this.badgeA) {
        this.badgeA.textContent = this.currentSides.A.type === 'original' ? 'ORIGINAL MASTERPIECE' : 'AI SYNTHESIS';
        this.badgeA.className = `guess-identity-badge ${this.currentSides.A.type === 'original' ? 'badge-original' : 'badge-ai'}`;
      }
      if (this.badgeB) {
        this.badgeB.textContent = this.currentSides.B.type === 'original' ? 'ORIGINAL MASTERPIECE' : 'AI SYNTHESIS';
        this.badgeB.className = `guess-identity-badge ${this.currentSides.B.type === 'original' ? 'badge-original' : 'badge-ai'}`;
      }

      // Reset Feedback
      if (this.feedbackStatus) {
        this.feedbackStatus.textContent = 'Select Option A or Option B';
        this.feedbackStatus.className = 'guess-feedback-status';
      }
      if (this.feedbackDetail) {
        this.feedbackDetail.textContent = 'Look closely at the brushwork, light, and composition.';
      }

      // Reset Next Button
      if (this.nextBtn) {
        this.nextBtn.disabled = true;
        this.nextBtn.innerHTML = this.currentRound === this.totalRounds - 1
          ? '<span>VIEW RESULTS</span><span class="guess-btn-arrow">→</span>'
          : '<span>NEXT</span><span class="guess-btn-arrow">→</span>';
      }

      // Smooth Fade-in
      if (this.stageCard) {
        this.stageCard.classList.remove('is-transitioning');
      }
    }

    handleSelection(choice) {
      if (this.answered) return;
      this.answered = true;
      this.selectedOption = choice;

      const isCorrect = choice === this.currentSides.originalSide;
      if (isCorrect) {
        this.score++;
      }

      // Lock Cards
      if (this.cardA) this.cardA.classList.add('revealed', 'is-disabled');
      if (this.cardB) this.cardB.classList.add('revealed', 'is-disabled');

      // Highlight Original
      const originalCard = this.currentSides.originalSide === 'A' ? this.cardA : this.cardB;
      const chosenCard = choice === 'A' ? this.cardA : this.cardB;

      if (originalCard) {
        originalCard.classList.add('is-the-original');
      }

      if (isCorrect) {
        chosenCard.classList.add('is-selected-correct');
        if (this.feedbackStatus) {
          this.feedbackStatus.textContent = 'CORRECT!';
          this.feedbackStatus.className = 'guess-feedback-status correct';
        }
        if (this.feedbackDetail) {
          this.feedbackDetail.textContent = `Option ${choice} is the authentic original masterpiece.`;
        }
      } else {
        chosenCard.classList.add('is-selected-incorrect');
        if (this.feedbackStatus) {
          this.feedbackStatus.textContent = 'INCORRECT';
          this.feedbackStatus.className = 'guess-feedback-status incorrect';
        }
        if (this.feedbackDetail) {
          this.feedbackDetail.textContent = `The authentic original was Option ${this.currentSides.originalSide}.`;
        }
      }

      // Enable Next Button
      if (this.nextBtn) {
        this.nextBtn.disabled = false;
      }
    }

    handleNextRound() {
      if (!this.answered) return;

      if (this.stageCard) {
        this.stageCard.classList.add('is-transitioning');
      }

      setTimeout(() => {
        if (this.currentRound < this.totalRounds - 1) {
          this.currentRound++;
          this.renderRound();
        } else {
          this.showResults();
        }
      }, 250);
    }

    showResults() {
      if (this.stageCard) this.stageCard.style.display = 'none';
      if (this.resultsCard) this.resultsCard.classList.add('is-active');

      const total = this.totalRounds;
      const correct = this.score;
      const incorrect = total - correct;
      const percentage = Math.round((correct / total) * 100);

      if (this.scoreNumber) this.scoreNumber.textContent = `${correct} / ${total}`;
      if (this.scorePercent) this.scorePercent.textContent = `${percentage}% Accuracy`;
      if (this.correctCountEl) this.correctCountEl.textContent = correct;
      if (this.incorrectCountEl) this.incorrectCountEl.textContent = incorrect;

      let quote = '';
      if (correct >= 18) {
        quote = '“Masterful perception. You possess an extraordinary eye for authentic art.”';
      } else if (correct >= 14) {
        quote = '“Impressive discernment. You distinguish genuine brushwork with high precision.”';
      } else if (correct >= 10) {
        quote = '“Keen vision. AI synthesis is becoming subtle, but your instincts are strong.”';
      } else {
        quote = '“Art and machine synthesis are blurring together. Train your eye further.”';
      }

      if (this.performanceQuote) {
        this.performanceQuote.textContent = quote;
      }

      if (this.resultsCard) {
        this.resultsCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }

    restartGame() {
      this.currentRound = 0;
      this.score = 0;
      this.answered = false;
      this.selectedOption = null;

      if (this.resultsCard) {
        this.resultsCard.classList.remove('is-active');
      }
      if (this.stageCard) {
        this.stageCard.style.display = 'flex';
      }

      this.renderRound();

      if (this.view) {
        this.view.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }

  // Initialize once DOM is ready
  function init() {
    window.avartaGuessPainting = new GuessPaintingController();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})(window);
