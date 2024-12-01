import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { DotScreenPass } from "three/examples/jsm/postprocessing/DotScreenPass";
import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass";
import { GUI } from "dat.gui";
import { gsap } from "gsap";

const ThreeJS_Sphere: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const guiRef = useRef<GUI | null>(null);

  const guiParams = {
    deformAmount: 0.1,
    transparency: 0.5,
    iridescenceIntensity: 1.0,
    noiseStrength: 0.2,
    bloomStrength: 3,
    bloomRadius: 0.4,
    bloomThreshold: 0,
    activateGlitch: false,
    dotScale: 0.1,
    activateDotScreen: true,
  };

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true });
    const controls = new OrbitControls(camera, renderer.domElement);
    let composer: EffectComposer;
    let sphere: THREE.Mesh;
    let bloomPass: UnrealBloomPass;
    let dotScreenPass: DotScreenPass;
    let glitchPass: GlitchPass;

    camera.position.set(0, 0, 3);

    // Create the sphere geometry and material
    const geometry = new THREE.SphereGeometry(1, 16, 16);
    const material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: guiParams.transparency,
    });
    sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Add a light
    const light = new THREE.PointLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    scene.add(light);

    // Create the Effect Composer and add passes
    composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));

    // Add BloomPass
    bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), guiParams.bloomStrength, guiParams.bloomRadius, guiParams.bloomThreshold);
    composer.addPass(bloomPass);

    // Add DotScreenPass
    dotScreenPass = new DotScreenPass(new THREE.Vector2(0, 0), guiParams.dotScale);
    dotScreenPass.enabled = true;
    composer.addPass(dotScreenPass);

    // Add GlitchPass
    glitchPass = new GlitchPass();
    glitchPass.enabled = false;
    composer.addPass(glitchPass);

    // Create GUI controls
    guiRef.current = new GUI();
    guiRef.current.add(guiParams, "deformAmount", 0.1, 2.0).onChange(updateDeformation);
    guiRef.current.add(guiParams, "transparency", 0, 1).onChange((value) => {
      sphere.material.opacity = value;
    });
    guiRef.current.add(guiParams, "bloomStrength", 0, 3).onChange((value) => {
      bloomPass.strength = value;
    });
    guiRef.current.add(guiParams, "bloomRadius", 0, 1).onChange((value) => {
      bloomPass.radius = value;
    });
    guiRef.current.add(guiParams, "bloomThreshold", 0, 1).onChange((value) => {
      bloomPass.threshold = value;
    });
    guiRef.current.add(guiParams, "activateGlitch").onChange((value) => {
      glitchPass.enabled = value;
    });
    guiRef.current.add(guiParams, "activateDotScreen").onChange((value) => {
      dotScreenPass.enabled = value;
    });
    guiRef.current.add(guiParams, "dotScale", 0.1, 2, 0.1).onChange((value) => {
      dotScreenPass.uniforms["scale"].value = value;
    });

    // Handle window resize
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onWindowResize);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      sphere.rotation.x += 0.001;
      sphere.rotation.y += 0.005;
      sphere.rotation.z += 0.001;
      controls.update();
      composer.render();
    };

    // Initialize the animation
    animate();

    // Deformation update
    function updateDeformation() {
      const positionAttribute = sphere.geometry.attributes.position;
      const vertex = new THREE.Vector3();

      for (let i = 0; i < positionAttribute.count; i++) {
        vertex.fromBufferAttribute(positionAttribute, i);
        vertex.normalize().multiplyScalar(1 + guiParams.deformAmount * Math.sin(vertex.length() * 15));
        positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
      }
      positionAttribute.needsUpdate = true;
    }

    // Clean up on unmount
    return () => {
      window.removeEventListener("resize", onWindowResize);
      if (guiRef.current) {
        guiRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="fixed overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

export default ThreeJS_Sphere;
