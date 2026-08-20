import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DollarSign, Heart, Home, Target, Sparkles, ChevronRight, Sliders, ShieldCheck, ArrowRight, BookOpen } from 'lucide-react';
import { PageBackButton } from '../components/layout/PageBackButton';
import { trackPageView } from '../lib/analytics';

export const WhyPage: React.FC = () => {
  const [selectedPillar, setSelectedPillar] = useState<number>(0);
  const [scores, setScores] = useState({
    income: 6,
    health: 7,
    family: 8,
    purpose: 6,
    opportunity: 5,
  });

  useEffect(() => {
    document.title = 'Our Why | THE VISIONEX - The 5 Pillars Philosophy';
    trackPageView('/why', document.title);
  }, []);

  const pillars = [
    {
      id: 0,
      title: 'Income',
      icon: DollarSign,
      color: 'from-blue-500 to-cyan-500',
      badgeColor: 'bg-blue-950 text-blue-300 border-blue-500/40',
      tagline: 'Financial Freedom & Independence',
      description:
        'Income is not about luxury—it is about sovereignty. When a student builds legitimate digital earning capability, they eliminate survival anxiety, fund their own education, and gain the freedom to make long-term life decisions.',
      takeaways: [
        'Decouple time from earning through digital leverage',
        'Build proof-of-work assets that generate recurring value',
        'Eliminate reliance on debt or underpaid internships',
      ],
    },
    {
      id: 1,
      title: 'Health',
      icon: Heart,
      color: 'from-pink-500 to-rose-500',
      badgeColor: 'bg-pink-950 text-pink-300 border-pink-500/40',
      tagline: 'Physical & Mental Vitality',
      description:
        'Hustle culture that destroys physical health or mental clarity is fundamentally flawed. We teach sustainable venture creation—disciplined sleep, physical fitness, stress regulation, and clear-headed decision-making.',
      takeaways: [
        'Sustainable pacing over chaotic burnout',
        'Mental resilience to navigate entrepreneurial uncertainty',
        'Physical vitality as the bedrock of cognitive performance',
      ],
    },
    {
      id: 2,
      title: 'Family',
      icon: Home,
      color: 'from-purple-500 to-indigo-500',
      badgeColor: 'bg-purple-950 text-purple-300 border-purple-500/40',
      tagline: 'Rooted Support & Responsibility',
      description:
        'True success elevates those around you. We encourage students to build ventures that provide financial peace to their households, honor parental sacrifices, and create generational upliftment.',
      takeaways: [
        'Alleviate family financial pressure during college years',
        'Preserve meaningful relationships alongside venture building',
        'Lead by example for siblings and community peers',
      ],
    },
    {
      id: 3,
      title: 'Purpose',
      icon: Target,
      color: 'from-violet-500 to-purple-500',
      badgeColor: 'bg-violet-950 text-violet-300 border-violet-500/40',
      tagline: 'Meaning, Vision & Mission',
      description:
        'Making money without purpose leads to hollow achievement. We help students anchor their skills in solving real problems, building ethical products, and contributing to meaningful societal progress.',
      takeaways: [
        'Align high-income digital skills with authentic passions',
        'Solve real customer pain points with integrity',
        'Cultivate long-term intrinsic motivation',
      ],
    },
    {
      id: 4,
      title: 'Opportunity',
      icon: Sparkles,
      color: 'from-cyan-500 to-blue-500',
      badgeColor: 'bg-cyan-950 text-cyan-300 border-cyan-500/40',
      tagline: 'The 1 → 10 Multiplier Effect',
      description:
        'The highest tier of success is becoming a door-opener for others. When one student succeeds, they possess the knowledge, contracts, and revenue to hire, mentor, and elevate other student builders.',
      takeaways: [
        'Transform from a job seeker to an opportunity creator',
        'Build collaborative teams and student micro-agencies',
        'Contribute to a self-reinforcing national creator ecosystem',
      ],
    },
  ];

  const overallBalance = Math.round(
    (scores.income + scores.health + scores.family + scores.purpose + scores.opportunity) * 2
  );

  return (
    <div className="pt-24 pb-14 space-y-12 sm:space-y-14">
      {/* Top Back Button & Header */}
      <section className="container-custom">
        <PageBackButton />
        <div className="text-center max-w-3xl mx-auto space-y-3 pt-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/40 text-xs font-mono font-bold text-purple-300 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>OUR PHILOSOPHY</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            The 5 Pillars of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
              Sustainable Student Success
            </span>
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed">
            Success is not measured solely by revenue. At THE VISIONEX, we believe in a balanced life across five interconnected dimensions.
          </p>
        </div>
      </section>

      {/* Interactive 5-Pillar Tabs */}
      <section className="container-custom">
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/10 space-y-8">
          {/* Pillar Selector Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3">
            {pillars.map((p, idx) => {
              const Icon = p.icon;
              const isSelected = selectedPillar === idx;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedPillar(idx)}
                  className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl flex flex-col items-center gap-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-purple-950/80 border-2 border-purple-400 shadow-xl shadow-purple-950/50 scale-102'
                      : 'bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center bg-gradient-to-tr ${p.color} text-white shadow-md`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-white">{p.title}</span>
                </button>
              );
            })}
          </div>

          {/* Active Pillar Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
            <div className="lg:col-span-7 space-y-3.5">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${pillars[selectedPillar].badgeColor}`}>
                  {pillars[selectedPillar].tagline}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {pillars[selectedPillar].title}: {pillars[selectedPillar].tagline}
              </h2>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                {pillars[selectedPillar].description}
              </p>

              <div className="space-y-2 pt-1">
                <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                  Key Principles:
                </div>
                {pillars[selectedPillar].takeaways.map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                    <ChevronRight className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="glass-card p-6 sm:p-7 rounded-2xl border-purple-500/20 space-y-4">
                <div className="text-xs font-mono font-bold text-purple-300 uppercase">
                  Pillar Blueprint
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
                  <div className="text-xs font-bold text-white">Framework Action Step</div>
                  <div className="text-[11px] text-slate-400">
                    Implement deliberate weekly checkpoints to audit balance and ensure continuous alignment.
                  </div>
                </div>
                <Link
                  to="/mission"
                  className="btn-primary w-full text-xs py-2.5 justify-center flex items-center gap-1.5"
                >
                  <span>See How 1 → 10 Multiplies Impact</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Student Founder Balance Audit Tool */}
      <section className="container-custom">
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-purple-400 uppercase">
                <Sliders className="w-4 h-4" />
                <span>Interactive Self-Audit Tool</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                Calculate Your Holistic Balance Index
              </h2>
            </div>
            <div className="text-right">
              <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-mono">
                {overallBalance}%
              </div>
              <div className="text-[10px] font-mono text-slate-400 uppercase">Holistic Score</div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {Object.keys(scores).map((key) => {
              const val = scores[key as keyof typeof scores];
              return (
                <div key={key} className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold capitalize">
                    <span className="text-white">{key}</span>
                    <span className="font-mono text-purple-300">{val}/10</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={val}
                    onChange={(e) => setScores({ ...scores, [key]: Number(e.target.value) })}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
