import React, { useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import * as THREE from "three";

function STLModel({ geometry }) {
  const meshRef = useRef();

  useEffect(() => {
    if (geometry) {
      geometry.center(); // center the geometry
    }
  }, [geometry]);

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      // scale={1.5}
      receiveShadow
      castShadow
    >
      <meshStandardMaterial
        color={"#cccccc"}
        metalness={0.2}
        roughness={0.7}
        flatShading={true}
      />
    </mesh>
  );
}

function Scene({ stlGeometry, orbitRef, cameraRef }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 20, 15]} intensity={1.0} castShadow />
      <directionalLight position={[-10, -10, -5]} intensity={0.3} />
      <PerspectiveCamera makeDefault position={[0, 0, 100]} ref={cameraRef} />
      <OrbitControls
        ref={orbitRef}
        minDistance={10}
        maxDistance={500}
        enableDamping
        dampingFactor={0.1}
      />
      {stlGeometry && <STLModel geometry={stlGeometry} />}
    </>
  );
}

export default function Viewer() {
  const [stlGeometry, setStlGeometry] = useState(null);
  const fileInputRef = useRef();
  const orbitRef = useRef();
  const cameraRef = useRef();

  const loadSTL = (file) => {
    const loader = new STLLoader();
    const reader = new FileReader();
    reader.onload = (e) => {
      const arrayBuffer = e.target.result;
      const geometry = loader.parse(arrayBuffer);

      geometry.computeBoundingBox();
      const size = geometry.boundingBox.getSize(new THREE.Vector3());
      const maxDimension = Math.max(size.x, size.y, size.z);
      const scaleFactor = 50 / maxDimension;
      geometry.scale(scaleFactor, scaleFactor, scaleFactor);

      setStlGeometry(geometry);
    };
    reader.readAsArrayBuffer(file);
  };

  const resetView = () => {
    if (cameraRef.current && orbitRef.current) {
      cameraRef.current.position.set(0, 0, 100);
      orbitRef.current.target.set(0, 0, 0);
      orbitRef.current.update();
    }
  };

  return (
    <div className="w-full h-full relative">
      <Canvas shadows className="w-full h-full">
        <Scene
          stlGeometry={stlGeometry}
          orbitRef={orbitRef}
          cameraRef={cameraRef}
        />
      </Canvas>

      {/* UI Controls */}
      <div className="absolute top-2 left-2 flex space-x-2 z-10">
        <input
          ref={fileInputRef}
          type="file"
          accept=".stl"
          hidden
          onChange={(e) => {
            if (e.target.files[0]) loadSTL(e.target.files[0]);
          }}
        />
        <button
          className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => fileInputRef.current.click()}
        >
          Upload STL
        </button>
        <button
          className="px-2 py-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-600"
          onClick={resetView}
        >
          Reset View
        </button>
      </div>
    </div>
  );
}
