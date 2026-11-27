'use client';

import { useEffect, useRef } from 'react';

// Adapted from whatisjery/atelier-ui-codrops (MIT).
export type AtelierEffect = 'liquid' | 'pixel' | 'lens';
type Props = {
  src: string;
  type?: AtelierEffect;
  className?: string;
  media?: 'image' | 'video';
  alt: string;
};

const vertex = `#version 300 es
out vec2 uv;
void main() {
  vec2 corner = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2);
  uv = vec2(corner.x, 1.0 - corner.y);
  gl_Position = vec4(corner * 2.0 - 1.0, 0.0, 1.0);
}`;

const effects = {
  liquid: `
    float d = texture(field, uv).r;
    float angle = d * 6.2831853;
    color = texture(photo, p + vec2(sin(angle), -cos(angle)) * d * intensity);`,
  pixel: `
    vec2 offset = texture(field, p).rg * 1.65;
    vec2 center = p - offset;
    color = vec4(texture(photo, center - offset * .25).r, texture(photo, center).g,
                 texture(photo, center + offset * .25).b, texture(photo, center).a);`,
  lens: `
    vec2 delta = p - mouse;
    float radius = length(delta * vec2(aspect, 1.0));
    float mask = (1.0 - smoothstep(.12, .62, radius)) * intensity;
    vec2 center = p - delta * .4 * mask;
    vec3 sum = vec3(0), weights = vec3(0);
    for (int i = 0; i < 35; i++) {
      float t = (float(i) + .5) / 35.0;
      vec3 weight = clamp(1.0 - 2.0 * abs(t - vec3(0,.5,1)), 0.0, 1.0);
      vec3 rgb = texture(photo, center + delta * .18 * mask * (1.0 - 2.0*t)).rgb;
      sum += pow(rgb, vec3(2.2)) * weight;
      weights += weight;
    }
    color = vec4(pow(sum / weights, vec3(1.0/2.2)), texture(photo, center).a);`,
};

