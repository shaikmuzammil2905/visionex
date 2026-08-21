import React from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Layers,
  BookOpen,
  Mail,
  Bell,
  Award,
  Sparkles,
  ArrowUpRight,
  Database,
  CloudUpload,
  CheckCircle2,
  Clock,
  ShieldAlert,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { useContent } from '../../../context/ContentContext';
import { useBlog } from '../../../context/BlogContext';
import { useAuth } from '../../../context/AuthContext';


export const OverviewTab: React.FC = () => {
  const { user } = useAuth();
  const {
    students,
    programs,
    announcements,
    contactRequests,
    unreadContactCount,
    members,
    activityLogs,
    activeAnnouncements,
  } = useContent();
  const { posts } = useBlog();

  const publishedProgramsCount = programs.filter((p) => p.status === 'published').length;
  const publishedPostsCount = posts.filter((p) => p.is_published).length;

  const stats = [
    {
      label: 'Total Registered Students',
      value: students.length,
      change: '+100% Verified',
      icon: Users,
      color: 'from-blue-600 to-indigo-600',
      link: '/admin/students',
    },
    {
      label: 'Active Programs & Tracks',
      value: `${publishedProgramsCount} / ${programs.length}`,
      change: 'Live Cohorts',
      icon: Layers,
      color: 'from-purple-600 to-pink-600',
      link: '/admin/programs',
    },
    {
      label: 'Knowledge Vault Articles',
      value: `${publishedPostsCount} / ${posts.length}`,
      change: 'Published CMS',
      icon: BookOpen,
      color: 'from-emerald-600 to-teal-600',
      link: '/admin/resources',
    },
    {
      label: 'Unread Enquiries',
      value: unreadContactCount,
      change: `${contactRequests.length} Total Enquiries`,
      icon: Mail,
      color: unreadContactCount > 0 ? 'from-rose-600 to-orange-600' : 'from-slate-700 to-slate-800',
      link: '/admin/enquiries',
    },
    {
      label: 'Active Announcements',
      value: activeAnnouncements.length,
      change: 'Top Broadcasts',
      icon: Bell,
      color: 'from-amber-600 to-yellow-600',
      link: '/admin/announcements',
    },
    {
      label: 'Creator Spotlight',
      value: members.length,
      change: 'Community Builders',
      icon: Award,
      color: 'from-cyan-600 to-blue-600',
      link: '/admin/community',
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-950/80 via-slate-900 to-slate-950 border border-purple-500/30 p-6 sm:p-8">
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE VISIONEX Control Center</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-black text-white tracking-tight">
              Welcome back, {user?.full_name?.split(' ')[0] || 'Admin'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Manage website content, track student registrations, broadcast announcements, and monitor inquiries in real-time.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              to="/admin/programs"
              className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-purple-500/20 transition-all cursor-pointer"
            >
              <Layers className="w-4 h-4" />
              <span>Manage Programs</span>
            </Link>
            <Link
              to="/admin/website-content"
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white text-xs font-bold flex items-center gap-2 transition-all cursor-pointer"
            >
              <span>Edit Website CMS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Link
              key={i}
              to={stat.link}
              className="group p-5 rounded-2xl bg-slate-900/60 hover:bg-slate-900 border border-white/10 hover:border-purple-500/40 transition-all shadow-lg flex flex-col justify-between"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="text-[11px] font-mono font-semibold text-slate-400 uppercase tracking-wider">
                    {stat.label}
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white group-hover:text-purple-300 transition-colors">
                    {stat.value}
                  </div>
                </div>
                <div
                  className={`w-11 h-11 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-white/5 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono text-[11px]">{stat.change}</span>
                <span className="text-purple-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>View</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Launch & System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Students */}
        <div className="lg:col-span-2 rounded-2xl bg-slate-900/60 border border-white/10 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-400" />
                <span>Recent Student Registrations</span>
              </h3>
              <p className="text-xs text-slate-400">Latest applicants joining the Visionex community</p>
            </div>
            <Link
              to="/admin/students"
              className="text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {students.length === 0 ? (
            <div className="p-8 text-center rounded-xl bg-slate-950/60 border border-white/5 space-y-2">
              <p className="text-xs text-slate-400">No student registrations submitted yet.</p>
              <p className="text-[11px] text-slate-500">Students who register via /register will appear here instantly.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {students.slice(0, 5).map((student) => (
                <div
                  key={student.id}
                  className="p-3 rounded-xl bg-slate-950/60 border border-white/5 hover:border-white/15 flex items-center justify-between gap-3 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-purple-950 border border-purple-500/30 text-purple-300 flex items-center justify-center font-bold text-xs shrink-0">
                      {student.full_name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-white truncate">{student.full_name}</div>
                      <div className="text-[11px] text-slate-400 font-mono truncate">{student.email} • {student.college_name || 'Student'}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
                      {student.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Backend & Cloud Connectivity Status */}
        <div className="rounded-2xl bg-slate-900/60 border border-white/10 p-5 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Database className="w-4 h-4 text-emerald-400" />
              <span>Backend Architecture</span>
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-xl bg-slate-950/80 border border-white/5 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Supabase Database</span>
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400">Connected</span>
                </div>
                <p className="text-[11px] text-slate-400 font-mono truncate">
                  https://egvgbyndpuftsodvrkno.supabase.co
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-white/5 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <CloudUpload className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Cloudinary Media CDN</span>
                  </span>
                  <span className="text-[10px] font-mono text-cyan-400">Ready</span>
                </div>
                <p className="text-[11px] text-slate-400 font-mono truncate">
                  Cloud: gnev4tey • Preset: ml_default
                </p>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <Link
              to="/admin/security"
              className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>View Audit Logs & Security</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
