import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function CinematicLayer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationFrameId = useRef<number | null>(null);

  // Mouse tracking for parallax
  const mouse = useRef({ x: 0, y: 0 });
  const targetMouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Create Scene
    const scene = new THREE.Scene();

    // Create Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 25;

    // Create Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Programmatic glowing bokeh texture
    const size = 64;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.15, 'rgba(255, 210, 160, 0.9)'); // Warm bright inner core
      grad.addColorStop(0.4, 'rgba(235, 120, 40, 0.4)');  // Orange outer glow
      grad.addColorStop(0.8, 'rgba(235, 100, 20, 0.1)');  // Soft halo
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');            // Fade to transparent
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, size, size);
    }
    const texture = new THREE.CanvasTexture(canvas);

    // Particles Data
    const count = 120;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const scaleList = new Float32Array(count);
    const speedList = new Float32Array(count);
    const randomShiftList = new Float32Array(count);

    // Initial positioning in 3D Space
    for (let i = 0; i < count; i++) {
      // spread particles within a custom bounding box
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 55;   // X
      positions[i3 + 1] = (Math.random() - 0.5) * 35; // Y
      positions[i3 + 2] = (Math.random() - 0.5) * 30; // Z

      scaleList[i] = 1.0 + Math.random() * 4.5;       // Scale/size variance
      speedList[i] = 0.05 + Math.random() * 0.15;     // Speed variance
      randomShiftList[i] = Math.random() * Math.PI * 2; // For oscillation offset
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Particle material
    const material = new THREE.PointsMaterial({
      size: 2.2,
      map: texture,
      vertexColors: false,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.85,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Save initial coordinates to calculate soft movement
    const initialY = new Float32Array(count);
    const initialX = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      initialX[i] = positions[i * 3];
      initialY[i] = positions[i * 3 + 1];
    }

    // Handle mouse movement
    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse coordinates (-1 to 1)
      targetMouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      targetMouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Handle Resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(containerRef.current);

    let clock = new THREE.Clock();

    // Animation Loop
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      const posAttr = geometry.attributes.position as THREE.BufferAttribute;

      if (posAttr) {
        for (let i = 0; i < count; i++) {
          const i3 = i * 3;
          // Sine-wave oscillation for floating motion
          const amplitude = 1.5;
          const freq = speedList[i];
          const shift = randomShiftList[i];

          // Slowly float up / down
          posAttr.array[i3 + 1] = initialY[i] + Math.sin(elapsedTime * freq + shift) * amplitude;
          // Minor horizontal sway
          posAttr.array[i3] = initialX[i] + Math.cos(elapsedTime * (freq * 0.5) + shift) * (amplitude * 0.6);
        }
        posAttr.needsUpdate = true;
      }

      // Smooth Lerp for camera parallax
      mouse.current.x += (targetMouse.current.x - mouse.current.x) * 0.05;
      mouse.current.y += (targetMouse.current.y - mouse.current.y) * 0.05;

      // Adjust camera positioning slightly based on smoothed mouse coordinates
      camera.position.x += (mouse.current.x * 6 - camera.position.x) * 0.05;
      camera.position.y += (mouse.current.y * 4 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup Everything
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (rendererRef.current && rendererRef.current.domElement) {
        containerRef.current?.removeChild(rendererRef.current.domElement);
      }
      geometry.dispose();
      material.dispose();
      texture.dispose();
      scene.clear();
    };
  }, []);

  return (
    <div
      id="cinematic-layer"
      ref={containerRef}
      className="absolute inset-0 z-10 pointer-events-none w-full h-full overflow-hidden"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
