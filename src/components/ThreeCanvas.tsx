import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

// Pre-allocated math objects to enforce zero GC inside the render loop
const _mouseNorm = new THREE.Vector2(0, 0);
const _targetMouseNorm = new THREE.Vector2(0, 0);
const _dummyMatrix = new THREE.Matrix4();
const _dummyPos = new THREE.Vector3();
const _dummyScale = new THREE.Vector3();
const _dummyQuat = new THREE.Quaternion();

interface ThreeCanvasProps {
  interactive?: boolean;
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({ interactive = true }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [controlsOpen, setControlsOpen] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Detect Software WebGL guard
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    // 2. Initialize Three.js Scene, Camera & Renderer
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    // Cap pixel ratio to 1.5 to prevent GPU bottleneck on 4K/retina screens
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 3. Studio Environment Setup (RoomEnvironment)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envTexture = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTexture;
    pmremGenerator.dispose();

    // 4. Lighting Rig
    const keyLight = new THREE.DirectionalLight(0xfff7ed, 3.2);
    keyLight.position.set(5, 8, 4);
    keyLight.castShadow = !isSoftwareGl;
    if (!isSoftwareGl) {
      keyLight.shadow.mapSize.width = 512;
      keyLight.shadow.mapSize.height = 512;
    }
    scene.add(keyLight);

    const fillLight = new THREE.HemisphereLight(0x38bdf8, 0x0f172a, 1.8);
    scene.add(fillLight);

    const accentLight = new THREE.PointLight(0xa855f7, 2.5, 10);
    accentLight.position.set(-4, -2, 2);
    scene.add(accentLight);

    // 5. Composite 3-12 Part Procedural Model: Optimized Glass Gyro Crystal
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);

    // Part 1: Outer Glass Faceted Polyhedron (Icosahedron)
    // High-performance physical glass material without costly render-target transmission pass
    const outerGeo = new THREE.IcosahedronGeometry(1.6, 0);
    const outerMat = new THREE.MeshPhysicalMaterial({
      color: 0x67e8f9,
      metalness: 0.15,
      roughness: 0.08,
      transparent: true,
      opacity: 0.65,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    outerMesh.castShadow = !isSoftwareGl;
    modelGroup.add(outerMesh);

    // Part 2: Inner Glowing Core Octahedron
    const innerGeo = new THREE.OctahedronGeometry(0.85, 0);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.8,
      roughness: 0.25,
      metalness: 0.85
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    modelGroup.add(innerMesh);

    // Part 3: Beveled Metallic Gyro Ring 1
    const ring1Geo = new THREE.TorusGeometry(2.4, 0.04, 12, 48);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0xa5b4fc,
      metalness: 0.95,
      roughness: 0.18
    });
    const ring1Mesh = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1Mesh.rotation.x = Math.PI / 3;
    modelGroup.add(ring1Mesh);

