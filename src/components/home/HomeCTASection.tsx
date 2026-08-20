import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Users, ArrowRight, ShieldCheck } from 'lucide-react';
import { analytics } from '../../lib/analytics';

export const HomeCTASection: React.FC = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background glow orb */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-purple-900/20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto glass-panel p-8 sm:p-12 md:p-16 rounded-3xl border border-purple-500/30 text-center space-y-6 shadow-2xl relative overflow-hidden">
          {/* Subtle decorative grid lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/80 border border-purple-500/40 text-xs font-mono font-bold text-purple-300 uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>THE VISIONEX MOVEMENT</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Ready to Stop Waiting and <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-400 to-blue-400">
                Start Building Your Future?
              </span>
            </h2>

            <p className="text-slate-300 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
              Join hundreds of ambitious students learning digital skills, launching micro-ventures, and transforming into opportunity creators.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/register"
                onClick={() => analytics.trackJoinCommunity('bottom_banner')}
                className="btn-primary text-sm sm:text-base py-3.5 px-8 shadow-2xl group w-full sm:w-auto"
              >
                <Users className="w-4 h-4 text-purple-200" />
                <span>Join The Community</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/founder"
                className="btn-secondary text-sm sm:text-base py-3.5 px-8 w-full sm:w-auto"
              >
                <span>Meet Founder Rakhi Guptha</span>
              </Link>
            </div>

            <div className="pt-4 flex items-center justify-center gap-2 text-xs text-slate-400 font-mono">
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              <span>No fees required to start • Free roadmaps & workshops</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
