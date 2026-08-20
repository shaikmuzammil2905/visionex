import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Sparkles, BookOpen, Calendar, Bell, CheckCircle2, TrendingUp, Settings, LogOut, ArrowRight, ShieldCheck } from 'lucide-react';
import { PageBackButton } from '../components/layout/PageBackButton';
import { useAuth } from '../context/AuthContext';
import { useBlog } from '../context/BlogContext';
import { useContent } from '../context/ContentContext';
import { NotificationItem } from '../types';
import { dataStore } from '../lib/dataStore';
import { trackPageView } from '../lib/analytics';

export const DashboardPage: React.FC = () => {
  const { user, logout, updateProfile } = useAuth();
  const { posts } = useBlog();
  const { events, toggleEventRSVP } = useContent();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'overview' | 'learning' | 'saved' | 'events' | 'profile'>('overview');
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [savedPostIds, setSavedPostIds] = useState<string[]>([]);
  const [editBio, setEditBio] = useState(user?.bio || '');
  const [editPhone, setEditPhone] = useState(user?.phone || '');
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    document.title = 'Member Dashboard | THE VISIONEX';
    trackPageView('/dashboard', document.title);
  }, []);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    async function loadUserData() {
      if (!user) return;
      const notifs = await dataStore.getNotifications(user.id);
      const saved = await dataStore.getSavedResources(user.id);
      setNotifications(notifs);
      setSavedPostIds(saved);
    }
    loadUserData();
  }, [user, navigate]);

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile({ bio: editBio, phone: editPhone });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (!user) return null;

  const savedArticles = posts.filter((p: any) => savedPostIds.includes(p.id));

  return (
    <div className="pt-24 pb-14">
      <div className="container-custom max-w-6xl mx-auto space-y-6">
        <PageBackButton fallbackPath="/" label="Back to Home" />

        <div className="glass-panel p-5 sm:p-7 rounded-3xl border border-purple-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 relative overflow-hidden bg-gradient-to-r from-purple-950/40 via-slate-900 to-blue-950/40">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-purple-950 border border-purple-500/40 flex items-center justify-center text-purple-300 font-bold text-xl overflow-hidden shadow-xl shrink-0">
              {user.avatar_url ? (
                <img src={user.avatar_url} alt={user.full_name} className="w-full h-full object-cover" />
              ) : (
                <User className="w-7 h-7" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-lg sm:text-xl font-extrabold text-white">
                  {user.full_name}
                </h1>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-purple-600 text-white shadow">
                  {user.role}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">{user.email}</p>
              <p className="text-xs text-purple-200/90 mt-1 max-w-md line-clamp-1">{user.bio || 'Student Creator at THE VISIONEX'}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-stretch sm:self-auto">
            <Link to="/resources" className="btn-secondary text-xs py-2 px-3.5 flex items-center gap-1.5 flex-1 sm:flex-initial justify-center">
              <BookOpen className="w-3.5 h-3.5" /> Knowledge Vault
            </Link>
            <button
              onClick={handleLogout}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 border-b border-white/10 pb-3 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('learning')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'learning'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Skills Roadmap
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'events'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Events & AMAs ({events.filter((e: any) => e.is_registered).length})
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'saved'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Saved Guides ({savedArticles.length})
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Account Settings
          </button>
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="glass-card p-4 rounded-2xl border-purple-500/20">
                <div className="flex items-center justify-between text-purple-400 mb-1.5">
                  <span className="text-xs font-mono font-bold uppercase">1 → 10 Pipeline</span>
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="text-xl font-extrabold text-white font-mono">Stage 02</div>
                <div className="text-xs text-slate-400 mt-0.5">Skill Building & Prototyping</div>
              </div>

              <div className="glass-card p-4 rounded-2xl border-blue-500/20">
                <div className="flex items-center justify-between text-blue-400 mb-1.5">
                  <span className="text-xs font-mono font-bold uppercase">Workshops Attended</span>
                  <Calendar className="w-4 h-4" />
                </div>
                <div className="text-xl font-extrabold text-white font-mono">
                  {events.filter((e: any) => e.is_registered).length} Reserved
                </div>
                <div className="text-xs text-slate-400 mt-0.5">Next session in 8 days</div>
              </div>

              <div className="glass-card p-4 rounded-2xl border-emerald-500/20">
                <div className="flex items-center justify-between text-emerald-400 mb-1.5">
                  <span className="text-xs font-mono font-bold uppercase">Community Rank</span>
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div className="text-xl font-extrabold text-white font-mono">Creator Apprentice</div>
                <div className="text-xs text-slate-400 mt-0.5">Verified Member Status</div>
              </div>
            </div>

            <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-white">
                <Bell className="w-4 h-4 text-purple-400" />
                <span>Recent Updates & Announcements</span>
              </div>
              <div className="space-y-2">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-start gap-2.5 text-xs"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-white">{n.title}</div>
                      <div className="text-slate-400 mt-0.5">{n.message}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'learning' && (
          <div className="glass-panel p-5 sm:p-7 rounded-3xl border border-white/10 space-y-5">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">Student Creator Milestones</h3>
              <p className="text-xs text-slate-400">Track your progress toward launching your first independent digital offer.</p>
            </div>

            <div className="space-y-3">
              {[
                { title: 'Foundational Digital Fluency', progress: 100, desc: 'Understanding online business architectures and AI capabilities.' },
                { title: 'High-Income Skill Specialization', progress: 65, desc: 'Deep dive into full-stack web development or automated workflow design.' },
                { title: 'Personal Brand Asset Launch', progress: 40, desc: 'Publishing proof of work and portfolio projects on GitHub & LinkedIn.' },
                { title: 'First Client Acquisition / Product Sale', progress: 20, desc: 'Closing initial legitimate paying engagements.' },
                { title: '1 → 10 Delegation & Peer Hiring', progress: 0, desc: 'Employing student peers to handle project deliverables.' },
              ].map((m, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-white">{m.title}</span>
                    <span className="font-mono text-purple-300">{m.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-500"
                      style={{ width: `${m.progress}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-400">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'events' && (
          <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-white">Your Scheduled Workshops</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {events.map((evt: any) => (
                <div key={evt.id} className="glass-card p-4 sm:p-5 rounded-2xl border border-white/10 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-blue-950 text-blue-300">
                        {evt.location_type}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        {new Date(evt.event_date).toLocaleDateString()}
                      </span>
                    </div>
                    <h4 className="text-sm sm:text-base font-bold text-white">{evt.title}</h4>
                    <p className="text-xs text-slate-400">{evt.description}</p>
                  </div>
                  <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs text-purple-300 font-mono">Host: {evt.host_name}</span>
                    <button
                      onClick={() => toggleEventRSVP(evt.id)}
                      className={`text-xs py-1.5 px-3 rounded-lg font-semibold ${
                        evt.is_registered ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30' : 'btn-primary'
                      }`}
                    >
                      {evt.is_registered ? '✓ Reserved' : 'RSVP Free'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'saved' && (
          <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-white">Your Bookmarked Resources</h3>
            {savedArticles.length === 0 ? (
              <div className="glass-panel p-6 text-center rounded-2xl space-y-2">
                <p className="text-xs text-slate-400">You haven't bookmarked any guides yet.</p>
                <Link to="/resources" className="btn-primary text-xs py-2 px-4 inline-flex items-center gap-1">
                  Explore Knowledge Vault <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedArticles.map((art: any) => (
                  <div key={art.id} className="glass-card p-4 sm:p-5 rounded-2xl border border-white/10 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-purple-400">{art.category_name}</span>
                      <h4 className="text-sm font-bold text-white mt-1">{art.title}</h4>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">{art.excerpt}</p>
                    </div>
                    <Link to={`/resources/${art.slug}`} className="text-xs font-bold text-blue-400 mt-3 inline-flex items-center gap-1">
                      Read Guide <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="glass-panel p-5 sm:p-7 rounded-3xl border border-white/10 max-w-xl mx-auto space-y-5">
            <h3 className="text-base sm:text-lg font-bold text-white">Edit Profile Details</h3>
            {saveSuccess && (
              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Profile updated successfully!</span>
              </div>
            )}
            <form onSubmit={handleProfileSave} className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-[11px] font-mono font-bold text-slate-300 uppercase">Bio / Creator Statement</label>
                <textarea
                  rows={3}
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 resize-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-mono font-bold text-slate-300 uppercase">Phone Number</label>
                <input
                  type="tel"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                />
              </div>
              <button type="submit" className="btn-primary w-full text-xs py-2.5 justify-center">
                Save Profile Changes
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
