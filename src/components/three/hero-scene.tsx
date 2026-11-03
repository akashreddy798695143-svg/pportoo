'use client';

/**
 * HeroScene — premium futuristic 3D hero background for a dark portfolio.
 *
 * Deep-black space (the page supplies the #080808 backdrop through the
 * transparent canvas), electric purple + neon cyan glow accents.
 * Fully procedural: no textures, fonts, HDRIs or remote assets of any kind.
 * Intended to be wrapped by an absolutely-positioned parent filling the hero.
 */

import { useMemo, useRef, type ReactNode } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Stars } from '@react-three/drei';

/* --------------------------------- config --------------------------------- */

const TORUS_KNOT_ARGS: ConstructorParameters<typeof THREE.TorusKnotGeometry> = [1.15, 0.35, 220, 36];
const SHELL_ARGS: ConstructorParameters<typeof THREE.IcosahedronGeometry> = [2.35, 1];
const STARS_COUNT_DESKTOP = 2500;
const STARS_COUNT_MOBILE = 1200;
const MOBILE_BREAKPOINT = 768;

/** Frame-rate independent damping toward a target (exponential smoothing). */
function damp(current: number, target: number, lambda: number, delta: number): number {
  return THREE.MathUtils.lerp(current, target, 1 - Math.exp(-lambda * delta));
}

type ShapeKind = 'octahedron' | 'torus' | 'sphere' | 'icoWireframe' | 'ring';

interface ShapeConfig {
  kind: ShapeKind;
  position: [number, number, number];
  /** initial orientation */
  rotation?: [number, number, number];
  scale: number;
  color: string;
  emissive: string;
  emissiveIntensity: number;
  /** wireframe styling (rendered with meshBasicMaterial) */
  wireframe?: boolean;
  opacity?: number;
  /** per-mesh self-spin speed (rad/s), layered on top of <Float> motion */
  spin: number;
  /** drei <Float> params: [speed, rotationIntensity, floatIntensity] */
  float: [number, number, number];
  /** skipped on small screens to save fill-rate / draw calls */
  hideOnMobile?: boolean;
}

/* ------------------------------ central object ----------------------------- */

function CentralKnot() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    // Slow continuous auto-rotation, different speed per axis.
    mesh.rotation.x += delta * 0.16;
    mesh.rotation.y += delta * 0.24;
    // Subtle extra drift that follows the pointer.
    mesh.position.x = damp(mesh.position.x, state.pointer.x * 0.35, 2.0, delta);
    mesh.position.y = damp(mesh.position.y, state.pointer.y * 0.25, 2.0, delta);
  });

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={TORUS_KNOT_ARGS} />
      <MeshDistortMaterial
        color="#7c3aed"
        emissive="#4c1d95"
        emissiveIntensity={0.55}
        metalness={0.75}
        roughness={0.22}
        distort={0.35}
        speed={1.6}
      />
    </mesh>
  );
}

/* ------------------------- wireframe counter-shell ------------------------- */

function WireframeShell() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    // Counter-rotates slowly against the central knot.
    mesh.rotation.y -= delta * 0.07;
    mesh.rotation.z += delta * 0.045;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={SHELL_ARGS} />
      <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.12} depthWrite={false} />
    </mesh>
  );
}

/* ------------------------------ floating shapes ----------------------------- */

function ShapeGeometry({ kind }: { kind: ShapeKind }) {
  switch (kind) {
    case 'octahedron':
      return <octahedronGeometry args={[1, 0]} />;
    case 'torus':
      return <torusGeometry args={[0.55, 0.18, 24, 64]} />;
    case 'sphere':
      return <sphereGeometry args={[1, 24, 24]} />;
    case 'icoWireframe':
      return <icosahedronGeometry args={[1, 0]} />;
    case 'ring':
      return <torusGeometry args={[0.95, 0.035, 12, 96]} />;
  }
}

function ShapeMaterial({ config }: { config: ShapeConfig }) {
  if (config.wireframe) {
    return (
      <meshBasicMaterial
        color={config.color}
        wireframe
        transparent
        opacity={config.opacity ?? 0.15}
        depthWrite={false}
      />
    );
  }
  return (
    <meshStandardMaterial
      color={config.color}
      emissive={config.emissive}
      emissiveIntensity={config.emissiveIntensity}
      metalness={0.6}
      roughness={0.28}
      transparent={(config.opacity ?? 1) < 1}
      opacity={config.opacity ?? 1}
    />
  );
}

function FloatingShape({ config }: { config: ShapeConfig }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    // Each shape also spins on its own axis, on top of the Float motion.
    mesh.rotation.x += delta * config.spin;
    mesh.rotation.y += delta * config.spin * 1.35;
  });

  return (
    <Float
      speed={config.float[0]}
      rotationIntensity={config.float[1]}
      floatIntensity={config.float[2]}
    >
      <mesh ref={meshRef} position={config.position} rotation={config.rotation} scale={config.scale}>
        <ShapeGeometry kind={config.kind} />
        <ShapeMaterial config={config} />
      </mesh>
    </Float>
  );
}

