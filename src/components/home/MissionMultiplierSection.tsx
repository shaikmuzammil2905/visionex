import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Rocket, Users, Infinity as InfinityIcon, ArrowRight, Sparkles, Sliders, ShieldCheck } from 'lucide-react';

export const MissionMultiplierSection: React.FC = () => {
  const [founderCount, setFounderCount] = useState<number>(25);

  const ventures = founderCount;
  const opportunities = founderCount * 10;
  const communityRipple = (founderCount * 45).toLocaleString();

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-[#07090e] via-[#090d16] to-[#07090e]">
      {/* Background glow circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container-custom relative z-10 text-center">
        {/* Eyebrow */}
        <div className="inline-block text-xs uppercase font-mono tracking-widest text-purple-400 font-bold mb-3">
          OUR IDEA
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
          THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-400 to-blue-400">1 → 10</span> MISSION
        </h2>

        {/* Subtext */}
        <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed mb-12">
          One person can create more than an income. They can create opportunities.<br className="hidden sm:inline" />
          Our vision is simple:
        </p>

        {/* 4 Flow Cards (Exact Layout from Reference Image) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center max-w-5xl mx-auto">
          {/* Card 1 */}
          <div className="glass-card p-6 flex flex-col items-center justify-center text-center border-purple-500/20 hover:border-purple-500/50 transition-all group min-h-[160px]">
            <div className="w-12 h-12 rounded-xl bg-purple-950/60 border border-purple-500/40 flex items-center justify-center text-purple-400 mb-3 group-hover:scale-110 transition-transform">
              <User className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">1 Student</h3>
            <p className="text-xs text-slate-400 font-medium">Entrepreneur</p>
          </div>

          {/* Card 2 */}
          <div className="glass-card p-6 flex flex-col items-center justify-center text-center border-blue-500/20 hover:border-blue-500/50 transition-all group min-h-[160px]">
            <div className="w-12 h-12 rounded-xl bg-blue-950/60 border border-blue-500/40 flex items-center justify-center text-blue-400 mb-3 group-hover:scale-110 transition-transform">
              <Rocket className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">1 Growing</h3>
            <p className="text-xs text-slate-400 font-medium">Venture</p>
          </div>

          {/* Card 3 */}
          <div className="glass-card p-6 flex flex-col items-center justify-center text-center border-violet-500/20 hover:border-violet-500/50 transition-all group min-h-[160px]">
            <div className="w-12 h-12 rounded-xl bg-violet-950/60 border border-violet-500/40 flex items-center justify-center text-violet-400 mb-3 group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">10+ Meaningful</h3>
            <p className="text-xs text-slate-400 font-medium">Opportunities</p>
          </div>

          {/* Card 4 */}
          <div className="glass-card p-6 flex flex-col items-center justify-center text-center border-cyan-500/20 hover:border-cyan-500/50 transition-all group min-h-[160px]">
            <div className="w-12 h-12 rounded-xl bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center text-cyan-400 mb-3 group-hover:scale-110 transition-transform">
              <InfinityIcon className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">Endless</h3>
            <p className="text-xs text-slate-400 font-medium">Impact</p>
          </div>
        </div>

        {/* Interactive Multiplier Simulation Box */}
        <div className="mt-12 max-w-3xl mx-auto glass-panel p-6 sm:p-8 text-left border border-white/10">
          <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <Sliders className="w-4 h-4 text-purple-400" />
              <span>Interactive Ripple Multiplier Simulator</span>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-purple-950/80 text-purple-300 border border-purple-500/30">
              {founderCount} Student Creators
            </span>
          </div>

          {/* Slider */}
          <div className="space-y-2 mb-6">
            <input
              type="range"
              min="1"
              max="200"
              value={founderCount}
              onChange={(e) => setFounderCount(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
              aria-label="Number of student creators"
            />
            <div className="flex justify-between text-[11px] font-mono text-slate-500">
              <span>1 Creator</span>
              <span>100 Creators</span>
              <span>200 Creators</span>
            </div>
          </div>

          {/* Projected Outcomes */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 text-center">
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
              <div className="text-2xl font-extrabold text-white font-mono">{ventures}</div>
              <div className="text-xs text-slate-400 mt-1">Digital Ventures</div>
            </div>
            <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-500/30">
              <div className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-blue-300 font-mono">
                {opportunities}+
              </div>
              <div className="text-xs text-purple-200 mt-1">Opportunities Created</div>
            </div>
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
              <div className="text-2xl font-extrabold text-white font-mono">{communityRipple}</div>
              <div className="text-xs text-slate-400 mt-1">Peers Impacted</div>
            </div>
          </div>
        </div>

        {/* CTA Button (Matches Reference: "Discover the 1 → 10 Mission ->") */}
        <div className="mt-10">
          <Link
            to="/mission"
            className="btn-primary text-sm md:text-base py-3.5 px-8 shadow-2xl group inline-flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-purple-200" />
            <span>Discover the 1 → 10 Mission</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Legal Disclaimer */}
        <div className="mt-8 max-w-xl mx-auto text-xs text-slate-500 leading-relaxed flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-slate-400 shrink-0" />
          <span>
            This is not a promise of guaranteed jobs or income. It is a mission to encourage opportunity creation through digital skill mastery.
          </span>
        </div>
      </div>
    </section>
  );
};
