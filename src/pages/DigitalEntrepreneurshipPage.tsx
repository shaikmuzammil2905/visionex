import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Code,
  Cpu,
  Smartphone,
  Palette,
  Video,
  Megaphone,
  ShoppingCart,
  ArrowRight,
  CheckCircle2,
  Mail,
  BookOpen,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageBackButton } from '../components/layout/PageBackButton';
import { trackPageView } from '../lib/analytics';
import { useContent } from '../context/ContentContext';

export const DigitalEntrepreneurshipPage: React.FC = () => {
  const [selectedTrack, setSelectedTrack] = useState<string>('all');
  const { publishedPrograms } = useContent();

  useEffect(() => {
    document.title = 'Digital Skills & Entrepreneurship | THE VISIONEX';
    trackPageView('/digital-entrepreneurship', document.title);
  }, []);

  const filteredTracks = publishedPrograms.filter(
    (t) => selectedTrack === 'all' || t.category === selectedTrack
  );

  const getIconForCategory = (category: string) => {
    switch (category) {
      case 'technical':
        return Code;
      case 'growth':
        return Megaphone;
      case 'venture':
        return ShoppingCart;
      default:
        return Cpu;
    }
  };

  return (
    <div className="pt-24 pb-14 space-y-12 sm:space-y-14">
      {/* Top Back Button & Header */}
      <section className="container-custom">
        <PageBackButton />
        <div className="text-center max-w-3xl mx-auto space-y-3 pt-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/60 border border-blue-500/40 text-xs font-mono font-bold text-blue-300 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>CAPABILITY ACCELERATOR</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            High-Income Digital Skills & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
              Venture Roadmaps
            </span>
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed">
            Choose your specialization track. Learn by building functional digital assets that attract paying clients and venture opportunities.
          </p>

          {/* Filter Pills */}
          <div className="pt-2 flex items-center justify-center gap-2 flex-wrap">
            <button
              onClick={() => setSelectedTrack('all')}
              className={`px-3.5 py-1 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer ${
                selectedTrack === 'all'
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-white/5 text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              All Skills ({publishedPrograms.length})
            </button>
            <button
              onClick={() => setSelectedTrack('technical')}
              className={`px-3.5 py-1 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer ${
                selectedTrack === 'technical'
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-white/5 text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              Technical & AI
            </button>
            <button
              onClick={() => setSelectedTrack('growth')}
              className={`px-3.5 py-1 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer ${
                selectedTrack === 'growth'
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-white/5 text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              Growth & Brand
            </button>
            <button
              onClick={() => setSelectedTrack('venture')}
              className={`px-3.5 py-1 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer ${
                selectedTrack === 'venture'
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-white/5 text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              Venture Strategy
            </button>
          </div>
        </div>
      </section>

      {/* Grid of Capability Tracks */}
      <section className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTracks.map((track) => {
            const Icon = getIconForCategory(track.category);
            const toolsList = track.tools_covered || [];

            return (
              <div
                key={track.id}
                className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col justify-between group hover:border-purple-500/40 transition-all space-y-5"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-tr ${
                        track.gradient_color || 'from-purple-600 to-indigo-600'
                      } text-white shadow-md group-hover:scale-105 transition-transform`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/5">
                      {track.duration_weeks ? `${track.duration_weeks} Weeks` : 'Self-Paced'}
                    </span>
                  </div>

                  <h2 className="text-base sm:text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                    {track.title}
                  </h2>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {track.short_description || track.description || ''}
                  </p>

                  {track.venture_idea && (
                    <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                      <span className="text-[10px] font-mono font-bold text-purple-400 uppercase">
                        Suggested Venture Model:
                      </span>
                      <p className="text-xs text-slate-300 leading-snug">
                        {track.venture_idea}
                      </p>
                    </div>
                  )}

                  {toolsList.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {toolsList.map((tool, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-slate-400 border border-white/5"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-mono capitalize">
                    {track.difficulty_level || 'All Levels'}
                  </span>
                  <Link
                    to="/resources"
                    className="text-xs font-bold text-blue-400 hover:text-blue-300 inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Read Guides</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4 Pillars of Venture Building Framework */}
      <section className="container-custom">
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/10 space-y-6 max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest">
              EXECUTION FRAMEWORK
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              The 4 Steps from Skill to Venture
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1.5">
              <span className="text-xs font-mono font-bold text-purple-400">STEP 01</span>
              <h3 className="text-sm font-bold text-white">Select One Skill</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Avoid scattershot learning. Pick one core high-leverage skill and commit for 60 days.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1.5">
              <span className="text-xs font-mono font-bold text-indigo-400">STEP 02</span>
              <h3 className="text-sm font-bold text-white">Build Proof of Work</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Publish 3 publicly verifiable portfolio case studies on GitHub, LinkedIn, and Framer.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1.5">
              <span className="text-xs font-mono font-bold text-blue-400">STEP 03</span>
              <h3 className="text-sm font-bold text-white">Acquire 1st Client</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Reach out to businesses with tailored proposals and deliver undeniable value.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1.5">
              <span className="text-xs font-mono font-bold text-emerald-400">STEP 04</span>
              <h3 className="text-sm font-bold text-white">Delegate & Multiply</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Hire student peers to handle project deliverables and scale into an agency.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
