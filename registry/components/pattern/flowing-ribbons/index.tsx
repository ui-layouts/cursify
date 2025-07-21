import { useTheme } from 'next-themes';
import React from 'react';
import FlowingRibbons from './flowing-ribbons';

function index() {
  const { theme } = useTheme();
  return (
    <>
      <FlowingRibbons
        backgroundColor={theme === 'dark' ? '#000000' : '#fffefd'}
        lineColor={theme === 'dark' ? '#0077ff' : '#000000'}
      />
    </>
  );
}

export default index;
