"use client"
import { useTheme } from 'next-themes';
import React from 'react';
import SmoothWavyCanvas from './smooth-wavy-canvas';

function index() {
  const { theme } = useTheme();
  return (
    <>
      <SmoothWavyCanvas
        backgroundColor={theme === 'dark' ? '#000000' : '#fffefd'}
        primaryColor={theme === 'dark' ? '0, 48, 255' : '0, 1, 5'}
        secondaryColor={theme === 'dark' ? '0, 47, 235' : '0, 1, 5'}
        accentColor={theme === 'dark' ? '0, 47, 235' : '0, 1, 5'}
        lineOpacity = {4}

      
      />
    </>
  );
}

export default index;
