import React from 'react';
import { Link } from 'react-router-dom';
import { User, Rocket, Users, Infinity as InfinityIcon, ArrowRight } from 'lucide-react';

export const MissionMultiplierSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 relative overflow-hidden bg-[#07090e]">
      {/* Ambient gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-purple-900/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container-custom relative z-10 text-center max-w-5xl mx-auto">
        {/* Eyebrow */}
        <div className="inline-block text-xs uppercase font-mono tracking-widest text-purple-400 font-bold mb-2">
          OUR IDEA
        </div>

        {/* Headline (Matching Reference: THE 1 -> 10 MISSION with colored numbers) */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-3 font-heading">
          THE <span className="text-purple-400">1</span> <span className="text-blue-400">→</span> <span className="text-purple-400">10</span> MISSION
        </h2>

        {/* Subtext */}
        <div className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed mb-10 max-w-xl mx-auto space-y-0.5">
          <p>One person can create more than an income.</p>
          <p>They can create opportunities.</p>
          <p className="text-slate-400">Our vision is simple:</p>
        </div>

        {/* 4 Process Cards connected with Glowing Right Arrows (Exact match to Reference) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-2 lg:gap-4 max-w-4xl mx-auto">
          {/* Card 1: 1 Student Entrepreneur */}
          <div className="w-full sm:w-44 lg:w-48 p-5 rounded-2xl bg-[#0b0f19] border border-white/10 hover:border-purple-500/40 flex flex-col items-center justify-center text-center shadow-xl transition-all group">
            <div className="w-12 h-12 rounded-xl bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-3 group-hover:scale-110 transition-transform">
              <User className="w-6 h-6" />
            </div>
            <div className="text-xs sm:text-sm font-bold text-white leading-tight">1 Student</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Entrepreneur</div>
          </div>

          {/* Arrow 1 */}
          <div className="text-purple-500 font-extrabold text-xl hidden sm:block shrink-0 px-1">
            →
          </div>

          {/* Card 2: 1 Growing Venture */}
          <div className="w-full sm:w-44 lg:w-48 p-5 rounded-2xl bg-[#0b0f19] border border-white/10 hover:border-purple-500/40 flex flex-col items-center justify-center text-center shadow-xl transition-all group">
            <div className="w-12 h-12 rounded-xl bg-indigo-950/60 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-3 group-hover:scale-110 transition-transform">
              <Rocket className="w-6 h-6" />
            </div>
            <div className="text-xs sm:text-sm font-bold text-white leading-tight">1 Growing</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Venture</div>
          </div>

          {/* Arrow 2 */}
          <div className="text-purple-500 font-extrabold text-xl hidden sm:block shrink-0 px-1">
            →
          </div>

          {/* Card 3: 10+ Meaningful Opportunities */}
          <div className="w-full sm:w-44 lg:w-48 p-5 rounded-2xl bg-[#0b0f19] border border-white/10 hover:border-purple-500/40 flex flex-col items-center justify-center text-center shadow-xl transition-all group">
            <div className="w-12 h-12 rounded-xl bg-blue-950/60 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-3 group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <div className="text-xs sm:text-sm font-bold text-white leading-tight">10+ Meaningful</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Opportunities</div>
          </div>

          {/* Arrow 3 */}
          <div className="text-purple-500 font-extrabold text-xl hidden sm:block shrink-0 px-1">
            →
          </div>

          {/* Card 4: Endless Impact */}
          <div className="w-full sm:w-44 lg:w-48 p-5 rounded-2xl bg-[#0b0f19] border border-white/10 hover:border-purple-500/40 flex flex-col items-center justify-center text-center shadow-xl transition-all group">
            <div className="w-12 h-12 rounded-xl bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-3 group-hover:scale-110 transition-transform">
              <InfinityIcon className="w-6 h-6" />
            </div>
            <div className="text-xs sm:text-sm font-bold text-white leading-tight">Endless</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Impact</div>
          </div>
        </div>

        {/* CTA Button (Matches Reference: "Discover the 1 → 10 Mission ->") */}
        <div className="mt-10 max-w-sm sm:max-w-md mx-auto">
          <Link
            to="/mission"
            className="w-full bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold text-xs sm:text-sm py-3.5 px-8 rounded-xl shadow-xl shadow-purple-600/30 transition-all flex items-center justify-center gap-2 group hover:scale-[1.02] active:scale-95"
          >
            <span>Discover the 1 → 10 Mission</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};
