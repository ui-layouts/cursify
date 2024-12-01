// @ts-nocheck

import React, { useState } from 'react';
import { useMouse } from '@/hooks/use-mouse';
import { Edit, Search, Play, Link } from 'lucide-react';

const TextIconCursor = () => {
  const [mouseState, ref] = useMouse();
  const [cursorContent, setCursorContent] = useState(null);

  const icons = {
    edit: <Edit size={16} />,
    search: <Search size={16} />,
    play: <Play size={16} />,
    link: <Link size={16} />,
  };

  return (
    <div className='relative w-full h-screen bg-gray-900' ref={ref}>
      {mouseState.x !== null && mouseState.y !== null && (
        <div
          className='fixed pointer-events-none z-50'
          style={{
            left: mouseState.x,
            top: mouseState.y,
            transform: 'translate(-50%, -50%)',
          }}
        >
          {/* Main cursor */}
          <div className='w-4 h-4 bg-white rounded-full mix-blend-screen' />

          {/* Text/Icon container */}
          {cursorContent && (
            <div
              className='absolute left-6 top-0 bg-white/90 text-gray-900 px-3 py-1.5 rounded-full whitespace-nowrap flex items-center gap-2 text-sm animate-fade-in'
              style={{
                animation: 'fadeIn 0.2s ease-out',
              }}
            >
              {typeof cursorContent === 'string'
                ? cursorContent
                : icons[cursorContent]}
            </div>
          )}
        </div>
      )}

      <div className='flex flex-col items-center justify-center h-full gap-6'>
        <button
          className='px-6 py-3 bg-white/10 text-white rounded-lg transition-colors'
          onMouseEnter={() => setCursorContent('edit')}
          onMouseLeave={() => setCursorContent(null)}
        >
          Edit Button
        </button>

        <div
          className='px-6 py-3 bg-white/10 text-white rounded-lg cursor-help'
          onMouseEnter={() => setCursorContent('Click to search')}
          onMouseLeave={() => setCursorContent(null)}
        >
          Search Area
        </div>

        <a
          href='#'
          className='px-6 py-3 bg-white/10 text-white rounded-lg'
          onMouseEnter={() => setCursorContent('link')}
          onMouseLeave={() => setCursorContent(null)}
        >
          Click to Navigate
        </a>

        <div
          className='w-32 h-32 bg-white/10 rounded-lg flex items-center justify-center'
          onMouseEnter={() => setCursorContent('play')}
          onMouseLeave={() => setCursorContent(null)}
        >
          <span className='text-white'>Video Area</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default TextIconCursor;
