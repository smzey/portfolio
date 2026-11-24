'use client';

import { useEffect, useRef } from 'react';

interface Node3D {
  x: number;
  y: number;
  z: number;
  label?: string;
}

const NODES: Node3D[] = [
  // Inner icosahedral / architectural core
  { x: 0, y: 0.92, z: 0, label: 'EDGE AI' },
  { x: 0, y: -0.92, z: 0, label: 'SQL / API' },
  { x: 0.88, y: 0.28, z: 0.22, label: 'CNN 94.8%' },
  { x: -0.88, y: 0.28, z: -0.22, label: 'OLLAMA' },
  { x: 0.28, y: 0.34, z: -0.84, label: '358 TESTS' },
  { x: -0.28, y: 0.34, z: 0.84, label: 'GUARDRAIL' },
  { x: 0.72, y: -0.44, z: -0.48 },
  { x: -0.72, y: -0.44, z: 0.48 },
  { x: -0.66, y: -0.36, z: -0.6 },
  { x: 0.66, y: -0.36, z: 0.6, label: 'BIN PACK' },
  { x: 0, y: 0, z: 0 },
];

const EDGES: [number, number][] = [
  [0, 2], [0, 3], [0, 4], [0, 5],
  [1, 6], [1, 7], [1, 8], [1, 9],
  [2, 4], [4, 3], [3, 5], [5, 2],
  [6, 8], [8, 7], [7, 9], [9, 6],
  [2, 6], [2, 9], [3, 7], [3, 8],
  [4, 6], [4, 8], [5, 7], [5, 9],
  [10, 0], [10, 1], [10, 2], [10, 3], [10, 4], [10, 5],
];

export default function HeroSchematicCanvas({ theme }: { theme: 'dark' | 'light' }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerRef = useRef({ tx: 0, ty: 0, x: 0, y: 0 });
  const visibleRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const io = new IntersectionObserver(
      (entries) => {
        visibleRef.current = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.05 }
    );
    io.observe(canvas);

    let raf = 0;
    let angleY = 0.42;
    let angleX = 0.24;
    let t = 0;

    const drawFrame = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      if (w < 10 || h < 10) return;

      ctx.clearRect(0, 0, w, h);

      const isDark = theme === 'dark';
      const fg = isDark ? '250, 250, 250' : '9, 9, 11';
      const emerald = isDark ? '34, 197, 94' : '22, 163, 74';

      const cx = w * 0.5;
      const cy = h * 0.5;
      const radius = Math.min(w, h) * 0.34;

      // Architectural CAD coordinate crosshair + orbital rings
      ctx.save();
      ctx.strokeStyle = `rgba(${fg}, 0.07)`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.18, 0, Math.PI * 2);
      ctx.stroke();

      ctx.setLineDash([3, 5]);
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 0.72, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Subtle axis ticks
      ctx.beginPath();
      ctx.moveTo(cx - radius * 1.32, cy);
      ctx.lineTo(cx - radius * 1.2, cy);
      ctx.moveTo(cx + radius * 1.2, cy);
      ctx.lineTo(cx + radius * 1.32, cy);
      ctx.moveTo(cx, cy - radius * 1.32);
      ctx.lineTo(cx, cy - radius * 1.2);
      ctx.moveTo(cx, cy + radius * 1.2);
      ctx.lineTo(cx, cy + radius * 1.32);
      ctx.stroke();
      ctx.restore();

      // Smooth pointer parallax easing
      pointerRef.current.x += (pointerRef.current.tx - pointerRef.current.x) * 0.06;
      pointerRef.current.y += (pointerRef.current.ty - pointerRef.current.y) * 0.06;

      const ay = angleY + pointerRef.current.x * 0.55;
      const ax = angleX + pointerRef.current.y * 0.45;
      const cosY = Math.cos(ay);
      const sinY = Math.sin(ay);
      const cosX = Math.cos(ax);
      const sinX = Math.sin(ax);

      // Project 3D nodes
      const projected = NODES.map((n) => {
        const x1 = n.x * cosY - n.z * sinY;
        const z1 = n.x * sinY + n.z * cosY;
        const y2 = n.y * cosX - z1 * sinX;
        const z2 = n.y * sinX + z1 * cosX;
        const perspective = 2.8 / (2.8 - z2 * 0.75);
        return {
          px: cx + x1 * radius * perspective,
          py: cy - y2 * radius * perspective,
          z: z2,
          scale: perspective,
          label: n.label,
        };
      });

      // Draw edges sorted back-to-front
      for (let i = 0; i < EDGES.length; i++) {
        const [aIdx, bIdx] = EDGES[i];
        const a = projected[aIdx];
        const b = projected[bIdx];
        const depth = (a.z + b.z) * 0.5;
        const alpha = Math.max(0.08, Math.min(0.45, 0.22 + depth * 0.16));

        ctx.strokeStyle = `rgba(${fg}, ${alpha.toFixed(3)})`;
        ctx.lineWidth = aIdx === 10 || bIdx === 10 ? 0.85 : 1.1;
        ctx.beginPath();
        ctx.moveTo(a.px, a.py);
        ctx.lineTo(b.px, b.py);
        ctx.stroke();

        // Traveling signal pulse on 4 active conduits
        if (!reducedMotion && i % 7 === 0) {
          const p = (t * 0.42 + i * 0.19) % 1;
          const sx = a.px + (b.px - a.px) * p;
          const sy = a.py + (b.py - a.py) * p;
          ctx.fillStyle = `rgba(${emerald}, 0.85)`;
          ctx.beginPath();
          ctx.arc(sx, sy, 2.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw nodes + technical callouts
      ctx.font = '500 9.5px ui-monospace, SFMono-Regular, Menlo, monospace';
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        const alpha = Math.max(0.28, Math.min(0.95, 0.58 + p.z * 0.35));
        const r = i === 10 ? 3.5 : 2.6 * p.scale;

        ctx.fillStyle = i === 10 ? `rgba(${emerald}, 0.9)` : `rgba(${fg}, ${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.px, p.py, r, 0, Math.PI * 2);
        ctx.fill();

        if (p.label && p.z > -0.25) {
          const labelAlpha = Math.max(0.22, Math.min(0.72, 0.42 + p.z * 0.3));
          ctx.fillStyle = `rgba(${fg}, ${labelAlpha.toFixed(3)})`;
          ctx.fillText(p.label, p.px + 7, p.py + 3);
        }
      }
    };

    const loop = () => {
      if (visibleRef.current && !document.hidden) {
        if (!reducedMotion) {
          angleY += 0.0042;
          t += 0.016;
        }
        drawFrame();
      }
      if (!reducedMotion) {
        raf = requestAnimationFrame(loop);
      }
    };

    drawFrame();
    if (!reducedMotion) {
      raf = requestAnimationFrame(loop);
    }

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / Math.max(1, rect.width) - 0.5) * 2;
      const ny = ((e.clientY - rect.top) / Math.max(1, rect.height) - 0.5) * 2;
      pointerRef.current.tx = Math.max(-1, Math.min(1, nx));
      pointerRef.current.ty = Math.max(-1, Math.min(1, ny));
      if (reducedMotion) drawFrame();
    };
    const onLeave = () => {
      pointerRef.current.tx = 0;
      pointerRef.current.ty = 0;
      if (reducedMotion) drawFrame();
    };

    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerleave', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerleave', onLeave);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      aria-label="Interactive 3D architectural lattice representing on-device AI and full-stack systems"
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
        cursor: 'crosshair',
      }}
    />
  );
}
