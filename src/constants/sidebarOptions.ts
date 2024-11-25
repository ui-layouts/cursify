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
import MultiCursorExample from "@/components/examples/MultiCursorExample";
import ScalingCursorExample from "@/components/examples/ScalingCursorExample";
import TextIconCursorExample from "@/components/examples/TextIconCursorExample";
import ThreeDCursorExample from "@/components/examples/ThreeDCursorExample";
import TrailUpdateCursorExample from "@/components/examples/TrailUpdateCursorExample";
import SpringCursorExample from "@/components/examples/SpringCursorExample";
import SwirlCursorExample from "@/components/examples/SwirlCursorExample";
import BubbleCursorExample from "@/components/examples/BubbleCursorExample";
import CharacterCursorExample from "@/components/examples/CharacterCursorExample";
import FairyDustCursorExample from "@/components/examples/FairyDustCursorExample";
import TextFlagCursorExample from "@/components/examples/TextFlagCursorExample";
import SnowflakeCursorExample from "@/components/examples/SnowflakeCursorExample";
import CanvasCursorExample from "@/components/examples/CanvasCursorExample";
import FluidCursorExample from "@/components/examples/FluidCursorExample";
import Introduction from "@/pages/document/common/Introduction";
import InstallationGuide from "@/pages/document/common/InstallationGuide";
import RainbowCursorExample from "@/components/examples/RainbowCursorExample";

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
      },
      {
        id: "installation",
        title: "Installation",
        description: "A installation of project",
        component: InstallationGuide,
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
      },
      {
        id: "spotlight-cursor",
        title: "Spotlight Cursor",
        description: "Spotlight effect following the cursor",
        component: SpotLightCursorExample,
      },
      {
        id: "neon-cursor",
        title: "Neon Cursor",
        description: "neon cursor effect",
        component: NeonCursorExample,
      },
      {
        id: "trail-cursor",
        title: "Trail Cursor",
        description: "Glowing trail cursor effect",
        component: TrailCursorExample,
      },
      {
        id: "blob-cursor",
        title: "Blob Cursor",
        description: "Blob cursor effect",
        component: BlobCursorExample,
      },
      {
        id: "click-cursor",
        title: "Click Cursor",
        description: "Click cursor effect",
        component: ClickCursorExample,
      },
      {
        id: "glitch-cursor",
        title: "Glitch Cursor",
        description: "Glitch cursor effect",
        component: GlitchCursorExample,
      },
      {
        id: "gradient-cursor",
        title: "Gradient Cursor",
        description: "Gradient cursor effect",
        component: GradientCursorExample,
      },
      {
        id: "magnetic-cursor",
        title: "Magnetic Cursor",
        description: "Magnetic cursor effect",
        component: MagneticCursorExample,
      },
      {
        id: "multi-cursor",
        title: "Multi Cursor",
        description: "Multi cursor effect",
        component: MultiCursorExample,
      },
      {
        id: "scaling-cursor",
        title: "Scaling Cursor",
        description: "Scaling cursor effect",
        component: ScalingCursorExample,
      },
      {
        id: "texticon-cursor",
        title: "TextIcon Cursor",
        description: "TextIcon cursor effect",
        component: TextIconCursorExample,
      },
      {
        id: "3d-cursor",
        title: "ThreeD Cursor",
        description: "ThreeD cursor effect",
        component: ThreeDCursorExample,
      },
      {
        id: "trail-cursor-update",
        title: "Trail New Cursor",
        description: "Trail cursor effect",
        component: TrailUpdateCursorExample,
      },
      {
        id: "springy-cursor",
        title: "Springy Cursor",
        description: "Springy cursor effect",
        component: SpringCursorExample,
      },
      // {
      //   id: "swirl-cursor",
      //   title: "Swirl Cursor",
      //   description: "Swirl cursor effect",
      //   component: SwirlCursorExample,
      // },
      {
        id: "rainbow-cursor",
        title: "Rainbow Cursor",
        description: "Rainbow cursor effect",
        component: RainbowCursorExample,
      },
      {
        id: "bubble-cursor",
        title: "Bubble Cursor",
        description: "Bubble cursor effect",
        component: BubbleCursorExample,
      },
      {
        id: "character-cursor",
        title: "Character Cursor",
        description: "Character cursor effect",
        component: CharacterCursorExample,
      },
      {
        id: "fairy-dust-cursor",
        title: "FairyDust Cursor",
        description: "FairyDust cursor effect",
        component: FairyDustCursorExample,
      },
      {
        id: "textflag-cursor",
        title: "TextFlag Cursor",
        description: "TextFlag cursor effect",
        component: TextFlagCursorExample,
      },
      {
        id: "snowflake-cursor",
        title: "snowflake Cursor",
        description: "Snowflake cursor effect",
        component: SnowflakeCursorExample,
      },
      {
        id: "canvas-cursor",
        title: "Canvas Cursor",
        description: "Canvas cursor effect",
        component: CanvasCursorExample,
      },
      {
        id: "fluid-cursor",
        title: "Fluid Cursor",
        description: "Fluid cursor effect",
        component: FluidCursorExample,
      },
      // {
      //   id: "arrow-cursor",
      //   title: "Arrow Cursor",
      //   description: "Arrow cursor effect",
      //   component: ArrowCursorExample,
      // },
    ],
  },
];
