import { useTheme } from 'next-themes';
import React from 'react';
import BlackWhiteBlobs from './black-white-blobs';

function index() {
  const { theme } = useTheme();
  return (
    <>
      <BlackWhiteBlobs
        backgroundColor={theme === 'dark' ? '#000000' : '#fffefd'}
        textColor={theme === 'dark' ? '#0077ff' : '#000000'}
      />
    </>
  );
}

export default index;
