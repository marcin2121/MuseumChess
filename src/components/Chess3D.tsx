"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Center, Environment } from "@react-three/drei";
import { Chess } from "chess.js";
import * as THREE from "three";

// ─── Accurate Staunton lathe profiles ───
const V = (x: number, y: number) => new THREE.Vector2(x, y);

function pawnProfile(): THREE.Vector2[] {
  return [
    V(0.00,0.00), V(0.24,0.00), V(0.26,0.02), V(0.26,0.06), V(0.24,0.08),
    V(0.14,0.10), V(0.12,0.12), V(0.10,0.16), V(0.09,0.22), V(0.08,0.28),
    V(0.09,0.32), V(0.12,0.34), V(0.13,0.36), V(0.12,0.38), V(0.10,0.40),
    V(0.12,0.44), V(0.14,0.48), V(0.13,0.52), V(0.10,0.55), V(0.06,0.57),
    V(0.00,0.58),
  ];
}

function rookProfile(): THREE.Vector2[] {
  return [
    V(0.00,0.00), V(0.26,0.00), V(0.28,0.02), V(0.28,0.07), V(0.26,0.09),
    V(0.15,0.11), V(0.13,0.13), V(0.11,0.18), V(0.10,0.26), V(0.10,0.34),
    V(0.11,0.40), V(0.13,0.44), V(0.15,0.46), V(0.14,0.48), V(0.12,0.50),
    V(0.13,0.52), V(0.16,0.54), V(0.18,0.56), V(0.18,0.62),
    V(0.20,0.62), V(0.20,0.68), V(0.16,0.68), V(0.16,0.64),
    V(0.12,0.64), V(0.12,0.68), V(0.08,0.68), V(0.08,0.62), V(0.00,0.62),
  ];
}

function knightProfile(): THREE.Vector2[] {
  // Full lathe knight — symmetric and consistent with other pieces
  return [
    V(0.00,0.00), V(0.26,0.00), V(0.28,0.02), V(0.28,0.07), V(0.26,0.09),
    V(0.15,0.11), V(0.13,0.14), V(0.11,0.20), V(0.10,0.28), V(0.09,0.34),
    V(0.10,0.38), V(0.12,0.40), V(0.14,0.42), V(0.13,0.44), V(0.10,0.46),
    V(0.09,0.50), V(0.10,0.54), V(0.14,0.58), // wide flare
    V(0.16,0.60), V(0.15,0.63), V(0.11,0.66), // taper
    V(0.08,0.68), V(0.10,0.70), V(0.12,0.72), // top bulb
    V(0.11,0.74), V(0.08,0.76), V(0.04,0.77), V(0.00,0.78),
  ];
}

function bishopProfile(): THREE.Vector2[] {
  return [
    V(0.00,0.00), V(0.26,0.00), V(0.28,0.02), V(0.28,0.07), V(0.26,0.09),
    V(0.15,0.11), V(0.13,0.14), V(0.11,0.20), V(0.10,0.28), V(0.09,0.36),
    V(0.10,0.40), V(0.13,0.42), V(0.14,0.44), V(0.13,0.46), V(0.11,0.48),
    V(0.12,0.52), V(0.14,0.56), V(0.13,0.62), V(0.10,0.68),
    V(0.06,0.74), V(0.02,0.78), V(0.00,0.79),
  ];
}

function queenProfile(): THREE.Vector2[] {
  return [
    V(0.00,0.00), V(0.26,0.00), V(0.28,0.02), V(0.28,0.07), V(0.26,0.09),
    V(0.15,0.11), V(0.13,0.14), V(0.11,0.20), V(0.10,0.30), V(0.09,0.40),
    V(0.10,0.46), V(0.13,0.48), V(0.14,0.50), V(0.13,0.52), V(0.11,0.54),
    V(0.12,0.58), V(0.15,0.62), V(0.16,0.66), V(0.14,0.70),
    V(0.16,0.72), V(0.15,0.74), V(0.10,0.76), V(0.06,0.78),
    V(0.08,0.80), V(0.09,0.83), V(0.08,0.86), V(0.05,0.88), V(0.00,0.89),
  ];
}

function kingProfile(): THREE.Vector2[] {
  return [
    V(0.00,0.00), V(0.28,0.00), V(0.30,0.02), V(0.30,0.08), V(0.28,0.10),
    V(0.16,0.12), V(0.14,0.15), V(0.12,0.22), V(0.11,0.32), V(0.10,0.42),
    V(0.11,0.48), V(0.14,0.50), V(0.15,0.52), V(0.14,0.54), V(0.12,0.56),
    V(0.13,0.60), V(0.16,0.64), V(0.17,0.68), V(0.15,0.72),
    V(0.17,0.74), V(0.16,0.76), V(0.12,0.78), V(0.08,0.80),
    V(0.04,0.82), V(0.00,0.83),
  ];
}

const profiles: Record<string, () => THREE.Vector2[]> = {
  p: pawnProfile, r: rookProfile, n: knightProfile,
  b: bishopProfile, q: queenProfile, k: kingProfile,
};

