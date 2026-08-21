import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Award,
  BookOpen,
  Bell,
  Mail,
  FileEdit,
  Settings,
  Image as ImageIcon,
  ShieldCheck,
  UserCheck,
  ExternalLink,
  LogOut,
  Menu,
  X,
  Sparkles,
  Database,
  ChevronRight,
  User,
  Radio,
  Layers,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useContent } from '../../context/ContentContext';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  activeTab?: string;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  title,
  subtitle,
  actions,
  activeTab,
}) => {
  const { user, logout } = useAuth();
  const { unreadContactCount, students, activeAnnouncements } = useContent();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navItems = [
    { id: 'overview', label: 'Overview', path: '/admin', icon: LayoutDashboard },
    {
      id: 'students',
      label: 'Students & Registrations',
      path: '/admin/students',
      icon: Users,
      badge: students.length > 0 ? students.length : undefined,
    },
    { id: 'community', label: 'Creator Community', path: '/admin/community', icon: Award },
    { id: 'programs', label: 'Programs & Tracks', path: '/admin/programs', icon: Layers },
    { id: 'resources', label: 'Resources & Blog', path: '/admin/resources', icon: BookOpen },
    {
      id: 'announcements',
      label: 'Announcements',
      path: '/admin/announcements',
      icon: Bell,
      badge: activeAnnouncements.length > 0 ? activeAnnouncements.length : undefined,
    },
    {
      id: 'enquiries',
      label: 'Contact Enquiries',
      path: '/admin/enquiries',
      icon: Mail,
      badge: unreadContactCount > 0 ? unreadContactCount : undefined,
      badgeColor: 'bg-rose-500 text-white',
    },
    { id: 'website-content', label: 'Website Content CMS', path: '/admin/website-content', icon: FileEdit },
    { id: 'settings', label: 'Settings & Branding', path: '/admin/settings', icon: Settings },
    { id: 'media', label: 'Media Library', path: '/admin/media', icon: ImageIcon },
    { id: 'security', label: 'Security & Audit Logs', path: '/admin/security', icon: ShieldCheck },
    { id: 'profile', label: 'Admin Profile', path: '/admin/profile', icon: UserCheck },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const isCurrentActive = (item: typeof navItems[0]) => {
    if (activeTab) return activeTab === item.id;
    if (item.path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(item.path);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-purple-500/30 selection:text-purple-200">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-white/10 px-4 lg:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link to="/admin" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-black tracking-wider text-white flex items-center gap-1.5">
                <span>THE VISIONEX</span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  CMS ADMIN
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Live sync & user menu */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          {/* Live Sync Status */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/50 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Supabase Realtime</span>
          </div>

          {/* View Live Site Button */}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {/* Admin User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2.5 p-1.5 pr-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold overflow-hidden">
                {user?.avatar_url ? (
                  <img src={user.avatar_url} alt={user.full_name} className="w-full h-full object-cover" />
                ) : (
                  user?.full_name?.charAt(0) || 'A'
                )}
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-xs font-semibold text-white truncate max-w-[120px]">
                  {user?.full_name || 'Admin'}
                </div>
                <div className="text-[10px] text-purple-300 font-mono">Super Admin</div>
              </div>
            </button>

            {userMenuOpen && (
              <div
                className="absolute right-0 mt-2 w-56 rounded-2xl bg-slate-900 border border-white/10 shadow-2xl p-2 z-50 space-y-1 animate-fadeIn"
                onClick={() => setUserMenuOpen(false)}
              >
                <div className="px-3 py-2 border-b border-white/10">
                  <p className="text-xs font-semibold text-white">{user?.full_name}</p>
                  <p className="text-[11px] text-slate-400 font-mono truncate">{user?.email}</p>
                </div>
                <Link
                  to="/admin/profile"
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
                >
                  <User className="w-4 h-4 text-purple-400" />
                  <span>Profile Settings</span>
                </Link>
                <Link
                  to="/admin/security"
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
                >
                  <ShieldCheck className="w-4 h-4 text-purple-400" />
                  <span>Security & Password</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-rose-400 hover:bg-rose-950/40 hover:text-rose-300 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Container with Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex w-64 flex-col border-r border-white/10 bg-slate-950/40 p-4 space-y-1 shrink-0 overflow-y-auto max-h-[calc(100vh-4rem)] custom-scrollbar">
          <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 px-3 py-2">
            Navigation Menu
          </div>
          {navItems.map((item) => {
            const active = isCurrentActive(item);
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  active
                    ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30 shadow-lg shadow-purple-500/10'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${active ? 'text-purple-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                      item.badgeColor || 'bg-purple-500/30 text-purple-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}

          <div className="pt-6 mt-auto">
            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-purple-950/40 to-slate-900 border border-purple-500/20 text-[11px] space-y-1">
              <div className="font-bold text-white flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-purple-400" />
                <span>Single Source of Truth</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                All changes made here update Supabase and reflect instantly on the live site.
              </p>
            </div>
          </div>
        </aside>

        {/* Mobile Sliding Drawer */}
        {mobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <div className="relative w-72 bg-slate-950 border-r border-white/10 p-4 flex flex-col z-10 overflow-y-auto space-y-1">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-2">
                <div className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                  Admin Navigation
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1.5 rounded-lg bg-white/5 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {navItems.map((item) => {
                const active = isCurrentActive(item);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      active
                        ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${active ? 'text-purple-400' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge !== undefined && (
                      <span
                        className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                          item.badgeColor || 'bg-purple-500/30 text-purple-300'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-950/60 max-h-[calc(100vh-4rem)] custom-scrollbar">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header / Breadcrumb / Actions banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <div className="flex items-center gap-1.5 text-xs text-purple-400 font-mono mb-1">
                  <span>Admin</span>
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  <span className="text-slate-300 font-semibold">{title}</span>
                </div>
                <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">{title}</h1>
                {subtitle && <p className="text-xs sm:text-sm text-slate-400 mt-1">{subtitle}</p>}
              </div>

              {actions && <div className="flex items-center gap-2.5 shrink-0">{actions}</div>}
            </div>

            {/* Page Body */}
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
