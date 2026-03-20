import { useEffect, useRef } from "react";

const LightStreaks = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let startTime = performance.now();

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    // Streak configuration
    const streaks = [
      {
        // Tight orbit around heading - top arc
        cx: 0.5, cy: 0.35,
        rx: 0.34, ry: 0.14,
        rotation: -0.15,
        speed: 0.00015,
        offset: 0,
        direction: 1,
        trailLength: 0.3,
        colors: [
          { r: 120, g: 140, b: 255 },
          { r: 180, g: 120, b: 255 },
          { r: 255, g: 150, b: 200 },
        ],
        opacity: 0.85,
        coreSize: 5,
        glowSize: 30,
        bloomSize: 65,
      },
      {
        // Tight orbit around heading - bottom arc
        cx: 0.5, cy: 0.35,
        rx: 0.32, ry: 0.12,
        rotation: 0.1,
        speed: 0.00012,
        offset: Math.PI,
        direction: -1,
        trailLength: 0.28,
        colors: [
          { r: 80, g: 200, b: 255 },
          { r: 160, g: 100, b: 255 },
          { r: 240, g: 130, b: 200 },
        ],
        opacity: 0.7,
        coreSize: 4,
        glowSize: 25,
        bloomSize: 55,
      },
    ];

    const getEllipsePoint = (
      streak: typeof streaks[0],
      angle: number,
      w: number,
      h: number
    ) => {
      const cos = Math.cos(streak.rotation);
      const sin = Math.sin(streak.rotation);
      const ex = streak.rx * w * Math.cos(angle);
      const ey = streak.ry * h * Math.sin(angle);
      return {
        x: streak.cx * w + ex * cos - ey * sin,
        y: streak.cy * h + ex * sin + ey * cos,
      };
    };

    const lerpColor = (
      colors: { r: number; g: number; b: number }[],
      t: number
    ) => {
      const scaled = t * (colors.length - 1);
      const i = Math.floor(scaled);
      const f = scaled - i;
      const c1 = colors[Math.min(i, colors.length - 1)];
      const c2 = colors[Math.min(i + 1, colors.length - 1)];
      return {
        r: c1.r + (c2.r - c1.r) * f,
        g: c1.g + (c2.g - c1.g) * f,
        b: c1.b + (c2.b - c1.b) * f,
      };
    };

    const draw = (timestamp: number) => {
      const elapsed = timestamp - startTime;
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, w, h);

      for (const streak of streaks) {
        const baseAngle =
          streak.offset + elapsed * streak.speed * streak.direction;
        
        // Fade cycle: streak fades in and out over its orbit
        const cyclePos = ((elapsed * streak.speed * 0.5) % (Math.PI * 2)) / (Math.PI * 2);
        const visibility = Math.sin(cyclePos * Math.PI) * 0.6 + 0.4;

        const trailSegments = 120;
        const trailAngleSpan = streak.trailLength * Math.PI * 2;

        // Draw bloom layer (outermost, softest)
        for (let i = 0; i < trailSegments; i++) {
          const t = i / trailSegments;
          const angle = baseAngle - t * trailAngleSpan * streak.direction;
          const pos = getEllipsePoint(streak, angle, w, h);

          // Taper: thick at head, thin at tail with smooth cubic falloff
          const taper = Math.pow(1 - t, 3);
          const color = lerpColor(streak.colors, t);
          const alpha = taper * 0.06 * streak.opacity * visibility;

          if (alpha < 0.001) continue;

          const bloomRadius = streak.bloomSize * (0.3 + taper * 0.7);
          const gradient = ctx.createRadialGradient(
            pos.x, pos.y, 0,
            pos.x, pos.y, bloomRadius
          );
          gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`);
          gradient.addColorStop(0.4, `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha * 0.3})`);
          gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);

          ctx.beginPath();
          ctx.arc(pos.x, pos.y, bloomRadius, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }

        // Draw glow layer (mid layer)
        for (let i = 0; i < trailSegments; i++) {
          const t = i / trailSegments;
          const angle = baseAngle - t * trailAngleSpan * streak.direction;
          const pos = getEllipsePoint(streak, angle, w, h);

          const taper = Math.pow(1 - t, 2.5);
          const color = lerpColor(streak.colors, t);
          const alpha = taper * 0.15 * streak.opacity * visibility;

          if (alpha < 0.001) continue;

          const glowRadius = streak.glowSize * (0.2 + taper * 0.8);
          const gradient = ctx.createRadialGradient(
            pos.x, pos.y, 0,
            pos.x, pos.y, glowRadius
          );
          gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`);
          gradient.addColorStop(0.5, `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha * 0.2})`);
          gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);

          ctx.beginPath();
          ctx.arc(pos.x, pos.y, glowRadius, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }

        // Draw core trail (bright inner line)
        ctx.lineCap = "round";
        for (let i = 0; i < trailSegments - 1; i++) {
          const t = i / trailSegments;
          const t2 = (i + 1) / trailSegments;
          const angle1 = baseAngle - t * trailAngleSpan * streak.direction;
          const angle2 = baseAngle - t2 * trailAngleSpan * streak.direction;
          const p1 = getEllipsePoint(streak, angle1, w, h);
          const p2 = getEllipsePoint(streak, angle2, w, h);

          const taper = Math.pow(1 - t, 2);
          const color = lerpColor(streak.colors, t * 0.7);
          const alpha = taper * 0.6 * streak.opacity * visibility;
          const lineWidth = streak.coreSize * taper;

          if (alpha < 0.001 || lineWidth < 0.1) continue;

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
          ctx.lineWidth = lineWidth;
          ctx.stroke();
        }

        // Draw bright head
        const headPos = getEllipsePoint(streak, baseAngle, w, h);
        const headColor = streak.colors[0];
        const headAlpha = 0.9 * streak.opacity * visibility;

        // White-hot core
        const coreGrad = ctx.createRadialGradient(
          headPos.x, headPos.y, 0,
          headPos.x, headPos.y, streak.coreSize * 2
        );
        coreGrad.addColorStop(0, `rgba(255, 255, 255, ${headAlpha * 0.9})`);
        coreGrad.addColorStop(0.3, `rgba(${headColor.r}, ${headColor.g}, ${headColor.b}, ${headAlpha * 0.6})`);
        coreGrad.addColorStop(1, `rgba(${headColor.r}, ${headColor.g}, ${headColor.b}, 0)`);

        ctx.beginPath();
        ctx.arc(headPos.x, headPos.y, streak.coreSize * 2, 0, Math.PI * 2);
        ctx.fillStyle = coreGrad;
        ctx.fill();

        // Head bloom
        const headBloom = ctx.createRadialGradient(
          headPos.x, headPos.y, 0,
          headPos.x, headPos.y, streak.bloomSize * 0.6
        );
        headBloom.addColorStop(0, `rgba(${headColor.r}, ${headColor.g}, ${headColor.b}, ${headAlpha * 0.3})`);
        headBloom.addColorStop(0.5, `rgba(${headColor.r}, ${headColor.g}, ${headColor.b}, ${headAlpha * 0.08})`);
        headBloom.addColorStop(1, `rgba(${headColor.r}, ${headColor.g}, ${headColor.b}, 0)`);

        ctx.beginPath();
        ctx.arc(headPos.x, headPos.y, streak.bloomSize * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = headBloom;
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
