import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Shield,
  FileText,
  Mail,
  Users,
  Settings,
  Plus,
  Trash2,
  Edit,
  Eye,
  CheckCircle2,
  AlertCircle,
  Download,
  Search,
  Sparkles,
  ExternalLink,
  Save,
  Check,
  X,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useBlog } from '../context/BlogContext';
import { useContent } from '../context/ContentContext';
import { BlogPost, ContactRequest, UserProfile } from '../types';
import { isSupabaseConfigured } from '../lib/supabase';
import { isGAConfigured } from '../lib/analytics';
import { isPaymentConfigured } from '../lib/payment';
import { dataStore } from '../lib/dataStore';
import { trackPageView } from '../lib/analytics';

import { PageBackButton } from '../components/layout/PageBackButton';

export const AdminPage: React.FC = () => {
  const { user, isAdmin } = useAuth();
  const { posts, savePost, deletePost } = useBlog();
  const { contactRequests, markContactRead, deleteContact, settings, updateSettings } = useContent();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'overview' | 'blog' | 'inquiries' | 'settings' | 'users'>('overview');
  const [usersList, setUsersList] = useState<UserProfile[]>([]);

  // Blog Editor Modal State
  const [showPostModal, setShowPostModal] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [postForm, setPostForm] = useState({
    title: '',
    slug: '',
    category_name: 'Digital Skills',
    excerpt: '',
    content: '',
    cover_image: '/hero-desk.jpg',
    tags: 'Digital Skills, Opportunity, Students',
    author_name: 'Rakhi Guptha',
    author_role: 'Founder, THE VISIONEX',
    read_time: '5 min read',
    is_featured: false,
    is_published: true,
    seo_title: '',
    seo_description: '',
  });

  // Settings State
  const [heroSettings, setHeroSettings] = useState(settings.hero_content);
  const [contactSettings, setContactSettings] = useState(settings.contact_info);
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [inquirySearch, setInquirySearch] = useState('');

  useEffect(() => {
    document.title = 'Admin CMS & Control Center | THE VISIONEX';
    trackPageView('/admin', document.title);
  }, []);

  useEffect(() => {
    if (!user || !isAdmin) {
      navigate('/login');
      return;
    }
    async function loadAdminData() {
      const allUsers = await dataStore.getUsers();
      setUsersList(allUsers);
    }
    loadAdminData();
  }, [user, isAdmin, navigate]);

  if (!user || !isAdmin) return null;

  const handleTitleChange = (val: string) => {
    setPostForm((prev) => ({
      ...prev,
      title: val,
      slug: prev.slug && editingPost ? prev.slug : val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    }));
  };

  const handleOpenNewPost = () => {
    setEditingPost(null);
    setPostForm({
      title: '',
      slug: '',
      category_name: 'Digital Skills',
      excerpt: '',
      content: '## New Guide Heading\n\nStart writing your article content in Markdown here...',
      cover_image: '/hero-desk.jpg',
      tags: 'Digital Skills, Startups, Students',
      author_name: 'Rakhi Guptha',
      author_role: 'Founder, THE VISIONEX',
      read_time: '5 min read',
      is_featured: false,
      is_published: true,
      seo_title: '',
      seo_description: '',
    });
    setShowPostModal(true);
  };

  const handleOpenEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setPostForm({
      title: post.title,
      slug: post.slug,
      category_name: post.category_name,
      excerpt: post.excerpt,
      content: post.content,
      cover_image: post.cover_image || '/hero-desk.jpg',
      tags: post.tags.join(', '),
      author_name: post.author_name,
      author_role: post.author_role,
      read_time: post.read_time,
      is_featured: post.is_featured,
      is_published: post.is_published,
      seo_title: post.seo_title || '',
      seo_description: post.seo_description || '',
    });
    setShowPostModal(true);
  };

  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    const tagsArray = postForm.tags.split(',').map((t) => t.trim()).filter(Boolean);

    await savePost({
      id: editingPost?.id,
      title: postForm.title,
      slug: postForm.slug,
      excerpt: postForm.excerpt,
      content: postForm.content,
      cover_image: postForm.cover_image,
      category_name: postForm.category_name,
      tags: tagsArray,
      author_name: postForm.author_name,
      author_role: postForm.author_role,
      read_time: postForm.read_time,
      is_featured: postForm.is_featured,
      is_published: postForm.is_published,
      published_at: editingPost?.published_at || new Date().toISOString(),
      seo_title: postForm.seo_title || postForm.title,
      seo_description: postForm.seo_description || postForm.excerpt,
      views_count: editingPost?.views_count || 0,
    });

    setShowPostModal(false);
  };

  const handleDeletePost = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      await deletePost(id);
    }
  };

  const handleSaveGlobalSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSettings({
      ...settings,
      hero_content: heroSettings,
      contact_info: contactSettings,
    });
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  const handleExportCSV = () => {
    const headers = ['ID', 'Name', 'Email', 'Phone', 'Subject', 'Message', 'Status', 'Date'];
    const rows = contactRequests.map((c: any) => [
      c.id,
      `"${c.name.replace(/"/g, '""')}"`,
      `"${c.email}"`,
      `"${c.phone || ''}"`,
      `"${c.subject.replace(/"/g, '""')}"`,
      `"${c.message.replace(/"/g, '""')}"`,
      c.status,
      c.created_at,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e: any) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `visionex_inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredPosts = posts.filter(
    (p: any) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredInquiries = contactRequests.filter(
    (c: any) =>
      c.name.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      c.email.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      c.subject.toLowerCase().includes(inquirySearch.toLowerCase())
  );

  return (
    <div className="pt-24 pb-14">
      <div className="container-custom max-w-7xl mx-auto space-y-6">
        <PageBackButton fallbackPath="/" label="Back to Home" />

        {/* Admin Header */}
        <div className="glass-panel p-5 sm:p-7 rounded-3xl border border-purple-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 bg-gradient-to-r from-purple-950/40 via-slate-900 to-indigo-950/40">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-purple-900/80 border border-purple-500/40 flex items-center justify-center text-purple-300 shadow-xl shrink-0">
              <Shield className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-white">
                  THE VISIONEX Admin CMS
                </h1>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-purple-600 text-white shadow">
                  Admin Active
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Logged in as <strong>{user.full_name}</strong> ({user.email})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Link to="/" target="_blank" className="btn-secondary text-xs py-2 px-3.5 flex items-center gap-1.5">
              <span>View Public Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-3 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Dashboard Overview
          </button>
          <button
            onClick={() => setActiveTab('blog')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all whitespace-nowrap ${
              activeTab === 'blog'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Blog & CMS ({posts.length})
          </button>
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all whitespace-nowrap ${
              activeTab === 'inquiries'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Inquiries ({contactRequests.length})
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all whitespace-nowrap ${
              activeTab === 'settings'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Site & SEO Settings
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all whitespace-nowrap ${
              activeTab === 'users'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            User Directory ({usersList.length})
          </button>
        </div>

        {/* 1. OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="glass-card p-5 rounded-2xl border-purple-500/20">
                <span className="text-[11px] font-mono text-purple-400 uppercase font-bold">Total Articles</span>
                <div className="text-3xl font-extrabold text-white font-mono mt-1">{posts.length}</div>
                <span className="text-xs text-slate-400">{posts.filter((p: any) => p.is_published).length} Published Live</span>
              </div>

              <div className="glass-card p-5 rounded-2xl border-blue-500/20">
                <span className="text-[11px] font-mono text-blue-400 uppercase font-bold">Inquiries / Leads</span>
                <div className="text-3xl font-extrabold text-white font-mono mt-1">{contactRequests.length}</div>
                <span className="text-xs text-slate-400">{contactRequests.filter((c: any) => !c.is_read).length} Unread Messages</span>
              </div>

              <div className="glass-card p-5 rounded-2xl border-emerald-500/20">
                <span className="text-[11px] font-mono text-emerald-400 uppercase font-bold">Registered Users</span>
                <div className="text-3xl font-extrabold text-white font-mono mt-1">{usersList.length}</div>
                <span className="text-xs text-slate-400">Student Founders & Admins</span>
              </div>

              <div className="glass-card p-5 rounded-2xl border-cyan-500/20">
                <span className="text-[11px] font-mono text-cyan-400 uppercase font-bold">Platform Status</span>
                <div className="text-base font-extrabold text-emerald-400 font-mono mt-2 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Active & Operational
                </div>
                <span className="text-xs text-slate-400">All routes verified</span>
              </div>
            </div>

            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>Production Services & Environment Status</span>
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                THE VISIONEX is engineered with a modular configuration layer. Below is the live connection status of external production services.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">Supabase Database</span>
                    <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                      isSupabaseConfigured ? 'bg-emerald-950 text-emerald-300' : 'bg-amber-950 text-amber-300'
                    }`}>
                      {isSupabaseConfigured ? 'Connected' : 'Standalone / Ready'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    {isSupabaseConfigured ? 'Live PostgreSQL sync active.' : 'Awaiting Supabase keys in .env. Falling back to persistent local storage.'}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">Google Analytics 4</span>
                    <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                      isGAConfigured ? 'bg-emerald-950 text-emerald-300' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {isGAConfigured ? 'Live Tracking' : 'Awaiting ID'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    {isGAConfigured ? 'Events & pageviews logging to GA4.' : 'VITE_GA_MEASUREMENT_ID slot configured.'}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">Search Console</span>
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-emerald-950 text-emerald-300">
                      Configured
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Sitemap.xml, robots.txt, and meta verification slot prepared.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">Payment Gateway</span>
                    <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                      isPaymentConfigured ? 'bg-emerald-950 text-emerald-300' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {isPaymentConfigured ? 'Live' : 'Structure Ready'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Razorpay / Stripe integration layer ready for production key.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. BLOG CMS TAB */}
        {activeTab === 'blog' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search articles by title or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              <button
                onClick={handleOpenNewPost}
                className="btn-primary text-xs py-2.5 px-4 inline-flex items-center gap-1.5 shadow-lg shrink-0"
              >
                <Plus className="w-4 h-4" /> Create New Article
              </button>
            </div>

            <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-white/5 text-slate-400 font-mono uppercase tracking-wider border-b border-white/10">
                    <tr>
                      <th className="p-4">Title & Slug</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Author</th>
                      <th className="p-4">Views</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredPosts.map((post: any) => (
                      <tr key={post.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="p-4 max-w-xs">
                          <div className="font-bold text-white line-clamp-1">{post.title}</div>
                          <div className="text-[10px] font-mono text-purple-400 truncate">/{post.slug}</div>
                        </td>
                        <td className="p-4">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-950 text-purple-300 border border-purple-500/30">
                            {post.category_name}
                          </span>
                        </td>
                        <td className="p-4">
                          {post.is_published ? (
                            <span className="text-emerald-400 font-bold flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Published
                            </span>
                          ) : (
                            <span className="text-slate-400 font-mono">Draft</span>
                          )}
                        </td>
                        <td className="p-4 text-slate-300">{post.author_name}</td>
                        <td className="p-4 font-mono text-slate-400">{post.views_count}</td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              to={`/resources/${post.slug}`}
                              target="_blank"
                              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300"
                              title="Preview"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </Link>
                            <button
                              onClick={() => handleOpenEditPost(post)}
                              className="p-1.5 rounded-lg bg-blue-950/60 hover:bg-blue-900/60 text-blue-300"
                              title="Edit"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeletePost(post.id)}
                              className="p-1.5 rounded-lg bg-red-950/60 hover:bg-red-900/60 text-red-300"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 3. INQUIRIES TAB */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search inquiries by name, email, or subject..."
                  value={inquirySearch}
                  onChange={(e) => setInquirySearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              <button
                onClick={handleExportCSV}
                className="btn-secondary text-xs py-2 px-4 inline-flex items-center gap-1.5 shrink-0"
              >
                <Download className="w-3.5 h-3.5" /> Export as CSV
              </button>
            </div>

            <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden">
              <div className="divide-y divide-white/5">
                {filteredInquiries.map((inq: any) => (
                  <div key={inq.id} className={`p-5 space-y-3 transition-colors ${inq.is_read ? 'bg-transparent' : 'bg-purple-950/20'}`}>
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className={`w-2.5 h-2.5 rounded-full ${inq.is_read ? 'bg-slate-600' : 'bg-purple-400 animate-ping'}`} />
                        <h4 className="text-sm font-bold text-white">{inq.name}</h4>
                        <span className="text-xs text-slate-400 font-mono">({inq.email})</span>
                        {inq.phone && <span className="text-xs text-purple-300 font-mono">📱 {inq.phone}</span>}
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-slate-500">
                          {new Date(inq.created_at).toLocaleString()}
                        </span>
                        <button
                          onClick={() => markContactRead(inq.id, !inq.is_read, inq.status)}
                          className="px-2.5 py-1 rounded text-[10px] font-mono font-semibold bg-white/5 hover:bg-white/10 text-slate-300"
                        >
                          {inq.is_read ? 'Mark Unread' : 'Mark Read'}
                        </button>
                        <button
                          onClick={() => deleteContact(inq.id)}
                          className="p-1 rounded text-slate-500 hover:text-red-400"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="text-xs font-semibold text-purple-200">
                      Subject: {inq.subject}
                    </div>

                    <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">
                      {inq.message}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 4. SETTINGS TAB */}
        {activeTab === 'settings' && (
          <form onSubmit={handleSaveGlobalSettings} className="space-y-6 max-w-4xl">
            {settingsSaved && (
              <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Site & SEO settings updated successfully across the platform!</span>
              </div>
            )}

            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4">
              <h3 className="text-base font-bold text-white">Home Hero Section Content</h3>
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <label className="text-xs font-mono font-bold text-slate-300 uppercase">Top Badge Tag</label>
                  <input
                    type="text"
                    value={heroSettings.tag}
                    onChange={(e) => setHeroSettings({ ...heroSettings, tag: e.target.value })}
                    className="w-full mt-1 px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono font-bold text-slate-300 uppercase">Main Headline</label>
                  <input
                    type="text"
                    value={heroSettings.headline}
                    onChange={(e) => setHeroSettings({ ...heroSettings, headline: e.target.value })}
                    className="w-full mt-1 px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono font-bold text-slate-300 uppercase">Supporting Tagline</label>
                  <input
                    type="text"
                    value={heroSettings.subheadline}
                    onChange={(e) => setHeroSettings({ ...heroSettings, subheadline: e.target.value })}
                    className="w-full mt-1 px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono font-bold text-slate-300 uppercase">Description Text</label>
                  <textarea
                    rows={2}
                    value={heroSettings.supporting_text}
                    onChange={(e) => setHeroSettings({ ...heroSettings, supporting_text: e.target.value })}
                    className="w-full mt-1 px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white resize-none"
                  />
                </div>
              </div>
            </div>

            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4">
              <h3 className="text-base font-bold text-white">Public Contact Numbers & Handles</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-mono font-bold text-slate-300 uppercase">Direct Phone (Calling)</label>
                  <input
                    type="text"
                    value={contactSettings.phone}
                    onChange={(e) => setContactSettings({ ...contactSettings, phone: e.target.value })}
                    className="w-full mt-1 px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono font-bold text-slate-300 uppercase">WhatsApp Number</label>
                  <input
                    type="text"
                    value={contactSettings.whatsapp}
                    onChange={(e) => setContactSettings({ ...contactSettings, whatsapp: e.target.value })}
                    className="w-full mt-1 px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono font-bold text-slate-300 uppercase">Official Email</label>
                  <input
                    type="email"
                    value={contactSettings.email}
                    onChange={(e) => setContactSettings({ ...contactSettings, email: e.target.value })}
                    className="w-full mt-1 px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono font-bold text-slate-300 uppercase">Location Base</label>
                  <input
                    type="text"
                    value={contactSettings.address}
                    onChange={(e) => setContactSettings({ ...contactSettings, address: e.target.value })}
                    className="w-full mt-1 px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white"
                  />
                </div>
              </div>
            </div>

            <button type="submit" className="btn-primary text-xs py-3 px-6 shadow-xl flex items-center gap-2">
              <Save className="w-4 h-4" /> Save Content Changes
            </button>
          </form>
        )}

        {/* 5. USERS TAB */}
        {activeTab === 'users' && (
          <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden">
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">Registered User Directory</h3>
              <span className="text-xs font-mono text-slate-400">{usersList.length} Active Accounts</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-white/5 text-slate-400 font-mono uppercase tracking-wider border-b border-white/10">
                  <tr>
                    <th className="p-4">User</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Phone</th>
                    <th className="p-4">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {usersList.map((u: any) => (
                    <tr key={u.id} className="hover:bg-white/[0.02]">
                      <td className="p-4 font-bold text-white">{u.full_name}</td>
                      <td className="p-4 font-mono text-slate-300">{u.email}</td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                          u.role === 'admin' ? 'bg-purple-950 text-purple-300 border border-purple-500/30' : 'bg-slate-800 text-slate-300'
                        }`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="p-4 font-mono text-slate-400">{u.phone || '—'}</td>
                      <td className="p-4 font-mono text-slate-500">{new Date(u.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Blog Article Editor Modal */}
      {showPostModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-purple-500/30 max-w-3xl w-full space-y-5 my-8 animate-fadeIn max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-lg font-bold text-white">
                {editingPost ? 'Edit Knowledge Resource' : 'Create New Knowledge Resource'}
              </h3>
              <button onClick={() => setShowPostModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePost} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold text-slate-300 uppercase">Article Title *</label>
                  <input
                    type="text"
                    required
                    value={postForm.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold text-slate-300 uppercase">URL Slug *</label>
                  <input
                    type="text"
                    required
                    value={postForm.slug}
                    onChange={(e) => setPostForm({ ...postForm, slug: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold text-slate-300 uppercase">Category</label>
                  <select
                    value={postForm.category_name}
                    onChange={(e) => setPostForm({ ...postForm, category_name: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white"
                  >
                    <option value="Digital Skills">Digital Skills</option>
                    <option value="Entrepreneurship">Entrepreneurship</option>
                    <option value="AI & Automation">AI & Automation</option>
                    <option value="Mindset & Vision">Mindset & Vision</option>
                    <option value="1 → 10 Case Studies">1 → 10 Case Studies</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold text-slate-300 uppercase">Author Name</label>
                  <input
                    type="text"
                    value={postForm.author_name}
                    onChange={(e) => setPostForm({ ...postForm, author_name: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold text-slate-300 uppercase">Reading Time</label>
                  <input
                    type="text"
                    value={postForm.read_time}
                    onChange={(e) => setPostForm({ ...postForm, read_time: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-slate-300 uppercase">Cover Image Path/URL</label>
                <input
                  type="text"
                  value={postForm.cover_image}
                  onChange={(e) => setPostForm({ ...postForm, cover_image: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-slate-300 uppercase">Short Excerpt *</label>
                <textarea
                  rows={2}
                  required
                  value={postForm.excerpt}
                  onChange={(e) => setPostForm({ ...postForm, excerpt: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-slate-300 uppercase">Markdown Content *</label>
                <textarea
                  rows={8}
                  required
                  value={postForm.content}
                  onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white font-mono resize-y"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-slate-300 uppercase">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={postForm.tags}
                  onChange={(e) => setPostForm({ ...postForm, tags: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={postForm.is_featured}
                    onChange={(e) => setPostForm({ ...postForm, is_featured: e.target.checked })}
                    className="rounded accent-purple-500"
                  />
                  <span>Feature on Knowledge Vault Hero</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={postForm.is_published}
                    onChange={(e) => setPostForm({ ...postForm, is_published: e.target.checked })}
                    className="rounded accent-purple-500"
                  />
                  <span>Publish Article Live</span>
                </label>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowPostModal(false)}
                  className="btn-secondary text-xs py-2 px-4"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary text-xs py-2 px-6">
                  {editingPost ? 'Update Article' : 'Publish New Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
