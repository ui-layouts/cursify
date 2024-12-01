export const spherePackingCode = `
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface SpherePacking {
     count?: number;
     minSize?: number;
     maxSize?: number;
}

const SpherePacking: React.FC<SpherePacking> = ({
     count = 200,
     minSize = 0.5,
     maxSize = 1
}) => {
     const canvasRef = useRef<HTMLCanvasElement>(null);
     const [scene, setScene] = useState<THREE.Scene | null>(null);
     const [renderer, setRenderer] = useState<THREE.WebGLRenderer | null>(null);
     const [camera, setCamera] = useState<THREE.PerspectiveCamera | null>(null);
     const spheresRef = useRef<THREE.Mesh[]>([]);
     const [isPaused, setIsPaused] = useState(false);

     const generateRandomColor = () => {
          return Math.random() * 0xffffff;
     };

     const createSpheres = () => {
          if (!scene) return;

          // Remove existing spheres
          spheresRef.current.forEach(sphere => {
               scene.remove(sphere);
          });
          spheresRef.current = [];

          // Create new spheres
          for (let i = 0; i < count; i++) {
               const radius = THREE.MathUtils.randFloat(minSize, maxSize);
               const geometry = new THREE.SphereGeometry(radius, 32, 32);
               const material = new THREE.MeshStandardMaterial({
                    color: generateRandomColor(),
                    metalness: 0.5,
                    roughness: 0.5
               });

               const sphere = new THREE.Mesh(geometry, material);

               // Randomize position
               sphere.position.x = THREE.MathUtils.randFloatSpread(10);
               sphere.position.y = THREE.MathUtils.randFloatSpread(10);
               sphere.position.z = THREE.MathUtils.randFloatSpread(10);

               scene.add(sphere);
               spheresRef.current.push(sphere);
          }

          // Add lighting
          const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
          scene.add(ambientLight);

          const pointLight = new THREE.PointLight(generateRandomColor(), 1, 100);
          pointLight.position.set(10, 10, 10);
          scene.add(pointLight);
     };

     const animateSpheres = () => {
          if (!scene || !camera || !renderer || isPaused) return;

          spheresRef.current.forEach(sphere => {
               sphere.rotation.x += 0.01;
               sphere.rotation.y += 0.01;
          });

          renderer.render(scene, camera);
          requestAnimationFrame(animateSpheres);
     };

     const handleRandomColors = () => {
          if (!scene) return;

          spheresRef.current.forEach(sphere => {
               (sphere.material as THREE.MeshStandardMaterial).color.setHex(generateRandomColor());
          });
     };

     const togglePause = () => {
          setIsPaused(prev => !prev);
     };

     useEffect(() => {
          if (!canvasRef.current) return;

          // Scene setup
          const newScene = new THREE.Scene();
          const newCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
          newCamera.position.z = 15;

          const newRenderer = new THREE.WebGLRenderer({
               canvas: canvasRef.current,
               alpha: true
          });
          newRenderer.setSize(window.innerWidth, window.innerHeight);
          newRenderer.setPixelRatio(window.devicePixelRatio);

          setScene(newScene);
          setCamera(newCamera);
          setRenderer(newRenderer);

          // Handle window resize
          const handleResize = () => {
               if (newCamera && newRenderer) {
                    newCamera.aspect = window.innerWidth / window.innerHeight;
                    newCamera.updateProjectionMatrix();
                    newRenderer.setSize(window.innerWidth, window.innerHeight);
               }
          };

          window.addEventListener('resize', handleResize);

          return () => {
               window.removeEventListener('resize', handleResize);
          };
     }, []);

     useEffect(() => {
          if (scene) {
               createSpheres();
               animateSpheres();
          }
     }, [scene]);

     useEffect(() => {
          if (isPaused) {
               cancelAnimationFrame(animateSpheres as unknown as number);
          } else {
               animateSpheres();
          }
     }, [isPaused]);

     return (
          <div className="relative w-full h-screen overflow-hidden">
               {/* Radial gradient background */}
               <div
                    className="absolute inset-0 bg-gradient-radial from-white to-black/50 pointer-events-none"
               />

               {/* Canvas */}
               <canvas
                    ref={canvasRef}
                    className="absolute top-0 left-0 z-10 w-full h-full"
               />

               {/* Hero Text */}
               <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
                    <h1 className="text-[100px] font-bold uppercase text-black drop-shadow-[0_0_20px_rgba(255,255,255,1)]">
                         Sphere
                    </h1>
                    <h2 className="text-[80px] font-medium uppercase text-black drop-shadow-[0_0_20px_rgba(255,255,255,1)]">
                         Packing
                    </h2>
               </div>

               {/* Buttons */}
               <div className="fixed bottom-4 z-30 w-full flex justify-center items-center gap-4">
                    <button
                         onClick={handleRandomColors}
                         className="bg-white/50 border border-gray-400 rounded-md px-4 py-2 font-medium"
                    >
                         Random Colors
                    </button>
                    <button
                         onClick={togglePause}
                         className="bg-white/50 border border-gray-400 rounded-md px-4 py-2 font-medium"
                    >
                         {isPaused ? 'Resume' : 'Pause'}
                    </button>
               </div>
          </div>
     );
};

export default SpherePacking;`

