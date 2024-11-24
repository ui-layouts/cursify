import useSpotlightEffect from '@/hooks/use-spotlight';
import React from 'react';

const SpotlightCursor = ({ config }) => {
  const canvasRef = useSpotlightEffect(config);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        width: '100%',
        height: '100%',
      }}
    />
  );
};

export default SpotlightCursor;