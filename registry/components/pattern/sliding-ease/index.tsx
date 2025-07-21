import { useTheme } from 'next-themes';
import React from 'react';
import SlidingEaseVerticalBars from './sliding-ease';

function index() {
  const { theme } = useTheme();
  return (
    <>
      <SlidingEaseVerticalBars
        backgroundColor={theme === 'dark' ? '#000000' : '#fffefd'}
        lineColor={theme === 'dark' ? '#05172c' : '#cacaca'}
        barColor={theme === 'dark' ? '#0077ff' : '#000000'}
      />
    </>
  );
}

export default index;
