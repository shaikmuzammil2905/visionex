import React, { useEffect, useRef } from 'react';
import { BookOpen, Code2, Users, TrendingUp, Rocket } from 'lucide-react';

interface HeroConstellationProps {
  onNodeClick?: (nodeName: string) => void;
}

export const HeroConstellation: React.FC<HeroConstellationProps> = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 500);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle nodes for ambient background network
    const particles = Array.from({ length: 35 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 1,
      color: Math.random() > 0.5 ? 'rgba(139, 92, 246, 0.4)' : 'rgba(59, 130, 246, 0.4)',
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle connective web
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.15 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.8;
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

  const nodes = [
    {
      id: 'learn',
      label: 'LEARN',
      icon: BookOpen,
      pos: 'top-2 left-1/2 -translate-x-1/2',
      glow: 'shadow-blue-500/30',
      color: 'text-blue-400 border-blue-500/40 bg-blue-950/40',
    },
    {
      id: 'build',
      label: 'BUILD',
      icon: Code2,
      pos: 'top-20 left-4 md:left-8',
      glow: 'shadow-indigo-500/30',
      color: 'text-indigo-400 border-indigo-500/40 bg-indigo-950/40',
    },
    {
      id: 'earn',
      label: 'EARN',
      icon: TrendingUp,
      pos: 'top-20 right-4 md:right-8',
      glow: 'shadow-purple-500/30',
      color: 'text-purple-400 border-purple-500/40 bg-purple-950/40',
    },
    {
      id: 'empower',
      label: 'EMPOWER',
      icon: Users,
      pos: 'bottom-20 left-2 md:left-6',
      glow: 'shadow-violet-500/30',
      color: 'text-violet-400 border-violet-500/40 bg-violet-950/40',
    },
    {
      id: 'create',
      label: 'CREATE OPPORTUNITIES',
      icon: Rocket,
      pos: 'bottom-20 right-2 md:right-6',
      glow: 'shadow-cyan-500/30',
      color: 'text-cyan-400 border-cyan-500/40 bg-cyan-950/40',
    },
  ];

  return (
    <div className="relative w-full h-[440px] md:h-[520px] rounded-2xl overflow-hidden border border-white/10 bg-slate-950/60 shadow-2xl flex items-center justify-center">
      {/* Background canvas for network particles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

      {/* Founder Desk Visual Backdrop */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-desk.jpg"
          alt="Student Entrepreneur building digital ventures at THE VISIONEX"
          className="w-full h-full object-cover object-center opacity-70 scale-105 transition-transform duration-1000 hover:scale-100"
          loading="eager"
        />
        {/* Subtle radial dark overlay for high contrast text & nodes */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-[#07090e]/60 to-transparent" />
        <div className="absolute inset-0 bg-radial-vignette opacity-50" />
      </div>

      {/* SVG Connecting Orbit Loop */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-70" viewBox="0 0 500 450">
        <defs>
          <linearGradient id="orbitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.7" />
          </linearGradient>
        </defs>
        {/* Curved dashed orbit */}
        <ellipse
          cx="250"
          cy="210"
          rx="180"
          ry="130"
          fill="none"
          stroke="url(#orbitGrad)"
          strokeWidth="1.5"
          strokeDasharray="6 6"
          className="animate-pulse"
        />
      </svg>

      {/* Central Philosophy Quote Badge */}
      <div className="relative z-20 text-center max-w-[280px] md:max-w-xs px-4 py-3 rounded-xl bg-black/70 backdrop-blur-md border border-purple-500/30 shadow-lg shadow-purple-950/50 transform hover:scale-105 transition-all">
        <p className="text-xs md:text-sm font-medium text-purple-200/90 leading-relaxed italic">
          "Be the reason someone else's future changes."
        </p>
        <span className="inline-block mt-1 text-[10px] uppercase tracking-widest text-blue-400 font-semibold font-mono">
          THE VISIONEX
        </span>
      </div>

      {/* Interactive Constellation Orbit Nodes */}
      {nodes.map((node) => {
        const Icon = node.icon;
        return (
          <div
            key={node.id}
            className={`absolute ${node.pos} z-20 flex flex-col items-center group cursor-pointer transition-transform duration-300 hover:scale-110`}
          >
            <div
              className={`w-11 h-11 md:w-13 md:h-13 rounded-full flex items-center justify-center border backdrop-blur-md shadow-lg ${node.color} ${node.glow} transition-all duration-300 group-hover:border-white`}
            >
              <Icon className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:rotate-12" />
            </div>
            <span className="mt-1.5 px-2 py-0.5 rounded text-[10px] md:text-xs font-bold tracking-wider uppercase font-mono bg-black/80 text-white border border-white/10 backdrop-blur-sm shadow">
              {node.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};
