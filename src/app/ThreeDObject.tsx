"use client";
import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";

export default function ThreeDObject() {
  return (
    <div style={{ width: "200px", height: "200px", margin: "0 auto" }}>
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} intensity={0.7} />
        <Sphere args={[0.8, 32, 32]}>
          <meshStandardMaterial color="#4F46E5" />
        </Sphere>
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}
