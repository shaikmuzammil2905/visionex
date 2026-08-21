import React, { useState } from 'react';
import {
  Bell,
  Plus,
  Edit2,
  Trash2,
  Eye,
  X,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Calendar,
  CheckCircle2,
  Volume2,
} from 'lucide-react';
import { useContent } from '../../../context/ContentContext';
import { Announcement } from '../../../types';
import { MediaUploader } from '../MediaUploader';
import { ConfirmModal } from '../ConfirmModal';


export const AnnouncementsTab: React.FC = () => {
  const { announcements, saveAnnouncement, deleteAnnouncement } = useContent();

  const [editingAnn, setEditingAnn] = useState<Partial<Announcement> | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [saveLoading, setSaveLoading] = useState(false);

  const handleOpenAdd = () => {
    setEditingAnn({
      title: '🚨 Visionex Digital Incubation Cohort Applications Open',
      description: 'Join the premier student builder movement. Limited spots available for the upcoming cohort.',
      link_url: '/digital-entrepreneurship',
      button_text: 'Explore Tracks',
      announcement_date: new Date().toISOString(),
      is_active: true,
      is_pinned: true,
      display_order: 1,
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAnn || !editingAnn.title) return;

    setSaveLoading(true);
    try {
      await saveAnnouncement(editingAnn as any);
      setEditingAnn(null);
    } catch (err) {
      console.error('Failed to save announcement:', err);
    } finally {
      setSaveLoading(false);
    }
  };

  const handleDelete = async () => {
    if (deletingId) {
      await deleteAnnouncement(deletingId);
      setDeletingId(null);
    }
  };

  const activePinned = announcements.find((a) => a.is_active && a.is_pinned) || announcements.find((a) => a.is_active);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Live Top Banner Simulation */}
      {activePinned && (
        <div className="rounded-2xl bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 border border-purple-500/40 p-4 shadow-xl space-y-2">
          <div className="text-[10px] font-mono uppercase text-purple-400 font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
            <span>Live Website Top Banner Preview</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-950/60 p-3 rounded-xl border border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/30 text-purple-300 flex items-center justify-center shrink-0">
                <Volume2 className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">{activePinned.title}</div>
                <div className="text-[11px] text-slate-300 line-clamp-1">{activePinned.description}</div>
              </div>
            </div>

            {activePinned.link_url && (
              <a
                href={activePinned.link_url}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center justify-center gap-1 shrink-0 transition-colors"
              >
                <span>{activePinned.button_text || 'Learn More'}</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      )}

      {/* Action Bar */}
      <div className="flex items-center justify-between bg-slate-900/60 p-4 rounded-2xl border border-white/10">
        <div>
          <h3 className="text-sm font-bold text-white">Broadcast Alerts</h3>
          <p className="text-xs text-slate-400">Manage real-time notifications and top promotional banners</p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-purple-500/20 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Announcement</span>
        </button>
      </div>

      {/* Announcements List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {announcements.map((ann) => (
          <div
            key={ann.id}
            className={`rounded-2xl bg-slate-900/60 border p-5 flex flex-col justify-between transition-all space-y-4 ${
              ann.is_active
                ? 'border-purple-500/30 shadow-lg shadow-purple-500/5'
                : 'border-white/5 opacity-60'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                      ann.is_active
                        ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {ann.is_active ? 'Live Broadcast' : 'Disabled'}
                  </span>

                  {ann.is_pinned && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      Pinned Top
                    </span>
                  )}
                </div>

                <span className="text-[11px] font-mono text-slate-500">
                  {new Date(ann.announcement_date).toLocaleDateString()}
                </span>
              </div>

              <div>
                <h4 className="text-sm font-bold text-white">{ann.title}</h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">{ann.description}</p>
              </div>

              {ann.link_url && (
                <div className="text-[11px] font-mono text-purple-400 truncate">
                  Target: {ann.link_url} ({ann.button_text || 'Learn More'})
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <button
                type="button"
                onClick={() => saveAnnouncement({ ...ann, is_active: !ann.is_active })}
                className={`text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors ${
                  ann.is_active
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                    : 'bg-emerald-950 text-emerald-400 hover:bg-emerald-900'
                }`}
              >
                {ann.is_active ? 'Deactivate' : 'Set Live'}
              </button>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setEditingAnn(ann)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-purple-600/20 text-slate-300 hover:text-purple-300 transition-colors"
                  title="Edit Announcement"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setDeletingId(ann.id)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-600/20 text-slate-300 hover:text-rose-400 transition-colors"
                  title="Delete Announcement"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {editingAnn && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg bg-slate-900 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setEditingAnn(null)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="border-b border-white/10 pb-3">
              <h3 className="text-lg font-bold text-white">
                {editingAnn.id ? 'Edit Announcement' : 'Create Broadcast Alert'}
              </h3>
              <p className="text-xs text-slate-400">Syncs immediately across all site visitors.</p>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-mono font-bold uppercase text-slate-300">
                  Headline Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingAnn.title || ''}
                  onChange={(e) => setEditingAnn({ ...editingAnn, title: e.target.value })}
                  placeholder="e.g. 🚀 Digital Incubation Cohort Applications Open"
                  className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono font-bold uppercase text-slate-300">
                  Description / Subtext
                </label>
                <textarea
                  rows={2}
                  value={editingAnn.description || ''}
                  onChange={(e) => setEditingAnn({ ...editingAnn, description: e.target.value })}
                  placeholder="Details for the broadcast alert..."
                  className="w-full bg-slate-950/80 border border-white/10 rounded-xl p-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-mono font-bold uppercase text-slate-300">
                    Target Link URL
                  </label>
                  <input
                    type="text"
                    value={editingAnn.link_url || ''}
                    onChange={(e) => setEditingAnn({ ...editingAnn, link_url: e.target.value })}
                    placeholder="/digital-entrepreneurship"
                    className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono font-bold uppercase text-slate-300">
                    Button Label
                  </label>
                  <input
                    type="text"
                    value={editingAnn.button_text || 'Learn More'}
                    onChange={(e) => setEditingAnn({ ...editingAnn, button_text: e.target.value })}
                    placeholder="Explore Tracks"
                    className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingAnn.is_active ?? true}
                    onChange={(e) => setEditingAnn({ ...editingAnn, is_active: e.target.checked })}
                    className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-slate-300 font-semibold">Broadcast Live Now</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingAnn.is_pinned ?? false}
                    onChange={(e) => setEditingAnn({ ...editingAnn, is_pinned: e.target.checked })}
                    className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-slate-300 font-semibold">Pin to Top of Website</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingAnn(null)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saveLoading}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-purple-500/20 disabled:opacity-50 cursor-pointer"
                >
                  {saveLoading ? 'Saving...' : 'Save & Publish'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={Boolean(deletingId)}
        title="Delete Announcement?"
        message="This alert will be removed permanently from the system."
        confirmLabel="Delete Announcement"
        onConfirm={handleDelete}
        onCancel={() => setDeletingId(null)}
      />
    </div>
  );
};