/* --------------------------------- lights ---------------------------------- */

/**
 * three r155+ uses physically-correct lights, so pointLight intensities are
 * high (candela-like units that fall off with distance² via decay=2).
 */
function Lights() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <pointLight position={[4, 3, 4]} intensity={60} color="#a855f7" distance={30} decay={2} />
      <pointLight position={[-5, -2, 3]} intensity={40} color="#22d3ee" distance={30} decay={2} />
      <directionalLight position={[2, 5, 6]} intensity={1.2} color="#ffffff" />
    </>
  );
}

/* ------------------------------ mouse parallax ------------------------------ */

function ParallaxGroup({ children }: { children: ReactNode }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;
    // Smoothly ease the whole scene toward a slight pointer tilt.
    group.rotation.y = damp(group.rotation.y, state.pointer.x * 0.25, 2.2, delta);
    group.rotation.x = damp(group.rotation.x, -state.pointer.y * 0.18, 2.2, delta);
  });

  return <group ref={groupRef}>{children}</group>;
}

/* ---------------------------------- scene ----------------------------------- */

function Scene() {
  // Reactive viewport width from R3F — SSR-safe, no direct window access.
  const width = useThree((state) => state.size.width);
  const isMobile = width < MOBILE_BREAKPOINT;

  // Shape layout is static; memo keeps the config stable across re-renders.
  // Positions keep the central band clear (hero text sits there) — shapes
  // hug the right side and the left/right edges.
  const shapes = useMemo<ShapeConfig[]>(
    () => [
      { kind: 'octahedron', position: [3.1, 1.5, -1.2], scale: 0.55,
        color: '#2e1065', emissive: '#a855f7', emissiveIntensity: 1.6,
        spin: 0.5, float: [1.6, 0.7, 1.4] },
      { kind: 'torus', position: [-3.6, 1.9, -2.2], rotation: [0.7, 0.3, 0], scale: 0.5,
        color: '#164e63', emissive: '#22d3ee', emissiveIntensity: 1.5,
        spin: 0.4, float: [1.3, 0.9, 1.6] },
      { kind: 'sphere', position: [2.5, -1.8, 0.6], scale: 0.18,
        color: '#1e1b4b', emissive: '#c084fc', emissiveIntensity: 2.2,
        spin: 0.3, float: [2.0, 0.5, 1.8] },
      { kind: 'sphere', position: [4.3, -0.9, -1.4], scale: 0.13,
        color: '#083344', emissive: '#67e8f9', emissiveIntensity: 2.4,
        spin: 0.3, float: [2.4, 0.4, 2.0] },
      { kind: 'sphere', position: [-4.4, -1.6, -1.8], scale: 0.11,
        color: '#1e1b4b', emissive: '#a855f7', emissiveIntensity: 2.0,
        spin: 0.3, float: [1.8, 0.5, 2.2], hideOnMobile: true },
      { kind: 'icoWireframe', position: [1.9, 2.4, -2.6], scale: 0.55,
        color: '#ffffff', emissive: '#ffffff', emissiveIntensity: 0,
        wireframe: true, opacity: 0.16, spin: 0.25, float: [1.1, 1.1, 1.3] },
      { kind: 'ring', position: [3.7, 2.5, -3.2], rotation: [1.1, 0.4, -0.5], scale: 1.0,
        color: '#312e81', emissive: '#7c3aed', emissiveIntensity: 0.8,
        spin: 0.35, float: [1.2, 0.8, 1.5], hideOnMobile: true },
    ],
    [],
  );

  const visibleShapes = useMemo(
    () => shapes.filter((shape) => !isMobile || !shape.hideOnMobile),
    [shapes, isMobile],
  );

  return (
    <>
      {/* gentle depth fade toward the page backdrop */}
      <fog attach="fog" args={['#080808', 14, 34]} />
      <ParallaxGroup>
        <Lights />
        <Stars
          radius={60}
          depth={40}
          count={isMobile ? STARS_COUNT_MOBILE : STARS_COUNT_DESKTOP}
          factor={3}
          saturation={0.6}
          fade
          speed={0.6}
        />
        {/*
          Composition group: shifted toward the right on desktop so the hero
          copy stays fully readable; centered/lowered + scaled down on mobile.
        */}
        <group
          position={isMobile ? [0, -0.4, 0] : [2.35, 0, 0]}
          scale={isMobile ? 0.8 : 1}
        >
          <CentralKnot />
          <WireframeShell />
          {visibleShapes.map((shape, index) => (
            <FloatingShape key={`${shape.kind}-${index}`} config={shape} />
          ))}
        </group>
      </ParallaxGroup>
    </>
  );
}

/* --------------------------------- export ----------------------------------- */

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 8], fov: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      frameloop="always"
      style={{ width: '100%', height: '100%' }}
    >
      <Scene />
    </Canvas>
  );
}
