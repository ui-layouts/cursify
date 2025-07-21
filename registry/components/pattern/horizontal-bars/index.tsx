import { useTheme } from 'next-themes';
import React from 'react';
import HorizontalFlowBars from './horizontal-bars';

function index() {
  const { theme } = useTheme();
  return (
    <>
      <HorizontalFlowBars
        backgroundColor={theme === 'dark' ? '#000000' : '#fffefd'}
        lineColor={theme === 'dark' ? '#0077ff' : '#000000'}
        barColor={theme === 'dark' ? '#0077ff' : '#000000'}
      />
    </>
  );
}

export default index;
