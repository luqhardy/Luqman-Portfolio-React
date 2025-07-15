"use client";
import { Canvas, ThreeEvent } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";

function Model() {
  const { scene } = useGLTF("/model.glb");
  const [isHovered, setIsHovered] = useState(false);

  // Refs to store original material properties
  const originalEmissive = useRef(new Map<string, THREE.Color>());
  const originalEmissiveIntensity = useRef(new Map<string, number>());

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh && "emissive" in child.material) {
        const material = child.material as THREE.MeshStandardMaterial;

        if (isHovered) {
          // Store original properties if not already stored
          if (!originalEmissive.current.has(child.uuid)) {
            originalEmissive.current.set(child.uuid, material.emissive.clone());
            originalEmissiveIntensity.current.set(
              child.uuid,
              material.emissiveIntensity
            );
          }

          // Apply glow
          material.emissive.setHex(0xffffff);
          material.emissiveIntensity = 0.2;
        } else {
          // Restore original properties
          if (originalEmissive.current.has(child.uuid)) {
            material.emissive.copy(originalEmissive.current.get(child.uuid)!);
            material.emissiveIntensity =
              originalEmissiveIntensity.current.get(child.uuid)!;
          }
        }
        material.needsUpdate = true;
      }
    });
  }, [isHovered, scene]);

  return (
    <primitive
      object={scene}
      scale={0.7}
      onPointerEnter={(e: ThreeEvent<PointerEvent>) => {
        // Stop event propagation to prevent unintended effects on parent elements
        e.stopPropagation();
        setIsHovered(true);
      }}
      onPointerLeave={(e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        setIsHovered(false);
      }}
    />
  );
}

export default function ThreeDObject() {
  return (
    <div style={{ width: "300px", height: "200px", marginTop: "50px" }}>
      <Canvas camera={{ position: [0, 0, 2], fov: 30 }}>
        <ambientLight intensity={1} />
        <directionalLight position={[2, 2, 2]} intensity={5} />
        <Model />
        <OrbitControls
          enableZoom={false}
          autoRotate={true}
          enableDamping={true}
          zoomToCursor={true}
        />
      </Canvas>
    </div>
  );
}

// Preload the model for faster loading.
useGLTF.preload("/model.glb");
