import { useEffect, useRef } from "react";

const LightStreaks = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const streaks = [
      {
        // Top-right arc
        orbitRx: 0.52, orbitRy: 0.38,
        rotation: -0.2,
        speed: 0.0004,
        offset: 0,
        direction: 1,
        trailLen: 0.28,
        colors: [
          { r: 100, g: 130, b: 255 },
          { r: 170, g: 110, b: 255 },
          { r: 255, g: 140, b: 200 },
        ],
        opacity: 0.9,
        coreSize: 5,
        glowSize: 30,
        bloomSize: 70,
        // Visible arc range (radians) — top-right quadrant
        arcStart: -Math.PI * 0.75,
        arcEnd: Math.PI * 0.15,
      },
      {
        // Bottom-left arc
        orbitRx: 0.50, orbitRy: 0.36,
        rotation: -0.15,
        speed: 0.00035,
        offset: Math.PI,
        direction: -1,
        trailLen: 0.25,
        colors: [
          { r: 70, g: 190, b: 255 },
          { r: 150, g: 90, b: 255 },
          { r: 235, g: 120, b: 195 },
        ],
        opacity: 0.8,
        coreSize: 4.5,
        glowSize: 26,
        bloomSize: 60,
        arcStart: Math.PI * 0.25,
        arcEnd: Math.PI * 1.15,
      },
    ];

    const lerpColor = (colors: { r: number; g: number; b: number }[], t: number) => {
      const s = t * (colors.length - 1);
      const i = Math.floor(s);
      const f = s - i;
      const c1 = colors[Math.min(i, colors.length - 1)];
      const c2 = colors[Math.min(i + 1, colors.length - 1)];
      return { r: c1.r + (c2.r - c1.r) * f, g: c1.g + (c2.g - c1.g) * f, b: c1.b + (c2.b - c1.b) * f };
    };

    const getPoint = (rx: number, ry: number, rot: number, angle: number, cx: number, cy: number) => {
      const cosR = Math.cos(rot), sinR = Math.sin(rot);
      const ex = rx * Math.cos(angle), ey = ry * Math.sin(angle);
      return { x: cx + ex * cosR - ey * sinR, y: cy + ex * sinR + ey * cosR };
    };

    // Normalize angle to [-PI, PI]
    const normAngle = (a: number) => {
      while (a > Math.PI) a -= Math.PI * 2;
      while (a < -Math.PI) a += Math.PI * 2;
      return a;
    };

    // Smooth visibility within arc range
    const arcVisibility = (angle: number, arcStart: number, arcEnd: number) => {
      const a = normAngle(angle);
      const s = normAngle(arcStart);
      const e = normAngle(arcEnd);

      let inArc: boolean;
      if (s < e) {
        inArc = a >= s && a <= e;
      } else {
        inArc = a >= s || a <= e;
      }

      if (!inArc) return 0;

      // Smooth fade at edges
      const fadeRange = 0.3;
      let dist: number;
      if (s < e) {
        const mid = (s + e) / 2;
        const half = (e - s) / 2;
        dist = 1 - Math.abs(a - mid) / half;
      } else {
        const range = (Math.PI * 2 - s + e);
        let pos = a - s;
        if (pos < 0) pos += Math.PI * 2;
        const norm = pos / range;
        dist = norm < 0.5 ? norm * 2 : (1 - norm) * 2;
      }

      if (dist < fadeRange) return dist / fadeRange;
      return 1;
    };

    const draw = (timestamp: number) => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width, h = rect.height;
      const cx = w / 2, cy = h / 2;

      ctx.clearRect(0, 0, w, h);

      for (const s of streaks) {
        const rx = s.orbitRx * w * 0.5;
        const ry = s.orbitRy * h * 0.5;
        const baseAngle = s.offset + timestamp * s.speed * s.direction;
        const visibility = arcVisibility(normAngle(baseAngle % (Math.PI * 2)), s.arcStart, s.arcEnd);

        if (visibility < 0.01) {
          animationId = requestAnimationFrame(draw);
          return;
        }

        const segments = 100;
        const trailSpan = s.trailLen * Math.PI * 2;

        // Bloom layer
        for (let i = 0; i < segments; i++) {
          const t = i / segments;
          const angle = baseAngle - t * trailSpan * s.direction;
          const pos = getPoint(rx, ry, s.rotation, angle, cx, cy);
          const taper = Math.pow(1 - t, 3);
          const color = lerpColor(s.colors, t);
          const alpha = taper * 0.05 * s.opacity * visibility;
          if (alpha < 0.001) continue;

          const r = s.bloomSize * (0.3 + taper * 0.7);
          const grad = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, r);
          grad.addColorStop(0, `rgba(${color.r},${color.g},${color.b},${alpha})`);
          grad.addColorStop(0.4, `rgba(${color.r},${color.g},${color.b},${alpha * 0.25})`);
          grad.addColorStop(1, `rgba(${color.r},${color.g},${color.b},0)`);
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, r, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
        }

        // Glow layer
        for (let i = 0; i < segments; i++) {
          const t = i / segments;
          const angle = baseAngle - t * trailSpan * s.direction;
          const pos = getPoint(rx, ry, s.rotation, angle, cx, cy);
          const taper = Math.pow(1 - t, 2.5);
          const color = lerpColor(s.colors, t);
          const alpha = taper * 0.14 * s.opacity * visibility;
          if (alpha < 0.001) continue;

          const r = s.glowSize * (0.2 + taper * 0.8);
          const grad = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, r);
          grad.addColorStop(0, `rgba(${color.r},${color.g},${color.b},${alpha})`);
          grad.addColorStop(0.5, `rgba(${color.r},${color.g},${color.b},${alpha * 0.2})`);
          grad.addColorStop(1, `rgba(${color.r},${color.g},${color.b},0)`);
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, r, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
        }

        // Core trail
        ctx.lineCap = "round";
        for (let i = 0; i < segments - 1; i++) {
          const t = i / segments;
          const t2 = (i + 1) / segments;
          const p1 = getPoint(rx, ry, s.rotation, baseAngle - t * trailSpan * s.direction, cx, cy);
          const p2 = getPoint(rx, ry, s.rotation, baseAngle - t2 * trailSpan * s.direction, cx, cy);
          const taper = Math.pow(1 - t, 2);
          const color = lerpColor(s.colors, t * 0.7);
          const alpha = taper * 0.55 * s.opacity * visibility;
          const lw = s.coreSize * taper;
          if (alpha < 0.001 || lw < 0.1) continue;

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(${color.r},${color.g},${color.b},${alpha})`;
          ctx.lineWidth = lw;
          ctx.stroke();
        }

        // Bright head
        const head = getPoint(rx, ry, s.rotation, baseAngle, cx, cy);
        const hc = s.colors[0];
        const ha = 0.85 * s.opacity * visibility;

        const cg = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, s.coreSize * 2.5);
        cg.addColorStop(0, `rgba(255,255,255,${ha * 0.9})`);
        cg.addColorStop(0.3, `rgba(${hc.r},${hc.g},${hc.b},${ha * 0.5})`);
        cg.addColorStop(1, `rgba(${hc.r},${hc.g},${hc.b},0)`);
        ctx.beginPath();
        ctx.arc(head.x, head.y, s.coreSize * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = cg;
        ctx.fill();

        const bg = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, s.bloomSize * 0.5);
        bg.addColorStop(0, `rgba(${hc.r},${hc.g},${hc.b},${ha * 0.25})`);
        bg.addColorStop(0.5, `rgba(${hc.r},${hc.g},${hc.b},${ha * 0.06})`);
        bg.addColorStop(1, `rgba(${hc.r},${hc.g},${hc.b},0)`);
        ctx.beginPath();
        ctx.arc(head.x, head.y, s.bloomSize * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = bg;
        ctx.fill();
      }

      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

export default LightStreaks;
