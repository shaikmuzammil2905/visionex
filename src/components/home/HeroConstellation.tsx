import React, { useEffect, useRef } from 'react';
import { BookOpen, Code2, Users, TrendingUp, Rocket } from 'lucide-react';

export const HeroConstellation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 550);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle nodes for ambient background network
    const particles = Array.from({ length: 30 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 1.5 + 1,
      color: Math.random() > 0.5 ? 'rgba(139, 92, 246, 0.4)' : 'rgba(59, 130, 246, 0.4)',
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Connective subtle lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.12 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative w-full h-[380px] sm:h-[440px] lg:h-[480px] rounded-3xl overflow-hidden border border-white/10 bg-[#07090e] shadow-2xl flex items-center justify-center group">
      {/* Background canvas for network particles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

      {/* Founder Skyline Visual Backdrop */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-desk.jpg"
          alt="Student Builder looking at futuristic skyline"
          className="w-full h-full object-cover object-center opacity-85 transition-transform duration-1000 group-hover:scale-105"
        />
        {/* Subtle radial dark overlay for high contrast text & nodes */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-[#07090e]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07090e]/70 via-transparent to-[#07090e]/40" />
      </div>

      {/* SVG Connecting Orbit Loop */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-80" viewBox="0 0 500 450">
        <defs>
          <linearGradient id="orbitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        {/* Curved dashed orbit arc connecting nodes around the student */}
        <path
          d="M 120 320 Q 80 140 250 80 Q 420 140 380 320"
          fill="none"
          stroke="url(#orbitGrad)"
          strokeWidth="1.5"
          strokeDasharray="6 6"
          className="animate-pulse"
        />
      </svg>



      {/* 1. Top Node: LEARN */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center group/node cursor-pointer">
        <span className="mb-1 text-[9px] sm:text-[10px] font-mono font-bold tracking-wider uppercase text-blue-300">
          LEARN
        </span>
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-950/80 border border-blue-400/60 shadow-[0_0_15px_rgba(59,130,246,0.5)] flex items-center justify-center text-blue-300 backdrop-blur-md transition-all group-hover/node:scale-110">
          <BookOpen className="w-5 h-5" />
        </div>
      </div>

      {/* 2. Top-Left Node: BUILD */}
      <div className="absolute top-16 left-6 sm:left-12 z-20 flex flex-col items-center group/node cursor-pointer">
        <span className="mb-1 text-[9px] sm:text-[10px] font-mono font-bold tracking-wider uppercase text-indigo-300">
          BUILD
        </span>
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-indigo-950/80 border border-indigo-400/60 shadow-[0_0_15px_rgba(99,102,241,0.5)] flex items-center justify-center text-indigo-300 backdrop-blur-md transition-all group-hover/node:scale-110">
          <Code2 className="w-5 h-5" />
        </div>
      </div>

      {/* 3. Top-Right Node: EARN */}
      <div className="absolute top-16 right-6 sm:right-12 z-20 flex flex-col items-center group/node cursor-pointer">
        <span className="mb-1 text-[9px] sm:text-[10px] font-mono font-bold tracking-wider uppercase text-purple-300">
          EARN
        </span>
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-purple-950/80 border border-purple-400/60 shadow-[0_0_15px_rgba(168,85,247,0.5)] flex items-center justify-center text-purple-300 backdrop-blur-md transition-all group-hover/node:scale-110">
          <TrendingUp className="w-5 h-5" />
        </div>
      </div>

      {/* 4. Bottom-Left Node: EMPOWER */}
      <div className="absolute bottom-12 left-4 sm:left-10 z-20 flex flex-col items-center group/node cursor-pointer">
        <span className="mb-1 text-[9px] sm:text-[10px] font-mono font-bold tracking-wider uppercase text-violet-300">
          EMPOWER
        </span>
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-violet-950/80 border border-violet-400/60 shadow-[0_0_15px_rgba(139,92,246,0.5)] flex items-center justify-center text-violet-300 backdrop-blur-md transition-all group-hover/node:scale-110">
          <Users className="w-5 h-5" />
        </div>
      </div>

      {/* 5. Bottom-Right Node: CREATE OPPORTUNITIES */}
      <div className="absolute bottom-12 right-2 sm:right-6 z-20 flex flex-col items-center group/node cursor-pointer">
        <span className="mb-1 text-[8px] sm:text-[9px] font-mono font-bold tracking-wider uppercase text-cyan-300 text-center max-w-[90px]">
          CREATE OPPORTUNITIES
        </span>
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-cyan-950/80 border border-cyan-400/60 shadow-[0_0_15px_rgba(6,182,212,0.5)] flex items-center justify-center text-cyan-300 backdrop-blur-md transition-all group-hover/node:scale-110">
          <Rocket className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};
