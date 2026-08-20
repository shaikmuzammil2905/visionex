import React, { useState, useEffect } from 'react';
import { Target, Sparkles, Rocket, Users, Infinity as InfinityIcon, ArrowRight, ShieldCheck, Sliders, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageBackButton } from '../components/layout/PageBackButton';
import { trackPageView } from '../lib/analytics';

export const MissionPage: React.FC = () => {
  const [creatorsCount, setCreatorsCount] = useState<number>(30);

  useEffect(() => {
    document.title = 'The 1 → 10 Mission | THE VISIONEX - Opportunity Creation';
    trackPageView('/mission', document.title);
  }, []);

  const totalVentures = creatorsCount;
  const directJobs = creatorsCount * 10;
  const ecosystemImpact = (creatorsCount * 50).toLocaleString();

  return (
    <div className="pt-24 pb-14 space-y-12 sm:space-y-14">
      {/* Top Back Button & Hero */}
      <section className="container-custom">
        <PageBackButton />
        <div className="text-center max-w-3xl mx-auto space-y-3 pt-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/40 text-xs font-mono font-bold text-purple-300 uppercase tracking-widest">
            <Target className="w-3.5 h-3.5 text-purple-400" />
            <span>THE 1 → 10 MANIFESTO</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            The Future Doesn't Need More Job Seekers. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-400 to-blue-400">
              It Needs Opportunity Creators.
            </span>
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed">
            One student with digital skills and entrepreneurial courage can build a venture that supports ten others. This is the core thesis of THE VISIONEX.
          </p>
        </div>
      </section>

      {/* The 4-Step Multiplier Progression */}
      <section className="container-custom">
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/10 space-y-8 max-w-5xl mx-auto">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest">
              THE MULTIPLIER PIPELINE
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              How 1 Student Creates 10+ Opportunities
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-card p-5 rounded-2xl border-purple-500/20 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-purple-950/60 border border-purple-500/40 flex items-center justify-center text-purple-400 font-mono font-bold text-sm">
                01
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white">Student Mastery</h3>
              <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed">
                The student develops high-leverage skills in software, AI workflows, growth marketing, or digital production.
              </p>
            </div>

            <div className="glass-card p-5 rounded-2xl border-indigo-500/20 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-indigo-950/60 border border-indigo-500/40 flex items-center justify-center text-indigo-400 font-mono font-bold text-sm">
                02
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white">Venture Validation</h3>
              <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed">
                They launch a micro-agency, digital SaaS, or service business and close initial client contracts.
              </p>
            </div>

            <div className="glass-card p-5 rounded-2xl border-blue-500/20 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-blue-950/60 border border-blue-500/40 flex items-center justify-center text-blue-400 font-mono font-bold text-sm">
                03
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white">Peer Delegation</h3>
              <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed">
                As workload expands, the student hires and mentors classmates to handle delivery, design, and code.
              </p>
            </div>

            <div className="glass-card p-5 rounded-2xl border-emerald-500/20 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-mono font-bold text-sm">
                04
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white">Ecosystem Multiplier</h3>
              <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed">
                10+ peers now earn and learn. Some spin off their own ventures, creating an exponential ripple.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Simulator */}
      <section className="container-custom">
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-purple-500/30 max-w-3xl mx-auto space-y-5">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-white">
              <Sliders className="w-4 h-4 text-purple-400" />
              <span>Simulate Ecosystem Ripple Growth</span>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-purple-950/80 text-purple-300 border border-purple-500/40">
              {creatorsCount} Active Student Founders
            </span>
          </div>

          <input
            type="range"
            min="1"
            max="250"
            value={creatorsCount}
            onChange={(e) => setCreatorsCount(Number(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-white/10 text-center">
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
              <div className="text-2xl font-extrabold text-white font-mono">{totalVentures}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Active Ventures</div>
            </div>
            <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-500/30">
              <div className="text-2xl font-extrabold text-purple-300 font-mono">{directJobs}+</div>
              <div className="text-[11px] text-purple-200 mt-0.5">Opportunities Created</div>
            </div>
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
              <div className="text-2xl font-extrabold text-white font-mono">{ecosystemImpact}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Ecosystem Touchpoints</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="container-custom text-center max-w-2xl mx-auto space-y-4 pt-2">
        <h3 className="text-xl sm:text-2xl font-bold text-white">
          Ready to Become the 1 that Empowers 10?
        </h3>
        <div className="flex items-center justify-center gap-3">
          <Link to="/register" className="btn-primary text-xs py-2.5 px-6">
            <Sparkles className="w-3.5 h-3.5" /> Join THE VISIONEX Free
          </Link>
          <Link to="/community" className="btn-secondary text-xs py-2.5 px-6">
            View Creator Community
          </Link>
        </div>
      </section>
    </div>
  );
};
