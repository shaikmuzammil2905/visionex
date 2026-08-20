import React, { useEffect, useState } from 'react';
import { Users, Sparkles, Calendar, MessageSquare, ArrowRight, CheckCircle2, Shield, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageBackButton } from '../components/layout/PageBackButton';
import { useContent } from '../context/ContentContext';
import { useAuth } from '../context/AuthContext';
import { trackPageView, analytics } from '../lib/analytics';

export const CommunityPage: React.FC = () => {
  const { members, events, toggleEventRSVP } = useContent();
  const { user } = useAuth();
  const [searchMember, setSearchMember] = useState('');

  useEffect(() => {
    document.title = 'Community | THE VISIONEX - Student Creators & Builders';
    trackPageView('/community', document.title);
  }, []);

  const filteredMembers = members.filter((m: any) =>
    m.display_name.toLowerCase().includes(searchMember.toLowerCase()) ||
    m.headline.toLowerCase().includes(searchMember.toLowerCase()) ||
    m.skills.some((s: string) => s.toLowerCase().includes(searchMember.toLowerCase()))
  );

  return (
    <div className="pt-24 pb-14 space-y-12 sm:space-y-14">
      {/* Top Back Button & Hero */}
      <section className="container-custom">
        <PageBackButton />
        <div className="text-center max-w-3xl mx-auto space-y-3 pt-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-950/60 border border-violet-500/40 text-xs font-mono font-bold text-violet-300 uppercase tracking-widest">
            <Users className="w-3.5 h-3.5 text-violet-400" />
            <span>CREATOR COMMUNITY</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Where Ambitious Students Connect, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-400 to-blue-400">
              Collaborate & Build Ventures
            </span>
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed">
            You don't have to build alone. Join a vibrant peer network of student founders, full-stack builders, AI tinkerers, and creators supporting each other's journey.
          </p>

          <div className="pt-2 flex items-center justify-center gap-3">
            <Link
              to="/register"
              onClick={() => analytics.trackJoinCommunity('community_hero')}
              className="btn-primary text-xs sm:text-sm py-2.5 px-6 shadow-xl"
            >
              <Sparkles className="w-4 h-4 text-purple-200" />
              <span>Join The Community Free</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Community Statistics Bar */}
      <section className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto">
          <div className="glass-card p-5 text-center border-purple-500/20">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">1,200+</div>
            <div className="text-[10px] sm:text-xs text-slate-400 mt-1 uppercase font-mono tracking-wider">Student Builders</div>
          </div>
          <div className="glass-card p-5 text-center border-blue-500/20">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">45+</div>
            <div className="text-[10px] sm:text-xs text-slate-400 mt-1 uppercase font-mono tracking-wider">Live Ventures</div>
          </div>
          <div className="glass-card p-5 text-center border-emerald-500/20">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">15+</div>
            <div className="text-[10px] sm:text-xs text-slate-400 mt-1 uppercase font-mono tracking-wider">Virtual AMAs</div>
          </div>
          <div className="glass-card p-5 text-center border-cyan-500/20">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">100%</div>
            <div className="text-[10px] sm:text-xs text-slate-400 mt-1 uppercase font-mono tracking-wider">Peer Support</div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Calendar with RSVP */}
      <section className="container-custom space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 max-w-5xl mx-auto">
          <div>
            <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest">
              COMMUNITY SESSIONS
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Upcoming Workshops & AMAs
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {events.map((evt: any) => (
            <div
              key={evt.id}
              className="glass-card p-5 sm:p-6 rounded-2xl border border-white/10 hover:border-purple-500/30 transition-all flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-blue-950/80 text-blue-300 border border-blue-500/30">
                    {evt.location_type.toUpperCase()} WORKSHOP
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {new Date(evt.event_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                  {evt.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {evt.description}
                </p>

                <div className="text-xs text-purple-300 font-mono">
                  Host: <strong className="text-white">{evt.host_name}</strong>
                </div>
              </div>

              <div className="pt-4 mt-3 border-t border-white/10 flex items-center justify-between flex-wrap gap-2">
                <span className="text-xs text-slate-400 font-mono">
                  {evt.registered_count}/{evt.max_seats} reserved
                </span>

                <button
                  onClick={() => toggleEventRSVP(evt.id)}
                  className={`text-xs py-1.5 px-3.5 rounded-lg font-semibold transition-all ${
                    evt.is_registered
                      ? 'bg-emerald-950 border border-emerald-500/40 text-emerald-300'
                      : 'btn-primary'
                  }`}
                >
                  {evt.is_registered ? '✓ Reserved' : 'RSVP Free'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Member Directory */}
      <section className="container-custom space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 max-w-5xl mx-auto">
          <div>
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
              DIRECTORY
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Student Creators Spotlight
            </h2>
          </div>
          <input
            type="text"
            placeholder="Search by skill or name..."
            value={searchMember}
            onChange={(e) => setSearchMember(e.target.value)}
            className="px-3.5 py-1.5 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 w-full sm:w-60"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {filteredMembers.map((member: any) => (
            <div
              key={member.id}
              className="glass-card p-5 rounded-2xl border border-white/10 flex flex-col justify-between group hover:border-purple-500/30 transition-all space-y-3"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <img
                    src={member.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'}
                    alt={member.display_name}
                    className="w-11 h-11 rounded-xl object-cover border border-purple-500/30 shrink-0"
                  />
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors truncate">
                      {member.display_name}
                    </h4>
                    <span className="text-[11px] text-slate-400 block truncate">
                      {member.headline}
                    </span>
                  </div>
                </div>

                {member.venture_name && (
                  <div className="text-[11px] font-mono text-purple-300 bg-purple-950/40 px-2.5 py-1 rounded border border-purple-500/20 truncate">
                    Venture: {member.venture_name}
                  </div>
                )}

                <div className="flex flex-wrap gap-1">
                  {member.skills.map((skill: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 border border-white/5 text-slate-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1 text-[11px]">
                  <MapPin className="w-3 h-3 text-slate-500" />
                  {member.location || 'India'}
                </span>
                <span className="text-purple-400 font-mono text-[10px]">Verified Creator</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
