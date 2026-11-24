'use client';

import { useEffect, useRef, type MutableRefObject } from 'react';

export type GyroStatus = 'desktop' | 'prompt' | 'active' | 'touch';

interface Node3D {
  x: number;
  y: number;
  z: number;
  label?: string;
}

type DeviceOrientationStatic = typeof DeviceOrientationEvent & {
  requestPermission?: () => Promise<'granted' | 'denied'>;
};

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

interface HeroSchematicCanvasProps {
  theme: 'dark' | 'light';
  onGyroStatusChange?: (status: GyroStatus) => void;
  gyroActionRef?: MutableRefObject<(() => Promise<void>) | null>;
}

export default function HeroSchematicCanvas({
  theme,
  onGyroStatusChange,
  gyroActionRef,
}: HeroSchematicCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerRef = useRef({ tx: 0, ty: 0, x: 0, y: 0 });
  const gyroRef = useRef<{
    active: boolean;
    baseBeta: number | null;
    baseGamma: number | null;
    tx: number;
    ty: number;
  }>({ active: false, baseBeta: null, baseGamma: null, tx: 0, ty: 0 });
  const dragRef = useRef<{ active: boolean; lastX: number; lastY: number; vx: number; vy: number }>({
    active: false,
    lastX: 0,
    lastY: 0,
    vx: 0,
    vy: 0,
  });
  const visibleRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCoarsePointer =
      window.matchMedia('(pointer: coarse)').matches || (navigator.maxTouchPoints ?? 0) > 0;

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

    // Gyroscope (DeviceOrientation) handler — auto-calibrates to user's natural holding posture
    const onOrientation = (ev: DeviceOrientationEvent) => {
      if (reducedMotion) return;
      if (ev.gamma == null || ev.beta == null) return;

      if (gyroRef.current.baseGamma === null || gyroRef.current.baseBeta === null) {
        gyroRef.current.baseGamma = ev.gamma;
        gyroRef.current.baseBeta = ev.beta;
      }

      const dGamma = ev.gamma - gyroRef.current.baseGamma;
      const dBeta = ev.beta - gyroRef.current.baseBeta;

      gyroRef.current.tx = Math.max(-1.35, Math.min(1.35, dGamma / 28));
      gyroRef.current.ty = Math.max(-1.1, Math.min(1.1, dBeta / 28));

      if (!gyroRef.current.active) {
        gyroRef.current.active = true;
        onGyroStatusChange?.('active');
      }
    };

    let orientationListening = false;
    const attachOrientation = () => {
      if (orientationListening) return;
      window.addEventListener('deviceorientation', onOrientation, true);
      orientationListening = true;
    };

    const hasOrientation = typeof window !== 'undefined' && 'DeviceOrientationEvent' in window;
    const DOE = hasOrientation ? (window.DeviceOrientationEvent as DeviceOrientationStatic) : null;
    const needsExplicitPermission = Boolean(DOE && typeof DOE.requestPermission === 'function');

    if (!isCoarsePointer) {
      onGyroStatusChange?.('desktop');
    } else if (needsExplicitPermission) {
      onGyroStatusChange?.('prompt');
    } else if (hasOrientation && !reducedMotion) {
      // Android / non-gated mobile browsers: attach immediately; transitions to 'active' on first reading
      onGyroStatusChange?.('touch');
      attachOrientation();
    } else {
      onGyroStatusChange?.('touch');
    }

    if (gyroActionRef) {
      gyroActionRef.current = async () => {
        if (gyroRef.current.active) {
          // Recenter neutral posture on tap
          gyroRef.current.baseBeta = null;
          gyroRef.current.baseGamma = null;
          return;
        }
        if (DOE && typeof DOE.requestPermission === 'function') {
          try {
            const res = await DOE.requestPermission();
            if (res === 'granted') {
              gyroRef.current.baseBeta = null;
              gyroRef.current.baseGamma = null;
              attachOrientation();
              gyroRef.current.active = true;
              onGyroStatusChange?.('active');
            } else {
              onGyroStatusChange?.('touch');
            }
          } catch {
            onGyroStatusChange?.('touch');
          }
        } else if (hasOrientation) {
          gyroRef.current.baseBeta = null;
          gyroRef.current.baseGamma = null;
          attachOrientation();
        }
      };
    }

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
      const isCompact = w < 400;
      const radius = Math.min(w * (isCompact ? 0.27 : 0.3), h * 0.31);

      // Combine pointer / gyro targets with smooth spring easing
      const targetX = gyroRef.current.active ? gyroRef.current.tx : pointerRef.current.tx;
      const targetY = gyroRef.current.active ? gyroRef.current.ty : pointerRef.current.ty;
      const ease = gyroRef.current.active ? 0.1 : 0.06;

      pointerRef.current.x += (targetX - pointerRef.current.x) * ease;
      pointerRef.current.y += (targetY - pointerRef.current.y) * ease;

      // Apply touch-drag rotational momentum
      if (!dragRef.current.active) {
        angleY += dragRef.current.vx;
        angleX = Math.max(-0.85, Math.min(0.85, angleX + dragRef.current.vy));
        dragRef.current.vx *= 0.92;
        dragRef.current.vy *= 0.92;
      }

      // Architectural CAD coordinate crosshair + gyro-responsive orbital rings
      ctx.save();
      ctx.strokeStyle = `rgba(${fg}, 0.075)`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.16, 0, Math.PI * 2);
      ctx.stroke();

      // Subtle tilted gyro-ring ellipse when device tilts
      if (gyroRef.current.active) {
        const tiltScaleY = Math.max(0.55, 1 - Math.abs(pointerRef.current.y) * 0.24);
        ctx.strokeStyle = `rgba(${emerald}, 0.2)`;
        ctx.beginPath();
        ctx.ellipse(
          cx + pointerRef.current.x * 6,
          cy + pointerRef.current.y * 5,
          radius * 1.02,
          radius * 1.02 * tiltScaleY,
          pointerRef.current.x * 0.25,
          0,
          Math.PI * 2
        );
        ctx.stroke();
      }

      ctx.strokeStyle = `rgba(${fg}, 0.07)`;
      ctx.setLineDash([3, 5]);
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 0.72, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Subtle axis ticks
      ctx.beginPath();
      ctx.moveTo(cx - radius * 1.28, cy);
      ctx.lineTo(cx - radius * 1.18, cy);
      ctx.moveTo(cx + radius * 1.18, cy);
      ctx.lineTo(cx + radius * 1.28, cy);
      ctx.moveTo(cx, cy - radius * 1.28);
      ctx.lineTo(cx, cy - radius * 1.18);
      ctx.moveTo(cx, cy + radius * 1.18);
      ctx.lineTo(cx, cy + radius * 1.28);
      ctx.stroke();
      ctx.restore();

      const ay = angleY + pointerRef.current.x * (gyroRef.current.active ? 0.85 : 0.55);
      const ax = angleX + pointerRef.current.y * (gyroRef.current.active ? 0.65 : 0.45);
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

      // Draw edges
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

        // Traveling signal pulse on active conduits
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

      // Draw nodes + technical callouts (edge-safe alignment for mobile & desktop)
      ctx.font = isCompact
        ? '500 8.5px ui-monospace, SFMono-Regular, Menlo, monospace'
        : '500 9.5px ui-monospace, SFMono-Regular, Menlo, monospace';
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        const alpha = Math.max(0.28, Math.min(0.95, 0.58 + p.z * 0.35));
        const r = i === 10 ? 3.5 : 2.6 * p.scale;

        ctx.fillStyle = i === 10 ? `rgba(${emerald}, 0.9)` : `rgba(${fg}, ${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.px, p.py, r, 0, Math.PI * 2);
        ctx.fill();

        if (p.label && p.z > -0.25) {
          const labelAlpha = Math.max(0.24, Math.min(0.75, 0.45 + p.z * 0.3));
          ctx.fillStyle = `rgba(${fg}, ${labelAlpha.toFixed(3)})`;
          const textW = ctx.measureText(p.label).width;
          const placeLeft = p.px + 7 + textW > w - 10;
          ctx.textAlign = placeLeft ? 'right' : 'left';
          const tx = placeLeft ? Math.max(10 + textW, p.px - 7) : Math.min(w - 10 - textW, p.px + 7);
          const ty = Math.max(14, Math.min(h - 10, p.py + 3));
          ctx.fillText(p.label, tx, ty);
        }
      }
      ctx.textAlign = 'left';
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

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') return;
      dragRef.current.active = true;
      dragRef.current.lastX = e.clientX;
      dragRef.current.lastY = e.clientY;
      dragRef.current.vx = 0;
      dragRef.current.vy = 0;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') {
        if (!dragRef.current.active) return;
        const dx = e.clientX - dragRef.current.lastX;
        const dy = e.clientY - dragRef.current.lastY;
        dragRef.current.lastX = e.clientX;
        dragRef.current.lastY = e.clientY;
        angleY += dx * 0.012;
        angleX = Math.max(-0.85, Math.min(0.85, angleX + dy * 0.006));
        dragRef.current.vx = dx * 0.008;
        dragRef.current.vy = dy * 0.003;
        if (reducedMotion) drawFrame();
        return;
      }

      const rect = canvas.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / Math.max(1, rect.width) - 0.5) * 2;
      const ny = ((e.clientY - rect.top) / Math.max(1, rect.height) - 0.5) * 2;
      pointerRef.current.tx = Math.max(-1, Math.min(1, nx));
      pointerRef.current.ty = Math.max(-1, Math.min(1, ny));
      if (reducedMotion) drawFrame();
    };

    const onPointerUp = () => {
      dragRef.current.active = false;
    };

    const onLeave = () => {
      dragRef.current.active = false;
      pointerRef.current.tx = 0;
      pointerRef.current.ty = 0;
      if (reducedMotion) drawFrame();
    };

    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('pointercancel', onPointerUp);
    canvas.addEventListener('pointerleave', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      if (orientationListening) {
        window.removeEventListener('deviceorientation', onOrientation, true);
      }
      if (gyroActionRef) {
        gyroActionRef.current = null;
      }
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('pointercancel', onPointerUp);
      canvas.removeEventListener('pointerleave', onLeave);
    };
  }, [theme, onGyroStatusChange, gyroActionRef]);

  return (
    <canvas
      ref={canvasRef}
      aria-label="Interactive 3D architectural lattice — move cursor, drag, or tilt phone with gyroscope to orbit"
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
        cursor: 'crosshair',
        touchAction: 'pan-y',
      }}
    />
  );
}
