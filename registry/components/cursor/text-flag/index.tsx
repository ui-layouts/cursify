'use client';
import { useTheme } from 'next-themes';
import React from 'react';
import TextFlagCursor from './TextFlagCursor';

function index() {
  const { theme } = useTheme();

  return (
    <div>
      <TextFlagCursor
        text='Hello World'
        color={theme === 'dark' ? '#FFFFFF' : '#000000'}
        font='monospace'
        textSize={12}
      />
    </div>
  );
}

export default index;