// ─── Piece Component ───
function Piece({ type, color, position }: { type: string; color: string; position: [number, number, number] }) {
  const isWhite = color === "w";

  const mat = useMemo(() => ({
    color: isWhite ? "#f5edd4" : "#1e1c19",
    roughness: isWhite ? 0.18 : 0.12,
    metalness: isWhite ? 0.02 : 0.15,
    clearcoat: 1.0,
    clearcoatRoughness: isWhite ? 0.15 : 0.05,
    envMapIntensity: 1.2,
  }), [isWhite]);

  const profile = useMemo(() => (profiles[type] || pawnProfile)(), [type]);

  return (
    <group position={position} scale={[1, 1.15, 1]}>
      {/* Main lathe body */}
      <mesh castShadow>
        <latheGeometry args={[profile, 48]} />
        <meshPhysicalMaterial {...mat} />
      </mesh>




      {/* King cross */}
      {type === "k" && (
        <group position={[0, 0.83, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.03, 0.16, 0.03]} />
            <meshPhysicalMaterial {...mat} />
          </mesh>
          <mesh position={[0, 0.05, 0]} castShadow>
            <boxGeometry args={[0.10, 0.03, 0.03]} />
            <meshPhysicalMaterial {...mat} />
          </mesh>
        </group>
      )}

      {/* Bishop tip ball */}
      {type === "b" && (
        <mesh position={[0, 0.82, 0]} castShadow>
          <sphereGeometry args={[0.03, 12, 12]} />
          <meshPhysicalMaterial {...mat} />
        </mesh>
      )}
    </group>
  );
}

// ─── Board ───
function BoardFrame() {
  return (
    <mesh position={[0, -0.06, 0]} receiveShadow>
      <boxGeometry args={[8.6, 0.14, 8.6]} />
      <meshStandardMaterial color="#1a1714" roughness={0.3} metalness={0.4} />
    </mesh>
  );
}

export default function Chess3D() {
  const chess = useMemo(() => new Chess(), []);
  const [board, setBoard] = useState(chess.board());
  const [moveIndex, setMoveIndex] = useState(0);

  const moves = useMemo(() => [
    "Nf3","Nf6","c4","g6","Nc3","Bg7","d4","O-O","Bf4","d5",
    "Qb3","dxc4","Qxc4","c6","e4","Nbd7","Rd1","Nb6","Qc5","Bg4",
    "Bg5","Na4","Qa3","Nxc3","bxc3","Nxe4","Bxe7","Qb6","Bc4","Nxc3",
    "Bc5","Rfe8+","Kf1","Be6","Bxb6","Bxc4+","Kg1","Ne2+","Kf1","Nxd4+",
    "Kg1","Ne2+","Kf1","Nc3+","Kg1","axb6","Qb4","Ra4","Qxb6","Nxd1",
    "h3","Rxa2","Kh2","Nxf2","Re1","Rxe1","Qd8+","Bf8","Nxe1","Bd5",
    "Nf3","Ne4","Qb8","b5","h4","h5","Ne5","Kg7","Kg1","Bc5+",
    "Kf1","Ng3+","Ke1","Bb4+","Kd1","Bb3+","Kc1","Ne2+","Kb1","Nc3+",
    "Kc1","Rc2#"
  ], []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (moveIndex >= moves.length) {
        chess.reset();
        setBoard([...chess.board()]);
        setMoveIndex(0);
        return;
      }
      try { chess.move(moves[moveIndex]); setBoard([...chess.board()]); } catch { /* skip */ }
      setMoveIndex(i => i + 1);
    }, 2000);
    return () => clearInterval(timer);
  }, [moveIndex, chess, moves]);

  return (
    <div className="w-full h-full">
      <Canvas
        shadows
        camera={{ position: [6, 5, 9], fov: 40 }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
        dpr={[1, 2]}
      >
        <color attach="background" args={["#0a0a0a"]} />
        <fog attach="fog" args={["#0a0a0a", 14, 30]} />

        {/* Studio lighting for beautiful reflections */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[8, 14, 6]} intensity={2.5} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
        <directionalLight position={[-5, 8, -4]} intensity={0.8} color="#b8cce0" />
        <pointLight position={[0, 6, 0]} intensity={0.6} color="#fff5e0" />
        <spotLight position={[0, 10, 0]} angle={0.5} penumbra={0.8} intensity={1.0} castShadow color="#fffff0" />


        <Center>
          <group>
            <BoardFrame />

            {Array.from({ length: 8 }).map((_, row) =>
              Array.from({ length: 8 }).map((_, col) => {
                const isDark = (row + col) % 2 !== 0;
                return (
                  <mesh key={`sq-${row}-${col}`} position={[col - 3.5, 0, row - 3.5]} receiveShadow>
                    <boxGeometry args={[0.98, 0.06, 0.98]} />
                    <meshStandardMaterial
                      color={isDark ? "#2a2218" : "#d4c5a0"}
                      roughness={isDark ? 0.55 : 0.25}
                      metalness={0.05}
                    />
                  </mesh>
                );
              })
            )}

            {board.map((rowArr, ri) =>
              rowArr.map((piece, ci) => {
                if (!piece) return null;
                return (
                  <Piece
                    key={`p-${ri}-${ci}-${piece.type}-${piece.color}`}
                    type={piece.type}
                    color={piece.color}
                    position={[ci - 3.5, 0.03, ri - 3.5]}
                  />
                );
              })
            )}
          </group>
        </Center>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.35}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2.2}
        />
      </Canvas>
    </div>
  );
}
