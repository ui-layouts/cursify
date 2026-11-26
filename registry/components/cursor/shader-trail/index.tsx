'use client';
import { useState } from 'react';
import ShaderTrail, { type TrailBrush } from './shader-trail';

const brushes: Record<TrailBrush, string> = {
  crossSquareCorner: 'Square corners',
  circle: 'Circle',
  hatch: 'Hatch',
  corner: 'Corner',
  cross: 'Cross',
  star: 'Star',
};

export default function ShaderTrailPreview() {
  const [brush, setBrush] = useState<TrailBrush>('crossSquareCorner');
  return (
    <div className='relative h-full min-h-64 w-full bg-[#bcbdb8] text-[#282828]'>
      <ShaderTrail brush={brush} className='absolute inset-0 h-full w-full' />
      <label className='absolute bottom-4 left-4 flex items-center gap-2 text-sm'>
        Brush
        <select
          value={brush}
          onChange={(event) => setBrush(event.target.value as TrailBrush)}
          className='rounded bg-white px-2 py-1 text-black'
        >
          {Object.entries(brushes).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
