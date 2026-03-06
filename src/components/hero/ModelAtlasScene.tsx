"use client";

import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, RoundedBox } from "@react-three/drei";
import type { Group } from "three";
import {
  atlasFaceByKey,
  atlasFaces,
  type AtlasFaceKey,
} from "@/components/hero/modelAtlasConfig";

interface ModelAtlasSceneProps {
  activeFace: AtlasFaceKey;
  onFaceChange: (face: AtlasFaceKey) => void;
  onFaceActivate: (face: AtlasFaceKey) => void;
}

type Vec3 = [number, number, number];

const FACE_TRANSFORMS: Record<AtlasFaceKey, { position: Vec3; rotation: Vec3 }> = {
  vision: { position: [0, 0, 1.02], rotation: [0, 0, 0] },
  genai: { position: [1.02, 0, 0], rotation: [0, Math.PI / 2, 0] },
  "ml-systems": { position: [0, 0, -1.02], rotation: [0, Math.PI, 0] },
  reliability: { position: [-1.02, 0, 0], rotation: [0, -Math.PI / 2, 0] },
  experience: { position: [0, 1.02, 0], rotation: [-Math.PI / 2, 0, 0] },
  "football-lab": { position: [0, -1.02, 0], rotation: [Math.PI / 2, 0, 0] },
};

const FACE_TO_GROUP_ROTATION: Record<AtlasFaceKey, Vec3> = {
  vision: [0, 0, 0],
  genai: [0, -Math.PI / 2, 0],
  "ml-systems": [0, -Math.PI, 0],
  reliability: [0, Math.PI / 2, 0],
  experience: [Math.PI / 2, 0, 0],
  "football-lab": [-Math.PI / 2, 0, 0],
};

function smooth(current: number, target: number, lambda: number, delta: number) {
  return current + (target - current) * (1 - Math.exp(-lambda * delta));
}

function AtlasCube({
  activeFace,
  onFaceChange,
  onFaceActivate,
}: ModelAtlasSceneProps) {
  const groupRef = useRef<Group>(null);
  const [hoveredFace, setHoveredFace] = useState<AtlasFaceKey | null>(null);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;

    const targetRotation = FACE_TO_GROUP_ROTATION[activeFace];
    group.rotation.x = smooth(group.rotation.x, targetRotation[0], 8, delta);
    group.rotation.y = smooth(group.rotation.y, targetRotation[1], 8, delta);
    group.rotation.z = smooth(group.rotation.z, targetRotation[2], 8, delta);

    const targetScale = hoveredFace ? 1.08 : 1;
    group.scale.x = smooth(group.scale.x, targetScale, 6, delta);
    group.scale.y = smooth(group.scale.y, targetScale, 6, delta);
    group.scale.z = smooth(group.scale.z, targetScale, 6, delta);
  });

  return (
    <group ref={groupRef}>
      <RoundedBox args={[1.7, 1.7, 1.7]} radius={0.13} smoothness={4}>
        <meshStandardMaterial
          color="#13171d"
          roughness={0.35}
          metalness={0.65}
          emissive="#090c11"
          emissiveIntensity={0.5}
        />
      </RoundedBox>

      {atlasFaces.map((face) => {
        const transform = FACE_TRANSFORMS[face.key];
        const isHovered = hoveredFace === face.key;
        const isActive = activeFace === face.key;
        const color = isActive ? "#e8ff59" : isHovered ? "#7ec8ff" : "#d8d3cb";

        return (
          <group key={face.key} position={transform.position} rotation={transform.rotation}>
            <mesh
              onPointerOver={(event) => {
                event.stopPropagation();
                setHoveredFace(face.key);
                onFaceChange(face.key);
              }}
              onPointerOut={(event) => {
                event.stopPropagation();
                setHoveredFace(null);
              }}
              onClick={(event) => {
                event.stopPropagation();
                onFaceChange(face.key);
                onFaceActivate(face.key);
              }}
            >
              <planeGeometry args={[1.45, 1.45]} />
              <meshStandardMaterial
                color={isActive ? "#151f0d" : "#11161c"}
                emissive={isActive ? "#3b5518" : isHovered ? "#183047" : "#10151c"}
                emissiveIntensity={isActive ? 0.9 : isHovered ? 0.65 : 0.3}
                roughness={0.28}
                metalness={0.62}
              />
            </mesh>

            <Text
              fontSize={0.19}
              color={color}
              anchorX="center"
              anchorY="middle"
              position={[0, 0, 0.01]}
              maxWidth={1.3}
            >
              {face.label}
            </Text>
          </group>
        );
      })}
    </group>
  );
}

export default function ModelAtlasScene({
  activeFace,
  onFaceChange,
  onFaceActivate,
}: ModelAtlasSceneProps) {
  const activeFaceDescription = useMemo(
    () => atlasFaceByKey[activeFace].description,
    [activeFace]
  );

  return (
    <div className="atlas-scene" data-testid="atlas-scene-canvas" aria-hidden="true">
      <Canvas
        dpr={[1, 1.6]}
        camera={{ position: [0, 0, 5], fov: 34 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["#07090d"]} />
        <ambientLight intensity={0.55} />
        <directionalLight position={[2.8, 3.2, 2.8]} intensity={1.45} color="#f0f4ff" />
        <pointLight position={[-2.2, -2, 2.5]} intensity={1.4} color="#59b8ff" />
        <pointLight position={[2.6, 1.6, 1.4]} intensity={1.2} color="#e8ff59" />
        <AtlasCube
          activeFace={activeFace}
          onFaceChange={onFaceChange}
          onFaceActivate={onFaceActivate}
        />
      </Canvas>

      <p className="atlas-caption text-caption">{activeFaceDescription}</p>

      <style jsx>{`
        .atlas-scene {
          position: relative;
          width: 100%;
          min-height: 390px;
          border: 1px solid var(--border);
          border-radius: 18px;
          overflow: hidden;
          background:
            radial-gradient(circle at 15% 15%, rgba(89, 184, 255, 0.2), transparent 35%),
            radial-gradient(circle at 80% 20%, rgba(232, 255, 89, 0.14), transparent 40%),
            #07090d;
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.06),
            0 14px 40px rgba(0, 0, 0, 0.45);
        }
        .atlas-caption {
          position: absolute;
          left: 14px;
          bottom: 12px;
          color: var(--text-secondary);
          letter-spacing: 0.04em;
          z-index: 2;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}