function animate(
  canvas: HTMLCanvasElement,
  media: HTMLImageElement | HTMLVideoElement,
  type: AtelierEffect
) {
  const context = canvas.getContext('webgl2', {
    alpha: true,
    premultipliedAlpha: false,
  });
  if (!context) return;
  const gl = context;
  const program = gl.createProgram();
  const fragment = `#version 300 es
    precision highp float;
    in vec2 uv;
    out vec4 color;
    uniform sampler2D photo, field;
    uniform vec2 mouse, crop;
    uniform float aspect, intensity;
    void main() {
      vec2 p = (uv - .5) * crop + .5;
      ${effects[type]}
    }`;
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
  const uniform = (name: string) => gl.getUniformLocation(program, name);
  const crop = uniform('crop'),
    aspect = uniform('aspect');
  const mouse = uniform('mouse'),
    intensity = uniform('intensity');
  function texture(unit: number, filter: number) {
    const tex = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0 + unit);
    gl.bindTexture(gl.TEXTURE_2D, tex);
    for (const key of [gl.TEXTURE_WRAP_S, gl.TEXTURE_WRAP_T])
      gl.texParameteri(gl.TEXTURE_2D, key, gl.CLAMP_TO_EDGE);
    for (const key of [gl.TEXTURE_MIN_FILTER, gl.TEXTURE_MAG_FILTER])
      gl.texParameteri(gl.TEXTURE_2D, key, filter);
    return tex;
  }
  const photo = texture(0, gl.LINEAR);
  const field = texture(1, type === 'pixel' ? gl.NEAREST : gl.LINEAR);
  gl.uniform1i(uniform('photo'), 0);
  gl.uniform1i(uniform('field'), 1);

  const gridSize = 22;
  const grid = new Float32Array(gridSize * gridSize * 2);
  const displacement = document.createElement('canvas');
  const ctx = type === 'liquid' ? displacement.getContext('2d') : null;
  const brush = new Image();
  if (ctx) brush.src = brushSrc;
  const ripples: { x: number; y: number; age: number; angle: number }[] = [];
  let x = 0.5,
    y = 0.5,
    lastX = x,
    lastY = y,
    lensX = x,
    lensY = y;
  let strength = 0,
    velocity = 0,
    spawnX = Infinity,
    spawnY = Infinity;
  let hover = false,
    stopAt = 0,
    previous = 0,
    frame = 0,
    uploaded = false;
  const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE) as number;
  const video = media instanceof HTMLVideoElement;
  function render(now: number) {
    frame = 0;
    const dt = Math.min((now - previous) / 1000, 0.05);
    previous = now;
    const w = canvas.clientWidth,
      h = canvas.clientHeight;
    const mw = video ? media.videoWidth : media.naturalWidth;
    const mh = video ? media.videoHeight : media.naturalHeight;
    if (!w || !h || !mw || !mh || (video && media.readyState < 2)) {
      canvas.style.opacity = '0';
      if (hover) frame = requestAnimationFrame(render);
      return;
    }
    if (mw > maxTextureSize || mh > maxTextureSize) {
      canvas.style.opacity = '0';
      return;
    }
    const ratio = Math.min(devicePixelRatio, 2);
    const width = Math.round(w * ratio),
      height = Math.round(h * ratio);
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
    gl.viewport(0, 0, width, height);
    gl.activeTexture(gl.TEXTURE0);
    if (!uploaded || video) {
      try {
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.RGBA,
          gl.RGBA,
          gl.UNSIGNED_BYTE,
          media
        );
      } catch {
        canvas.style.opacity = '0';
        return;
      }
      uploaded = true;
    }
    const scale = w / h / (mw / mh);
    const cx = Math.min(1, scale),
      cy = Math.min(1, 1 / scale);
    const px = (x - 0.5) * cx + 0.5,
      py = (y - 0.5) * cy + 0.5;
    gl.uniform2f(crop, cx, cy);
    const dx = x - lastX,
      dy = y - lastY;
    lastX = x;
    lastY = y;
    gl.activeTexture(gl.TEXTURE1);
    if (type === 'pixel') {
      const fade = 0.93 ** (dt * 60);
      for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
          const i = (row * gridSize + col) * 2;
          const distance = Math.hypot(col - px * gridSize, row - py * gridSize);
          const weight = hover ? Math.max(0, 1 - distance / 4) : 0;
          grid[i] = grid[i] * fade + dx * cx * weight;
          grid[i + 1] = grid[i + 1] * fade + dy * cy * weight;
        }
      }
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RG32F,
        gridSize,
        gridSize,
        0,
        gl.RG,
        gl.FLOAT,
        grid
      );
    } else if (type === 'lens') {
      const damping = 1 - Math.exp(-7 * dt);
      lensX += (px - lensX) * damping;
      lensY += (py - lensY) * damping;
      strength += (Number(hover) - strength) * damping;
      gl.uniform2f(mouse, lensX, lensY);
      gl.uniform1f(aspect, mw / mh);
    } else if (ctx) {
      if (displacement.width !== w || displacement.height !== h) {
        displacement.width = w;
        displacement.height = h;
      }
      const size = 0.12 * Math.min(w, h);
      const speed = Math.hypot(dx * w, dy * h) / Math.max(1, h * dt * 6);
      velocity +=
        ((hover ? speed : 0) - velocity) *
        (1 - Math.exp(-(hover ? 6.3 : 0.3) * dt));
      strength += (velocity - strength) * (1 - Math.exp(-6.3 * dt));
      if (
        hover &&
        Math.hypot((x - spawnX) * w, (y - spawnY) * h) > size * 0.2
      ) {
        ripples.push({ x, y, age: 0, angle: Math.random() * Math.PI * 2 });
        spawnX = x;
        spawnY = y;
      }
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';
      while (ripples.length && ripples[0].age > 1.6) ripples.shift();
      for (const ripple of ripples) {
        ripple.age += dt;
        const side = size * (1 + 11 * ripple.age);
        ctx.save();
        ctx.translate(ripple.x * w, ripple.y * h);
        ctx.rotate(ripple.angle + 0.2 * ripple.age);
        ctx.globalAlpha = 0.22 * Math.exp(-3 * ripple.age);
        if (brush.naturalWidth)
          ctx.drawImage(brush, -side / 2, -side / 2, side, side);
        ctx.restore();
      }
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        displacement
      );
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
    }
    gl.uniform1f(intensity, strength);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    canvas.style.opacity = '1';
    if (hover || now < stopAt) frame = requestAnimationFrame(render);
    else canvas.style.opacity = '0';
  }
  function move(event: PointerEvent) {
    if (event.pointerType === 'touch') return;
    const rect = canvas.getBoundingClientRect();
    x = (event.clientX - rect.left) / rect.width;
    y = (event.clientY - rect.top) / rect.height;
    if (!hover) {
      lastX = x;
      lastY = y;
    }
    hover = true;
    if (!frame) {
      previous = performance.now() - 16;
      frame = requestAnimationFrame(render);
    }
  }
  function leave() {
    hover = false;
    stopAt = performance.now() + 1700;
  }
  canvas.addEventListener('pointermove', move);
  canvas.addEventListener('pointerleave', leave);
  return () => {
    cancelAnimationFrame(frame);
    canvas.removeEventListener('pointermove', move);
    canvas.removeEventListener('pointerleave', leave);
    canvas.style.opacity = '0';
    gl.deleteTexture(photo);
    gl.deleteTexture(field);
    gl.deleteProgram(program);
  };
}

