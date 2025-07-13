"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function Model() {
  const gltf = useGLTF("/model.glb");
  return <primitive object={gltf.scene} scale={0.7} />;
}

export default function ThreeDObject() {
  return (
    <div style={{ width: "300px", height: "200px", marginTop: "50px" }}>
      <Canvas camera={{ position: [0, 0, 2], fov: 30 }}>
        <ambientLight intensity={1} />
        <directionalLight position={[2, 2, 2]} intensity={5} />
        <Model />
        <OrbitControls enableZoom={false} autoRotate={true} enableDamping={true} zoomToCursor={true} />
      </Canvas>
    </div>
  );
}

// DreiのGLTFローダー用型定義
useGLTF.preload("/model.glb");
