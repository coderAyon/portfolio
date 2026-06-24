import { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Float,
  MeshDistortMaterial,
  PerspectiveCamera,
  RoundedBox,
  Sparkles,
  Text3D,
} from "@react-three/drei";

function GlowMaterial({ color = "#a66bff", emissive = "#6d2cff", opacity = 0.56 }) {
  return (
    <meshStandardMaterial
      color={color}
      emissive={emissive}
      emissiveIntensity={0.72}
      metalness={0.44}
      roughness={0.18}
      transparent
      opacity={opacity}
    />
  );
}

function UiBar({ position, width = 0.78, color = "#e8e1ff", opacity = 0.86 }) {
  return (
    <mesh position={position}>
      <boxGeometry args={[width, 0.035, 0.035]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.42}
        transparent
        opacity={opacity}
        roughness={0.25}
        metalness={0.35}
      />
    </mesh>
  );
}

function PortfolioCard({ position, rotation, scale = 1, accent = "#9d65ff" }) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <RoundedBox args={[1.02, 0.62, 0.045]} radius={0.045} smoothness={8}>
        <meshStandardMaterial
          color="#160922"
          emissive={accent}
          emissiveIntensity={0.28}
          roughness={0.16}
          metalness={0.62}
          transparent
          opacity={0.58}
        />
      </RoundedBox>
      <mesh position={[-0.27, 0.1, 0.04]}>
        <planeGeometry args={[0.35, 0.22]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.8} transparent opacity={0.62} />
      </mesh>
      <UiBar position={[0.2, 0.16, 0.06]} width={0.35} color="#f2eaff" opacity={0.8} />
      <UiBar position={[0.16, 0.02, 0.06]} width={0.48} color="#b78aff" opacity={0.72} />
      <UiBar position={[0.07, -0.12, 0.06]} width={0.3} color="#6de9ff" opacity={0.55} />
    </group>
  );
}

