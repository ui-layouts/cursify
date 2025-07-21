import { useTheme } from 'next-themes';
import React from 'react';
import DelicateAsciiDots from './delicate-ascii-dots';

function index() {
  const { theme } = useTheme();
  return (
    <>
      <DelicateAsciiDots
        backgroundColor={theme === 'dark' ? '#000000' : '#fffefd'}
        textColor={theme === 'dark' ? '0, 48, 255' : '0, 1, 5'}
      />
    </>
  );
}

export default index;
