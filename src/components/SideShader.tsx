"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "@/components/ThemeProvider";

export function SideShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Mouse & physics ripple state
    const mouse = {
      x: -2000,
      y: -2000,
      targetX: -2000,
      targetY: -2000,
      vx: 0,
      vy: 0,
      speed: 0,
      active: false,
    };

    let time = 0;
    const ripples: { x: number; y: number; age: number; maxAge: number; strength: number }[] = [];

    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    let lastX = -2000;
    let lastY = -2000;
    let lastTime = performance.now();

    const handlePointerMove = (e: PointerEvent) => {
      const now = performance.now();
      const dt = Math.max(now - lastTime, 16);

      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;

      if (lastX > -1000) {
        const instVx = (e.clientX - lastX) / (dt * 0.05);
        const instVy = (e.clientY - lastY) / (dt * 0.05);
        mouse.vx = mouse.vx * 0.7 + instVx * 0.3;
        mouse.vy = mouse.vy * 0.7 + instVy * 0.3;
        mouse.speed = Math.hypot(mouse.vx, mouse.vy);

        // Spawn gentle harmonic ripples as mouse moves
        if (mouse.speed > 2 && Math.random() > 0.6) {
          ripples.push({
            x: e.clientX,
            y: e.clientY,
            age: 0,
            maxAge: 70,
            strength: Math.min(mouse.speed * 0.8, 12),
          });
          if (ripples.length > 8) ripples.shift();
        }
      }

      lastX = e.clientX;
      lastY = e.clientY;
      lastTime = now;
    };

    const handlePointerLeave = () => {
      mouse.targetX = -2000;
      mouse.targetY = -2000;
      mouse.active = false;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave, { passive: true });

    // Grid configuration
    const spacing = 7.5; // pixel spacing between diagonal parallel lines
    const segmentLength = 8; // smooth vertex sampling resolution
    const invSqrt2 = 1 / Math.SQRT2;

    const render = () => {
      time += 0.02;

      // Smooth mouse interpolation & dampening
      const dx = mouse.targetX - mouse.x;
      const dy = mouse.targetY - mouse.y;
      mouse.x += dx * 0.12;
      mouse.y += dy * 0.12;
      mouse.vx *= 0.94;
      mouse.vy *= 0.94;
      mouse.speed *= 0.95;

      // Update ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        ripples[i].age += 1;
        if (ripples[i].age >= ripples[i].maxAge) {
          ripples.splice(i, 1);
        }
      }

      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.classList.contains("dark") || resolvedTheme === "dark";
      ctx.strokeStyle = isDark ? "rgba(255, 255, 255, 0.10)" : "rgba(0, 0, 0, 0.11)";
      ctx.lineWidth = 1;
      ctx.beginPath();

      const totalDiags = Math.ceil((width + height) / spacing) + 4;
      const startDiag = -Math.ceil(height / spacing) - 4;

      const hasMouse = mouse.x > -500;
      const hoverRadius = 180;

      for (let i = startDiag; i <= totalDiags; i++) {
        const c = i * spacing;

        // Line equation: x + y = c => y = c - x
        const startX = Math.max(0, c - height);
        const endX = Math.min(width, c);

        if (startX >= endX) continue;

        let isFirst = true;

        for (let x = startX; x <= endX; x += segmentLength) {
          const y = c - x;

          let px = x;
          let py = y;
          let waveOffset = 0;

          // 1. Direct gentle undulating cursor wave
          if (hasMouse) {
            const distX = x - mouse.x;
            const distY = y - mouse.y;
            const dist = Math.hypot(distX, distY);

            if (dist < hoverRadius) {
              const norm = dist / hoverRadius;
              const envelope = Math.pow(1 - norm, 2);
              const sineWave = Math.sin(norm * Math.PI * 3 - time * 3) * 8;
              const gentlePush = Math.sin(norm * Math.PI) * 6;
              waveOffset += (sineWave + gentlePush) * envelope;
            }
          }

          // 2. Trailing ripple waves
          for (let r = 0; r < ripples.length; r++) {
            const rip = ripples[r];
            const rDist = Math.hypot(x - rip.x, y - rip.y);
            const ripProgress = rip.age / rip.maxAge;
            const ripRadius = ripProgress * 240;
            const distFromWave = Math.abs(rDist - ripRadius);

            if (distFromWave < 50) {
              const waveFalloff = Math.exp(-Math.pow(distFromWave / 25, 2)) * (1 - ripProgress);
              waveOffset += Math.sin(distFromWave * 0.15) * rip.strength * waveFalloff;
            }
          }

          // Displace along line's normal (strictly parallel, zero tearing/splitting)
          if (waveOffset !== 0) {
            px += waveOffset * invSqrt2;
            py += waveOffset * invSqrt2;
          }

          if (isFirst) {
            ctx.moveTo(px, py);
            isFirst = false;
          } else {
            ctx.lineTo(px, py);
          }
        }
      }

      ctx.stroke();
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [resolvedTheme]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 select-none overflow-hidden">
      {/* Canvas Lines Layer */}
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />

      {/* Progressive Blur & Gradient Vignette Overlays */}
      
      {/* Top 10% progressive fade + blur */}
      <div className="absolute top-0 left-0 right-0 h-[10vh] min-h-[80px] bg-gradient-to-b from-background via-background/80 to-transparent backdrop-blur-[2px] [mask-image:linear-gradient(to_bottom,black_20%,transparent)]" />

      {/* Bottom 10% progressive fade + blur */}
      <div className="absolute bottom-0 left-0 right-0 h-[10vh] min-h-[80px] bg-gradient-to-t from-background via-background/80 to-transparent backdrop-blur-[2px] [mask-image:linear-gradient(to_top,black_20%,transparent)]" />

      {/* Left 10% progressive fade + blur */}
      <div className="absolute top-0 bottom-0 left-0 w-[10vw] min-w-[60px] bg-gradient-to-r from-background via-background/80 to-transparent backdrop-blur-[2px] [mask-image:linear-gradient(to_right,black_30%,transparent)]" />

      {/* Right 10% progressive fade + blur */}
      <div className="absolute top-0 bottom-0 right-0 w-[10vw] min-w-[60px] bg-gradient-to-l from-background via-background/80 to-transparent backdrop-blur-[2px] [mask-image:linear-gradient(to_left,black_30%,transparent)]" />
    </div>
  );
}
