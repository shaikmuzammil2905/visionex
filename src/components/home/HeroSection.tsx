import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Users,
  Target,
  Rocket,
  Heart,
  BookOpen,
  Code2,
  TrendingUp,
  X,
  Sparkles,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { analytics } from '../../lib/analytics';

interface NodeDetail {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  badge: string;
  description: string;
  actionText: string;
  actionLink: string;
  keyPoints: string[];
}

export const HeroSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeNode, setActiveNode] = useState<NodeDetail | null>(null);

  // Orbital Nodes Data for Popups & Positioning
  const nodesData: Record<string, NodeDetail> = {
    learn: {
      id: 'learn',
      title: 'Continuous Digital Skill Mastery',
      subtitle: 'PILLAR 01: LEARN',
      icon: BookOpen,
      color: 'from-blue-500 to-cyan-500',
      badge: 'Skill Acquisition',
      description:
        'Master real-world high-income capabilities including AI automation, modern web architecture, digital marketing, and full-stack product building without outdated college syllabi.',
      actionText: 'Explore Digital Skills Roadmap',
      actionLink: '/digital-entrepreneurship',
      keyPoints: [
        'Practical step-by-step project blueprints',
        'AI prompt engineering & workflow automation',
        'No prior coding or business background required',
      ],
    },
    build: {
      id: 'build',
      title: 'Rapid Venture Prototyping',
      subtitle: 'PILLAR 02: BUILD',
      icon: Code2,
      color: 'from-indigo-500 to-purple-500',
      badge: 'Creation & Execution',
      description:
        'Stop waiting for permission. Turn ideas into working digital products, freelance services, and micro-ventures that solve genuine market problems.',
      actionText: 'See Student Ventures',
      actionLink: '/community',
      keyPoints: [
        'Deploy functional MVPs in under 14 days',
        'Leverage modern tech stacks and low-code engines',
        'Build proof of work instead of paper resumes',
      ],
    },
    earn: {
      id: 'earn',
      title: 'Independent Digital Income',
      subtitle: 'PILLAR 03: EARN',
      icon: TrendingUp,
      color: 'from-purple-500 to-pink-500',
      badge: 'Monetization & Validation',
      description:
        'Acquire high-ticket freelance clients, launch digital products, and establish sustainable revenue streams while continuing your college education.',
      actionText: 'Discover Income Frameworks',
      actionLink: '/resources',
      keyPoints: [
        'Client acquisition and ethical outreach systems',
        'Digital product pricing and packaging guides',
        'Transparent case studies from student creators',
      ],
    },
    empower: {
      id: 'empower',
      title: 'Community Empowerment',
      subtitle: 'PILLAR 04: EMPOWER',
      icon: Users,
      color: 'from-violet-500 to-blue-500',
      badge: 'Peer Collaboration',
      description:
        'Success is not a solo journey. Collaborate with fellow ambitious student founders, exchange skills, and build joint ventures together.',
      actionText: 'Join Creator Community',
      actionLink: '/community',
      keyPoints: [
        'Weekly live founder masterclasses and AMAs',
        'Peer co-founder matching directory',
        'Active Discord & WhatsApp masterminds',
      ],
    },
    create: {
      id: 'create',
      title: 'The 1 → 10 Opportunity Mission',
      subtitle: 'PILLAR 05: CREATE OPPORTUNITIES',
      icon: Rocket,
      color: 'from-cyan-500 to-emerald-500',
      badge: 'The Vision Multiplier',
      description:
        'When 1 student launches a thriving digital venture, they unlock meaningful paid gigs, internships, and opportunities for 10+ student peers in their ecosystem.',
      actionText: 'Read The 1 → 10 Manifesto',
      actionLink: '/mission',
      keyPoints: [
        'Transform from a job seeker to a door creator',
        'Build scalable micro-agencies and startups',
        'Direct leadership from founder Rakhi Guptha',
      ],
    },
  };

  // Background subtle canvas particles animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle nodes for ambient background network
    const particles = Array.from({ length: 35 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      radius: Math.random() * 1.5 + 1,
      color: Math.random() > 0.5 ? 'rgba(139, 92, 246, 0.45)' : 'rgba(59, 130, 246, 0.45)',
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Subtle connective web
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.15 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.7;
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
    <section className="relative w-full min-h-[92vh] lg:min-h-screen flex flex-col justify-between pt-24 sm:pt-28 lg:pt-32 pb-8 overflow-hidden bg-[#07090e]">
      {/* 1. FULL-SCREEN SEAMLESS CINEMATIC VIDEO BACKGROUND */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <video
          src="/hero-video.mp4"
          autoPlay
          loop
          muted
          playsInline
          poster="/hero-desk.jpg"
          className="absolute inset-0 w-full h-full object-cover object-right lg:object-center brightness-105 contrast-105 scale-100 transition-all duration-700"
        />

        {/* Localized Left Gradient: Keeps text 100% crisp without darkening the video skyline and workspace on the right */}
        <div className="absolute inset-y-0 left-0 w-full lg:w-3/5 bg-gradient-to-r from-[#07090e]/95 via-[#07090e]/65 to-transparent z-10" />

        {/* Top subtle navbar shadow */}
        <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#07090e]/80 via-[#07090e]/30 to-transparent z-10" />

        {/* Bottom smooth fade to next section */}
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#07090e] via-[#07090e]/70 to-transparent z-10" />

        {/* Canvas for ambient particle network */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />
      </div>

      {/* 2. MAIN HERO CONTENT AREA (DESKTOP & MOBILE RESPONSIVE) */}
      <div className="container-custom relative z-20 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Core Copy & CTAs */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6 text-left max-w-2xl">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/80 border border-purple-500/50 shadow-[0_0_18px_rgba(139,92,246,0.35)] text-[11px] sm:text-xs font-bold text-purple-300 uppercase tracking-widest font-mono backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
              <span>THE FUTURE IS CREATED</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-black tracking-tight text-white leading-[1.08] font-heading drop-shadow-md">
              DON'T JUST FIND <br />
              YOUR FUTURE. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-blue-400 drop-shadow-[0_0_25px_rgba(139,92,246,0.4)]">
                BUILD IT.
              </span>
            </h1>

            {/* Supporting Tagline */}
            <p className="text-sm sm:text-base md:text-lg font-bold text-purple-200 font-mono tracking-wide">
              Learn. Build. Earn. Live. Empower.
            </p>

            {/* Body Description */}
            <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed max-w-lg">
              We empower students to explore digital entrepreneurship, build real skills, create income and opportunities, and design a meaningful life.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <Link
                to="/mission"
                className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold text-xs sm:text-sm py-3.5 px-7 rounded-xl shadow-xl shadow-purple-600/30 transition-all flex items-center justify-center gap-2 group hover:scale-[1.02] active:scale-95"
              >
                <span>Explore Our Mission</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/register"
                onClick={() => analytics.trackJoinCommunity('hero_cta')}
                className="bg-[#0b0f19]/80 hover:bg-[#121827] text-slate-200 hover:text-white font-semibold text-xs sm:text-sm py-3.5 px-7 rounded-xl border border-white/15 backdrop-blur-md transition-all flex items-center justify-center gap-2"
              >
                <Users className="w-4 h-4 text-purple-300" />
                <span>Join Community</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Floating Futuristic Constellation Nodes over Scene */}
          <div className="lg:col-span-6 relative w-full h-[320px] sm:h-[400px] lg:h-[460px] flex items-center justify-center">
            {/* SVG Glowing Dashed Orbit Arc */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-75"
              viewBox="0 0 500 450"
            >
              <defs>
                <linearGradient id="heroOrbitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.85" />
                </linearGradient>
              </defs>
              <path
                d="M 100 330 Q 70 120 250 60 Q 430 120 400 330"
                fill="none"
                stroke="url(#heroOrbitGrad)"
                strokeWidth="1.8"
                strokeDasharray="6 6"
                className="animate-pulse"
              />
            </svg>

            {/* Central Philosophy Quote Badge */}
            <div className="relative z-20 text-center max-w-[200px] sm:max-w-[230px] px-3.5 py-2.5 rounded-xl bg-black/60 backdrop-blur-md border border-purple-500/30 shadow-xl shadow-purple-950/40 transform hover:scale-105 transition-all">
              <p className="text-[11px] sm:text-xs font-medium text-slate-200 leading-relaxed italic">
                "Be the reason someone else's future changes."
              </p>
              <span className="inline-block mt-1 text-[9px] font-mono text-purple-400 font-bold uppercase tracking-widest">
                Click nodes for details
              </span>
            </div>

            {/* 1. Node: LEARN (Top) */}
            <button
              onClick={() => setActiveNode(nodesData.learn)}
              className="absolute top-2 sm:top-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center group cursor-pointer transition-transform hover:scale-110 active:scale-95"
              title="Click to view details"
            >
              <span className="mb-1 text-[9px] sm:text-[10px] font-mono font-bold tracking-wider uppercase text-blue-300">
                LEARN
              </span>
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-blue-950/80 border border-blue-400/70 shadow-[0_0_18px_rgba(59,130,246,0.6)] flex items-center justify-center text-blue-300 backdrop-blur-md transition-all group-hover:border-white group-hover:bg-blue-900">
                <BookOpen className="w-5 h-5" />
              </div>
            </button>

            {/* 2. Node: BUILD (Top Left) */}
            <button
              onClick={() => setActiveNode(nodesData.build)}
              className="absolute top-16 left-4 sm:left-10 z-20 flex flex-col items-center group cursor-pointer transition-transform hover:scale-110 active:scale-95"
              title="Click to view details"
            >
              <span className="mb-1 text-[9px] sm:text-[10px] font-mono font-bold tracking-wider uppercase text-indigo-300">
                BUILD
              </span>
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-indigo-950/80 border border-indigo-400/70 shadow-[0_0_18px_rgba(99,102,241,0.6)] flex items-center justify-center text-indigo-300 backdrop-blur-md transition-all group-hover:border-white group-hover:bg-indigo-900">
                <Code2 className="w-5 h-5" />
              </div>
            </button>

            {/* 3. Node: EARN (Top Right) */}
            <button
              onClick={() => setActiveNode(nodesData.earn)}
              className="absolute top-16 right-4 sm:right-10 z-20 flex flex-col items-center group cursor-pointer transition-transform hover:scale-110 active:scale-95"
              title="Click to view details"
            >
              <span className="mb-1 text-[9px] sm:text-[10px] font-mono font-bold tracking-wider uppercase text-purple-300">
                EARN
              </span>
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-purple-950/80 border border-purple-400/70 shadow-[0_0_18px_rgba(168,85,247,0.6)] flex items-center justify-center text-purple-300 backdrop-blur-md transition-all group-hover:border-white group-hover:bg-purple-900">
                <TrendingUp className="w-5 h-5" />
              </div>
            </button>

            {/* 4. Node: EMPOWER (Bottom Left) */}
            <button
              onClick={() => setActiveNode(nodesData.empower)}
              className="absolute bottom-6 sm:bottom-10 left-2 sm:left-8 z-20 flex flex-col items-center group cursor-pointer transition-transform hover:scale-110 active:scale-95"
              title="Click to view details"
            >
              <span className="mb-1 text-[9px] sm:text-[10px] font-mono font-bold tracking-wider uppercase text-violet-300">
                EMPOWER
              </span>
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-violet-950/80 border border-violet-400/70 shadow-[0_0_18px_rgba(139,92,246,0.6)] flex items-center justify-center text-violet-300 backdrop-blur-md transition-all group-hover:border-white group-hover:bg-violet-900">
                <Users className="w-5 h-5" />
              </div>
            </button>

            {/* 5. Node: CREATE OPPORTUNITIES (Bottom Right) */}
            <button
              onClick={() => setActiveNode(nodesData.create)}
              className="absolute bottom-6 sm:bottom-10 right-2 sm:right-6 z-20 flex flex-col items-center group cursor-pointer transition-transform hover:scale-110 active:scale-95"
              title="Click to view details"
            >
              <span className="mb-1 text-[8px] sm:text-[9px] font-mono font-bold tracking-wider uppercase text-cyan-300 text-center max-w-[90px]">
                CREATE OPPORTUNITIES
              </span>
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-cyan-950/80 border border-cyan-400/70 shadow-[0_0_18px_rgba(6,182,212,0.6)] flex items-center justify-center text-cyan-300 backdrop-blur-md transition-all group-hover:border-white group-hover:bg-cyan-900">
                <Rocket className="w-5 h-5" />
              </div>
            </button>
          </div>
        </div>

        {/* 3. 4 FEATURE HIGHLIGHTS BAR (MATCHES REFERENCE IMAGES) */}
        <div className="mt-8 sm:mt-12">
          <div className="glass-panel p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-white/10 shadow-2xl bg-[#0b0f19]/80 backdrop-blur-xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-white/5">
              {/* Item 1 */}
              <Link
                to="/mission"
                className="flex items-center gap-3 p-2 group hover:bg-white/[0.02] rounded-xl transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-950/70 border border-purple-500/40 flex items-center justify-center shrink-0 shadow-lg shadow-purple-900/30 group-hover:scale-110 transition-transform">
                  <Target className="w-5 h-5 text-purple-300" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs sm:text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                    1 → 10
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-400 truncate">
                    Opportunity Mission
                  </div>
                </div>
              </Link>

              {/* Item 2 */}
              <Link
                to="/digital-entrepreneurship"
                className="flex items-center gap-3 p-2 group hover:bg-white/[0.02] rounded-xl transition-all pt-3 sm:pt-2 sm:pl-4"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-950/70 border border-blue-500/40 flex items-center justify-center shrink-0 shadow-lg shadow-blue-900/30 group-hover:scale-110 transition-transform">
                  <Rocket className="w-5 h-5 text-blue-300" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs sm:text-sm font-bold text-white group-hover:text-blue-300 transition-colors">
                    Digital
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-400 truncate">
                    Entrepreneurship
                  </div>
                </div>
              </Link>

              {/* Item 3 */}
              <Link
                to="/community"
                className="flex items-center gap-3 p-2 group hover:bg-white/[0.02] rounded-xl transition-all pt-3 sm:pt-2 sm:pl-4"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-950/70 border border-indigo-500/40 flex items-center justify-center shrink-0 shadow-lg shadow-indigo-900/30 group-hover:scale-110 transition-transform">
                  <Users className="w-5 h-5 text-indigo-300" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs sm:text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                    Community
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-400 truncate">
                    Driven Growth
                  </div>
                </div>
              </Link>

              {/* Item 4 */}
              <Link
                to="/why"
                className="flex items-center gap-3 p-2 group hover:bg-white/[0.02] rounded-xl transition-all pt-3 sm:pt-2 sm:pl-4"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-950/70 border border-purple-500/40 flex items-center justify-center shrink-0 shadow-lg shadow-purple-900/30 group-hover:scale-110 transition-transform">
                  <Heart className="w-5 h-5 text-purple-300" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs sm:text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                    Purpose
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-400 truncate">
                    & Impact
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 4. INTERACTIVE NODE POPUP MODAL */}
      {activeNode && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="relative max-w-lg w-full rounded-3xl bg-[#0b0f19] border border-purple-500/40 p-6 sm:p-8 shadow-2xl shadow-purple-950/60 space-y-5 animate-scaleUp">
            {/* Close Button */}
            <button
              onClick={() => setActiveNode(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-start gap-4">
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${activeNode.color} flex items-center justify-center text-white shadow-lg shrink-0`}
              >
                <activeNode.icon className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-purple-300">
                  {activeNode.subtitle}
                </span>
                <h3 className="text-xl font-bold text-white leading-snug">
                  {activeNode.title}
                </h3>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {activeNode.description}
            </p>

            {/* Key Takeaways */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
              <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                Key Framework Highlights:
              </div>
              <div className="space-y-1.5">
                {activeNode.keyPoints.map((pt, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setActiveNode(null)}
                className="btn-secondary text-xs py-2.5 px-4"
              >
                Close
              </button>
              <Link
                to={activeNode.actionLink}
                onClick={() => setActiveNode(null)}
                className="btn-primary text-xs py-2.5 px-5 shadow-lg flex items-center gap-1.5"
              >
                <span>{activeNode.actionText}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
