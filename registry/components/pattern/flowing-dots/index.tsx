import { useTheme } from 'next-themes';
import React from 'react';
import FlowingDots from './flowing-dots';

function index() {
  const { theme } = useTheme();
  return (
    <FlowingDots
      backgroundColor={theme === 'dark' ? '#000000' : '#fffefd'}
      particleColor={theme === 'dark' ? '0, 71, 255' : '0, 0, 0'}
    />
  );
}

export default index;
