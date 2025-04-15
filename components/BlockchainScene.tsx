// components/BlockchainScene.tsx

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default function BlockchainScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Blockchain blocks
    const blocks: THREE.Mesh[] = [];
    for (let i = 0; i < 8; i++) {
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshPhongMaterial({
        color: new THREE.Color(`hsl(${i * 45}, 70%, 50%)`),
        emissive: new THREE.Color(`hsl(${i * 45}, 70%, 30%)`),
      });
      const cube = new THREE.Mesh(geometry, material);
      cube.position.x = i * 1.5;
      cube.rotation.y = i * 0.5;
      scene.add(cube);
      blocks.push(cube);
    }

    // Camera and renderer setup
    camera.position.z = 15;
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      blocks.forEach((block, i) => {
        block.rotation.y += 0.01;
        block.position.y = Math.sin(Date.now() * 0.001 + i) * 0.5;
      });

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
}