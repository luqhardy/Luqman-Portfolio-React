"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function Model() {
  const gltf = useGLTF("/model.glb");
  return <primitive object={gltf.scene} scale={2} />;
}

export default function ThreeDObject() {
  return (
    <div style={{ width: "300px", height: "200px", margin: "auto" }}>
      <Canvas camera={{ position: [0, 0, 2], fov: 30 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[2, 2, 2]} intensity={1} />
        <Model />
        <OrbitControls enableZoom={true} autoRotate={true} />
      </Canvas>
    </div>
  );
}

// DreiのGLTFローダー用型定義
useGLTF.preload("/model.glb");
