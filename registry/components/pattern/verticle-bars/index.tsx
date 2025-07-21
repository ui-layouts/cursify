import { useTheme } from 'next-themes';
import React from 'react';
import VerticalBarsNoise from './verticle-bars';

function index() {
  const { theme } = useTheme();
  return (
    <>
      <VerticalBarsNoise
        backgroundColor={theme === 'dark' ? '#000000' : '#fffefd'}
        lineColor={theme === 'dark' ? '#0077ff' : '#000000'}
        barColor={theme === 'dark' ? '#0077ff' : '#000000'}
      />
    </>
  );
}

export default index;
