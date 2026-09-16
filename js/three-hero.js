/* ==========================================================================
   ST-SCHON USA LLC - THREE.JS ORGANIC 3D HERO CANVAS
   ========================================================================== */

(function () {
  'use strict';

  const container = document.getElementById('hero-3d-canvas-box');
  if (!container) return;

  let scene, camera, renderer, artifactGroup;
  let targetRotation = { x: 0, y: 0 };
  let currentRotation = { x: 0, y: 0 };
  let isDragging = false;
  let previousMouse = { x: 0, y: 0 };

  init();
  animate();

  function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 0.3, 5);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    container.appendChild(renderer.domElement);

    // Warm Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xfffbf5, 1.2);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffedd5, 2.5);
    mainLight.position.set(4, 6, 4);
    mainLight.castShadow = true;
    scene.add(mainLight);

    const terracottaRimLight = new THREE.PointLight(0xa85536, 3, 10);
    terracottaRimLight.position.set(-3, 1, -2);
    scene.add(terracottaRimLight);

    // Soft Shadow Ground
    const groundGeo = new THREE.PlaneGeometry(15, 15);
    const groundMat = new THREE.ShadowMaterial({ opacity: 0.12 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1.4;
    ground.receiveShadow = true;
    scene.add(ground);

    // Artifact Mesh Group
    artifactGroup = new THREE.Group();
    scene.add(artifactGroup);

    // Organic Warm Ceramic & Terracotta Materials
    const ceramicMaterial = new THREE.MeshStandardMaterial({
      color: 0xf5f2ed,
      roughness: 0.25,
      metalness: 0.1,
    });

    const terracottaMaterial = new THREE.MeshStandardMaterial({
      color: 0xa85536,
      roughness: 0.3,
      metalness: 0.2,
    });

    // Sculptural Daily Life Thermo Flask Mesh
    const bodyGeo = new THREE.CylinderGeometry(0.7, 0.7, 2.2, 48);
    const bodyMesh = new THREE.Mesh(bodyGeo, ceramicMaterial);
    bodyMesh.castShadow = true;
    bodyMesh.receiveShadow = true;
    artifactGroup.add(bodyMesh);

    const neckGeo = new THREE.CylinderGeometry(0.4, 0.7, 0.4, 48);
    const neckMesh = new THREE.Mesh(neckGeo, ceramicMaterial);
    neckMesh.position.y = 1.3;
    neckMesh.castShadow = true;
    artifactGroup.add(neckMesh);

    const capGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.4, 48);
    const capMesh = new THREE.Mesh(capGeo, terracottaMaterial);
    capMesh.position.y = 1.7;
    capMesh.castShadow = true;
    artifactGroup.add(capMesh);

    const accentRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.71, 0.03, 24, 64),
      terracottaMaterial
    );
    accentRing.position.y = 0.4;
    artifactGroup.add(accentRing);

    // Event Listeners
    const dom = renderer.domElement;
    dom.addEventListener('mousedown', (e) => {
      isDragging = true;
      previousMouse = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mousemove', (e) => {
      if (isDragging) {
        const deltaX = e.clientX - previousMouse.x;
        const deltaY = e.clientY - previousMouse.y;
        targetRotation.y += deltaX * 0.008;
        targetRotation.x += deltaY * 0.008;
        previousMouse = { x: e.clientX, y: e.clientY };
      }
    });

    window.addEventListener('mouseup', () => { isDragging = false; });
    window.addEventListener('resize', onResize);
  }

  function onResize() {
    if (!container) return;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  }

  function animate() {
    requestAnimationFrame(animate);

    currentRotation.x += (targetRotation.x - currentRotation.x) * 0.08;
    currentRotation.y += (targetRotation.y - currentRotation.y) * 0.08;

    if (artifactGroup) {
      artifactGroup.rotation.x = currentRotation.x;
      artifactGroup.rotation.y = currentRotation.y + (isDragging ? 0 : Date.now() * 0.0004);
      artifactGroup.position.y = Math.sin(Date.now() * 0.0015) * 0.06;
    }

    renderer.render(scene, camera);
  }
})();
