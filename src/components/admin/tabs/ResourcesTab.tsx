import React, { useState } from 'react';
import {
  BookOpen,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  CheckCircle2,
  Sparkles,
  Save,
  X,
  ExternalLink,
  FileText,
} from 'lucide-react';
import { useBlog } from '../../../context/BlogContext';
import { BlogPost } from '../../../types';
import { MediaUploader } from '../MediaUploader';
import { ConfirmModal } from '../ConfirmModal';

export const ResourcesTab: React.FC = () => {
  const { posts, categories, savePost, deletePost } = useBlog();

  const [search, setSearch] = useState('');
  const [editingPost, setEditingPost] = useState<Partial<BlogPost> | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [tagInput, setTagInput] = useState('');
  const [activeEditorTab, setActiveEditorTab] = useState<'edit' | 'preview'>('edit');
  const [saveLoading, setSaveLoading] = useState(false);

  const filteredPosts = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      (p.category_name || p.category || '').toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenAdd = () => {
    setEditingPost({
      title: '',
      slug: '',
      excerpt: '',
      content: '## Overview\n\nWrite your insights, venture breakdowns, or strategic student blueprints here.\n\n### Key Takeaways\n- Point 1\n- Point 2\n- Point 3',
      category: categories[0]?.name || 'Student Entrepreneurship',
      category_name: categories[0]?.name || 'Student Entrepreneurship',
      author_name: 'Rakhi Guptha ("Rakesh Voruganti")',
      cover_image: '',
      read_time: '5 min read',
      tags: ['Student Builders', 'Visionex', 'Opportunity Creators'],
      is_featured: false,
      is_published: true,
      status: 'published',
    });
    setTagInput('');
    setActiveEditorTab('edit');
  };

  const handleTitleChange = (val: string) => {
    if (!editingPost) return;
    const slug = val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    setEditingPost({
      ...editingPost,
      title: val,
      slug: editingPost.id ? editingPost.slug : slug,
    });
  };

  const handleAddTag = () => {
    if (!tagInput.trim() || !editingPost) return;
    const currentTags = editingPost.tags || [];
    if (!currentTags.includes(tagInput.trim())) {
      setEditingPost({
        ...editingPost,
        tags: [...currentTags, tagInput.trim()],
      });
    }
    setTagInput('');
  };

  const handleRemoveTag = (tagToRemove: string) => {
    if (!editingPost) return;
    setEditingPost({
      ...editingPost,
      tags: (editingPost.tags || []).filter((t) => t !== tagToRemove),
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost || !editingPost.title || !editingPost.slug) return;

    setSaveLoading(true);
    try {
      await savePost({
        id: editingPost.id,
        title: editingPost.title,
        slug: editingPost.slug,
        excerpt: editingPost.excerpt || '',
        content: editingPost.content || '',
        category_id: editingPost.category_id,
        category: editingPost.category_name || editingPost.category || 'Digital Skills',
        category_name: editingPost.category_name || editingPost.category || 'Digital Skills',
        tags: editingPost.tags || ['Student Skills'],
        author_name: editingPost.author_name || 'Rakhi Guptha',
        author_role: editingPost.author_role || 'Founder, THE VISIONEX',
        cover_image: editingPost.cover_image || '',
        video_url: editingPost.video_url || '',
        read_time: editingPost.read_time || '5 min read',
        is_featured: Boolean(editingPost.is_featured),
        is_published: Boolean(editingPost.is_published),
        status: editingPost.is_published ? 'published' : 'draft',
        published_at: editingPost.published_at || new Date().toISOString(),
        views_count: editingPost.views_count || 0,
      });
      setEditingPost(null);
    } catch (err) {
      console.error('Failed to save post:', err);
    } finally {
      setSaveLoading(false);
    }
  };

  const handleDelete = async () => {
    if (deletingId) {
      await deletePost(deletingId);
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Controls */}
      <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-950/80 border border-purple-500/40 text-purple-400 flex items-center justify-center shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Knowledge Vault & Blog CMS</h3>
            <p className="text-xs text-slate-400">
              {posts.length} articles published • Markdown & Cloudinary integration
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles..."
              className="w-full bg-slate-950 border border-white/10 rounded-xl pl-9 pr-3.5 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
            />
          </div>

          <button
            type="button"
            onClick={handleOpenAdd}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-purple-500/20 transition-all shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Write Article</span>
          </button>
        </div>
      </div>

      {/* Articles Grid */}
      {filteredPosts.length === 0 ? (
        <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-12 text-center text-slate-400 space-y-2">
          <FileText className="w-10 h-10 mx-auto text-slate-600 mb-1" />
          <p className="text-sm font-semibold text-slate-300">No articles match your query</p>
          <p className="text-xs text-slate-500">Click Write Article above to publish a new post.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-slate-900/60 border border-white/10 hover:border-purple-500/40 rounded-3xl p-5 space-y-4 transition-all group flex flex-col justify-between shadow-xl"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                      post.is_published
                        ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30'
                        : 'bg-amber-950/80 text-amber-300 border border-amber-500/30'
                    }`}
                  >
                    {post.is_published ? 'Published' : 'Draft'}
                  </span>

                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-purple-500/10 text-purple-300 border border-purple-500/20 truncate max-w-[140px]">
                    {post.category_name || post.category || 'Digital Skills'}
                  </span>
                </div>

                {post.cover_image && (
                  <div className="w-full h-32 rounded-xl overflow-hidden bg-black/40 border border-white/5">
                    <img
                      src={post.cover_image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                <h4 className="text-sm font-bold text-white line-clamp-1 group-hover:text-purple-300 transition-colors">
                  {post.title}
                </h4>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>{post.read_time || '5 min read'}</span>
                  <span>{new Date(post.created_at || Date.now()).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <a
                  href={`/resources/${post.slug}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                >
                  <span>Preview</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingPost(post);
                      setActiveEditorTab('edit');
                    }}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                    title="Edit Article"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeletingId(post.id)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-600/20 text-slate-300 hover:text-rose-400 transition-colors cursor-pointer"
                    title="Delete Article"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Editor Modal */}
      {editingPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl overflow-y-auto flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-purple-950 border border-purple-500/30 text-purple-400 flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">
                    {editingPost.id ? 'Edit Resource Guide' : 'Draft New Resource Guide'}
                  </h3>
                  <p className="text-xs text-slate-400">Content editor with live markdown preview.</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center p-0.5 rounded-xl bg-slate-950 border border-white/10">
                  <button
                    type="button"
                    onClick={() => setActiveEditorTab('edit')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      activeEditorTab === 'edit' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Editor
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveEditorTab('preview')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      activeEditorTab === 'preview' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Preview
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setEditingPost(null)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-mono font-bold uppercase text-slate-300">
                    Guide Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingPost.title || ''}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. 0 to $1,000 as a Student Builder"
                    className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono font-bold uppercase text-slate-300">
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingPost.slug || ''}
                    onChange={(e) => setEditingPost({ ...editingPost, slug: e.target.value })}
                    placeholder="0-to-1000-student-builder"
                    className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3.5 py-2.5 text-white font-mono focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="font-mono font-bold uppercase text-slate-300">
                    Category
                  </label>
                  <input
                    type="text"
                    value={editingPost.category_name || editingPost.category || 'Digital Skills'}
                    onChange={(e) =>
                      setEditingPost({
                        ...editingPost,
                        category: e.target.value,
                        category_name: e.target.value,
                      })
                    }
                    placeholder="Category"
                    className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono font-bold uppercase text-slate-300">
                    Read Time
                  </label>
                  <input
                    type="text"
                    value={editingPost.read_time || ''}
                    onChange={(e) => setEditingPost({ ...editingPost, read_time: e.target.value })}
                    placeholder="5 min read"
                    className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3.5 py-2.5 text-white font-mono focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono font-bold uppercase text-slate-300">
                    Author
                  </label>
                  <input
                    type="text"
                    value={editingPost.author_name || 'Rakhi Guptha'}
                    onChange={(e) => setEditingPost({ ...editingPost, author_name: e.target.value })}
                    className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-mono font-bold uppercase text-slate-300">
                  Short Excerpt *
                </label>
                <textarea
                  rows={2}
                  required
                  value={editingPost.excerpt || ''}
                  onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                  placeholder="Summary of this article..."
                  className="w-full bg-slate-950/80 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              {/* Cover Art Cloudinary */}
              <MediaUploader
                label="Cover Image (Cloudinary CDN)"
                currentUrl={editingPost.cover_image}
                onUploadSuccess={(url) => setEditingPost({ ...editingPost, cover_image: url })}
              />

              {/* Editor vs Preview */}
              {activeEditorTab === 'edit' ? (
                <div className="space-y-1.5">
                  <label className="font-mono font-bold uppercase text-slate-300">
                    Article Content (Markdown Supported) *
                  </label>
                  <textarea
                    rows={10}
                    required
                    value={editingPost.content || ''}
                    onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                    placeholder="## Introduction&#10;&#10;Write article content here..."
                    className="w-full bg-slate-950/90 border border-white/10 rounded-xl p-4 text-white font-mono text-xs focus:outline-none focus:border-purple-500 custom-scrollbar"
                  />
                </div>
              ) : (
                <div className="p-5 rounded-2xl bg-slate-950/90 border border-white/10 text-slate-200 prose prose-invert max-w-none min-h-[220px]">
                  <div className="font-mono text-[10px] text-purple-400 mb-2 uppercase tracking-widest">
                    --- LIVE PREVIEW ---
                  </div>
                  <h1 className="text-xl font-bold text-white mb-2">{editingPost.title || 'Untitled'}</h1>
                  <p className="text-slate-400 text-xs mb-4 italic">{editingPost.excerpt}</p>
                  <div className="text-xs whitespace-pre-wrap leading-relaxed">
                    {editingPost.content || 'No content written yet.'}
                  </div>
                </div>
              )}

              {/* Tags */}
              <div className="space-y-1.5">
                <label className="font-mono font-bold uppercase text-slate-300">
                  Tags & Badges
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                    placeholder="Add a tag and press Enter"
                    className="flex-1 bg-slate-950/80 border border-white/10 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-purple-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold cursor-pointer"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {(editingPost.tags || []).map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1.5"
                    >
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="text-slate-400 hover:text-white"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingPost.is_published}
                    onChange={(e) => setEditingPost({ ...editingPost, is_published: e.target.checked })}
                    className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-white font-semibold">Publish Live immediately</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingPost.is_featured}
                    onChange={(e) => setEditingPost({ ...editingPost, is_featured: e.target.checked })}
                    className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-white font-semibold">Mark as Featured Guide</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingPost(null)}
                  className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saveLoading}
                  className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold flex items-center gap-2 shadow-lg shadow-purple-500/20 cursor-pointer disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{saveLoading ? 'Saving...' : 'Save & Sync'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={Boolean(deletingId)}
        title="Delete Resource Guide?"
        message="This article will be removed from the Knowledge Vault and all public resource routes."
        confirmLabel="Delete Article"
        onConfirm={handleDelete}
        onCancel={() => setDeletingId(null)}
      />
    </div>
  );
};
