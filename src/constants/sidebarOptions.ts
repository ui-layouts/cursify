import { Category } from "@/types";
import FollowCursorExample from "@/components/examples/FollowCursorExample";
import NeonCursorExample from "@/components/examples/NeonCursorExample";
import SpotLightCursorExample from "@/components/examples/SpotLightCursorExample";
import TrailCursorExample from "@/components/examples/TrailCursorExample";
import BlobCursorExample from "@/components/examples/BlobCursorExample";
import ClickCursorExample from "@/components/examples/ClickCursorExample";
import GlitchCursorExample from "@/components/examples/GlitchCursorExample";
import GradientCursorExample from "@/components/examples/GradientCursorExample";
import MagneticCursorExample from "@/components/examples/MagneticCursorExample";
import ThreeDCursorExample from "@/components/examples/ThreeDCursorExample";
import SpringCursorExample from "@/components/examples/SpringCursorExample";
import BubbleCursorExample from "@/components/examples/BubbleCursorExample";
import CharacterCursorExample from "@/components/examples/CharacterCursorExample";
import FairyDustCursorExample from "@/components/examples/FairyDustCursorExample";
import TextFlagCursorExample from "@/components/examples/TextFlagCursorExample";
import SnowflakeCursorExample from "@/components/examples/SnowflakeCursorExample";
import CanvasCursorExample from "@/components/examples/CanvasCursorExample";
import Introduction from "@/pages/document/common/Introduction";
import InstallationGuide from "@/pages/document/common/InstallationGuide";
import RainbowCursorExample from "@/components/examples/RainbowCursorExample";
import ArrowCursorExample from "@/components/examples/ArrowCursorExample";
import BrushCursorExample from "@/components/examples/BrushCursorExample";
import AttractorBackgroundExample from "@/components/examples/AttractorBackgroundExample";
import FluidMotionCursorExample from "@/components/examples/FluidMotionCursorExample";
import ParticleNetworkExample from "@/components/examples/ParticleNetworkExample";
import FilmGrainExample from "@/components/examples/FilmGrainExample";
import SpherePackingExample from "@/components/examples/SpherePackingExample";
import ThreeJSSphereExample from "@/components/examples/ThreeJSSphereExample";
import WebGLParticlesExample from "@/components/examples/WebGLParticlesExample";
import CarouselExample from "@/components/examples/CarouselExample";
import RippleCursorExample from "@/components/examples/RippleCursorExample";



