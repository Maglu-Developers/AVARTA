/**
 * AVĀRTĀ ® — 3D Dark-Luxury Palace & Museum Gallery Corridor Engine (Three.js)
 * Moody dark-luxury palace museum architecture combining elements of the Louvre's
 * gilded galleries, cathedral fluted marble columns, gilded coffered ceilings,
 * and dark polished veined marble flooring under intimate candlelight.
 *
 * NOTE: Scroll mechanics, card-stack logic, and camera Z milestones are strictly preserved.
 */

(function () {
  'use strict';

  // Royal palace art catalogue: 10 on Left Wall, 10 on Right Wall
  const PAINTINGS = [
    // ---------------- Left Wall (x = -7.4) ----------------
    {
      id: 'mona_lisa',
      title: 'Mona Lisa',
      artist: 'Leonardo da Vinci, c. 1503',
      wall: 'left',
      z: 18,
      w: 3.4,
      h: 4.8,
      src: 'assets/paintings/mona_lisa.jpg'
    },
    {
      id: 'blue_boy',
      title: 'The Blue Boy',
      artist: 'Thomas Gainsborough, 1770',
      wall: 'left',
      z: 5,
      w: 3.4,
      h: 5.2,
      src: 'assets/paintings/blue_boy.jpg'
    },
    {
      id: 'girl_pearl',
      title: 'Girl with a Pearl Earring',
      artist: 'Johannes Vermeer, 1665',
      wall: 'left',
      z: -8,
      w: 3.4,
      h: 4.6,
      src: 'assets/paintings/girl_pearl_earring.jpg'
    },
    {
      id: 'winterhalter',
      title: 'Empress Elisabeth of Austria',
      artist: 'Franz Xaver Winterhalter, 1865',
      wall: 'left',
      z: -21,
      w: 3.6,
      h: 5.2,
      src: 'assets/paintings/winterhalter.jpg'
    },
    {
      id: 'venus',
      title: 'The Birth of Venus',
      artist: 'Sandro Botticelli, c. 1485',
      wall: 'left',
      z: -34,
      w: 5.4,
      h: 3.8,
      src: 'assets/paintings/birth_of_venus.jpg'
    },
    {
      id: 'charles_i',
      title: 'Charles I at the Hunt',
      artist: 'Anthony van Dyck, 1635',
      wall: 'left',
      z: -47,
      w: 3.8,
      h: 5.0,
      src: 'assets/paintings/charles_i.jpg'
    },
    {
      id: 'the_scream',
      title: 'The Scream',
      artist: 'Edvard Munch, 1893',
      wall: 'left',
      z: -60,
      w: 3.4,
      h: 4.8,
      src: 'assets/paintings/the_scream.jpg'
    },
    {
      id: 'marie_antoinette',
      title: 'Marie Antoinette with a Rose',
      artist: 'Élisabeth Vigée Le Brun, 1783',
      wall: 'left',
      z: -73,
      w: 3.6,
      h: 5.0,
      src: 'assets/paintings/marie_antoinette.jpg'
    },
    {
      id: 'the_kiss',
      title: 'The Kiss',
      artist: 'Gustav Klimt, 1908',
      wall: 'left',
      z: -86,
      w: 3.8,
      h: 4.8,
      src: 'assets/paintings/the_kiss.jpg'
    },
    {
      id: 'lady_ermine',
      title: 'Lady with an Ermine',
      artist: 'Leonardo da Vinci, c. 1489',
      wall: 'left',
      z: -100,
      w: 3.4,
      h: 4.8,
      src: 'assets/paintings/lady_ermine.jpg'
    },
    {
      id: 'primavera',
      title: 'Primavera',
      artist: 'Sandro Botticelli, c. 1482',
      wall: 'left',
      z: -112,
      w: 5.2,
      h: 3.8,
      src: 'assets/paintings/primavera.jpg'
    },
    {
      id: 'delacroix',
      title: 'Liberty Leading the People',
      artist: 'Eugène Delacroix, 1830',
      wall: 'left',
      z: -124,
      w: 4.8,
      h: 4.0,
      src: 'assets/paintings/delacroix.jpg'
    },

    // ---------------- Right Wall (x = +7.4) ----------------
    {
      id: 'starry_night',
      title: 'The Starry Night',
      artist: 'Vincent van Gogh, 1889',
      wall: 'right',
      z: 18,
      w: 5.2,
      h: 4.2,
      src: 'assets/paintings/starry_night.jpg'
    },
    {
      id: 'castiglione',
      title: 'Baldassare Castiglione',
      artist: 'Raphael, 1514',
      wall: 'right',
      z: 5,
      w: 3.6,
      h: 4.8,
      src: 'assets/paintings/castiglione.jpg'
    },
    {
      id: 'milkmaid',
      title: 'The Milkmaid',
      artist: 'Johannes Vermeer, c. 1658',
      wall: 'right',
      z: -8,
      w: 3.4,
      h: 4.6,
      src: 'assets/paintings/milkmaid.jpg'
    },
    {
      id: 'las_meninas',
      title: 'Las Meninas',
      artist: 'Diego Velázquez, 1656',
      wall: 'right',
      z: -21,
      w: 4.4,
      h: 5.0,
      src: 'assets/paintings/las_meninas.jpg'
    },
    {
      id: 'wanderer',
      title: 'Wanderer above the Sea of Fog',
      artist: 'Caspar David Friedrich, 1818',
      wall: 'right',
      z: -34,
      w: 3.4,
      h: 4.8,
      src: 'assets/paintings/wanderer.jpg'
    },
    {
      id: 'louis_xiv',
      title: 'Portrait of Louis XIV',
      artist: 'Hyacinthe Rigaud, 1701',
      wall: 'right',
      z: -47,
      w: 3.8,
      h: 5.4,
      src: 'assets/paintings/louis_xiv.jpg'
    },
    {
      id: 'great_wave',
      title: 'The Great Wave off Kanagawa',
      artist: 'Katsushika Hokusai, c. 1831',
      wall: 'right',
      z: -60,
      w: 5.2,
      h: 3.8,
      src: 'assets/paintings/great_wave.jpg'
    },
    {
      id: 'water_lilies',
      title: 'Water Lilies',
      artist: 'Claude Monet, 1906',
      wall: 'right',
      z: -73,
      w: 5.2,
      h: 4.0,
      src: 'assets/paintings/water_lilies.jpg'
    },
    {
      id: 'night_watch',
      title: 'The Night Watch',
      artist: 'Rembrandt van Rijn, 1642',
      wall: 'right',
      z: -86,
      w: 5.2,
      h: 4.4,
      src: 'assets/paintings/night_watch.jpg'
    },
    {
      id: 'grande_jatte',
      title: 'A Sunday on La Grande Jatte',
      artist: 'Georges Seurat, 1884',
      wall: 'right',
      z: -100,
      w: 5.4,
      h: 3.8,
      src: 'assets/paintings/grande_jatte.jpg'
    },
    {
      id: 'school_of_athens',
      title: 'The School of Athens',
      artist: 'Raphael, 1509–1511',
      wall: 'right',
      z: -112,
      w: 5.4,
      h: 4.0,
      src: 'assets/paintings/school_of_athens.jpg'
    },
    {
      id: 'monet_garden',
      title: "The Artist's Garden at Giverny",
      artist: 'Claude Monet, 1900',
      wall: 'right',
      z: -124,
      w: 4.8,
      h: 4.0,
      src: 'assets/paintings/water_lilies.jpg'
    }
  ];

  // Rhythmic architectural column positions defining gallery bays
  const COLUMN_Z_POSITIONS = [24, -2, -28, -54, -80, -106, -132];

  // Sconce mounting positions along corridor (including near Card 10 enter gallery portal)
  const SCONCE_Z_POSITIONS = [11.5, -15, -41, -67, -93, -119, -138];

  // Calibrated camera Z milestones for Cards 0 through 10 (Strictly Preserved)
  const CARD_Z_POSITIONS = [
    26,    // Card 0: Entrance, framing first portraits
    13,    // Card 1: What is AVĀRTĀ
    0,     // Card 2: The Idea
    -13,   // Card 3: Our Purpose
    -26,   // Card 4: The Experience
    -40,   // Card 5: Difference
    -54,   // Card 6: Principle
    -68,   // Card 7: The Name
    -84,   // Card 8: Vision
    -102,  // Card 9: Audience
    -124   // Card 10: Closing / Standing in front of the Luminous Portal
  ];

  let container = null;
  let canvas = null;
  let renderer = null;
  let scene = null;
  let camera = null;

  let isInitialized = false;
  let isRunning = false;
  let rafId = null;

  let currentCardIndex = 0;
  let currentZ = CARD_Z_POSITIONS[0];
  let targetZ = CARD_Z_POSITIONS[0];
  let startZ = CARD_Z_POSITIONS[0];

  let isTransitioning = false;
  let transitionStartTime = 0;
  const TRANSITION_DURATION = 850;

  let mouseX = 0;
  let mouseY = 0;
  let targetMouseX = 0;
  let targetMouseY = 0;

  let walkBobY = 0;
  let walkSwayX = 0;

  let dustParticles = null;
  let portalMesh = null;
  let portalHalo = null;
  let portalLight = null;
  let sconceFlames = [];
  let cursorSpotLight = null;

  // Cinematic Gallery Room Entrance Transition State
  let isWarping = false;
  let warpStartTime = 0;
  const WARP_DURATION = 1350;
  let warpStartZ = -124;
  const WARP_TARGET_Z = -146.5;
  const INITIAL_FOV = 56;
  let warpOnComplete = null;

  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function easeOutCubicBezier(t) {
    const t2 = 1 - t;
    return 1 - Math.pow(t2, 3.2);
  }

  /**
   * Procedural Dark Polished Marble Floor Texture
   * Deep black Belgian marble slabs with fine brass inlay seams and delicate calcite veining
   */
  function createDarkMarbleFloorTexture() {
    const size = 1024;
    const c = document.createElement('canvas');
    c.width = size;
    c.height = size;
    const ctx = c.getContext('2d');

    // Deep Belgian marble black base
    ctx.fillStyle = '#080a11';
    ctx.fillRect(0, 0, size, size);

    // Subtle cloud-like mineral depth
    const cloudGrad = ctx.createRadialGradient(512, 512, 50, 512, 512, 600);
    cloudGrad.addColorStop(0, 'rgba(18, 22, 35, 0.45)');
    cloudGrad.addColorStop(0.6, 'rgba(10, 13, 20, 0.25)');
    cloudGrad.addColorStop(1, 'rgba(5, 7, 12, 0.6)');
    ctx.fillStyle = cloudGrad;
    ctx.fillRect(0, 0, size, size);

    // Marble tile slabs (4x4 grid of 256x256 slabs)
    const tileSize = 256;
    ctx.lineWidth = 2.5;

    // Joint shadow & brass inlay lines
    for (let x = 0; x <= size; x += tileSize) {
      // Dark grout shadow
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.85)';
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, size);
      ctx.stroke();

      // Fine brass inlay seam
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.3)';
      ctx.lineWidth = 1.0;
      ctx.beginPath();
      ctx.moveTo(x + 1, 0);
      ctx.lineTo(x + 1, size);
      ctx.stroke();
    }

    for (let y = 0; y <= size; y += tileSize) {
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.85)';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(size, y);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(212, 175, 55, 0.3)';
      ctx.lineWidth = 1.0;
      ctx.beginPath();
      ctx.moveTo(0, y + 1);
      ctx.lineTo(size, y + 1);
      ctx.stroke();
    }

    // Organic branching calcite veins
    function drawMarbleVein(startX, startY, len, angle, color, width) {
      ctx.save();
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(startX, startY);

      let cx = startX;
      let cy = startY;
      let ca = angle;

      for (let s = 0; s < len; s += 18) {
        ca += (Math.random() - 0.5) * 0.45;
        cx += Math.cos(ca) * 18;
        cy += Math.sin(ca) * 18;
        ctx.lineTo(cx, cy);

        // Occasional delicate offshoot vein
        if (Math.random() > 0.72) {
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          const branchAngle = ca + (Math.random() > 0.5 ? 0.7 : -0.7);
          const bx = cx + Math.cos(branchAngle) * 35;
          const by = cy + Math.sin(branchAngle) * 35;
          ctx.lineTo(bx, by);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(cx, cy);
        }
      }
      ctx.stroke();
      ctx.restore();
    }

    // White calcite veins
    for (let i = 0; i < 14; i++) {
      const vx = Math.random() * size;
      const vy = Math.random() * size;
      const vlen = Math.random() * 260 + 120;
      const vang = Math.random() * Math.PI * 2;
      drawMarbleVein(vx, vy, vlen, vang, 'rgba(240, 245, 255, 0.18)', Math.random() * 1.5 + 0.8);
    }

    // Warm gold/amber mineral veins
    for (let i = 0; i < 10; i++) {
      const vx = Math.random() * size;
      const vy = Math.random() * size;
      const vlen = Math.random() * 220 + 80;
      const vang = Math.random() * Math.PI * 2;
      drawMarbleVein(vx, vy, vlen, vang, 'rgba(223, 194, 130, 0.22)', Math.random() * 1.8 + 0.6);
    }

    // Subtle fine crystalline stippling
    ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
    for (let i = 0; i < 2500; i++) {
      ctx.fillRect(Math.random() * size, Math.random() * size, 1.5, 1.5);
    }

    const texture = new THREE.CanvasTexture(c);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(3, 24);
    return texture;
  }

  /**
   * Procedural Gilded Coffered Barrel-Vaulted Ceiling Texture
   * Deep shadowed coffered boxes with gilded egg-and-dart relief borders and faint rosettes
   */
  function createGildedCofferedCeilingTexture() {
    const size = 1024;
    const c = document.createElement('canvas');
    c.width = size;
    c.height = size;
    const ctx = c.getContext('2d');

    // Deep shadowed ceiling tone
    ctx.fillStyle = '#06070d';
    ctx.fillRect(0, 0, size, size);

    // 4x4 Coffering grid
    const cofferSize = 216;
    const step = 256;
    const offset = 20;

    for (let gx = 0; gx < 4; gx++) {
      for (let gy = 0; gy < 4; gy++) {
        const cx = gx * step + offset;
        const cy = gy * step + offset;

        // Outer deep shadow recess
        ctx.fillStyle = '#030408';
        ctx.fillRect(cx - 6, cy - 6, cofferSize + 12, cofferSize + 12);

        // Gilded outer egg-and-dart molding border
        ctx.strokeStyle = '#d4af37';
        ctx.lineWidth = 6;
        ctx.strokeRect(cx, cy, cofferSize, cofferSize);

        // Inner darker antique gold step
        ctx.strokeStyle = '#7c5f20';
        ctx.lineWidth = 4;
        ctx.strokeRect(cx + 8, cy + 8, cofferSize - 16, cofferSize - 16);

        // Recessed inner panel
        const innerGrad = ctx.createRadialGradient(
          cx + cofferSize / 2, cy + cofferSize / 2, 10,
          cx + cofferSize / 2, cy + cofferSize / 2, cofferSize / 2
        );
        innerGrad.addColorStop(0, '#10141f');
        innerGrad.addColorStop(0.7, '#090c13');
        innerGrad.addColorStop(1, '#040509');
        ctx.fillStyle = innerGrad;
        ctx.fillRect(cx + 12, cy + 12, cofferSize - 24, cofferSize - 24);

        // Faint classical gilded ceiling medallion / rosette in center
        const mx = cx + cofferSize / 2;
        const my = cy + cofferSize / 2;
        ctx.save();
        ctx.translate(mx, my);

        // Medallion outer ring
        ctx.strokeStyle = 'rgba(212, 175, 55, 0.35)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 0, 42, 0, Math.PI * 2);
        ctx.stroke();

        // Rosette petals
        ctx.fillStyle = 'rgba(212, 175, 55, 0.22)';
        for (let p = 0; p < 8; p++) {
          ctx.rotate(Math.PI / 4);
          ctx.beginPath();
          ctx.ellipse(0, 22, 7, 14, 0, 0, Math.PI * 2);
          ctx.fill();
        }

        // Center gold boss
        ctx.fillStyle = 'rgba(255, 230, 160, 0.4)';
        ctx.beginPath();
        ctx.arc(0, 0, 9, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    const texture = new THREE.CanvasTexture(c);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(3, 20);
    return texture;
  }

  /**
   * Procedural Aged Warm Stone & Dark Portoro Marble Wall Texture
   * Muted warm taupe-cream limestone with classical arched niche boiserie and dark marble wainscot
   */
  function createAgedStoneWallTexture() {
    const w = 1024;
    const h = 1024;
    const c = document.createElement('canvas');
    c.width = w;
    c.height = h;
    const ctx = c.getContext('2d');

    // 1. Muted Warm Stone / Aged Limestone Upper Wall
    ctx.fillStyle = '#221e18';
    ctx.fillRect(0, 0, w, h);

    // Delicate stone texture & shading
    ctx.fillStyle = 'rgba(160, 140, 115, 0.08)';
    for (let i = 0; i < 8000; i++) {
      ctx.fillRect(Math.random() * w, Math.random() * h, 1.5, 1.5);
    }
    ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
    for (let i = 0; i < 6000; i++) {
      ctx.fillRect(Math.random() * w, Math.random() * h, 2, 2);
    }

    // 2. Top Gilded Frieze & Cornice (y = 0 to y = 140)
    const friezeGrad = ctx.createLinearGradient(0, 0, 0, 140);
    friezeGrad.addColorStop(0, '#100e0a');
    friezeGrad.addColorStop(0.6, '#282117');
    friezeGrad.addColorStop(1, '#1b1610');
    ctx.fillStyle = friezeGrad;
    ctx.fillRect(0, 0, w, 140);

    // Gilded egg-and-dart band
    ctx.fillStyle = '#d4af37';
    ctx.fillRect(0, 130, w, 7);
    ctx.fillStyle = 'rgba(255, 240, 180, 0.4)';
    ctx.fillRect(0, 130, w, 2);

    // Dentil blocks
    for (let dx = 14; dx < w; dx += 42) {
      ctx.fillStyle = '#4f412c';
      ctx.fillRect(dx, 84, 24, 20);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.fillRect(dx + 21, 84, 3, 20);
      ctx.fillRect(dx, 101, 24, 3);
    }

    // 3. Arched Gallery Niche & Boiserie Panels (y = 150 to y = 730)
    const panelWidth = 440;
    const panelHeight = 550;
    const panelY = 160;

    [50, 534].forEach((px) => {
      // Arched niche background
      ctx.fillStyle = '#171410';
      ctx.fillRect(px, panelY, panelWidth, panelHeight);

      // Outer carved stone border
      ctx.strokeStyle = 'rgba(60, 50, 38, 0.8)';
      ctx.lineWidth = 10;
      ctx.strokeRect(px, panelY, panelWidth, panelHeight);

      // Inner antique gold bead
      ctx.strokeStyle = '#cda240';
      ctx.lineWidth = 3.5;
      ctx.strokeRect(px + 8, panelY + 8, panelWidth - 16, panelHeight - 16);

      // Deep niche ambient shadow
      const nicheShadow = ctx.createLinearGradient(px, panelY, px, panelY + 120);
      nicheShadow.addColorStop(0, 'rgba(0, 0, 0, 0.4)');
      nicheShadow.addColorStop(1, 'transparent');
      ctx.fillStyle = nicheShadow;
      ctx.fillRect(px + 12, panelY + 12, panelWidth - 24, 120);
    });

    // 4. Classical Chair Rail / Dado Molding (y = 735 to y = 770)
    const dadoGrad = ctx.createLinearGradient(0, 735, 0, 770);
    dadoGrad.addColorStop(0, '#1a1611');
    dadoGrad.addColorStop(0.3, '#3a3022');
    dadoGrad.addColorStop(0.7, '#241e16');
    dadoGrad.addColorStop(1, '#0e0b08');
    ctx.fillStyle = dadoGrad;
    ctx.fillRect(0, 735, w, 35);

    // Gilded rail fillet
    ctx.fillStyle = '#d4af37';
    ctx.fillRect(0, 746, w, 3);

    // 5. Lower Dark Portoro Marble Wainscoting (y = 770 to y = 1024)
    ctx.fillStyle = '#0d0f16';
    ctx.fillRect(0, 770, w, 254);

    [50, 534].forEach((wx) => {
      // Recessed marble panel
      ctx.fillStyle = '#080a11';
      ctx.fillRect(wx, 790, panelWidth, 210);

      // Gold inlay box
      ctx.strokeStyle = '#9c7b2c';
      ctx.lineWidth = 2.5;
      ctx.strokeRect(wx + 8, 798, panelWidth - 16, 194);
    });

    const texture = new THREE.CanvasTexture(c);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.repeat.set(18, 1);
    return texture;
  }

  /**
   * Ornate Thick Baroque / Rococo Gold Leaf Picture Frame
   */
  function createBaroqueFrame(width, height) {
    const frameGroup = new THREE.Group();
    const border = 0.52;
    const depth = 0.38;

    // Antique gold leaf material with rich specular glint
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.94,
      roughness: 0.22
    });

    // Dark antique gold inner bevel
    const darkGoldMat = new THREE.MeshStandardMaterial({
      color: 0x7a5e20,
      metalness: 0.88,
      roughness: 0.35
    });

    // Outer Baroque Frame Bars
    const topBar = new THREE.Mesh(new THREE.BoxGeometry(width + border * 2, border, depth), goldMat);
    topBar.position.y = (height / 2) + (border / 2);
    frameGroup.add(topBar);

    const bottomBar = new THREE.Mesh(new THREE.BoxGeometry(width + border * 2, border, depth), goldMat);
    bottomBar.position.y = -(height / 2) - (border / 2);
    frameGroup.add(bottomBar);

    const leftBar = new THREE.Mesh(new THREE.BoxGeometry(border, height, depth), goldMat);
    leftBar.position.x = -(width / 2) - (border / 2);
    frameGroup.add(leftBar);

    const rightBar = new THREE.Mesh(new THREE.BoxGeometry(border, height, depth), goldMat);
    rightBar.position.x = (width / 2) + (border / 2);
    frameGroup.add(rightBar);

    // Carved Baroque Corner Cartouches / Rosettes
    const cornerSize = border * 1.35;
    const cornerDepth = depth * 1.25;
    const cornerGeo = new THREE.BoxGeometry(cornerSize, cornerSize, cornerDepth);
    const rosetteGeo = new THREE.SphereGeometry(border * 0.32, 8, 8);

    const cornerPositions = [
      [-(width / 2) - (border / 2), (height / 2) + (border / 2)],
      [(width / 2) + (border / 2), (height / 2) + (border / 2)],
      [-(width / 2) - (border / 2), -(height / 2) - (border / 2)],
      [(width / 2) + (border / 2), -(height / 2) - (border / 2)]
    ];

    cornerPositions.forEach(([cx, cy]) => {
      const cornerBlock = new THREE.Mesh(cornerGeo, goldMat);
      cornerBlock.position.set(cx, cy, 0.02);
      frameGroup.add(cornerBlock);

      const rosette = new THREE.Mesh(rosetteGeo, goldMat);
      rosette.position.set(cx, cy, cornerDepth / 2 + 0.02);
      frameGroup.add(rosette);
    });

    // Inner Bevel Liner
    const linerBorder = 0.16;
    const linerTop = new THREE.Mesh(new THREE.BoxGeometry(width, linerBorder, depth * 0.75), darkGoldMat);
    linerTop.position.y = (height / 2) - (linerBorder / 2);
    frameGroup.add(linerTop);

    const linerBottom = new THREE.Mesh(new THREE.BoxGeometry(width, linerBorder, depth * 0.75), darkGoldMat);
    linerBottom.position.y = -(height / 2) + (linerBorder / 2);
    frameGroup.add(linerBottom);

    const linerLeft = new THREE.Mesh(new THREE.BoxGeometry(linerBorder, height - linerBorder * 2, depth * 0.75), darkGoldMat);
    linerLeft.position.x = -(width / 2) + (linerBorder / 2);
    frameGroup.add(linerLeft);

    const linerRight = new THREE.Mesh(new THREE.BoxGeometry(linerBorder, height - linerBorder * 2, depth * 0.75), darkGoldMat);
    linerRight.position.x = (width / 2) - (linerBorder / 2);
    frameGroup.add(linerRight);

    // Backing Board
    const backing = new THREE.Mesh(
      new THREE.PlaneGeometry(width + border * 2, height + border * 2),
      new THREE.MeshBasicMaterial({ color: 0x05060a })
    );
    backing.position.z = -0.15;
    frameGroup.add(backing);

    return frameGroup;
  }

  /**
   * Classical Royal Palace Brass Placard
   */
  function createPlacard(title, artist) {
    const c = document.createElement('canvas');
    c.width = 512;
    c.height = 160;
    const ctx = c.getContext('2d');

    const grad = ctx.createLinearGradient(0, 0, 512, 160);
    grad.addColorStop(0, '#1c160e');
    grad.addColorStop(0.5, '#3b2c17');
    grad.addColorStop(1, '#18120a');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 160);

    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 6;
    ctx.strokeRect(8, 8, 496, 144);
    ctx.strokeStyle = '#7a5e20';
    ctx.lineWidth = 2;
    ctx.strokeRect(16, 16, 480, 128);

    ctx.fillStyle = '#fffcf2';
    ctx.font = 'bold 32px "Cinzel", serif';
    ctx.textAlign = 'center';
    ctx.fillText(title.toUpperCase(), 256, 68);

    ctx.fillStyle = '#dfc282';
    ctx.font = '500 22px "Space Grotesk", sans-serif';
    ctx.fillText(artist, 256, 116);

    const texture = new THREE.CanvasTexture(c);
    const placardMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(1.9, 0.58),
      new THREE.MeshStandardMaterial({
        map: texture,
        metalness: 0.9,
        roughness: 0.28
      })
    );
    return placardMesh;
  }

  /**
   * Tall Classical Fluted Column (Marble Shaft with Antique Gold Corinthian Capital)
   */
  function createFlutedColumn(goldMat, marbleMat) {
    const colGroup = new THREE.Group();

    // Plinth / Pedestal Base (Floor y = -4.5)
    const baseBlock = new THREE.Mesh(new THREE.BoxGeometry(1.35, 1.1, 1.35), marbleMat);
    baseBlock.position.y = -3.95;
    colGroup.add(baseBlock);

    const baseTrim = new THREE.Mesh(new THREE.BoxGeometry(1.45, 0.18, 1.45), goldMat);
    baseTrim.position.y = -3.35;
    colGroup.add(baseTrim);

    // Fluted Column Shaft
    const shaftGeo = new THREE.CylinderGeometry(0.46, 0.52, 11.2, 24);
    const shaft = new THREE.Mesh(shaftGeo, marbleMat);
    shaft.position.y = 2.25;
    colGroup.add(shaft);

    // Decorative Gold Fillet Rings on Shaft
    const lowerRing = new THREE.Mesh(new THREE.TorusGeometry(0.53, 0.05, 8, 20), goldMat);
    lowerRing.rotation.x = Math.PI / 2;
    lowerRing.position.y = -3.1;
    colGroup.add(lowerRing);

    const upperRing = new THREE.Mesh(new THREE.TorusGeometry(0.48, 0.05, 8, 20), goldMat);
    upperRing.rotation.x = Math.PI / 2;
    upperRing.position.y = 7.4;
    colGroup.add(upperRing);

    // Ornate Corinthian / Composite Capital
    const capitalBell = new THREE.Mesh(new THREE.CylinderGeometry(0.68, 0.48, 0.65, 16), goldMat);
    capitalBell.position.y = 7.75;
    colGroup.add(capitalBell);

    const capitalAbacus = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.35, 1.5), goldMat);
    capitalAbacus.position.y = 8.18;
    colGroup.add(capitalAbacus);

    return colGroup;
  }

  /**
   * Transverse Semicircular Barrel Archway Beam
   * Springs between left and right column capitals, breaking hallway into grand museum bays
   */
  function createTransverseArch(corridorWidth, goldMat, stoneMat) {
    const archGroup = new THREE.Group();

    // Semicircular Vault Arch Beam
    const archRadius = (corridorWidth / 2) - 0.4;
    const archGeo = new THREE.TorusGeometry(archRadius, 0.38, 12, 32, Math.PI);
    const archMesh = new THREE.Mesh(archGeo, stoneMat);
    archMesh.position.set(0, 7.6, 0);
    archGroup.add(archMesh);

    // Gilded Inner Molding Ribbon
    const goldArchGeo = new THREE.TorusGeometry(archRadius - 0.15, 0.08, 8, 32, Math.PI);
    const goldArchMesh = new THREE.Mesh(goldArchGeo, goldMat);
    goldArchMesh.position.set(0, 7.6, 0.02);
    archGroup.add(goldArchMesh);

    // Central Keystone Relief
    const keystone = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.75, 0.85), goldMat);
    keystone.position.set(0, 7.6 + archRadius + 0.1, 0);
    archGroup.add(keystone);

    return archGroup;
  }

  /**
   * Ornate Baroque Chandelier Wall Torch Fixture (Rococo Gilded Multi-Globe Wall Lamp)
   * Detailed gilded cartouche backplate, sweeping S-curve scroll bracket, central urn hub,
   * tall center crown tulip chalice, and 5 radial branching floral arms with glowing fluted tulip glass shades.
   */
  function createCandleSconce(wallSide, goldMat) {
    const sconce = new THREE.Group();
    const isLeft = wallSide === 'left';
    const dir = isLeft ? 1 : -1;

    // Translucent Fluted Tulip Glass Shade Material
    const tulipGlassMat = new THREE.MeshStandardMaterial({
      color: 0xfffae6,
      emissive: 0xffdf92,
      emissiveIntensity: 0.72,
      roughness: 0.2,
      metalness: 0.08,
      transparent: true,
      opacity: 0.88,
      side: THREE.DoubleSide
    });

    // Intense Glowing Internal Filament Bulb Material
    const bulbCoreMat = new THREE.MeshBasicMaterial({
      color: 0xfffaea
    });

    // 1. Ornate Rococo Wall Backplate / Escutcheon
    const backplateGeo = new THREE.BoxGeometry(0.14, 1.4, 0.46);
    const backplate = new THREE.Mesh(backplateGeo, goldMat);
    backplate.position.set(0, 0, 0);
    sconce.add(backplate);

    // Decorative top & bottom acanthus scroll flourishes
    const topScroll = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.045, 8, 16, Math.PI * 1.3), goldMat);
    topScroll.rotation.y = Math.PI / 2;
    topScroll.position.set(0, 0.68, 0);
    sconce.add(topScroll);

    const bottomScroll = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.045, 8, 16, Math.PI * 1.5), goldMat);
    bottomScroll.rotation.y = Math.PI / 2;
    bottomScroll.position.set(0, -0.68, 0);
    sconce.add(bottomScroll);

    // 2. Sweeping S-Curved Main Rococo Support Bracket
    const mainCurveGeo = new THREE.TorusGeometry(0.55, 0.055, 8, 24, Math.PI * 1.15);
    const mainCurve = new THREE.Mesh(mainCurveGeo, goldMat);
    mainCurve.position.set(dir * 0.44, -0.12, 0);
    mainCurve.rotation.z = isLeft ? -0.4 : 0.4;
    mainCurve.rotation.y = isLeft ? 0 : Math.PI;
    sconce.add(mainCurve);

    // Counter scroll flourish under main arm
    const counterScroll = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.04, 8, 20, Math.PI * 1.4), goldMat);
    counterScroll.position.set(dir * 0.28, -0.52, 0);
    counterScroll.rotation.z = isLeft ? 1.2 : -1.2;
    sconce.add(counterScroll);

    // 3. Central Gilded Chandelier Hub / Acanthus Urn Body
    const hubX = dir * 0.72;
    const hubY = 0.28;
    const hubZ = 0;

    const hubGeo = new THREE.CylinderGeometry(0.18, 0.12, 0.42, 16);
    const hub = new THREE.Mesh(hubGeo, goldMat);
    hub.position.set(hubX, hubY, hubZ);
    sconce.add(hub);

    const hubRing = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.04, 8, 20), goldMat);
    hubRing.rotation.x = Math.PI / 2;
    hubRing.position.set(hubX, hubY, hubZ);
    sconce.add(hubRing);

    // Helper to create a single fluted tulip lamp shade & glowing bulb
    function createTulipLamp(x, y, z, rotX = 0, rotZ = 0, scale = 1.0) {
      const lampGroup = new THREE.Group();
      lampGroup.position.set(x, y, z);
      lampGroup.rotation.x = rotX;
      lampGroup.rotation.z = rotZ;
      lampGroup.scale.set(scale, scale, scale);

      // Gilded Calyx / Bobeche Cup
      const cupGeo = new THREE.CylinderGeometry(0.14, 0.07, 0.12, 12);
      const cup = new THREE.Mesh(cupGeo, goldMat);
      cup.position.y = 0.04;
      lampGroup.add(cup);

      // Fluted Tulip Petal Glass Shade (flaring open gracefully at top)
      const tulipGeo = new THREE.CylinderGeometry(0.18, 0.11, 0.38, 16, 1, true);
      const tulip = new THREE.Mesh(tulipGeo, tulipGlassMat);
      tulip.position.y = 0.24;
      lampGroup.add(tulip);

      // Scalloped Rim Collar
      const rimGeo = new THREE.TorusGeometry(0.175, 0.022, 6, 16);
      const rim = new THREE.Mesh(rimGeo, tulipGlassMat);
      rim.rotation.x = Math.PI / 2;
      rim.position.y = 0.42;
      lampGroup.add(rim);

      // Luminous Internal Filament Bulb
      const bulbGeo = new THREE.SphereGeometry(0.08, 12, 12);
      const bulb = new THREE.Mesh(bulbGeo, bulbCoreMat);
      bulb.scale.set(0.85, 1.35, 0.85);
      bulb.position.y = 0.22;
      lampGroup.add(bulb);

      sconceFlames.push(bulb);
      sconce.add(lampGroup);
    }

    // 4. Branching Multi-Tier Candle Arms (Matching reference photo):
    // Top Crown Chalice (Tallest vertical centerpiece)
    const crownStem = new THREE.Mesh(new THREE.CylinderGeometry(0.038, 0.045, 0.55, 8), goldMat);
    crownStem.position.set(hubX, hubY + 0.38, 0);
    sconce.add(crownStem);
    createTulipLamp(hubX, hubY + 0.65, 0, 0, 0, 1.12);

    // Multi-arm radial branch configuration (5 surrounding blooming tulip lights)
    const branchConfigs = [
      { dx: 0.24, dy: -0.05, dz: 0.32, rotX: 0.18, rotZ: isLeft ? -0.15 : 0.15, scale: 0.95 },
      { dx: 0.24, dy: -0.05, dz: -0.32, rotX: -0.18, rotZ: isLeft ? -0.15 : 0.15, scale: 0.95 },
      { dx: -0.16, dy: -0.12, dz: 0.36, rotX: 0.22, rotZ: isLeft ? 0.2 : -0.2, scale: 0.92 },
      { dx: -0.16, dy: -0.12, dz: -0.36, rotX: -0.22, rotZ: isLeft ? 0.2 : -0.2, scale: 0.92 },
      { dx: 0.32, dy: -0.24, dz: 0.0, rotX: 0.0, rotZ: isLeft ? -0.22 : 0.22, scale: 0.92 }
    ];

    branchConfigs.forEach((cfg) => {
      const bx = hubX + (isLeft ? cfg.dx : -cfg.dx);
      const by = hubY + cfg.dy;
      const bz = hubZ + cfg.dz;

      // Curved Gilded Branch Arm
      const armGeo = new THREE.CylinderGeometry(0.032, 0.038, 0.42, 8);
      const arm = new THREE.Mesh(armGeo, goldMat);
      arm.position.set((hubX + bx) * 0.5, (hubY + by) * 0.5 - 0.06, (hubZ + bz) * 0.5);
      arm.lookAt(bx, by, bz);
      arm.rotation.x += Math.PI / 4;
      sconce.add(arm);

      // Decorative branch scroll swirl
      const swirl = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.024, 6, 12, Math.PI * 1.2), goldMat);
      swirl.position.set((hubX + bx) * 0.5, (hubY + by) * 0.5 - 0.14, (hubZ + bz) * 0.5);
      swirl.rotation.y = Math.PI / 2;
      sconce.add(swirl);

      createTulipLamp(bx, by, bz, cfg.rotX, cfg.rotZ, cfg.scale);
    });

    return { group: sconce, hubPos: new THREE.Vector3(hubX, hubY + 0.3, 0) };
  }

  function buildScene() {
    scene = new THREE.Scene();
    // Deep atmospheric black-charcoal museum background
    scene.background = new THREE.Color(0x06080e);
    scene.fog = new THREE.FogExp2(0x06080e, 0.0052);

    const textureLoader = new THREE.TextureLoader();

    // Corridor Dimensions
    const corridorWidth = 15;
    const corridorHeight = 13;
    const corridorLength = 240;
    const corridorCenterZ = -75;

    // Common Gilded & Stone Materials
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      roughness: 0.22,
      metalness: 0.94
    });

    const darkMarbleMat = new THREE.MeshStandardMaterial({
      color: 0x161a24,
      roughness: 0.25,
      metalness: 0.35
    });

    const stoneArchMat = new THREE.MeshStandardMaterial({
      color: 0x221d17,
      roughness: 0.6,
      metalness: 0.2
    });

    // -------------------------------------------------------------------------
    // 1. Dark Polished Veined Marble Floor
    // -------------------------------------------------------------------------
    const floorTexture = createDarkMarbleFloorTexture();
    const floorGeo = new THREE.PlaneGeometry(corridorWidth, corridorLength);
    const floorMat = new THREE.MeshStandardMaterial({
      map: floorTexture,
      roughness: 0.12,
      metalness: 0.38,
      color: 0xffffff
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(0, -4.5, corridorCenterZ);
    scene.add(floor);

    // -------------------------------------------------------------------------
    // 2. Gilded Coffered Barrel-Vaulted Ceiling
    // -------------------------------------------------------------------------
    const ceilTexture = createGildedCofferedCeilingTexture();
    const ceilGeo = new THREE.PlaneGeometry(corridorWidth, corridorLength);
    const ceilMat = new THREE.MeshStandardMaterial({
      map: ceilTexture,
      roughness: 0.7,
      metalness: 0.25,
      color: 0xffffff
    });
    const ceiling = new THREE.Mesh(ceilGeo, ceilMat);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.set(0, 8.5, corridorCenterZ);
    scene.add(ceiling);

    // -------------------------------------------------------------------------
    // 3. Aged Stone & Portoro Marble Walls with Arched Niches
    // -------------------------------------------------------------------------
    const wallTexture = createAgedStoneWallTexture();
    const wallGeo = new THREE.PlaneGeometry(corridorLength, corridorHeight);
    const wallMat = new THREE.MeshStandardMaterial({
      map: wallTexture,
      roughness: 0.65,
      metalness: 0.18,
      color: 0xffffff
    });

    // Left Wall
    const leftWall = new THREE.Mesh(wallGeo, wallMat);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.position.set(-corridorWidth / 2, 2.0, corridorCenterZ);
    scene.add(leftWall);

    // Right Wall
    const rightWall = new THREE.Mesh(wallGeo, wallMat);
    rightWall.rotation.y = -Math.PI / 2;
    rightWall.position.set(corridorWidth / 2, 2.0, corridorCenterZ);
    scene.add(rightWall);

    // Continuous 3D Baseboards and Crown Moldings
    const baseboardGeo = new THREE.BoxGeometry(0.35, 0.65, corridorLength);
    const leftBase = new THREE.Mesh(baseboardGeo, darkMarbleMat);
    leftBase.position.set(-corridorWidth / 2 + 0.17, -4.18, corridorCenterZ);
    scene.add(leftBase);

    const rightBase = new THREE.Mesh(baseboardGeo, darkMarbleMat);
    rightBase.position.set(corridorWidth / 2 - 0.17, -4.18, corridorCenterZ);
    scene.add(rightBase);

    const crownGeo = new THREE.BoxGeometry(0.48, 0.55, corridorLength);
    const leftCrown = new THREE.Mesh(crownGeo, goldMat);
    leftCrown.position.set(-corridorWidth / 2 + 0.24, 8.25, corridorCenterZ);
    scene.add(leftCrown);

    const rightCrown = new THREE.Mesh(crownGeo, goldMat);
    rightCrown.position.set(corridorWidth / 2 - 0.24, 8.25, corridorCenterZ);
    scene.add(rightCrown);

    // -------------------------------------------------------------------------
    // 4. Tall Fluted Columns & Transverse Ceiling Arches (Louvre-style Bays)
    // -------------------------------------------------------------------------
    const colXOffset = (corridorWidth / 2) - 0.45;

    COLUMN_Z_POSITIONS.forEach((cz) => {
      // Left Fluted Column
      const leftCol = createFlutedColumn(goldMat, darkMarbleMat);
      leftCol.position.set(-colXOffset, 0, cz);
      scene.add(leftCol);

      // Right Fluted Column
      const rightCol = createFlutedColumn(goldMat, darkMarbleMat);
      rightCol.position.set(colXOffset, 0, cz);
      scene.add(rightCol);

      // Transverse Archway Beam across ceiling
      const arch = createTransverseArch(corridorWidth, goldMat, stoneArchMat);
      arch.position.set(0, 0, cz);
      scene.add(arch);
    });

    // -------------------------------------------------------------------------
    // 5. Moody Chiaroscuro Lighting (After-Hours Private Viewing)
    // -------------------------------------------------------------------------
    // Deep, warm, atmospheric ambient light
    const ambientLight = new THREE.AmbientLight(0x28231c, 0.88);
    scene.add(ambientLight);

    // Soft overall gallery depth wash
    const depthLight = new THREE.DirectionalLight(0xffedd2, 0.4);
    depthLight.position.set(0, 10, 15);
    scene.add(depthLight);

    // -------------------------------------------------------------------------
    // 6. Localized Candle Sconces & Column Lanterns
    // -------------------------------------------------------------------------
    const wallXOffset = (corridorWidth / 2) - 0.06;

    SCONCE_Z_POSITIONS.forEach((sz) => {
      // Left Wall Sconce
      const leftSconce = createCandleSconce('left', goldMat);
      leftSconce.group.position.set(-wallXOffset, 1.85, sz);
      scene.add(leftSconce.group);

      // Right Wall Sconce
      const rightSconce = createCandleSconce('right', goldMat);
      rightSconce.group.position.set(wallXOffset, 1.85, sz);
      scene.add(rightSconce.group);

      // Warm Amber Chandelier Torch Light Illuminating Walls
      const leftCandleLight = new THREE.PointLight(0xffb84d, 2.3, 16, 1.7);
      leftCandleLight.position.set(-wallXOffset + 1.1, 2.35, sz);
      scene.add(leftCandleLight);

      const rightCandleLight = new THREE.PointLight(0xffb84d, 2.3, 16, 1.7);
      rightCandleLight.position.set(wallXOffset - 1.1, 2.35, sz);
      scene.add(rightCandleLight);
    });

    // -------------------------------------------------------------------------
    // 7. Royal Masterpieces & Ornate Baroque Gold Frames
    // -------------------------------------------------------------------------
    PAINTINGS.forEach((p) => {
      const isLeft = p.wall === 'left';
      const pX = isLeft ? -wallXOffset : wallXOffset;
      const rotY = isLeft ? Math.PI / 2 : -Math.PI / 2;
      const centerY = 1.85;

      const group = new THREE.Group();
      group.position.set(pX, centerY, p.z);
      group.rotation.y = rotY;

      // Ornate Baroque Frame
      const frame = createBaroqueFrame(p.w, p.h);
      group.add(frame);

      // Canvas Artwork
      const canvasGeo = new THREE.PlaneGeometry(p.w, p.h);
      const canvasMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.3,
        metalness: 0.04
      });

      textureLoader.load(p.src, (tex) => {
        tex.encoding = THREE.sRGBEncoding;
        canvasMat.map = tex;
        canvasMat.needsUpdate = true;
      });

      const canvasMesh = new THREE.Mesh(canvasGeo, canvasMat);
      canvasMesh.position.z = 0.04;
      group.add(canvasMesh);

      // Royal Brass Placard
      const placard = createPlacard(p.title, p.artist);
      placard.position.set(0, -(p.h / 2) - 0.85, 0.05);
      group.add(placard);

      // Classical Brass Museum Picture Lamp
      const fixtureY = (p.h / 2) + 0.75;
      const fixtureStem = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.04, 0.65, 8),
        goldMat
      );
      fixtureStem.position.set(0, fixtureY, 0.45);
      fixtureStem.rotation.x = Math.PI / 4;
      group.add(fixtureStem);

      const fixtureHead = new THREE.Mesh(
        new THREE.CylinderGeometry(0.08, 0.08, Math.min(p.w * 0.65, 2.6), 12),
        goldMat
      );
      fixtureHead.position.set(0, fixtureY - 0.22, 0.7);
      fixtureHead.rotation.z = Math.PI / 2;
      group.add(fixtureHead);

      scene.add(group);

      // Focused Museum Spotlight Illuminating Each Artwork
      const spotLight = new THREE.PointLight(0xffdf9e, 1.6, 11, 1.7);
      spotLight.position.set(
        isLeft ? pX + 1.2 : pX - 1.2,
        centerY + (p.h / 2) + 0.35,
        p.z
      );
      scene.add(spotLight);
    });

    // -------------------------------------------------------------------------
    // 8. Monumental Luminous Classical Portal Archway (Card 10 Culmination)
    // -------------------------------------------------------------------------
    const portalZ = -145;
    const portalGroup = new THREE.Group();
    portalGroup.position.set(0, 0, portalZ);

    const archGoldMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      roughness: 0.22,
      metalness: 0.94
    });

    // Monumental Roman Archway Columns
    const archColGeo = new THREE.CylinderGeometry(0.6, 0.68, 5.0, 24);
    const leftPortalCol = new THREE.Mesh(archColGeo, darkMarbleMat);
    leftPortalCol.position.set(-4.0, -1.4, 0);
    portalGroup.add(leftPortalCol);

    const rightPortalCol = new THREE.Mesh(archColGeo, darkMarbleMat);
    rightPortalCol.position.set(4.0, -1.4, 0);
    portalGroup.add(rightPortalCol);

    // Gold Capitals & Bases
    const capGeo = new THREE.BoxGeometry(1.7, 0.6, 1.7);
    const leftCap = new THREE.Mesh(capGeo, archGoldMat);
    leftCap.position.set(-4.0, 1.4, 0);
    portalGroup.add(leftCap);

    const rightCap = new THREE.Mesh(capGeo, archGoldMat);
    rightCap.position.set(4.0, 1.4, 0);
    portalGroup.add(rightCap);

    const baseGeo = new THREE.BoxGeometry(1.8, 0.6, 1.8);
    const leftBaseCol = new THREE.Mesh(baseGeo, archGoldMat);
    leftBaseCol.position.set(-4.0, -4.2, 0);
    portalGroup.add(leftBaseCol);

    const rightBaseCol = new THREE.Mesh(baseGeo, archGoldMat);
    rightBaseCol.position.set(4.0, -4.2, 0);
    portalGroup.add(rightBaseCol);

    // Grand Semicircular Roman Arch Vault (Entirely in View)
    const archRadius = 4.0;
    const archTube = 0.44;
    const archGeo = new THREE.TorusGeometry(archRadius, archTube, 16, 48, Math.PI);
    const archMesh = new THREE.Mesh(archGeo, archGoldMat);
    archMesh.position.set(0, 1.7, 0);
    portalGroup.add(archMesh);

    // Keystone Rosette Block
    const keystone = new THREE.Mesh(new THREE.BoxGeometry(0.85, 1.0, 1.1), archGoldMat);
    keystone.position.set(0, 5.8, 0.1);
    portalGroup.add(keystone);

    // Classical Entablature Pediment (Cleanly below ceiling at y = 7.5)
    const entablature = new THREE.Mesh(new THREE.BoxGeometry(10.8, 0.5, 1.4), archGoldMat);
    entablature.position.set(0, 6.25, 0);
    portalGroup.add(entablature);

    const pediment = new THREE.Mesh(new THREE.BoxGeometry(9.2, 0.35, 1.1), archGoldMat);
    pediment.position.set(0, 6.65, 0);
    portalGroup.add(pediment);

    // Flanking Ornate Baroque Chandelier Torch Lamps on Archway Columns
    const leftArchSconce = createCandleSconce('left', archGoldMat);
    leftArchSconce.group.position.set(-5.3, 0.6, 0.4);
    portalGroup.add(leftArchSconce.group);

    const rightArchSconce = createCandleSconce('right', archGoldMat);
    rightArchSconce.group.position.set(5.3, 0.6, 0.4);
    portalGroup.add(rightArchSconce.group);

    const leftArchLight = new THREE.PointLight(0xffb84d, 2.2, 14, 1.6);
    leftArchLight.position.set(-4.5, 1.2, 0.8);
    portalGroup.add(leftArchLight);

    const rightArchLight = new THREE.PointLight(0xffb84d, 2.2, 14, 1.6);
    rightArchLight.position.set(4.5, 1.2, 0.8);
    portalGroup.add(rightArchLight);

    // Sanctuary Categories Carousel Portal Texture (Preview of Gallery Sanctuary)
    function createSanctuaryPortalTexture() {
      const W = 1024;
      const H = 1380;
      const canvas = document.createElement('canvas');
      canvas.width = W;
      canvas.height = H;
      const ctx = canvas.getContext('2d');

      // Initial dark museum background
      ctx.fillStyle = '#06070a';
      ctx.fillRect(0, 0, W, H);

      const canvasTex = new THREE.CanvasTexture(canvas);
      canvasTex.minFilter = THREE.LinearFilter;
      canvasTex.magFilter = THREE.LinearFilter;
      canvasTex.generateMipmaps = false;

      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        ctx.fillStyle = '#06070a';
        ctx.fillRect(0, 0, W, H);

        const srcW = img.naturalWidth || img.width;
        const srcH = img.naturalHeight || img.height;
        
        // Scale to cleanly cover the full arch opening
        const scale = Math.max(W / srcW, H / srcH);
        const drawW = srcW * scale;
        const drawH = srcH * scale;
        const drawX = (W - drawW) * 0.5;
        const drawY = (H - drawH) * 0.5;

        ctx.drawImage(img, drawX, drawY, drawW, drawH);

        // Soft arched edge vignette for seamless integration with 3D gold archway columns
        const borderVignette = ctx.createRadialGradient(W / 2, H / 2, W * 0.40, W / 2, H / 2, W * 0.70);
        borderVignette.addColorStop(0, 'rgba(0,0,0,0)');
        borderVignette.addColorStop(0.7, 'rgba(0,0,0,0.18)');
        borderVignette.addColorStop(1, 'rgba(6,7,10,0.88)');
        ctx.fillStyle = borderVignette;
        ctx.fillRect(0, 0, W, H);

        canvasTex.needsUpdate = true;
      };
      img.src = './assets/gallery_portal_preview.png';

      return canvasTex;
    }

    const sanctuaryTexture = createSanctuaryPortalTexture();
    const portalPlaneGeo = new THREE.PlaneGeometry(8.0, 10.8);
    const portalPlaneMat = new THREE.MeshBasicMaterial({
      map: sanctuaryTexture,
      transparent: true,
      opacity: 0.98
    });
    portalMesh = new THREE.Mesh(portalPlaneGeo, portalPlaneMat);
    portalMesh.position.set(0, 0.8, -0.1);
    portalGroup.add(portalMesh);

    // Subtle Ambient Golden Halo Rim around Arch
    const glowGeo = new THREE.PlaneGeometry(12, 14);
    const glowCanvas = document.createElement('canvas');
    glowCanvas.width = 512;
    glowCanvas.height = 512;
    const gctx = glowCanvas.getContext('2d');
    const grad = gctx.createRadialGradient(256, 256, 120, 256, 256, 256);
    grad.addColorStop(0, 'rgba(0, 0, 0, 0)');
    grad.addColorStop(0.5, 'rgba(245, 215, 120, 0.22)');
    grad.addColorStop(0.85, 'rgba(212, 175, 55, 0.12)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    gctx.fillStyle = grad;
    gctx.fillRect(0, 0, 512, 512);

    const glowTexture = new THREE.CanvasTexture(glowCanvas);
    const glowMat = new THREE.MeshBasicMaterial({
      map: glowTexture,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    portalHalo = new THREE.Mesh(glowGeo, glowMat);
    portalHalo.position.set(0, 1.8, 0.1);
    portalGroup.add(portalHalo);

    // Warm Golden Ambient Point Light illuminating the archway entrance
    portalLight = new THREE.PointLight(0xffdf9a, 2.4, 65, 1.2);
    portalLight.position.set(0, 2.2, 1.2);
    portalGroup.add(portalLight);

    scene.add(portalGroup);

    // -------------------------------------------------------------------------
    // 9. Floating Particles (Removed per user request)
    // -------------------------------------------------------------------------
    dustParticles = null;

    // -------------------------------------------------------------------------
    // 10. Interactive Cursor Flashlight (Subtle Gallery Illumination on Card 0)
    // -------------------------------------------------------------------------
    cursorSpotLight = new THREE.PointLight(0xffebd2, 2.2, 22, 1.8);
    cursorSpotLight.position.set(0, 1.8, 23.5);
    scene.add(cursorSpotLight);
  }

  function onResize() {
    if (!renderer || !camera || !container) return;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    if (!isRunning) {
      renderer.render(scene, camera);
    }
  }

  function onMouseMove(e) {
    targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  }

  function goToIndex(index) {
    if (index < 0 || index >= CARD_Z_POSITIONS.length) return;
    currentCardIndex = index;

    startZ = currentZ;
    targetZ = CARD_Z_POSITIONS[index];
    transitionStartTime = performance.now();
    isTransitioning = true;

    if (prefersReducedMotion()) {
      currentZ = targetZ;
      camera.position.z = currentZ;
      isTransitioning = false;
      if (renderer && scene) renderer.render(scene, camera);
    }
  }

  function enterWorldAnimation(callback) {
    if (isWarping) return;
    isWarping = true;
    warpStartTime = performance.now();
    warpStartZ = currentZ;
    warpOnComplete = callback;

    // Fade out card 10 elements so the archway entrance is unobstructed while stepping into the gallery room
    const activeCard = document.querySelector('.about-card.active, .about-card[data-card="10"]');
    if (activeCard) {
      activeCard.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      activeCard.style.opacity = '0';
      activeCard.style.transform = 'scale(1.03)';
    }

    const warpOverlay = document.getElementById('portal-world-warp');
    if (warpOverlay) {
      warpOverlay.classList.remove('dissolving');
      warpOverlay.classList.add('warping');
    }

    if (prefersReducedMotion()) {
      if (warpOverlay) warpOverlay.classList.add('reduced-motion');
      setTimeout(() => {
        if (typeof warpOnComplete === 'function') warpOnComplete();
        isWarping = false;
        if (warpOverlay) {
          warpOverlay.classList.remove('warping', 'reduced-motion');
        }
      }, 400);
      return;
    }
  }

  function animate(timestamp) {
    if (!isRunning) return;
    rafId = requestAnimationFrame(animate);

    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;

    if (isWarping) {
      const elapsed = timestamp - warpStartTime;
      const progress = Math.min(elapsed / WARP_DURATION, 1.0);
      const eased = easeOutCubicBezier(progress);

      // Smooth corridor walking forward motion directly entering the gallery room
      currentZ = warpStartZ + (WARP_TARGET_Z - warpStartZ) * eased;

      // Same rhythmic walking head-bob and sway as the rest of About corridor scrolling
      const walkFactor = Math.sin(progress * Math.PI);
      walkBobY = -Math.abs(Math.sin(progress * Math.PI * 2)) * 0.14 * walkFactor;
      walkSwayX = Math.sin(progress * Math.PI * 2) * 0.06 * walkFactor;

      // Subtle, natural golden arch lighting warmth as you cross the threshold
      if (portalLight) {
        portalLight.intensity = 2.4 + progress * 0.8;
      }

      if (progress >= 0.94 && warpOnComplete) {
        const cb = warpOnComplete;
        warpOnComplete = null;
        isWarping = false;
        currentZ = CARD_Z_POSITIONS[0];
        walkBobY = 0;
        walkSwayX = 0;

        const warpOverlay = document.getElementById('portal-world-warp');
        if (warpOverlay) {
          warpOverlay.classList.remove('warping');
          warpOverlay.classList.add('dissolving');
          setTimeout(() => {
            warpOverlay.classList.remove('dissolving');
          }, 850);
        }

        try {
          cb();
        } catch (e) {
          console.error('Warp callback error:', e);
        }
        return;
      }
    } else if (isTransitioning) {
      const elapsed = timestamp - transitionStartTime;
      const progress = Math.min(elapsed / TRANSITION_DURATION, 1.0);
      const eased = easeOutCubicBezier(progress);

      currentZ = startZ + (targetZ - startZ) * eased;

      const walkFactor = Math.sin(progress * Math.PI);
      walkBobY = -Math.abs(Math.sin(progress * Math.PI * 2)) * 0.14 * walkFactor;
      walkSwayX = Math.sin(progress * Math.PI * 2) * 0.06 * walkFactor;

      if (progress >= 1.0) {
        currentZ = targetZ;
        isTransitioning = false;
        walkBobY = 0;
        walkSwayX = 0;
      }
    } else {
      const idleTime = timestamp * 0.0015;
      walkBobY = Math.sin(idleTime) * 0.02;
      walkSwayX = Math.cos(idleTime * 0.7) * 0.015;
    }

    camera.position.x = walkSwayX + (mouseX * 0.3);
    camera.position.y = 1.8 + walkBobY - (mouseY * 0.22);
    camera.position.z = currentZ;

    camera.rotation.y = -mouseX * 0.035;
    camera.rotation.x = -mouseY * 0.02;
    camera.rotation.z = -walkSwayX * 0.02;

    // Subtle chandelier bulb glow & light shimmer
    if (sconceFlames.length > 0) {
      const flicker = 1.0 + Math.sin(timestamp * 0.007) * 0.08;
      sconceFlames.forEach((f, i) => {
        const offsetFlicker = flicker + Math.sin(timestamp * 0.0085 + i * 0.7) * 0.06;
        f.scale.set(0.85 * offsetFlicker, 1.35 * offsetFlicker, 0.85 * offsetFlicker);
      });
    }

    if (dustParticles) {
      const positions = dustParticles.geometry.attributes.position.array;
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] += Math.sin(timestamp * 0.001 + i) * 0.002;
      }
      dustParticles.geometry.attributes.position.needsUpdate = true;
    }

    if (portalLight && currentCardIndex === 10) {
      portalLight.intensity = 2.4 + Math.sin(timestamp * 0.003) * 0.4;
    }

    // Subtle 3D gallery corridor illumination under user's cursor on Card 0
    if (cursorSpotLight) {
      if (currentCardIndex === 0 && !isWarping) {
        cursorSpotLight.intensity = 2.4;
        cursorSpotLight.position.x = camera.position.x + mouseX * 4.8;
        cursorSpotLight.position.y = camera.position.y - mouseY * 3.2;
        cursorSpotLight.position.z = camera.position.z - 2.8;
      } else {
        cursorSpotLight.intensity = 0;
      }
    }

    renderer.render(scene, camera);
  }

  function init() {
    if (isInitialized) return;

    canvas = document.getElementById('corridor-canvas');
    container = document.getElementById('about-view');
    if (!canvas || !container || typeof THREE === 'undefined') return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    // Moody dark-luxury private viewing exposure
    renderer.toneMappingExposure = 1.08;
    renderer.outputEncoding = THREE.sRGBEncoding;

    camera = new THREE.PerspectiveCamera(56, width / height, 0.1, 290);
    camera.position.set(0, 1.8, CARD_Z_POSITIONS[0]);

    buildScene();

    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    isInitialized = true;

    if (container.classList.contains('active') || window.location.hash === '#about') {
      resume();
    }
  }

  function resume() {
    if (!isInitialized) init();
    if (!isInitialized || isRunning) return;

    isRunning = true;
    if (canvas) {
      canvas.style.opacity = '1';
      canvas.style.visibility = 'visible';
    }
    onResize();
    rafId = requestAnimationFrame(animate);
  }

  function pause() {
    isRunning = false;
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    if (canvas) {
      canvas.style.opacity = '0';
      canvas.style.visibility = 'hidden';
    }
  }

  window.avartaCorridor = {
    init: init,
    resume: resume,
    pause: pause,
    goToIndex: goToIndex,
    enterWorldAnimation: enterWorldAnimation,
    resize: onResize,
    getCurrentZ: function () {
      return currentZ;
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
