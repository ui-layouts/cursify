"use client";
import { useEffect, useRef } from "react";

/* Adapted from nestorrig/Fluid-Pixel-Cursor-Effect.
MIT License

Copyright (c) 2026 Nestor Rios Garcia

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

export interface FluidPixelCursorProps {
  /** Six-digit hex dye color. */
  color?: string;
  pixelSize?: number;
}

export default function FluidPixelCursor({
  color = "#004bff",
  pixelSize = 16,
}: FluidPixelCursorProps) {
  const surface = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = surface.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const clamp = (n: number, min: number, max: number) =>
      Math.max(min, Math.min(max, n));
    const rgb = /^#[0-9a-f]{6}$/i.test(color)
      ? parseInt(color.slice(1), 16)
      : 0x004bff;
    let simW = 1,
      simH = 1;
    let vx: Float32Array,
      vy: Float32Array,
      vx0: Float32Array,
      vy0: Float32Array;
    let dye: Float32Array,
      dye0: Float32Array,
      pressure: Float32Array,
      pressure0: Float32Array,
      divergence: Float32Array;
    let pixels: ImageData;
    const idx = (x: number, y: number) => x + y * simW;
    const resize = () => {
      const step = Number.isFinite(pixelSize) ? Math.max(1, pixelSize) : 16;
      canvas.width = Math.max(1, Math.floor(canvas.clientWidth / step));
      canvas.height = Math.max(1, Math.floor(canvas.clientHeight / step));
      simH = Math.max(12, Math.min(150, Math.round(canvas.clientHeight / 4)));
      simW = Math.min(
        384,
        Math.max(
          12,
          Math.round(
            (simH * canvas.clientWidth) / Math.max(canvas.clientHeight, 1),
          ),
        ),
      );
      const field = () => new Float32Array(simW * simH);
      vx = field();
      vy = field();
      vx0 = field();
      vy0 = field();
      pressure = field();
      pressure0 = field();
      divergence = field();
      dye = field();
      dye0 = field();
      pixels = ctx.createImageData(canvas.width, canvas.height);
    };
    resize();
    function sample(field: Float32Array, x: number, y: number) {
      const cx = clamp(x, 0, simW - 1);
      const cy = clamp(y, 0, simH - 1);
      return field[idx(cx, cy)];
    }

    function bilerp(field: Float32Array, x: number, y: number) {
      const x0 = Math.floor(x);
      const y0 = Math.floor(y);
      const x1 = x0 + 1;
      const y1 = y0 + 1;
      const tx = x - x0;
      const ty = y - y0;

      const a = sample(field, x0, y0);
      const b = sample(field, x1, y0);
      const c = sample(field, x0, y1);
      const d = sample(field, x1, y1);

      return (a * (1 - tx) + b * tx) * (1 - ty) + (c * (1 - tx) + d * tx) * ty;
    }

    function addSplat(
      normX: number,
      normY: number,
      forceX: number,
      forceY: number,
      radiusCells: number,
      intensity: number,
    ) {
      const cx = Math.floor(normX * (simW - 1));
      const cy = Math.floor(normY * (simH - 1));
      const rad = Math.max(1.2, radiusCells);
      const minX = clamp(Math.floor(cx - rad * 2), 0, simW - 1);
      const maxX = clamp(Math.floor(cx + rad * 2), 0, simW - 1);
      const minY = clamp(Math.floor(cy - rad * 2), 0, simH - 1);
      const maxY = clamp(Math.floor(cy + rad * 2), 0, simH - 1);

      for (let y = minY; y <= maxY; y++) {
        for (let x = minX; x <= maxX; x++) {
          const dx = x - cx;
          const dy = y - cy;
          const falloff = Math.exp(-(dx * dx + dy * dy) / (rad * rad));
          const i = idx(x, y);

          vx[i] += forceX * falloff;
          vy[i] += forceY * falloff;
          dye[i] += intensity * falloff;
        }
      }
    }

    function advectScalar(
      src: Float32Array,
      dst: Float32Array,
      dt: number,
      dissipation: number,
    ) {
      const dt0x = dt * (simW - 2);
      const dt0y = dt * (simH - 2);

      for (let y = 0; y < simH; y++) {
        for (let x = 0; x < simW; x++) {
          const i = idx(x, y);
          const backX = x - vx[i] * dt0x;
          const backY = y - vy[i] * dt0y;
          dst[i] = bilerp(src, backX, backY) * dissipation;
        }
      }
    }

    function advectVelocity(dt: number) {
      const dt0x = dt * (simW - 2);
      const dt0y = dt * (simH - 2);

      for (let y = 0; y < simH; y++) {
        for (let x = 0; x < simW; x++) {
          const i = idx(x, y);
          const backX = x - vx[i] * dt0x;
          const backY = y - vy[i] * dt0y;
          vx0[i] = bilerp(vx, backX, backY) * Math.pow(0.77, dt * 60);
          vy0[i] = bilerp(vy, backX, backY) * Math.pow(0.77, dt * 60);
        }
      }
      [vx, vx0] = [vx0, vx];
      [vy, vy0] = [vy0, vy];
    }

    function solvePressure() {
      for (let y = 1; y < simH - 1; y++) {
        for (let x = 1; x < simW - 1; x++) {
          const i = idx(x, y);
          const div =
            (vx[idx(x + 1, y)] -
              vx[idx(x - 1, y)] +
              vy[idx(x, y + 1)] -
              vy[idx(x, y - 1)]) *
            0.5;
          divergence[i] = div;
          pressure[i] = 0;
        }
      }

      for (let k = 0; k < 10; k++) {
        for (let y = 1; y < simH - 1; y++) {
          for (let x = 1; x < simW - 1; x++) {
            const i = idx(x, y);
            pressure0[i] =
              (pressure[idx(x - 1, y)] +
                pressure[idx(x + 1, y)] +
                pressure[idx(x, y - 1)] +
                pressure[idx(x, y + 1)] -
                divergence[i]) *
              0.25;
          }
        }
        [pressure, pressure0] = [pressure0, pressure];
      }

      for (let y = 1; y < simH - 1; y++) {
        for (let x = 1; x < simW - 1; x++) {
          const i = idx(x, y);
          vx[i] -= (pressure[idx(x + 1, y)] - pressure[idx(x - 1, y)]) * 0.5;
          vy[i] -= (pressure[idx(x, y + 1)] - pressure[idx(x, y - 1)]) * 0.5;
        }
      }
    }

    let x = 0,
      y = 0,
      targetX = 0,
      targetY = 0;
    let frame = 0,
      last = 0,
      moved = -Infinity,
      ready = false;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    function tick(now: number) {
      frame = 0;
      const dt = clamp((now - last) / 1000, 0.001, 0.018);
      last = now;
      const dx = (targetX - x) * 0.22,
        dy = (targetY - y) * 0.22;
      x += dx;
      y += dy;
      const speed = Math.min(60, Math.hypot(dx, dy) * 1.6);
      if (now - moved < 200 && speed > 0.02) {
        const force = (18 + 1.1 * speed) * dt;
        addSplat(
          x / canvas!.clientWidth,
          y / canvas!.clientHeight,
          dx * force,
          dy * force,
          2.1 + speed * 0.045,
          0.6 + speed * 0.006,
        );
      }
      advectVelocity(dt);
      solvePressure();
      advectScalar(dye, dye0, dt, Math.pow(0.95, dt * 60));
      [dye, dye0] = [dye0, dye];
      for (let py = 0; py < pixels.height; py++) {
        for (let px = 0; px < pixels.width; px++) {
          const i = (py * pixels.width + px) * 4;
          const amount = sample(
            dye,
            Math.floor(((px + 0.5) * simW) / pixels.width),
            Math.floor(((py + 0.5) * simH) / pixels.height),
          );
          pixels.data[i] = rgb >> 16;
          pixels.data[i + 1] = (rgb >> 8) & 255;
          pixels.data[i + 2] = rgb & 255;
          pixels.data[i + 3] = Math.min(255, amount * 400);
        }
      }
      ctx!.putImageData(pixels, 0, 0);
      if (now - moved < 2500 && !reduced.matches)
        frame = requestAnimationFrame(tick);
      else {
        resize();
        ready = false;
      }
    }
    function move(event: PointerEvent) {
      if (reduced.matches) return;
      const rect = canvas!.getBoundingClientRect();
      targetX = event.clientX - rect.left;
      targetY = event.clientY - rect.top;
      if (!ready) {
        x = targetX;
        y = targetY;
        ready = true;
      }
      moved = performance.now();
      if (!frame) {
        last = moved;
        frame = requestAnimationFrame(tick);
      }
    }
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(frame);
    };
  }, [color, pixelSize]);
  return (
    <canvas
      ref={surface}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        imageRendering: "pixelated",
        zIndex: 50,
      }}
    />
  );
}
