import React, { useEffect, useState } from 'react';
import { Target, Rocket, Users, Infinity as InfinityIcon, Sparkles, ArrowRight, ShieldCheck, CheckCircle2, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { trackPageView } from '../lib/analytics';

export const MissionPage: React.FC = () => {
  const [studentsCount, setStudentsCount] = useState<number>(50);

  useEffect(() => {
    document.title = 'Our Mission | THE VISIONEX - The 1 → 10 Multiplier';
    trackPageView('/mission', document.title);
  }, []);

  const totalVentures = studentsCount;
  const totalOpportunities = studentsCount * 10;
  const directPeersImpacted = studentsCount * 35;

  return (
    <div className="pt-28 pb-20 space-y-20">
      {/* Hero */}
      <section className="container-custom text-center max-w-4xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/40 text-xs font-mono font-bold text-purple-300 uppercase tracking-widest">
          <Target className="w-3.5 h-3.5 text-purple-400" />
          <span>THE MISSION MANIFESTO</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
          The Future Doesn't Need More Job Seekers. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-400 to-blue-400">
            It Needs Opportunity Creators.
          </span>
        </h1>

        <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
          Our mission is to empower students to explore digital entrepreneurship, develop practical skills, build legitimate income-generating ventures, and create meaningful opportunities for others.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
          <Link to="/register" className="btn-primary text-sm py-3 px-6 shadow-xl">
            <Sparkles className="w-4 h-4 text-purple-200" />
            <span>Join The 1 → 10 Movement</span>
          </Link>
          <Link to="/digital-entrepreneurship" className="btn-secondary text-sm py-3 px-6">
            <span>Explore Skills Roadmap</span>
          </Link>
        </div>
      </section>

      {/* The 1 -> 10 Deep Dive */}
      <section className="container-custom space-y-12">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-purple-500/30 text-center max-w-5xl mx-auto space-y-8">
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest">
              THE SIGNATURE EQUATION
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Understanding The <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">1 → 10</span> Ripple Effect
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              When one student breaks the cycle of passive dependency, the benefits do not stop with them. They become an economic engine for their entire circle.
            </p>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            <div className="glass-card p-6 border-purple-500/30 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-500/40 flex items-center justify-center text-purple-300 font-mono font-bold text-sm">
                01
              </div>
              <h3 className="text-base font-bold text-white">1 Student Creator</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                An ambitious student masters in-demand digital capabilities and steps onto the path of independent venture building.
              </p>
            </div>

            <div className="glass-card p-6 border-blue-500/30 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-950/80 border border-blue-500/40 flex items-center justify-center text-blue-300 font-mono font-bold text-sm">
                02
              </div>
              <h3 className="text-base font-bold text-white">1 Growing Venture</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                They validate a digital service, software tool, or client agency that solves real problems and generates sustainable cash flow.
              </p>
            </div>

            <div className="glass-card p-6 border-violet-500/30 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-violet-950/80 border border-violet-500/40 flex items-center justify-center text-violet-300 font-mono font-bold text-sm">
                03
              </div>
              <h3 className="text-base font-bold text-white">10+ Opportunities</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                As the venture expands, the founder hires student peers, subcontracts creative deliverables, and shares practical knowledge.
              </p>
            </div>

            <div className="glass-card p-6 border-cyan-500/30 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-300 font-mono font-bold text-sm">
                04
              </div>
              <h3 className="text-base font-bold text-white">Endless Impact</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                The employed peers learn the playbook, branch out to start their own ventures, and create compounding regional opportunities.
              </p>
            </div>
          </div>
        </div>

        {/* Dynamic Multiplier Projection Tool */}
        <div className="max-w-4xl mx-auto glass-card p-8 rounded-3xl border border-white/10 space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-white">Compound Multiplier Simulator</h3>
              <p className="text-xs text-slate-400">See the collective leverage when multiple student founders build together.</p>
            </div>
            <div className="px-4 py-1.5 rounded-full bg-purple-950 border border-purple-500/40 text-purple-200 font-mono text-xs font-bold">
              {studentsCount} Active Student Founders
            </div>
          </div>

          <div className="space-y-2">
            <input
              type="range"
              min="5"
              max="500"
              step="5"
              value={studentsCount}
              onChange={(e) => setStudentsCount(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
              aria-label="Number of student founders"
            />
            <div className="flex justify-between text-[11px] font-mono text-slate-500">
              <span>5 Founders</span>
              <span>250 Founders</span>
              <span>500 Founders</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 text-center">
            <div className="p-4 rounded-xl bg-white/5 border border-white/5">
              <div className="text-3xl font-extrabold text-white font-mono">{totalVentures}</div>
              <div className="text-xs text-slate-400 mt-1">Independent Ventures</div>
            </div>
            <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-500/30">
              <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-blue-300 font-mono">
                {totalOpportunities}+
              </div>
              <div className="text-xs text-purple-200 mt-1">Meaningful Opportunities</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/5">
              <div className="text-3xl font-extrabold text-white font-mono">{directPeersImpacted.toLocaleString()}</div>
              <div className="text-xs text-slate-400 mt-1">Student Lives Touched</div>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="max-w-2xl mx-auto p-4 rounded-xl bg-slate-900/60 border border-white/10 text-xs text-slate-400 flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
          <span>
            <strong>Official Mission Clarification:</strong> The 1 → 10 Mission is a philosophical framework and educational benchmark designed to encourage proactive opportunity creation. It is not an employment contract, guarantee of placement, or financial assurance. Individual results depend on skill acquisition, market demand, and dedication.
          </span>
        </div>
      </section>
    </div>
  );
};
