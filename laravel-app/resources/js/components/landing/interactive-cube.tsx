import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { Environment } from '@react-three/drei';

function Cube() {
    const meshRef = useRef<Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        const time = state.clock.getElapsedTime();
        meshRef.current.rotation.x = time * 0.2;
        meshRef.current.rotation.y = time * 0.3;
        meshRef.current.position.y = Math.sin(time) * 0.1;
    });

    return (
        <mesh ref={meshRef} aria-hidden="true">
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.8} />
        </mesh>
    );
}

export default function InteractiveCube() {
    return (
        <div className="h-full w-full min-h-[400px]" aria-hidden="true">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }} fallback={<div className="bg-muted w-full h-full rounded-2xl" />}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <Cube />
                <Environment preset="city" />
            </Canvas>
        </div>
    );
}
