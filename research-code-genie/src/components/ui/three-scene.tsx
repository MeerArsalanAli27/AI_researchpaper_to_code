import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';

// Interactive 360° rotating element
const Interactive360Sphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} scale={1.8}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial 
          color="#00E0FF" 
          roughness={0.1}
          metalness={0.9}
          emissive="#001122"
          emissiveIntensity={0.3}
        />
      </mesh>
    </Float>
  );
};

// Enhanced floating cubes with turquoise colors
const FloatingCube = ({ position, scale, color, index }: any) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005 + index * 0.001;
      meshRef.current.rotation.y += 0.003 + index * 0.001;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + index) * 0.5;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={scale}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={color}
        roughness={0.2}
        metalness={0.8}
        emissive={color}
        emissiveIntensity={0.1}
      />
    </mesh>
  );
};

const AIVisualization = () => {
  // Enhanced turquoise color palette
  const cubeData = useMemo(() => 
    Array.from({ length: 12 }).map((_, index) => ({
      position: [
        Math.sin(index * Math.PI * 2 / 12) * 5,
        Math.cos(index * Math.PI * 2 / 12) * 2.5,
        Math.sin(index * 0.5) * 3
      ] as [number, number, number],
      scale: 0.3 + Math.random() * 0.4,
      rotation: [index * 0.2, index * 0.3, index * 0.1] as [number, number, number],
      color: index % 3 === 0 ? "#00E0FF" : index % 3 === 1 ? "#00B8CC" : "#008B99"
    })), []
  );

  return (
    <group>
      {/* Central 360° Interactive Sphere */}
      <Interactive360Sphere />

      {/* Enhanced floating cubes */}
      {cubeData.map((cube, index) => (
        <FloatingCube 
          key={index}
          position={cube.position}
          scale={cube.scale}
          color={cube.color}
          index={index}
        />
      ))}

      {/* Enhanced lighting with turquoise theme */}
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1.2}
        color="#FFFFFF"
      />
      <pointLight position={[-10, -10, -10]} color="#00E0FF" intensity={0.8} />
      <pointLight position={[10, 10, 10]} color="#00B8CC" intensity={0.6} />
      <pointLight position={[0, 15, 0]} color="#00FFFF" intensity={0.4} />
      
      {/* Additional atmospheric lighting */}
      <spotLight
        position={[0, 20, 0]}
        angle={Math.PI / 4}
        penumbra={0.5}
        intensity={0.5}
        color="#00E0FF"
        castShadow
      />
    </group>
  );
};

interface ThreeSceneProps {
  className?: string;
}

const ThreeScene = ({ className = "" }: ThreeSceneProps) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <Suspense fallback={null}>
          <AIVisualization />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
            makeDefault
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ThreeScene;