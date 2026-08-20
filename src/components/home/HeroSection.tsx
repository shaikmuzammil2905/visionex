import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Target, Rocket, Heart } from 'lucide-react';
import { HeroConstellation } from './HeroConstellation';
import { analytics } from '../../lib/analytics';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-24 pb-12 sm:pt-28 md:pt-36 md:pb-16 overflow-hidden bg-[#07090e]">
      {/* Background ambient gradient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[1000px] h-[500px] bg-gradient-to-tr from-purple-900/20 via-blue-900/15 to-cyan-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="container-custom">
        {/* Main 2-Column Hero: Copy on Left, Constellation & Founder Workspace on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Core Copy & CTAs (Matches Desktop Reference & Mobile Reference) */}
          <div className="lg:col-span-6 space-y-5 text-left z-10">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/70 border border-purple-500/50 shadow-[0_0_15px_rgba(139,92,246,0.25)] text-[11px] sm:text-xs font-bold text-purple-300 uppercase tracking-widest font-mono">
              <span>THE FUTURE IS CREATED</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-black tracking-tight text-white leading-[1.08] font-heading">
              DON'T JUST FIND <br />
              YOUR FUTURE. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-indigo-400 to-blue-500">
                BUILD IT.
              </span>
            </h1>

            {/* Supporting Tagline */}
            <p className="text-sm sm:text-base md:text-lg font-bold text-purple-200/90 font-mono tracking-wide">
              Learn. Build. Earn. Live. Empower.
            </p>

            {/* Body Description */}
            <p className="text-xs sm:text-sm md:text-base text-slate-300/90 leading-relaxed max-w-lg">
              We empower students to explore digital entrepreneurship, build real skills, create income and opportunities, and design a meaningful life.
            </p>

            {/* CTA Buttons (Side-by-side on desktop, full-width on mobile) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Link
                to="/mission"
                className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold text-xs sm:text-sm py-3 px-6 rounded-xl shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center gap-2 group hover:scale-[1.02] active:scale-95"
              >
                <span>Explore Our Mission</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/register"
                onClick={() => analytics.trackJoinCommunity('hero_cta')}
                className="bg-[#0b0f19]/80 hover:bg-[#121827] text-slate-200 hover:text-white font-semibold text-xs sm:text-sm py-3 px-6 rounded-xl border border-white/15 backdrop-blur-md transition-all flex items-center justify-center gap-2"
              >
                <Users className="w-4 h-4 text-purple-300" />
                <span>Join Community</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Interactive Constellation & Founder Visual (Matches Design Reference) */}
          <div className="lg:col-span-6 w-full">
            <HeroConstellation />
          </div>
        </div>

        {/* 4 Feature Highlights Bar (Single Rounded Container matching Desktop & Mobile Reference) */}
        <div className="mt-10 sm:mt-12">
          <div className="glass-panel p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-white/10 shadow-2xl bg-[#0b0f19]/80 backdrop-blur-xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-white/5">
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
    </section>
  );
};