export const ThreeJSSphereCode =  `
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
    <div>
      <canvas ref={canvasRef} />
      <div style={{ position: "absolute", top: "20px", left: "30px", color: "#fff" }}>
        three.js + Sphere
      </div>
      <div style={{ position: "absolute", bottom: "20px", right: "30px", color: "#fff", cursor: "pointer" }} onClick={() => document.documentElement.requestFullscreen()}>
        Fullscreen
      </div>
    </div>
  );
};

export default ThreeJS_Sphere;

`

export const webGlParticlesCode =  `
import React, { useEffect, useRef } from "react";

const WebGLParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const gl = canvas.getContext("webgl");

    if (!gl) {
      console.error("WebGL not supported");
      return;
    }

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);

    // Configurable parameters
    const config = {
      particleCount: 5000,
      textArray: ["Design.", "Code.", "Coffee."],
      mouseRadius: 0.1,
      particleSize: 2,
      forceMultiplier: 0.001,
      returnSpeed: 0.005,
      velocityDamping: 0.95,
      colorMultiplier: 40000,
      saturationMultiplier: 1000,
      textChangeInterval: 10000,
      rotationForceMultiplier: 0.5,
    };

    let currentTextIndex = 0;
    let nextTextTimeout;
    let textCoordinates = [];

    const mouse = {
      x: -500,
      y: -500,
      radius: config.mouseRadius,
    };

    const particles = [];
    for (let i = 0; i < config.particleCount; i++) {
      particles.push({ x: 0, y: 0, baseX: 0, baseY: 0, vx: 0, vy: 0 });
    }

    const vertexShaderSource = \`
      attribute vec2 a_position;
      attribute float a_hue;
      attribute float a_saturation;
      varying float v_hue;
      varying float v_saturation;
      void main() {
          gl_PointSize = \${config.particleSize.toFixed(1)};
          gl_Position = vec4(a_position, 0.0, 1.0);
          v_hue = a_hue;
          v_saturation = a_saturation;
      }
    \`;

    const fragmentShaderSource = \`
      precision mediump float;
      varying float v_hue;
      varying float v_saturation;
      void main() {
          float c = v_hue * 6.0;
          float x = 1.0 - abs(mod(c, 2.0) - 1.0);
          vec3 color;
          if (c < 1.0) color = vec3(1.0, x, 0.0);
          else if (c < 2.0) color = vec3(x, 1.0, 0.0);
          else if (c < 3.0) color = vec3(0.0, 1.0, x);
          else if (c < 4.0) color = vec3(0.0, x, 1.0);
          else if (c < 5.0) color = vec3(x, 0.0, 1.0);
          else color = vec3(1.0, 0.0, x);
          vec3 finalColor = mix(vec3(1.0), color, v_saturation);
          gl_FragColor = vec4(finalColor, 1.0);
      }
    \`;

    function createShader(gl, type, source) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    function createProgram(gl, vertexShader, fragmentShader) {
      const program = gl.createProgram();
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error(gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        return null;
      }
      return program;
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(
      gl,
      gl.FRAGMENT_SHADER,
      fragmentShaderSource
    );
    const program = createProgram(gl, vertexShader, fragmentShader);

    const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
    const hueAttributeLocation = gl.getAttribLocation(program, "a_hue");
    const saturationAttributeLocation = gl.getAttribLocation(
      program,
      "a_saturation"
    );

    const positionBuffer = gl.createBuffer();
    const hueBuffer = gl.createBuffer();
    const saturationBuffer = gl.createBuffer();

    const positions = new Float32Array(config.particleCount * 2);
    const hues = new Float32Array(config.particleCount);
    const saturations = new Float32Array(config.particleCount);

    function getTextCoordinates(text) {
      const ctx = document.createElement("canvas").getContext("2d");
      ctx.canvas.width = canvas.width;
      ctx.canvas.height = canvas.height;
      const fontSize = Math.min(canvas.width / 6, canvas.height / 6);
      ctx.font = \`900 \${fontSize}px Arial\`;
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, canvas.width / 2, canvas.height / 2);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      const coordinates = [];
      for (let y = 0; y < canvas.height; y += 4) {
        for (let x = 0; x < canvas.width; x += 4) {
          const index = (y * canvas.width + x) * 4;
          if (imageData[index + 3] > 128) {
            coordinates.push({
              x: (x / canvas.width) * 2 - 1,
              y: (y / canvas.height) * -2 + 1,
            });
          }
        }
      }
      return coordinates;
    }

    function createParticles() {
      textCoordinates = getTextCoordinates(config.textArray[currentTextIndex]);
      for (let i = 0; i < config.particleCount; i++) {
        const randomIndex = Math.floor(Math.random() * textCoordinates.length);
        const { x, y } = textCoordinates[randomIndex];
        particles[i].x = particles[i].baseX = x;
        particles[i].y = particles[i].baseY = y;
      }
    }

    function updateParticles() {
      for (let i = 0; i < config.particleCount; i++) {
        const particle = particles[i];
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;
        const maxDistance = mouse.radius;
        const force = (maxDistance - distance) / maxDistance;
        const directionX = forceDirectionX * force * config.forceMultiplier;
        const directionY = forceDirectionY * force * config.forceMultiplier;

        const angle = Math.atan2(dy, dx);

        const rotationForceX = Math.sin(
          -Math.cos(angle * -1) *
            Math.sin(config.rotationForceMultiplier * Math.cos(force)) *
            Math.sin(distance * distance) *
            Math.sin(angle * distance)
        );

        const rotationForceY = Math.sin(
          Math.cos(angle * 1) *
            Math.sin(config.rotationForceMultiplier * Math.sin(force)) *
            Math.sin(distance * distance) *
            Math.cos(angle * distance)
        );

        if (distance < mouse.radius) {
          particle.vx -= directionX + rotationForceX;
          particle.vy -= directionY + rotationForceY;
        } else {
          particle.vx += (particle.baseX - particle.x) * config.returnSpeed;
          particle.vy += (particle.baseY - particle.y) * config.returnSpeed;
        }

        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vx *= config.velocityDamping;
        particle.vy *= config.velocityDamping;

        const speed = Math.sqrt(
          particle.vx * particle.vx + particle.vy * particle.vy
        );
        const hue = (speed * config.colorMultiplier) % 360;

        hues[i] = hue / 360;
        saturations[i] = Math.min(speed * config.saturationMultiplier, 1);
        positions[i * 2] = particle.x;
        positions[i * 2 + 1] = particle.y;
      }
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, positions, gl.DYNAMIC_DRAW);
      gl.bindBuffer(gl.ARRAY_BUFFER, hueBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, hues, gl.DYNAMIC_DRAW);
      gl.bindBuffer(gl.ARRAY_BUFFER, saturationBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, saturations, gl.DYNAMIC_DRAW);
    }

    function animate() {
      updateParticles();

      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(positionAttributeLocation);
      gl.bindBuffer(gl.ARRAY_BUFFER, hueBuffer);
      gl.vertexAttribPointer(hueAttributeLocation, 1, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(hueAttributeLocation);
      gl.bindBuffer(gl.ARRAY_BUFFER, saturationBuffer);
      gl.vertexAttribPointer(saturationAttributeLocation, 1, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(saturationAttributeLocation);
      gl.useProgram(program);
      gl.drawArrays(gl.POINTS, 0, config.particleCount);
      requestAnimationFrame(animate);
    }

    canvas.addEventListener("mousemove", (event) => {
      mouse.x = (event.clientX / canvas.width) * 2 - 1;
      mouse.y = (event.clientY / canvas.height) * -2 + 1;
    });

    canvas.addEventListener("mouseleave", () => {
      mouse.x = -500;
      mouse.y = -500;
    });

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
      createParticles();
    });

    function changeText() {
      currentTextIndex = (currentTextIndex + 1) % config.textArray.length;
      const newCoordinates = getTextCoordinates(config.textArray[currentTextIndex]);
      for (let i = 0; i < config.particleCount; i++) {
        const randomIndex = Math.floor(Math.random() * newCoordinates.length);
        const { x, y } = newCoordinates[randomIndex];
        particles[i].baseX = x;
        particles[i].baseY = y;
      }
      nextTextTimeout = setTimeout(changeText, config.textChangeInterval);
    }

    gl.clearColor(0, 0, 0, 1);
    createParticles();
    animate();
    nextTextTimeout = setTimeout(changeText, config.textChangeInterval);

    return () => {
      clearTimeout(nextTextTimeout);
    };
  }, []);

  return <canvas ref={canvasRef}></canvas>;
};

export default WebGLParticles;

`