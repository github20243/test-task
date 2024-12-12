import React, { useRef, useEffect } from "react";
import { OrbitControls } from "@react-three/drei";
import { styled } from "@mui/material";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";

interface SpinnerProps {
  isLoading: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <SpinnerOverlay>
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />

        <ParticlePlanet />

        <OrbitControls />
      </Canvas>

      <SpinnerText>Загрузка...</SpinnerText>
    </SpinnerOverlay>
  );
};

export default Spinner;

const ParticlePlanet: React.FC = () => {
  const particlesRef = useRef<THREE.InstancedMesh>(null);

  const particleCount = 1000;
  const radius = 2; 

  const particlePositions = Array.from({ length: particleCount }).map(() => {
    const phi = Math.acos(2 * Math.random() - 1); 
    const theta = Math.random() * 2 * Math.PI; 

    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);

    return [x, y, z];
  });

  useFrame(() => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.01;
    }
  });

  useEffect(() => {
    if (particlesRef.current) {
      particlePositions.forEach(([x, y, z], index) => {
        const matrix = new THREE.Matrix4();
        matrix.setPosition(x, y, z);
        particlesRef.current?.setMatrixAt(index, matrix);
      });
      particlesRef.current.instanceMatrix.needsUpdate = true;
    }
  }, []);

  return (
    <instancedMesh ref={particlesRef} args={[new THREE.BufferGeometry(), new THREE.MeshBasicMaterial(), particleCount]}>
      <sphereGeometry args={[0.015, 8, 8]} />  
      <meshStandardMaterial color="#ffffff" />
    </instancedMesh>
  );
};

const SpinnerOverlay = styled("div")({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  alignItems: "center",
  background: "linear-gradient(to bottom, #0f0f1f, #292939)",
  zIndex: 9999,
  overflow: "hidden", 
});

const SpinnerText = styled("div")({
  color: "#ffffff",
  fontSize: "18px",
  fontWeight: "bold",
  marginBottom: "40px", 
	position: "absolute",
	bottom: "60px",
	fontFamily: "monospace"
});