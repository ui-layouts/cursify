import { useTheme } from 'next-themes';
import React from 'react';
import InteractiveDots from './interactive-dots';

function index() {
  const { theme } = useTheme();
  return (
    <>
      <InteractiveDots
        backgroundColor={theme === 'dark' ? '#000000' : '#fffefd'}
        dotColor={theme === 'dark' ? '#0077ff' : '#000000'}
      />
    </>
  );
}

export default index;
