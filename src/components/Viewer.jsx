import React, { useState, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import * as THREE from "three";
import MediaViewPanel from "./MediaViewPanel.jsx"; // Import ScreenCapture component

import OrientationIcon from "../assets/orientation.svg";
import RightBottomIcon from "../assets/right-bottom.svg";
import CollaborationIcon from "../assets/collaboration.svg";
import OrderIcon from "../assets/order.svg";
import SurgicomIcons from "../assets/SurgiCom.svg";
import LayoutToggleIcon from "../assets/layout-toggle.svg";
import LayersPanel from "../assets/layers.svg";

function STLModel({ geometry }) {
  const meshRef = useRef();

  useEffect(() => {
    if (geometry) geometry.center();
  }, [geometry]);

  return (
    <mesh ref={meshRef} geometry={geometry} receiveShadow castShadow>
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
  const [fileName, setFileName] = useState("File Name");
  const [showLayers, setShowLayers] = useState(false);

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
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".stl"
        hidden
        onChange={(e) => {
          if (e.target.files[0]) {
            setFileName(e.target.files[0].name);
            loadSTL(e.target.files[0]);
          }
        }}
      />

      {/* Top-left: SurgiCom brand and filename */}
      <div className="absolute top-2 left-2 z-20 flex items-center space-x-4">
        <div className="flex items-center text-xl font-satoshi font-medium">
          <span className="text-[#598BE4]">Surgi</span>
          <span className="text-black">Com.</span>
        </div>
        <div className="border-l h-5" />
        <div className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
          {fileName}
        </div>
        <div className="border-l h-5" />

        {/* Upload STL icon with hover label */}
        <div className="relative flex flex-col items-center group">
          <img
            src={SurgicomIcons}
            alt="SurgiCom"
            className="h-12 w-auto ml-2 cursor-pointer"
            onClick={() => fileInputRef.current.click()}
          />
          <span className="absolute -bottom-5 text-xs text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Upload STL
          </span>
        </div>
      </div>

      {/* Top-right icons */}
      <div className="absolute top-2 right-3 z-10 flex items-center space-x-2">
        <img
          src={CollaborationIcon}
          alt="Collaboration"
          className="h-16 w-auto cursor-pointer"
        />
        <img
          src={OrderIcon}
          alt="Order"
          className="h-12 w-auto cursor-pointer"
        />
      </div>

      {/* Canvas */}
      <Canvas shadows className="w-full h-full">
        <Scene
          stlGeometry={stlGeometry}
          orbitRef={orbitRef}
          cameraRef={cameraRef}
        />
      </Canvas>

      {/* Bottom-center: Record */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-4 z-10">
        <MediaViewPanel />
      </div>

      {/* Bottom-right: Orientation */}
      <div className="absolute bottom-8 right-20 z-10">
        <img
          src={OrientationIcon}
          alt="Orientation"
          className="h-10 w-auto cursor-pointer"
        />
      </div>

      {/* Bottom-right: Reset View with hover label */}
      <div className="absolute bottom-20 right-6 z-10">
        <div className="relative flex flex-col items-center group">
          <img
            src={RightBottomIcon}
            alt="Reset View"
            className="w-12 h-auto cursor-pointer"
            onClick={resetView}
          />
          <span className="absolute -bottom-5 text-xs text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Reset View
          </span>
        </div>
      </div>

      {/* Layout toggle button */}
      <div className="absolute bottom-72 right-6 z-20">
        <img
          src={LayoutToggleIcon}
          alt="Toggle Layers"
          className="w-12 h-12 cursor-pointer"
          onClick={() => setShowLayers(!showLayers)}
        />
      </div>

      {/* Layers panel popup with padding */}
      {showLayers && (
        <div className="absolute bottom-[21rem] right-6 z-30 p-2 bg-white rounded shadow-lg">
          <img src={LayersPanel} alt="Layers Panel" className="w-68 h-auto" />
        </div>
      )}
    </div>
  );
}
