import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Users, Target, Rocket, Heart, ChevronRight } from 'lucide-react';
import { HeroConstellation } from './HeroConstellation';
import { analytics } from '../../lib/analytics';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[900px] h-[400px] bg-gradient-to-tr from-purple-600/15 via-blue-600/15 to-cyan-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Core Copy & CTAs (Matches Desktop Reference & Mobile Reference) */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/40 shadow-[0_0_15px_rgba(139,92,246,0.25)] text-xs font-semibold text-purple-300 uppercase tracking-wider font-mono">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>THE FUTURE IS CREATED</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              DON'T JUST FIND <br />
              YOUR FUTURE. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-400 to-blue-400">
                BUILD IT.
              </span>
            </h1>

            {/* Supporting Tagline */}
            <p className="text-base sm:text-lg font-semibold text-purple-200 font-mono tracking-wide">
              Learn. Build. Earn. Live. Empower.
            </p>

            {/* Body Description */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
              We empower students to explore digital entrepreneurship, build real skills, create income and opportunities, and design a meaningful life.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <Link
                to="/mission"
                className="btn-primary text-sm md:text-base py-3 px-6 shadow-xl group justify-center"
              >
                <span>Explore Our Mission</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/register"
                onClick={() => analytics.trackJoinCommunity('hero_cta')}
                className="btn-secondary text-sm md:text-base py-3 px-6 justify-center group"
              >
                <Users className="w-4 h-4 text-purple-300" />
                <span>Join Community</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Interactive Constellation & Founder Visual (Matches Design Reference) */}
          <div className="lg:col-span-6">
            <HeroConstellation />
          </div>
        </div>

        {/* 4 Feature Highlights Bar (Matches Desktop & Mobile Reference Bar) */}
        <div className="mt-14 pt-8 border-t border-white/10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <Link
              to="/mission"
              className="glass-card p-4 flex items-center gap-3.5 group hover:border-purple-500/50 transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-500/40 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Target className="w-5 h-5 text-purple-400" />
              </div>
              <div className="min-w-0">
                <div className="text-xs sm:text-sm font-bold text-white group-hover:text-purple-300 transition-colors flex items-center gap-1">
                  1 → 10
                  <ChevronRight className="w-3 h-3 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <div className="text-[11px] sm:text-xs text-slate-400 truncate">Opportunity Mission</div>
              </div>
            </Link>

            <Link
              to="/digital-entrepreneurship"
              className="glass-card p-4 flex items-center gap-3.5 group hover:border-blue-500/50 transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-950/60 border border-blue-500/40 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Rocket className="w-5 h-5 text-blue-400" />
              </div>
              <div className="min-w-0">
                <div className="text-xs sm:text-sm font-bold text-white group-hover:text-blue-300 transition-colors flex items-center gap-1">
                  Digital
                  <ChevronRight className="w-3 h-3 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <div className="text-[11px] sm:text-xs text-slate-400 truncate">Entrepreneurship</div>
              </div>
            </Link>

            <Link
              to="/community"
              className="glass-card p-4 flex items-center gap-3.5 group hover:border-violet-500/50 transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-violet-950/60 border border-violet-500/40 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Users className="w-5 h-5 text-violet-400" />
              </div>
              <div className="min-w-0">
                <div className="text-xs sm:text-sm font-bold text-white group-hover:text-violet-300 transition-colors flex items-center gap-1">
                  Community
                  <ChevronRight className="w-3 h-3 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <div className="text-[11px] sm:text-xs text-slate-400 truncate">Driven Growth</div>
              </div>
            </Link>

            <Link
              to="/why"
              className="glass-card p-4 flex items-center gap-3.5 group hover:border-pink-500/50 transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-pink-950/60 border border-pink-500/40 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Heart className="w-5 h-5 text-pink-400" />
              </div>
              <div className="min-w-0">
                <div className="text-xs sm:text-sm font-bold text-white group-hover:text-pink-300 transition-colors flex items-center gap-1">
                  Purpose
                  <ChevronRight className="w-3 h-3 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <div className="text-[11px] sm:text-xs text-slate-400 truncate">& 5 Core Pillars</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
