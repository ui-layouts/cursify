'use client';

import { useEffect, useRef } from 'react';

/* Adapted from BertovDev/cursor-shader-trail.
MIT License

Copyright (c) 2026 Bautista Berto

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
export type TrailBrush =
  'circle' | 'hatch' | 'corner' | 'crossSquareCorner' | 'cross' | 'star';

const grid = 202;
const radius = grid * 0.05;

function brushForce(brush: TrailBrush, x: number, y: number) {
  const r = Math.hypot(x, y);
  if (r >= 1) return 0;
  if (brush === 'circle') return Math.min(10, 1 / Math.max(0.001, r));
  const axis = Math.min(Math.abs(x), Math.abs(y)) <= 0.1;
  const diagonal =
    Math.min(Math.abs(x - y), Math.abs(x + y)) * Math.SQRT1_2 <= 0.08;
  let inside: boolean;
  switch (brush) {
    case 'hatch': {
      const stripe = (x - y) * Math.SQRT1_2 * 6;
      inside = stripe - Math.floor(stripe) > 0.44;
      break;
    }
    case 'corner':
      inside = axis || Math.max(Math.abs(x), Math.abs(y)) <= 0.25;
      break;
    case 'crossSquareCorner':
      inside = !axis || diagonal;
      break;
    case 'cross':
      inside = diagonal && Math.abs(x) + Math.abs(y) <= 0.25;
      break;
    case 'star':
      inside = axis || diagonal;
      break;
  }
  return inside ? 2 * (1 - r) ** 2.6 : 0;
}

function stamp(
  field: Float32Array,
  brush: TrailBrush,
  x: number,
  y: number,
  dx: number,
  dy: number
) {
  const vx = Math.sign(dx) * Math.abs(dx) ** 0.9;
  const vy = Math.sign(dy) * Math.abs(dy) ** 0.9;
  const length = Math.hypot(vx, vy);
  if (!length) return;
  const speed = 0.21 * Math.hypot(dx, dy) ** 0.9;
  for (
    let row = Math.max(0, Math.floor(y - radius));
    row < Math.min(grid, y + radius);
    row++
  ) {
    for (
      let col = Math.max(0, Math.floor(x - radius));
      col < Math.min(grid, x + radius);
      col++
    ) {
      const weight =
        speed *
        brushForce(brush, (col + 0.5 - x) / radius, (row + 0.5 - y) / radius);
      const i = (row * grid + col) * 4;
      field[i] -= (weight * vx) / length;
      field[i + 1] -= (weight * vy) / length;
      field[i + 2] = Math.min(1, field[i + 2] + weight);
    }
  }
}

const vertex = `#version 300 es
out vec2 uv;
void main() {
  vec2 corner = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2);
  uv = vec2(corner.x, 1. - corner.y);
  gl_Position = vec4(corner * 2. - 1., 0., 1.);
}`;

const fragment = `#version 300 es
precision highp float;
uniform sampler2D letters, field;
uniform float reveal;
in vec2 uv;
out vec4 color;
void main() {
  vec3 flow = vec3(0.);
  for (int y = -1; y <= 1; y++)
    for (int x = -1; x <= 1; x++)
      flow += texture(field, uv + vec2(x,y) * .02).rgb * float((2-abs(x))*(2-abs(y))) / 16.;
  vec2 p = uv + flow.xy * .5;
  float blur = .01 * (1. - reveal);
  float mask = texture(letters,p).a;
  for (int i = 0; i < 4; i++)
    mask += texture(letters,p + vec2((i&1)*2-1,(i>>1)*2-1)*blur).a;
  float grain = fract(sin(dot(uv,vec2(91.534,47.871)))*43758.5453);
  vec3 ink = vec3(.157) * (.45 + .25*sin(12.*p.x+cos(9.*p.y)) + .46*(grain-.5));
  float speed = flow.b;
  vec3 trail = mix(vec3(.922,0.,0.), vec3(1.,.843,.059), smoothstep(0.,.5,speed));
  trail = mix(trail, vec3(1.,.651,0.), smoothstep(.5,1.,speed));
  float bloom = min(4., pow(.05/max(.001,1.-speed),1.4));
  color = vec4(ink + 4.5*speed*(1.+bloom)*trail, mask*.2*reveal);
}`;

type Props = {
  text?: string;
  brush?: TrailBrush;
  className?: string;
  intro?: boolean;
};

export default function ShaderTrail({
  text = 'Cursify',
  brush = 'crossSquareCorner',
  className,
  intro = true,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const brushRef = useRef(brush);
  useEffect(() => {
    brushRef.current = brush;
  }, [brush]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const label = labelRef.current!;
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const context = canvas.getContext('webgl2', { premultipliedAlpha: false });
    if (!context) return;
    const gl = context;
    const program = gl.createProgram();
    for (const [kind, code] of [
      [gl.VERTEX_SHADER, vertex],
      [gl.FRAGMENT_SHADER, fragment],
    ] as const) {
      const shader = gl.createShader(kind)!;
      gl.shaderSource(shader, code);
      gl.compileShader(shader);
      gl.attachShader(program, shader);
      gl.deleteShader(shader);
    }
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      return;
    }
    gl.useProgram(program);
    function makeTexture(unit: number, filter: number) {
      const texture = gl.createTexture();
      gl.activeTexture(gl.TEXTURE0 + unit);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      for (const key of [gl.TEXTURE_WRAP_S, gl.TEXTURE_WRAP_T])
        gl.texParameteri(gl.TEXTURE_2D, key, gl.CLAMP_TO_EDGE);
      for (const key of [gl.TEXTURE_MIN_FILTER, gl.TEXTURE_MAG_FILTER])
        gl.texParameteri(gl.TEXTURE_2D, key, filter);
      return texture;
    }
    const letters = makeTexture(0, gl.LINEAR);
    const fieldTexture = makeTexture(1, gl.NEAREST);
    const data = new Float32Array(grid * grid * 4);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA32F,
      grid,
      grid,
      0,
      gl.RGBA,
      gl.FLOAT,
      data
    );
    gl.uniform1i(gl.getUniformLocation(program, 'letters'), 0);
    gl.uniform1i(gl.getUniformLocation(program, 'field'), 1);
    const reveal = gl.getUniformLocation(program, 'reveal');
    const mask = document.createElement('canvas');
    const ctx = mask.getContext('2d')!;
    let frame = 0,
      previousTime = 0,
      tail = 0;
    let elapsed = intro ? 0 : 1.4;
    type Point = { x: number; y: number };
    let point: Point | null = null,
      previous: Point | null = null;

    function render(now: number) {
      frame = 0;
      if (
        gl.isContextLost() ||
        motion.matches ||
        !canvas.clientWidth ||
        !canvas.clientHeight
      )
        return;
      const dt = previousTime
        ? Math.min(0.08, (now - previousTime) / 1000)
        : 1 / 60;
      previousTime = now;
      elapsed += dt;
      const progress = Math.min(1, elapsed / 1.4);
      let target = point;
      if (progress < 1) {
        const t = 1 - (1 - progress) ** 3;
        target = {
          x: grid * t,
          y: grid * (0.5 - (t - 0.5) * 0.27 - 0.1 * Math.sin(t * 2 * Math.PI)),
        };
      }
      const fade = 0.97 ** (dt * 60);
      for (let i = 0; i < data.length; i += 4) {
        data[i] *= fade;
        data[i + 1] *= fade;
        data[i + 2] *= fade;
      }
      if (target && previous) {
        const dx = target.x - previous.x,
          dy = target.y - previous.y;
        if (dx || dy) {
          stamp(data, brushRef.current, target.x, target.y, dx, dy);
          tail = 4;
        }
      }
      previous = target;
      tail -= dt;
      if (tail <= 0 && progress === 1) data.fill(0);
      gl.activeTexture(gl.TEXTURE1);
      gl.texSubImage2D(
        gl.TEXTURE_2D,
        0,
        0,
        0,
        grid,
        grid,
        gl.RGBA,
        gl.FLOAT,
        data
      );
      gl.uniform1f(reveal, progress * progress * (3 - 2 * progress));
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      label.style.opacity = '0';
      canvas.style.opacity = '1';
      if (progress < 1 || tail > 0) frame = requestAnimationFrame(render);
      else previousTime = 0;
    }
    function wake() {
      if (!frame && !motion.matches) frame = requestAnimationFrame(render);
    }
    function resize() {
      const ratio = Math.min(devicePixelRatio, 2);
      mask.width = canvas.width = Math.max(
        1,
        Math.round(canvas.clientWidth * ratio)
      );
      mask.height = canvas.height = Math.max(
        1,
        Math.round(canvas.clientHeight * ratio)
      );
      const size = Math.min(mask.height * 0.55, mask.width * 0.25);
      ctx.font = '700 ' + size + 'px Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = 'white';
      ctx.fillText(text, mask.width / 2, mask.height / 2, mask.width * 0.9);
      gl.activeTexture(gl.TEXTURE0);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, mask);
      gl.viewport(0, 0, mask.width, mask.height);
      wake();
    }
    function move(event: PointerEvent) {
      const rect = canvas.getBoundingClientRect();
      const next = {
        x: (grid * (event.clientX - rect.left)) / rect.width,
        y: (grid * (event.clientY - rect.top)) / rect.height,
      };
      if (!point || elapsed < 1.4) previous = next;
      point = next;
      elapsed = 1.4;
      wake();
    }
    function leave() {
      point = previous = null;
    }
    function fallback() {
      cancelAnimationFrame(frame);
      frame = 0;
      canvas.style.opacity = '0';
      label.style.opacity = '1';
    }
    function preference() {
      if (motion.matches) {
        elapsed = 1.4;
        data.fill(0);
        tail = 0;
        leave();
        fallback();
      } else wake();
    }
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    canvas.addEventListener('pointermove', move);
    canvas.addEventListener('pointerleave', leave);
    canvas.addEventListener('pointercancel', leave);
    canvas.addEventListener('webglcontextlost', fallback);
    motion.addEventListener('change', preference);
    resize();
    return () => {
      fallback();
      observer.disconnect();
      canvas.removeEventListener('pointermove', move);
      canvas.removeEventListener('pointerleave', leave);
      canvas.removeEventListener('pointercancel', leave);
      canvas.removeEventListener('webglcontextlost', fallback);
      motion.removeEventListener('change', preference);
      gl.deleteTexture(fieldTexture);
      gl.deleteTexture(letters);
      gl.deleteProgram(program);
    };
  }, [text, intro]);

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        display: 'grid',
        placeItems: 'center',
        overflow: 'hidden',
        containerType: 'inline-size',
      }}
    >
      <span
        ref={labelRef}
        style={{
          font: 'bold 20cqw Arial, sans-serif',
          lineHeight: 1,
          maxWidth: '100%',
        }}
      >
        {text}
      </span>
      <canvas
        ref={canvasRef}
        aria-hidden='true'
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0,
        }}
      />
    </div>
  );
}
