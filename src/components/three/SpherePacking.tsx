import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const SpherePacking: React.FC = () => {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Check if we have a mount point
        if (!mountRef.current) return;

        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        // Spheres
        const spheres: THREE.Mesh[] = [];
        for (let i = 0; i < 200; i++) {
            const geometry = new THREE.SphereGeometry(0.1, 32, 32);
            const material = new THREE.MeshStandardMaterial({ 
                color: Math.random() * 0xffffff,
                metalness: 0.5,
                roughness: 0.5 
            });
            const sphere = new THREE.Mesh(geometry, material);
            
            // Randomize position
            sphere.position.x = Math.random() * 4 - 2;
            sphere.position.y = Math.random() * 4 - 2;
            sphere.position.z = Math.random() * 4 - 2;
            
            scene.add(sphere);
            spheres.push(sphere);
        }

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xffffff, 1, 100);
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);

            spheres.forEach(sphere => {
                sphere.rotation.x += 0.01;
                sphere.rotation.y += 0.01;
            });

            renderer.render(scene, camera);
        };

        animate();

        // Resize handler
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            mountRef.current?.removeChild(renderer.domElement);
            renderer.dispose();
        };
    }, []);

    return <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />;
};

export default SpherePacking;