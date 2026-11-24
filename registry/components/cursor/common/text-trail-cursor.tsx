"use client";

import { useEffect, useRef } from "react";

export interface TextTrailCursorProps {
  text?: string;
  color?: string;
  ink?: string;
  fontSize?: string | number;
}

/** Five staggered word impressions, with a solid leading face. Inspired by KirilBT. */
export default function TextTrailCursor({
  text = "move",
  color = "#fff",
  ink = "#161616",
  fontSize = "clamp(48px, 8vw, 96px)",
}: TextTrailCursorProps) {
  const overlay = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const host = overlay.current;
    if (!host) return;
    const nodes = Array.from(host.children) as HTMLElement[];
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const history: { x: number; y: number; t: number }[] = [];
    const positions = nodes.map(() => ({ x: 0, y: 0 }));
    let active = false,
      raf = 0,
      last = 0;
    function hide() {
      active = false;
      history.length = 0;
      cancelAnimationFrame(raf);
      raf = 0;
      last = 0;
      host!.style.visibility = "hidden";
    }
    function tick(now: number) {
      raf = 0;
      if (!active || !history.length) return;
      const dt = last ? Math.min(64, now - last) : 16.67;
      last = now;
      const latest = history[history.length - 1];
      while (history.length > 1 && history[1].t < now - 100) history.shift();
      let moving = false;
      nodes.forEach((node, i) => {
        const delay = motion.matches ? 0 : (nodes.length - 1 - i) * 20;
        let target = history[0];
        for (const sample of history) {
          if (sample.t > now - delay) break;
          target = sample;
        }
        const p = positions[i];
        const weight = motion.matches ? 1 : 1 - Math.exp(-dt / 72);
        p.x += (target.x - p.x) * weight;
        p.y += (target.y - p.y) * weight;
        if (Math.hypot(latest.x - p.x, latest.y - p.y) < 0.1) {
          p.x = latest.x;
          p.y = latest.y;
        } else moving = true;
        node.style.transform = `translate3d(${p.x}px,${p.y}px,0)`;
        node.style.visibility =
          motion.matches && i < nodes.length - 1 ? "hidden" : "inherit";
      });
      if (moving || now - latest.t < 90) raf = requestAnimationFrame(tick);
      else last = 0;
    }
    function move(event: PointerEvent) {
      if (event.pointerType === "touch") {
        hide();
        return;
      }
      const point = {
        x: event.clientX,
        y: event.clientY,
        t: performance.now(),
      };
      // The preview's container can establish its own fixed-position origin.
      const rect = host!.getBoundingClientRect();
      point.x -= rect.left;
      point.y -= rect.top;
      history.push(point);
      if (!active) {
        active = true;
        positions.forEach((p) => {
          p.x = point.x;
          p.y = point.y;
        });
        host!.style.visibility = "visible";
      }
      if (!raf) raf = requestAnimationFrame(tick);
    }
    function leave(event: PointerEvent) {
      if (!event.relatedTarget) hide();
    }
    function update() {
      if (active && !raf) raf = requestAnimationFrame(tick);
    }
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerout", leave);
    window.addEventListener("blur", hide);
    motion.addEventListener("change", update);
    return () => {
      hide();
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerout", leave);
      window.removeEventListener("blur", hide);
      motion.removeEventListener("change", update);
    };
  }, []);
  return (
    <div
      ref={overlay}
      aria-hidden="true"
      style={{
        pointerEvents: "none",
        position: "fixed",
        inset: 0,
        zIndex: 50,
        overflow: "hidden",
        visibility: "hidden",
      }}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            whiteSpace: "nowrap",
            fontFamily: "Arial Black, system-ui, sans-serif",
            fontWeight: 900,
            fontSize,
            lineHeight: 1,
            letterSpacing: "-.05em",
            WebkitTextStroke: `1px ${color}`,
            color: i === 4 ? color : ink,
            willChange: "transform",
          }}
        >
          {text}
        </span>
      ))}
    </div>
  );
}
