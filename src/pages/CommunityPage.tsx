import React, { useEffect, useState } from 'react';
import { Users, Sparkles, Calendar, MessageSquare, ArrowRight, CheckCircle2, Shield, MapPin, ExternalLink, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
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
    <div className="pt-28 pb-20 space-y-20">
      {/* Hero */}
      <section className="container-custom text-center max-w-4xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-950/60 border border-violet-500/40 text-xs font-mono font-bold text-violet-300 uppercase tracking-widest">
          <Users className="w-3.5 h-3.5 text-violet-400" />
          <span>CREATOR COMMUNITY</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
          Where Ambitious Students Connect, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-400 to-blue-400">
            Collaborate & Build Ventures
          </span>
        </h1>

        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          You don't have to build alone. Join a vibrant peer network of student founders, full-stack builders, AI tinkerers, and digital creators supporting each other's 1 → 10 journey.
        </p>

        <div className="pt-2 flex items-center justify-center gap-3">
          <Link
            to="/register"
            onClick={() => analytics.trackJoinCommunity('community_hero')}
            className="btn-primary text-sm py-3 px-8 shadow-xl"
          >
            <Sparkles className="w-4 h-4 text-purple-200" />
            <span>Join The Community Free</span>
          </Link>
        </div>
      </section>

      {/* Community Statistics Bar */}
      <section className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          <div className="glass-card p-6 text-center border-purple-500/20">
            <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono">1,200+</div>
            <div className="text-xs text-slate-400 mt-1 uppercase font-mono tracking-wider">Student Builders</div>
          </div>
          <div className="glass-card p-6 text-center border-blue-500/20">
            <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono">45+</div>
            <div className="text-xs text-slate-400 mt-1 uppercase font-mono tracking-wider">Live Ventures</div>
          </div>
          <div className="glass-card p-6 text-center border-emerald-500/20">
            <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono">15+</div>
            <div className="text-xs text-slate-400 mt-1 uppercase font-mono tracking-wider">Virtual AMAs</div>
          </div>
          <div className="glass-card p-6 text-center border-cyan-500/20">
            <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono">100%</div>
            <div className="text-xs text-slate-400 mt-1 uppercase font-mono tracking-wider">Peer Collaboration</div>
          </div>
        </div>
      </section>

      {/* Member Benefits */}
      <section className="container-custom space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest">
            EXCLUSIVE ADVANTAGES
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            What You Unlock as a Member
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="glass-card p-6 rounded-2xl border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Calendar className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Live Founder AMAs & Masterclasses</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Interactive sessions with Rakhi Guptha and operating founders breaking down sales, product building, and client delivery.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-950/80 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Peer Co-Founder Matching</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Pair up with complementary student talent (developers, designers, marketers) to build joint micro-ventures faster.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Private Discussion Groups</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Dedicated channels for feedback, pitch reviews, client troubleshooting, and portfolio critiques.
            </p>
          </div>
        </div>
      </section>

      {/* Upcoming Events Calendar with RSVP */}
      <section className="container-custom space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 max-w-5xl mx-auto">
          <div>
            <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest">
              COMMUNITY EVENTS
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Upcoming Workshops & Sessions
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {events.map((evt: any) => (
            <div
              key={evt.id}
              className="glass-card p-6 rounded-2xl border border-white/10 hover:border-purple-500/30 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded text-[10px] font-mono font-bold uppercase bg-blue-950/80 text-blue-300 border border-blue-500/30">
                    {evt.location_type.toUpperCase()} WORKSHOP
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {new Date(evt.event_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white leading-snug">
                  {evt.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {evt.description}
                </p>

                <div className="text-xs text-purple-300 font-mono">
                  Host: <strong className="text-white">{evt.host_name}</strong>
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-white/10 flex items-center justify-between flex-wrap gap-2">
                <span className="text-xs text-slate-400 font-mono">
                  {evt.registered_count} seats reserved / {evt.max_seats}
                </span>

                <button
                  onClick={() => toggleEventRSVP(evt.id)}
                  className={`text-xs py-2 px-4 rounded-lg font-semibold transition-all ${
                    evt.is_registered
                      ? 'bg-emerald-950 border border-emerald-500/40 text-emerald-300'
                      : 'btn-primary'
                  }`}
                >
                  {evt.is_registered ? '✓ Reserved Your Spot' : 'Reserve Free Spot'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Member Directory Spotlight */}
      <section className="container-custom space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 max-w-5xl mx-auto">
          <div>
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
              DIRECTORY
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Student Creators Spotlight
            </h2>
          </div>
          <input
            type="text"
            placeholder="Search by skill or name..."
            value={searchMember}
            onChange={(e) => setSearchMember(e.target.value)}
            className="px-4 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 w-full sm:w-64"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {filteredMembers.map((member: any) => (
            <div
              key={member.id}
              className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col justify-between group hover:border-purple-500/30 transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3.5">
                  <img
                    src={member.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'}
                    alt={member.display_name}
                    className="w-12 h-12 rounded-xl object-cover border border-purple-500/30"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                      {member.display_name}
                    </h4>
                    <span className="text-[11px] text-slate-400 block line-clamp-1">
                      {member.headline}
                    </span>
                  </div>
                </div>

                {member.venture_name && (
                  <div className="text-xs font-mono text-purple-300 bg-purple-950/40 px-2.5 py-1 rounded border border-purple-500/20">
                    Venture: {member.venture_name}
                  </div>
                )}

                <div className="flex flex-wrap gap-1.5 pt-1">
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

              <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1">
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
