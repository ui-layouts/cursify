import React from 'react';

export const cursorAnimations = [
  { href: '/components/bubble-cursor', name: 'Bubble Cursor' },
  { href: '/components/buttons', name: 'Buttons' },
  {
    href: '/components/clip-path',
    name: 'Clip Path',
    new: true,
  },
  {
    href: '/components/product-cards',
    name: 'Products-Cards',
    component: 'card',
  },

  { href: '/components/footers', name: 'Footers' },
  { href: '/components/horizontal-scroll', name: 'Horizontal Scroll' },
];
export const MainComponents = [
  {
    href: '/components/blur-vignette',
    name: 'Blur Vignette',

    new: true,
    component: 'creative',
  },
  {
    href: '/components/motion-number',
    name: 'Motion Number',
    new: true,
    component: 'creative',
  },
];

export const AllComponens = [
  {
    href: '/components/blob-cursor',
    id: 'blob-cursor',
    componentName: 'Blob Cursor',
    filePath: 'registry/components/cursor/BlobCursor/index.tsx',
    componentSrc: React.lazy(
      () => import('@/registry/components/cursor/BlobCursor')
    ),
    isAlert: 'New',
  },
  {
    href: '/components/canvas-cursor',
    id: 'canvas-cursor',
    componentName: 'Canvas Cursor',
    filePath: 'registry/components/cursor/common/CanvasCursor.tsx',
    componentSrc: React.lazy(
      () => import('@/registry/components/cursor/common/CanvasCursor')
    ),
    isAlert: 'New',
    comMessage: 'Move Mouse To see the Effect',
  },
  {
    href: '/components/character-cursor',
    id: 'character-cursor',
    componentName: 'Character Cursor',
    filePath: 'registry/components/cursor/common/CharacterCursor.tsx',
    componentSrc: React.lazy(
      () => import('@/registry/components/cursor/common/CharacterCursor')
    ),
    isAlert: 'New',
    comMessage: 'Move Mouse To see the Effect',
  },
  {
    href: '/components/click-cursor',
    id: 'click-cursor',
    componentName: 'Click Cursor',
    filePath: 'registry/components/cursor/common/ClickEffectCursor.tsx',
    componentSrc: React.lazy(
      () => import('@/registry/components/cursor/common/ClickEffectCursor')
    ),
    isAlert: 'New',
    comMessage: 'Move Mouse To see the Effect',
  },
  {
    href: '/components/fairydust-cursor',
    id: 'fairydust-cursor',
    componentName: 'Fairydust Cursor',
    filePath: 'registry/components/cursor/fairydust/index.tsx',
    componentSrc: React.lazy(
      () => import('@/registry/components/cursor/fairydust')
    ),
    isAlert: 'New',
    comMessage: 'Move Mouse To see the Effect',
  },
  {
    href: '/components/follow-cursor',
    id: 'follow-cursor',
    componentName: 'Follow Cursor',
    filePath: 'registry/components/cursor/common/FollowCursor.tsx',
    componentSrc: React.lazy(
      () => import('@/registry/components/cursor/common/FollowCursor')
    ),
    isAlert: 'New',
    comMessage: 'Move Mouse To see the Effect',
  },
  {
    href: '/components/glitch-cursor',
    id: 'glitch-cursor',
    componentName: 'Glitch Cursor',
    filePath: 'registry/components/cursor/common/GlitchCursor.tsx',
    componentSrc: React.lazy(
      () => import('@/registry/components/cursor/common/GlitchCursor')
    ),
    isAlert: 'New',
  },
  {
    href: '/components/gradient-cursor',
    id: 'gradient-cursor',
    componentName: 'Gradient Cursor',
    filePath: 'registry/components/cursor/common/GradientCursor.tsx',
    componentSrc: React.lazy(
      () => import('@/registry/components/cursor/common/GradientCursor')
    ),
    isAlert: 'New',
    comMessage: 'Move Mouse To see the Effect',
  },
  {
    href: '/components/magnetic-cursor',
    id: 'magnetic-cursor',
    componentName: 'Magnetic Cursor',
    filePath: 'registry/components/cursor/common/MagneticCursor.tsx',
    componentSrc: React.lazy(
      () => import('@/registry/components/cursor/common/MagneticCursor')
    ),
    isAlert: 'New',
  },
  {
    href: '/components/rainbow-cursor',
    id: 'rainbow-cursor',
    componentName: 'Rainbow Cursor',
    filePath: 'registry/components/cursor/common/RainbowCursor.tsx',
    componentSrc: React.lazy(
      () => import('@/registry/components/cursor/common/RainbowCursor')
    ),
    isAlert: 'New',
    comMessage: 'Move Mouse To see the Effect',
  },
  {
    href: '/components/snowflake-cursor',
    id: 'snowflake-cursor',
    componentName: 'Snowflake Cursor',
    filePath: 'registry/components/cursor/common/SnowflakeCursor.tsx',
    componentSrc: React.lazy(
      () => import('@/registry/components/cursor/common/SnowflakeCursor')
    ),
    isAlert: 'New',
    comMessage: 'Move Mouse To see the Effect',
  },
  {
    href: '/components/spotlight-cursor',
    id: 'spotlight-cursor',
    componentName: 'Spotlight Cursor',
    filePath: 'registry/components/cursor/common/SpotLightCursor.tsx',
    componentSrc: React.lazy(
      () => import('@/registry/components/cursor/common/SpotLightCursor')
    ),
    isAlert: 'New',
    comMessage: 'Move Mouse To see the Effect',
  },
  {
    href: '/components/springy-cursor',
    id: 'springy-cursor',
    componentName: 'Springy Cursor',
    filePath: 'registry/components/cursor/common/SpringyCursor.tsx',
    componentSrc: React.lazy(
      () => import('@/registry/components/cursor/common/SpringyCursor')
    ),
    isAlert: 'New',
    comMessage: 'Move Mouse To see the Effect',
  },
  {
    href: '/components/textflag-cursor',
    id: 'textflag-cursor',
    componentName: 'Textflag Cursor',
    filePath: 'registry/components/cursor/text-flag/index.tsx',
    componentSrc: React.lazy(
      () => import('@/registry/components/cursor/text-flag')
    ),
    isAlert: 'New',
    comMessage: 'Move Mouse To see the Effect',
  },
  {
    href: '/components/3d-cursor',
    id: '3d-cursor',
    componentName: 'ThreeD Cursor',
    filePath: 'registry/components/cursor/common/ThreeDCursor.tsx',
    componentSrc: React.lazy(
      () => import('@/registry/components/cursor/common/ThreeDCursor')
    ),
    isAlert: 'New',
  },
  {
    href: '/components/trail-cursor',
    id: 'trail-cursor',
    componentName: 'Trail Cursor',
    filePath: 'registry/components/cursor/common/TrailCursor.tsx',
    componentSrc: React.lazy(
      () => import('@/registry/components/cursor/common/TrailCursor')
    ),
    isAlert: 'New',
    comMessage: 'Move Mouse To see the Effect',
  },
  {
    href: '/components/neon-cursor',
    id: 'neon-cursor',
    componentName: 'Neon Cursor',
    filePath: 'registry/components/cursor/neoncursor/NeonCursor.tsx',
    componentSrc: React.lazy(
      () => import('@/registry/components/cursor/neoncursor/NeonCursor')
    ),
    isAlert: 'New',
    comMessage: 'Move Mouse To see the Effect',
  },
];
