import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DollarSign, Heart, Users, Target, Rocket, ArrowRight, CheckCircle2 } from 'lucide-react';

export const OurWhySection: React.FC = () => {
  const [activePillar, setActivePillar] = useState<number>(0);

  const pillars = [
    {
      id: 'income',
      title: 'INCOME',
      emoji: '💰',
      icon: DollarSign,
      color: 'from-amber-500 to-yellow-400',
      borderGlow: 'border-yellow-500/40 shadow-yellow-500/10',
      badgeBg: 'bg-yellow-950/60 text-yellow-300',
      headline: 'Create Sustainable Earning Opportunities',
      desc: 'Financial self-reliance eliminates survival anxiety, provides early freedom of choice, and fuels the ability to experiment and build ventures without fear.',
      keyTakeaway: 'Income is the foundation that enables students to take charge of their own educational journey.',
    },
    {
      id: 'health',
      title: 'HEALTH',
      emoji: '❤️',
      icon: Heart,
      color: 'from-rose-500 to-pink-400',
      borderGlow: 'border-rose-500/40 shadow-rose-500/10',
      badgeBg: 'bg-rose-950/60 text-rose-300',
      headline: 'Protect Physical & Mental Foundations',
      desc: 'True achievement is meaningless if gained at the cost of chronic burnout, anxiety, or compromised physical wellness. Long-term energy is your primary competitive edge.',
      keyTakeaway: 'We advocate for balanced stamina, deep rest, and mental clarity alongside ambition.',
    },
    {
      id: 'family',
      title: 'FAMILY',
      emoji: '👨‍👩‍👧‍👦',
      icon: Users,
      color: 'from-blue-500 to-cyan-400',
      borderGlow: 'border-blue-500/40 shadow-blue-500/10',
      badgeBg: 'bg-blue-950/60 text-blue-300',
      headline: 'Security, Quality Time & Better Experiences',
      desc: 'Growth provides the resources and flexibility to support parents, protect loved ones in times of need, and design precious memories without being tethered to rigid constraints.',
      keyTakeaway: 'When you elevate your economic standing, you uplift your entire generational circle.',
    },
    {
      id: 'purpose',
      title: 'PURPOSE',
      emoji: '🎯',
      icon: Target,
      color: 'from-purple-500 to-violet-400',
      borderGlow: 'border-purple-500/40 shadow-purple-500/10',
      badgeBg: 'bg-purple-950/60 text-purple-300',
      headline: "Know What You're Building and Why It Matters",
      desc: 'Purpose separates temporary hustle from enduring legacy. Operating with clear intent gives meaning to everyday discipline and attracts like-minded builders to your mission.',
      keyTakeaway: 'Clear purpose transforms mundane tasks into deliberate stepping stones.',
    },
    {
      id: 'opportunity',
      title: 'OPPORTUNITY',
      emoji: '🚀',
      icon: Rocket,
      color: 'from-indigo-500 to-purple-400',
      borderGlow: 'border-indigo-500/40 shadow-indigo-500/10',
      badgeBg: 'bg-indigo-950/60 text-indigo-300',
      headline: 'Use Your Growth to Create Doors for Others',
      desc: 'The pinnacle of the entrepreneurial journey is not personal accumulation—it is turning around to hire, mentor, and empower the next generation of students.',
      keyTakeaway: 'The 1 → 10 multiplier turns your singular victory into community triumph.',
    },
  ];

  return (
    <section className="py-10 sm:py-14 relative overflow-hidden bg-[#07090e]">
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 space-y-2.5">
          <div className="inline-block px-3 py-1 rounded-full bg-purple-950/50 border border-purple-500/30 text-xs font-mono font-bold text-purple-300 uppercase tracking-widest">
            THE PHILOSOPHY
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">WHY</span>
          </h2>
          <p className="text-lg sm:text-xl font-medium text-purple-200/90 font-mono">
            Why do I want to earn?
          </p>
          <p className="text-slate-400 text-sm">
            Sustainable entrepreneurial success is holistic. Click through each pillar to explore the 5 core foundations of THE VISIONEX.
          </p>
        </div>

        {/* Desktop & Mobile Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          {/* Vertical Progress Navigation (Timeline) */}
          <div className="lg:col-span-5 space-y-3">
            {pillars.map((pillar, idx) => {
              const isActive = activePillar === idx;
              const Icon = pillar.icon;
              return (
                <button
                  key={pillar.id}
                  onClick={() => setActivePillar(idx)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-300 flex items-center justify-between border ${
                    isActive
                      ? `bg-slate-900/90 ${pillar.borderGlow} border-opacity-100 scale-[1.02]`
                      : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.05] hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg ${
                        isActive ? pillar.badgeBg : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {pillar.emoji}
                    </div>
                    <div>
                      <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                        Pillar 0{idx + 1}
                      </div>
                      <div className={`text-base font-bold ${isActive ? 'text-white' : 'text-slate-300'}`}>
                        {pillar.title}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {isActive ? (
                      <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
                    ) : (
                      <Icon className="w-4 h-4 text-slate-600" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed Highlight Card on the Right */}
          <div className="lg:col-span-7">
            {pillars.map((pillar, idx) => {
              if (activePillar !== idx) return null;
              return (
                <div
                  key={pillar.id}
                  className={`glass-card p-6 sm:p-8 rounded-2xl border ${pillar.borderGlow} animate-fadeIn relative overflow-hidden`}
                >
                  {/* Watermark emoji */}
                  <div className="absolute -top-6 -right-6 text-8xl opacity-10 select-none pointer-events-none">
                    {pillar.emoji}
                  </div>

                  <div className="relative z-10 space-y-5">
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-md text-xs font-mono font-bold uppercase ${pillar.badgeBg}`}>
                        Pillar 0{idx + 1} • {pillar.title}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-snug">
                      {pillar.headline}
                    </h3>

                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                      {pillar.desc}
                    </p>

                    <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/20 flex items-start gap-3 text-xs sm:text-sm text-purple-200">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <span>{pillar.keyTakeaway}</span>
                    </div>

                    <div className="pt-4 flex items-center justify-between border-t border-white/10 flex-wrap gap-3">
                      <div className="text-xs text-slate-400 font-mono">
                        {idx + 1} of 5 Core Principles
                      </div>
                      <div className="flex gap-2">
                        {idx > 0 && (
                          <button
                            onClick={() => setActivePillar(idx - 1)}
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-300 transition-colors"
                          >
                            Previous
                          </button>
                        )}
                        {idx < pillars.length - 1 ? (
                          <button
                            onClick={() => setActivePillar(idx + 1)}
                            className="btn-primary text-xs py-1.5 px-4"
                          >
                            Next Pillar →
                          </button>
                        ) : (
                          <Link to="/why" className="btn-primary text-xs py-1.5 px-4">
                            Explore Full Why Guide <ArrowRight className="w-3.5 h-3.5 inline ml-1" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
