'use client';

import * as React from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

/**
 * AnimatedSphere - Floating 3D sphere with distortion effect
 */
function AnimatedSphere({ position, color, speed }: { position: [number, number, number]; color: string; speed: number }) {
  const meshRef = React.useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;

    // Floating animation
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.3;

    // Rotation
    meshRef.current.rotation.x += 0.001;
    meshRef.current.rotation.y += 0.002;
  });

  return (
    <Sphere ref={meshRef} args={[1, 32, 32]} position={position}>
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.2}
        metalness={0.8}
        transparent
        opacity={0.6}
      />
    </Sphere>
  );
}

/**
 * FloatingParticles - Particle system for background depth
 */
function FloatingParticles() {
  const particlesRef = React.useRef<THREE.Points>(null);
  const particleCount = 100;

  const particles = React.useMemo(() => {
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }

    return positions;
  }, []);

  useFrame((state) => {
    if (!particlesRef.current) return;

    particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles, 3]}
          count={particleCount}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#8b5cf6"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

/**
 * Scene3D - Main 3D scene composition
 */
function Scene3D() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#ec4899" />

      {/* Animated Spheres */}
      <AnimatedSphere position={[-3, 0, -2]} color="#6366f1" speed={0.5} />
      <AnimatedSphere position={[3, -1, -3]} color="#ec4899" speed={0.7} />
      <AnimatedSphere position={[0, 2, -4]} color="#8b5cf6" speed={0.6} />

      {/* Floating Particles */}
      <FloatingParticles />

      {/* Camera controls (disabled rotation for UX) */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  );
}

/**
 * HeroBackground3D - Premium 3D background with floating shapes
 *
 * Features:
 * - Three.js powered 3D scene
 * - Floating animated spheres
 * - Particle system
 * - Auto-rotate camera
 * - Performance optimized
 *
 * @accessibility
 * - aria-hidden="true" (decorative)
 * - No interactive elements
 * - Doesn't interfere with screen readers
 */
export function HeroBackground3D() {
  const [isClient, setIsClient] = React.useState(false);

  // Ensure client-side rendering (SSR safe)
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div
      className="absolute inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
      role="presentation"
    >
      {/* Canvas container */}
      <div className="h-full w-full opacity-30 dark:opacity-20">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 50 }}
          dpr={[1, 2]} // Adaptive pixel ratio for performance
          performance={{ min: 0.5 }} // Performance degradation threshold
        >
          <Scene3D />
        </Canvas>
      </div>

      {/* Gradient overlay for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
    </div>
  );
}
