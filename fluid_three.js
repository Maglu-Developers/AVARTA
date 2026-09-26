/**
 * Avarta Hero Section — Real-Time Navier-Stokes Fluid Distortion Engine
 * Powered by Three.js WebGL Shaders
 * Warps background image UV coordinates based on mouse velocity & curl noise.
 * Render is fully static on page mount / reload (0.0 initial velocity) with zero sliding or entrance transition.
 */

(function () {
  const canvas = document.getElementById('water-canvas');

  // Renderer Setup
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: false,
    powerPreference: "high-performance"
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Orthographic Scene Setup for Screen Quad
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  // Ping-Pong Velocity Render Targets (256x256 Float textures for zero-bias fluid simulation)
  const SIM_SIZE = 256;
  const isWebGL2 = renderer.capabilities.isWebGL2;
  const targetType = isWebGL2 ? THREE.HalfFloatType : THREE.FloatType;

  const targetOptions = {
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    format: THREE.RGBAFormat,
    type: targetType,
    depthBuffer: false,
    stencilBuffer: false
  };

  let targetA = new THREE.WebGLRenderTarget(SIM_SIZE, SIM_SIZE, targetOptions);
  let targetB = new THREE.WebGLRenderTarget(SIM_SIZE, SIM_SIZE, targetOptions);

  // Explicitly clear velocity render targets to strict 0.0 velocity vector so there is ZERO initial motion or slide
  renderer.setClearColor(0x000000, 0.0);
  renderer.setRenderTarget(targetA);
  renderer.clear();
  renderer.setRenderTarget(targetB);
  renderer.clear();
  renderer.setRenderTarget(null);

  // Golden Temple Sanctuary Background Texture
  const textureLoader = new THREE.TextureLoader();
  let bgTexture = textureLoader.load('assets/intro_hallway.jpg', function (tex) {
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.wrapS = THREE.ClampToEdgeWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    updateAspectScale();
  });

  // Shader 1: Velocity Simulation Material (Advection + Curl Noise + Velocity Splat)
  const velShaderMaterial = new THREE.ShaderMaterial({
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      uniform sampler2D uVelocity;
      uniform vec2 uMouse;
      uniform vec2 uMouseVel;
      uniform float uAspect;
      uniform float uDissipation;

      void main() {
        vec2 texel = vec2(1.0 / 256.0);

        // Directly read current velocity vector (0.0 = completely still fluid)
        vec2 vel = texture2D(uVelocity, vUv).xy;

        // Fluid Self-Advection
        vec2 backUv = vUv - vel * texel * 2.2;
        vec2 advectedVel = texture2D(uVelocity, backUv).xy;

        // Vorticity / Curl Swirl calculation
        float L = texture2D(uVelocity, vUv - vec2(texel.x, 0.0)).y;
        float R = texture2D(uVelocity, vUv + vec2(texel.x, 0.0)).y;
        float B = texture2D(uVelocity, vUv - vec2(0.0, texel.y)).x;
        float T = texture2D(uVelocity, vUv + vec2(0.0, texel.y)).x;

        float curl = (R - L) - (T - B);
        vec2 swirlForce = vec2(abs(T) - abs(B), abs(L) - abs(R)) * curl * 0.26;

        // Dissipation / Decay over time
        vec2 newVel = (advectedVel + swirlForce) * uDissipation;

        // Mouse Velocity Impulse Injection
        vec2 p = vUv - uMouse;
        p.x *= uAspect;
        float dist = length(p);
        float radius = 0.145;

        if (dist < radius) {
          float force = (1.0 - dist / radius);
          force = smoothstep(0.0, 1.0, force);
          newVel += uMouseVel * force * 7.6;
        }

        // Store direct velocity in float render target
        gl_FragColor = vec4(newVel, 0.0, 1.0);
      }
    `,
    uniforms: {
      uVelocity: { value: targetA.texture },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uMouseVel: { value: new THREE.Vector2(0, 0) },
      uAspect: { value: window.innerWidth / window.innerHeight },
      uDissipation: { value: 0.965 }
    }
  });

  // Shader 2: Display Material (Warps Background Texture UVs)
  const dispShaderMaterial = new THREE.ShaderMaterial({
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      uniform sampler2D uVelocity;
      uniform sampler2D uTexture;
      uniform vec2 uUvScale;

      void main() {
        // Read fluid velocity directly
        vec2 vel = texture2D(uVelocity, vUv).xy;

        // Full-bleed aspect cover UV mapping with subtle overscan
        vec2 coverUv = (vUv - 0.5) * uUvScale + 0.5;

        // Warp background image UVs with displacement
        vec2 displacedUv = coverUv - vel * 0.38;
        displacedUv = clamp(displacedUv, vec2(0.001), vec2(0.999));

        // Sample Starry Night background artwork
        gl_FragColor = texture2D(uTexture, displacedUv);
      }
    `,
    uniforms: {
      uVelocity: { value: targetA.texture },
      uTexture: { value: bgTexture },
      uUvScale: { value: new THREE.Vector2(1, 1) }
    }
  });

  // Fullscreen Mesh Quad
  const quadGeometry = new THREE.PlaneGeometry(2, 2);
  const quadMesh = new THREE.Mesh(quadGeometry, dispShaderMaterial);
  scene.add(quadMesh);

  // Aspect Ratio Scale Calculation — full cover with 4% overscan to prevent edge clamping streaks
  function updateAspectScale() {
    const screenAspect = window.innerWidth / window.innerHeight;
    const imgAspect = (bgTexture && bgTexture.image && bgTexture.image.width) ? (bgTexture.image.width / bgTexture.image.height) : (736 / 414);

    const OVERSCAN = 0.96;
    let scaleX = OVERSCAN;
    let scaleY = OVERSCAN;

    if (screenAspect > imgAspect) {
      scaleY = (imgAspect / screenAspect) * OVERSCAN;
    } else {
      scaleX = (screenAspect / imgAspect) * OVERSCAN;
    }

    dispShaderMaterial.uniforms.uUvScale.value.set(scaleX, scaleY);
    velShaderMaterial.uniforms.uAspect.value = screenAspect;
  }

  // Initialize aspect scale IMMEDIATELY on boot (prevents aspect jump on image load)
  updateAspectScale();

  // Pointer & Velocity Tracking
  let mouseX = 0.5;
  let mouseY = 0.5;
  let prevMouseX = 0.5;
  let prevMouseY = 0.5;
  let mouseVelX = 0.0;
  let mouseVelY = 0.0;
  let isPointerMoving = false;

  function onPointerMove(clientX, clientY) {
    const nx = clientX / window.innerWidth;
    const ny = 1.0 - (clientY / window.innerHeight); // Flip Y for WebGL UV

    if (!isPointerMoving) {
      prevMouseX = nx;
      prevMouseY = ny;
      isPointerMoving = true;
    }

    mouseX = nx;
    mouseY = ny;
  }

  window.addEventListener('mousemove', function (e) {
    onPointerMove(e.clientX, e.clientY);
  });

  window.addEventListener('touchmove', function (e) {
    if (e.touches.length > 0) {
      onPointerMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  });

  // Window Resize Listener
  window.addEventListener('resize', function () {
    renderer.setSize(window.innerWidth, window.innerHeight);
    updateAspectScale();
  });

  let isPaused = false;

  // Render & Fluid Simulation Loop
  function animate() {
    if (isPaused) return;

    if (isPointerMoving) {
      mouseVelX = (mouseX - prevMouseX);
      mouseVelY = (mouseY - prevMouseY);
      prevMouseX = mouseX;
      prevMouseY = mouseY;
    } else {
      mouseVelX = 0.0;
      mouseVelY = 0.0;
    }

    // 1. Fluid Velocity Pass: Render to targetB using targetA as previous frame input
    quadMesh.material = velShaderMaterial;
    velShaderMaterial.uniforms.uVelocity.value = targetA.texture;
    velShaderMaterial.uniforms.uMouse.value.set(mouseX, mouseY);
    velShaderMaterial.uniforms.uMouseVel.value.set(mouseVelX, mouseVelY);

    renderer.setRenderTarget(targetB);
    renderer.render(scene, camera);

    // Swap ping-pong targets
    let temp = targetA;
    targetA = targetB;
    targetB = temp;

    // 2. Display Pass: Render warped Starry Night texture to screen
    quadMesh.material = dispShaderMaterial;
    dispShaderMaterial.uniforms.uVelocity.value = targetA.texture;

    renderer.setRenderTarget(null);
    renderer.render(scene, camera);

    requestAnimationFrame(animate);
  }

  window.avartaFluid = {
    pause: function () {
      isPaused = true;
    },
    resume: function () {
      if (isPaused) {
        isPaused = false;
        animate();
      }
    }
  };

  animate();
})();