export default function AtelierMedia({
  src,
  alt,
  media = 'image',
  type = 'liquid',
  className,
}: Props) {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = host.current!;
    const canvas = element.querySelector('canvas')!;
    const source = element.querySelector('img, video') as
      HTMLImageElement | HTMLVideoElement;
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    let dispose: ReturnType<typeof animate>;
    function setup() {
      dispose?.();
      if (source instanceof HTMLVideoElement) {
        if (motion.matches) source.pause();
        else void source.play().catch(() => {});
      }
      dispose = motion.matches ? undefined : animate(canvas, source, type);
    }
    function lost(event: Event) {
      event.preventDefault();
      dispose?.();
      dispose = undefined;
    }
    setup();
    motion.addEventListener('change', setup);
    canvas.addEventListener('webglcontextlost', lost);
    canvas.addEventListener('webglcontextrestored', setup);
    return () => {
      dispose?.();
      motion.removeEventListener('change', setup);
      canvas.removeEventListener('webglcontextlost', lost);
      canvas.removeEventListener('webglcontextrestored', setup);
    };
  }, [src, media, type]);

  const style = {
    display: 'block',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  } as const;
  return (
    <div ref={host} className={className} style={{ position: 'relative' }}>
      {media === 'video' ? (
        <video
          src={src}
          aria-label={alt}
          muted
          loop
          playsInline
          crossOrigin='anonymous'
          style={style}
        />
      ) : (
        <img src={src} alt={alt} crossOrigin='anonymous' style={style} />
      )}
      <canvas
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

const brushSrc =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAnFBMVEUAAAD////////////////////////////////////////////////////+/v7////9/f3////9/f39/f3////////////9/f3+/v79/f3////////+/v79/f3+/v7////////+/v7////+/v7////+/v7+/v7////////////+/v7////+/v7+/v7+/v7+/v7////////////////Clg1EAAAANHRSTlMACAwRBBUcICQZKDM4LEAwSjxGTml2XEOCUmRhh1eLcXpUbpl+Wo+1kqumsJafnKK+ucPKHu8hDAAADa9JREFUeNrslcl6olAUhJOWCCKDgDJeJkEEFBzy/u/Wda7na9PboK6sRRbJon7qVN18vPXWW2/9UspNH68Wm3/e9XoIcv9zFzG8EkJRyH42m31BM4gYXgjB9l+LxVxqISkY4gUM5I9vn6uqpum6rmmqCghmeAGC/HzYa7ppL0m2aeqaykGA4ZkI/PmzxVzT7aVhWUEQWJZjAAIMKjM8sZMc/0LVzaUTuJ4XRZHnrdzAMgwwAAIMHANTPMOfPt+wXC/1kySOE39XRh4zSAQeBpfysfbsv3Rcr/TjbU7arteJn0bIgW7BdfgxT+Wx54e/Cf9oF283RR1CdbEBRLJLcQvrXx1AwY14FMInn1/6l/46L0LRNG3bNFkYgmEdyxhwCbkLnucNQXnQ+rh+FvlvatFU4zgM41gdGxHWhJDsZBscAxTLWxZAeAiBwuvXTcNalcl6E2bH8dR3UH8axqrNgLBFCrvSW61cl/dpm5q6YIKp/jOuP/x96T/03WEPHQ5gGCmFAghIYZemZVqWkeyErTPBg+bH/jX5H/aXy/l8uYCh6zkE2sQ6juWPxC+9wFkSwWSA//3zWrRj35E/BAQQUAYZLeKmoqBtxH7kWiD4mkiAAPD8qtI/8mP0vzkOHQI4XyEQUAQDIhAYZU3bFBkk0IokXTm2PieCCQB8AOq/R/sPRVv1EuB88+cbNEQghGjaIwYyHltR53HpGrY27QgKv/94/j0MIC9oAQTwswOD9CdlbTXQPuh3WZ0nUWDQEfAeTQ3AsPgBDMlDEtxXQAcQMvxG9nNPXH2VFVt/5XAEEwOwjQANlAAwGQf6SJh3PduHNZpX42/Vqduf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';