export const CATEGORIES: Category[] = [
  {
    id: "docs",
    title: "Getting Started",
    subcategories: [
      {
        id: "introduction",
        title: "Introductions",
        description: "A library introduction",
        component: Introduction,
        new: false,
      },
      {
        id: "installation",
        title: "Installation",
        description: "A installation of project",
        component: InstallationGuide,
        new: false,
      },
    ],
  },
  {
    id: "design",
    title: "Components",
    subcategories: [
      {
        id: "carousel",
        title: "Carousel",
        description: "A Carousel Component ",
        component: CarouselExample,
        new: true,
      },
     
    ],
  },
  {
    id: "backgrounds",
    title: "Backgrounds",
    subcategories: [
      {
        id: "attractor-background",
        title: "Attractor ",
        description: "A Attractor Background For your website",
        component: AttractorBackgroundExample,
        new: true,
      },
      {
        id: "particle-network-background",
        title: "Particle Network ",
        description: "A Particle Network Background For your website",
        component: ParticleNetworkExample,
        new: true,
      },
      {
        id: "filmgrain-background",
        title: "Film Grain ",
        description: "A FilmBurn Background For your website",
        component: FilmGrainExample,
        new: true,
      },
    ],
  },
  {
    id: "threejs",
    title: "Sphere",
    subcategories: [
      {
        id: "sphere-background",
        title: "Sphere Background",
        description: "A Attractor For your website",
        component: SpherePackingExample,
        new: true,
      },
      {
        id: "three-background",
        title: "Three Js Background",
        description: "A Three Js Sphere  For your website",
        component: ThreeJSSphereExample,
        new: true,
      },
      {
        id: "webgl",
        title: "webgl  Background",
        description: "A webgl  For your website",
        component: WebGLParticlesExample,
        new: true,
      },
    ],
  },
  {
    id: "cursor-animations",
    title: "Cursor Animations",

    subcategories: [
      {
        id: "follow-cursor",
        title: "Follow Cursor",
        description: "A simple following cursor animation",
        component: FollowCursorExample,
        new: false,
      },
      {
        id: "spotlight-cursor",
        title: "Spotlight Cursor",
        description: "Spotlight effect following the cursor",
        component: SpotLightCursorExample,
        new: false,
      },
      {
        id: "neon-cursor",
        title: "Neon Cursor",
        description: "neon cursor effect",
        component: NeonCursorExample,
        new: false,
      },
      {
        id: "trail-cursor",
        title: "Trail Cursor",
        description: "Glowing trail cursor effect",
        component: TrailCursorExample,
        new: false,
      },
      {
        id: "blob-cursor",
        title: "Blob Cursor",
        description: "Blob cursor effect",
        component: BlobCursorExample,
        new: false,
      },
      {
        id: "click-cursor",
        title: "Click Cursor",
        description: "Click cursor effect",
        component: ClickCursorExample,
        new: false,
      },
      {
        id: "glitch-cursor",
        title: "Glitch Cursor",
        description: "Glitch cursor effect",
        component: GlitchCursorExample,
        new: false,
      },
      {
        id: "gradient-cursor",
        title: "Gradient Cursor",
        description: "Gradient cursor effect",
        component: GradientCursorExample,
        new: false,
      },
      {
        id: "magnetic-cursor",
        title: "Magnetic Cursor",
        description: "Magnetic cursor effect",
        component: MagneticCursorExample,
        new: false,
      },

      {
        id: "3d-cursor",
        title: "ThreeD Cursor",
        description: "ThreeD cursor effect",
        component: ThreeDCursorExample,
        new: false,
      },

      {
        id: "springy-cursor",
        title: "Springy Cursor",
        description: "Springy cursor effect",
        component: SpringCursorExample,
        new: false,
      },

      {
        id: "rainbow-cursor",
        title: "Rainbow Cursor",
        description: "Rainbow cursor effect",
        component: RainbowCursorExample,
        new: false,
      },
      {
        id: "bubble-cursor",
        title: "Bubble Cursor",
        description: "Bubble cursor effect",
        component: BubbleCursorExample,
        new: false,
      },
      {
        id: "character-cursor",
        title: "Character Cursor",
        description: "Character cursor effect",
        component: CharacterCursorExample,
        new: false,
      },
      {
        id: "fairy-dust-cursor",
        title: "FairyDust Cursor",
        description: "FairyDust cursor effect",
        component: FairyDustCursorExample,
        new: false,
      },
      {
        id: "textflag-cursor",
        title: "TextFlag Cursor",
        description: "TextFlag cursor effect",
        component: TextFlagCursorExample,
        new: false,
      },
      {
        id: "snowflake-cursor",
        title: "Snowflake Cursor",
        description: "Snowflake cursor effect",
        component: SnowflakeCursorExample,
        new: false,
      },
      {
        id: "canvas-cursor",
        title: "Canvas Cursor",
        description: "Canvas cursor effect",
        component: CanvasCursorExample,
        new: false,
      },

      {
        id: "arrow-cursor",
        title: "Arrow Cursor",
        description: "Arrow cursor effect",
        component: ArrowCursorExample,
        new: true,
      },
      {
        id: "brush-cursor",
        title: "Brush Cursor",
        description: "Brush cursor effect",
        component: BrushCursorExample,
        new: true,
      },
      {
        id: "fluid-cursor",
        title: "Fluid Cursor",
        description: "Fluid cursor effect",
        component: FluidMotionCursorExample,
        new: true,
      },
      {
      id: "ripple-cursor",
      title: "Ripple Cursor",
      description: "Ripple cursor effect with smooth animations",
      component: RippleCursorExample,
      new: true,
      },
      // {
      //   id: "fluid-cursor",
      //   title: "Fluid Cursor",
      //   description: "Fluid cursor effect",
      //   component: FluidCursorExample,
      // },
      // {
      //   id: "arrow-cursor",
      //   title: "Arrow Cursor",
      //   description: "Arrow cursor effect",
      //   component: ArrowCursorExample,
      // },

    ],
  },
];