function SceneRig() {
  const group = useRef();
  const mainPanel = useRef();
  const cards = useRef([]);
  const ribbons = useRef([]);
  const shards = useRef([]);
  const { size } = useThree();
  const isMobile = size.width < 640;
  const basePosition = isMobile ? [0.58, 1.04, 0] : [2.15, 0.02, 0];
  const rigScale = isMobile ? 0.58 : 0.88;

  useFrame(({ pointer, clock }) => {
    const t = clock.getElapsedTime();
    if (group.current) {
      group.current.position.x += (basePosition[0] + pointer.x * 0.18 - group.current.position.x) * 0.035;
      group.current.position.y = basePosition[1] + Math.sin(t * 0.55) * 0.07;
      group.current.rotation.y += (pointer.x * 0.16 - group.current.rotation.y) * 0.03;
      group.current.rotation.x += (-pointer.y * 0.1 - group.current.rotation.x) * 0.03;
    }
    if (mainPanel.current) {
      mainPanel.current.rotation.y = -0.28 + Math.sin(t * 0.36) * 0.05;
      mainPanel.current.rotation.z = 0.035 + Math.sin(t * 0.48) * 0.025;
    }
    cards.current.forEach((card, index) => {
      if (!card) return;
      card.position.y += Math.sin(t * 0.9 + index) * 0.0012;
      card.rotation.y += Math.sin(t * 0.45 + index) * 0.0009;
      card.rotation.z += Math.cos(t * 0.38 + index) * 0.0008;
    });
    ribbons.current.forEach((ribbon, index) => {
      if (!ribbon) return;
      ribbon.rotation.z = t * (0.08 + index * 0.02);
      ribbon.rotation.x = Math.PI / (2.8 + index) + Math.sin(t * 0.35 + index) * 0.04;
    });
    shards.current.forEach((shard, index) => {
      if (!shard) return;
      shard.rotation.x = t * (0.25 + index * 0.04);
      shard.rotation.y = -t * (0.18 + index * 0.03);
    });
  });

  return (
    <group ref={group} position={basePosition} scale={rigScale}>
      <Float speed={1.12} rotationIntensity={0.14} floatIntensity={0.42}>
        <group ref={mainPanel}>
          <RoundedBox args={[2.35, 1.45, 0.075]} radius={0.085} smoothness={10} position={[0, 0, 0]}>
            <meshStandardMaterial
              color="#12071f"
              emissive="#7c3cff"
              emissiveIntensity={0.36}
              roughness={0.12}
              metalness={0.72}
              transparent
              opacity={0.72}
            />
          </RoundedBox>
          <RoundedBox args={[2.18, 1.28, 0.025]} radius={0.065} smoothness={8} position={[0, 0, 0.065]}>
            <MeshDistortMaterial
              color="#5c25c9"
              emissive="#8d56ff"
              emissiveIntensity={0.42}
              metalness={0.58}
              roughness={0.16}
              transparent
              opacity={0.32}
              distort={0.16}
              speed={0.75}
            />
          </RoundedBox>
          <Text3D
            font="/fonts/helvetiker_regular.typeface.json"
            size={0.11}
            height={0.01}
            curveSegments={6}
            position={[-0.92, 0.42, 0.12]}
          >
            PORTFOLIO
            <meshStandardMaterial color="#f2edff" emissive="#9d65ff" emissiveIntensity={0.5} roughness={0.2} />
          </Text3D>
          <UiBar position={[-0.37, 0.18, 0.12]} width={1.1} color="#e8e1ff" />
          <UiBar position={[-0.5, 0.0, 0.12]} width={0.82} color="#b78aff" opacity={0.72} />
          <UiBar position={[-0.58, -0.18, 0.12]} width={0.58} color="#6de9ff" opacity={0.58} />
          <mesh position={[0.72, -0.13, 0.12]}>
            <planeGeometry args={[0.62, 0.48]} />
            <meshStandardMaterial color="#9d65ff" emissive="#8d56ff" emissiveIntensity={0.76} transparent opacity={0.48} />
          </mesh>
        </group>

        {[
          { position: [0.78, 0.68, -0.12], rotation: [0.04, -0.45, 0.1], scale: 0.82, accent: "#9d65ff" },
          { position: [-0.74, -0.62, 0.22], rotation: [-0.08, -0.12, -0.12], scale: 0.78, accent: "#6de9ff" },
          { position: [1.36, -0.42, 0.32], rotation: [0.08, -0.7, 0.08], scale: 0.62, accent: "#d398ff" },
        ].map((card, index) => (
          <group
            key={card.accent}
            ref={(node) => {
              cards.current[index] = node;
            }}
          >
            <PortfolioCard {...card} />
          </group>
        ))}

        {[2.1, 2.65].map((radius, index) => (
          <mesh
            key={radius}
            ref={(node) => {
              ribbons.current[index] = node;
            }}
            rotation={[Math.PI / (2.8 + index), Math.PI / (3.2 + index), index * 0.4]}
            scale={[1, 0.52, 1]}
          >
            <torusGeometry args={[radius, 0.01, 12, 192]} />
            <meshStandardMaterial
              color={index === 0 ? "#9d65ff" : "#6de9ff"}
              emissive={index === 0 ? "#7c3cff" : "#0a7895"}
              emissiveIntensity={0.54}
              transparent
              opacity={0.26}
              metalness={0.9}
              roughness={0.22}
            />
          </mesh>
        ))}

        {[
          [-1.36, 0.78, -0.18, 0.13, "#e8e1ff"],
          [1.55, 0.36, 0.24, 0.12, "#6de9ff"],
          [0.35, -1.1, 0.32, 0.1, "#9d65ff"],
          [1.72, -0.82, -0.12, 0.09, "#d398ff"],
        ].map(([x, y, z, scale, color], index) => (
          <mesh
            key={`${x}-${y}`}
            ref={(node) => {
              shards.current[index] = node;
            }}
            position={[x, y, z]}
            scale={scale}
          >
            <octahedronGeometry args={[1, 0]} />
            <GlowMaterial color={color} emissive={color} opacity={0.86} />
          </mesh>
        ))}
      </Float>
      <Sparkles count={130} speed={0.22} size={3.2} scale={[8.6, 4.8, 4]} color="#cab7ff" opacity={0.7} />
      <ContactShadows opacity={0.28} blur={2.8} scale={7} position={[0, -2.16, 0]} color="#5d22c8" />
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas className="hero-canvas" dpr={[1, 1.8]} gl={{ antialias: true, alpha: true }}>
      <PerspectiveCamera makeDefault position={[0, 0.05, 6]} fov={42} />
      <ambientLight intensity={0.86} />
      <spotLight position={[3.5, 4.5, 4.5]} angle={0.42} penumbra={0.8} intensity={12} color="#a173ff" />
      <pointLight position={[-4, -1, 3]} intensity={5.5} color="#6de9ff" />
      <pointLight position={[2.6, 0.8, 2.2]} intensity={4.8} color="#d398ff" />
      <Suspense fallback={null}>
        <SceneRig />
        <Float speed={1.4} rotationIntensity={0.12} floatIntensity={0.36}>
          <Text3D
            font="/fonts/helvetiker_regular.typeface.json"
            size={0.18}
            height={0.015}
            curveSegments={8}
            position={[-1.15, -1.68, 0.8]}
            rotation={[0.06, 0.02, 0]}
          >
            AYON ROY
            <meshStandardMaterial
              color="#f2edff"
              emissive="#7c3cff"
              emissiveIntensity={0.28}
              metalness={0.4}
              roughness={0.26}
            />
          </Text3D>
        </Float>
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}
