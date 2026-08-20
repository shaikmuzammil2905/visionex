import React from 'react';
import { AlertCircle, TrendingDown, Cpu, Anchor, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const TheProblemSection: React.FC = () => {
  const problems = [
    {
      icon: AlertCircle,
      title: 'Job-Market Uncertainty',
      desc: 'Traditional career trajectories are becoming less linear and less predictable as global industries restructure at record speed.',
      tag: 'Economic Reality',
    },
    {
      icon: TrendingDown,
      title: 'Corporate Layoffs & Volatility',
      desc: 'Modern organizations face rapid shifts in demand, leading to sudden workforce adjustments even for high-performing traditional employees.',
      tag: 'Market Shifts',
    },
    {
      icon: Cpu,
      title: 'AI-Driven Workplace Shifts',
      desc: 'AI is changing the nature of work and creating massive new opportunities while simultaneously disrupting routine tasks.',
      tag: 'Technology',
    },
    {
      icon: Anchor,
      title: 'Single-Source Dependency',
      desc: 'Relying exclusively on a single traditional job path leaves young graduates vulnerable to forces completely outside their control.',
      tag: 'Risk Mitigation',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-[#07090e] via-[#090d15] to-[#07090e] relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-3">
          <div className="inline-block px-3 py-1 rounded-full bg-red-950/40 border border-red-500/30 text-xs font-mono font-bold text-red-400 uppercase tracking-widest">
            THE REALITY CHECK
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-amber-400">CHALLENGES</span> WE ADDRESS
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            The traditional playbook wasn't designed for a hyper-automated, fast-evolving world. Understanding these bottlenecks is step one to building resilience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {problems.map((prob) => {
            const Icon = prob.icon;
            return (
              <div
                key={prob.title}
                className="glass-card p-6 sm:p-7 rounded-2xl border border-white/10 hover:border-red-500/30 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-mono uppercase font-bold tracking-wider text-red-400/90 px-2.5 py-0.5 rounded bg-red-950/60 border border-red-500/20">
                      {prob.tag}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 group-hover:text-red-400 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {prob.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {prob.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Visionex Solution Banner */}
        <div className="mt-12 max-w-4xl mx-auto glass-panel p-6 sm:p-8 rounded-2xl border border-purple-500/30 text-center space-y-4 bg-gradient-to-r from-purple-950/40 via-blue-950/30 to-purple-950/40">
          <h4 className="text-lg sm:text-xl font-bold text-white">
            THE VISIONEX Answer: Proactive Digital Venture Creation
          </h4>
          <p className="text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
            We don't tell students to abandon academic education—we empower them to supplement it with practical digital skills, real client assets, and independent earning power.
          </p>
          <div className="pt-2">
            <Link to="/about" className="btn-primary text-xs sm:text-sm py-2.5 px-6">
              <span>Read About Our Approach</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