    // Part 4: Beveled Metallic Gyro Ring 2 (Orthogonal)
    const ring2Geo = new THREE.TorusGeometry(2.65, 0.035, 12, 48);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      metalness: 0.9,
      roughness: 0.22
    });
    const ring2Mesh = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2Mesh.rotation.y = Math.PI / 4;
    ring2Mesh.rotation.x = -Math.PI / 6;
    modelGroup.add(ring2Mesh);

    // Part 5: Orbiting Mini Crystal Satellites (4 pieces)
    const satelliteGroup = new THREE.Group();
    modelGroup.add(satelliteGroup);
    const satelliteGeo = new THREE.OctahedronGeometry(0.2, 0);
    const satelliteMat = new THREE.MeshStandardMaterial({
      color: 0xc084fc,
      metalness: 0.5,
      roughness: 0.2,
      transparent: true,
      opacity: 0.85
    });

    const satellites: THREE.Mesh[] = [];
    for (let i = 0; i < 4; i++) {
      const sat = new THREE.Mesh(satelliteGeo, satelliteMat);
      satelliteGroup.add(sat);
      satellites.push(sat);
    }

    // Part 6: Procedural Contact Grounding Shadow
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext('2d');
    if (sCtx) {
      const grad = sCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
      grad.addColorStop(0, 'rgba(2, 6, 23, 0.65)');
      grad.addColorStop(0.5, 'rgba(2, 6, 23, 0.2)');
      grad.addColorStop(1, 'rgba(2, 6, 23, 0)');
      sCtx.fillStyle = grad;
      sCtx.fillRect(0, 0, 128, 128);
    }
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowGeo = new THREE.PlaneGeometry(6, 6);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
      opacity: 0.6
    });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -2.8;
    scene.add(shadowPlane);

    // Part 7: Ambient Micro-Star Particles using InstancedMesh (Baked once for zero CPU cost)
    const starCount = 30;
    const starGeo = new THREE.TetrahedronGeometry(0.035, 0);
    const starMat = new THREE.MeshBasicMaterial({
      color: 0x93c5fd,
      transparent: true,
      opacity: 0.6
    });
    const starInstances = new THREE.InstancedMesh(starGeo, starMat, starCount);
    starInstances.frustumCulled = false;

    for (let i = 0; i < starCount; i++) {
      const x = (Math.random() - 0.5) * 12;
      const y = (Math.random() - 0.5) * 8;
      const z = (Math.random() - 0.5) * 6 - 1;

      _dummyPos.set(x, y, z);
      _dummyScale.setScalar(0.7 + Math.random() * 0.6);
      _dummyQuat.identity();
      _dummyMatrix.compose(_dummyPos, _dummyQuat, _dummyScale);
      starInstances.setMatrixAt(i, _dummyMatrix);
    }
    starInstances.instanceMatrix.needsUpdate = true;
    scene.add(starInstances);

    // Pre-warm shader pipeline once
    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    // 6. Interactive Cursor Tracking with Damping
    const handlePointerMove = (e: MouseEvent) => {
      if (!interactive) return;
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      _targetMouseNorm.set(nx, ny);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    // 7. Resize Handler
    let resizeTimer: number | null = null;
    const handleResize = () => {
      if (resizeTimer) cancelAnimationFrame(resizeTimer);
      resizeTimer = requestAnimationFrame(() => {
        if (!container) return;
        const w = container.clientWidth;
        const h = container.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      });
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // 8. Render Loop
    let frameId = 0;
    let clock = new THREE.Clock();

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 60);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    const tick = () => {
      const dt = clock.getDelta();
      const time = clock.getElapsedTime() * speedMultiplier;

      // Rotate primary geometries smoothly
      outerMesh.rotation.x = time * 0.35;
      outerMesh.rotation.y = time * 0.45;

      innerMesh.rotation.x = -time * 0.55;
      innerMesh.rotation.z = time * 0.4;

      ring1Mesh.rotation.z = time * 0.25;
      ring2Mesh.rotation.y = -time * 0.3;

      // Orbiting satellites
      for (let idx = 0; idx < 4; idx++) {
        const sat = satellites[idx];
        const offset = (idx * Math.PI) / 2;
        const radius = 2.8;
        sat.position.x = Math.cos(time * 0.8 + offset) * radius;
        sat.position.y = Math.sin(time * 0.6 + offset) * 1.1;
        sat.position.z = Math.sin(time * 0.8 + offset) * (radius * 0.7);
      }

      // Gentle starfield drift with zero buffer update overhead
      starInstances.rotation.y = time * 0.04;

      // Mouse tracking interpolation
      _mouseNorm.x += (_targetMouseNorm.x - _mouseNorm.x) * (1 - Math.exp(-4 * dt));
      _mouseNorm.y += (_targetMouseNorm.y - _mouseNorm.y) * (1 - Math.exp(-4 * dt));

      modelGroup.rotation.x = _mouseNorm.y * 0.3;
      modelGroup.rotation.y = _mouseNorm.x * 0.45;
      modelGroup.position.y = Math.sin(time * 1.2) * 0.1;

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    };

    if (!isPaused) {
      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    }

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);

      outerGeo.dispose();
      outerMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      satelliteGeo.dispose();
      satelliteMat.dispose();
      shadowGeo.dispose();
      shadowMat.dispose();
      shadowTex.dispose();
      starGeo.dispose();
      starMat.dispose();
      envTexture.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isPaused, speedMultiplier, interactive]);

  return (
    <div className="relative w-full h-full select-none overflow-hidden">
      <div ref={mountRef} className="absolute inset-0 w-full h-full pointer-events-auto" />

      {/* Sleek Ergonomic 3D Bottom Dock */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
        <button
          onClick={() => setControlsOpen(!controlsOpen)}
          className="text-[11px] font-mono uppercase tracking-wider text-slate-400 hover:text-white px-3 py-1 rounded-t-lg bg-slate-900/80 border border-b-0 border-white/10 transition-colors cursor-pointer"
        >
          {controlsOpen ? '▾ Hide 3D Controls' : '▴ 3D Scene Controls'}
        </button>

        {controlsOpen && (
          <div className="flex items-center gap-4 px-4 py-2 bg-slate-950/90 border border-white/15 rounded-b-xl rounded-t-none text-xs text-slate-300 shadow-2xl">
            <span className="font-mono text-[10px] text-cyan-400">PBR GLASS GEM</span>
            <div className="h-3 w-px bg-white/20" />
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="hover:text-white transition-colors cursor-pointer font-medium"
            >
              {isPaused ? 'Resume Spin' : 'Pause'}
            </button>
            <div className="h-3 w-px bg-white/20" />
            <div className="flex items-center gap-1.5 font-mono text-[11px]">
              <span>Speed:</span>
              {[0.5, 1, 2].map((s) => (
                <button
                  key={s}
                  onClick={() => setSpeedMultiplier(s)}
                  className={`px-1.5 py-0.5 rounded cursor-pointer ${
                    speedMultiplier === s
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
