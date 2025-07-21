"use client"
import { useTheme } from 'next-themes';
import React from 'react';
import DotParticleCanvas from './dot-particles';

function index() {
  const { theme } = useTheme();
  return (
    <>
      <DotParticleCanvas
        backgroundColor={theme === 'dark' ? '#000000' : '#fffefd'}
        particleColor={theme === 'dark' ? '0, 48, 255' : '0, 1, 5'}
      />
    </>
  );
}

export default index;
