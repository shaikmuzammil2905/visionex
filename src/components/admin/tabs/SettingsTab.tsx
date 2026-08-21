import React, { useState } from 'react';
import {
  Settings,
  Globe,
  User,
  Share2,
  Save,
  CheckCircle2,
  Plus,
  Trash2,
  Edit2,
  ExternalLink,
  Shield,
} from 'lucide-react';
import { useContent } from '../../../context/ContentContext';
import { SiteSettings, SocialLink } from '../../../types';
import { MediaUploader } from '../MediaUploader';


export const SettingsTab: React.FC = () => {
  const { settings, updateSettings, socialLinks, saveSocialLink, deleteSocialLink } = useContent();

  const [settingsDraft, setSettingsDraft] = useState<SiteSettings>(settings);
  const [editingSocial, setEditingSocial] = useState<Partial<SocialLink> | null>(null);
  const [saveLoading, setSaveLoading] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  React.useEffect(() => {
    setSettingsDraft(settings);
  }, [settings]);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveLoading(true);
    try {
      await updateSettings(settingsDraft);
      setSuccessToast('Global settings updated and synced successfully!');
      setTimeout(() => setSuccessToast(null), 3000);
    } catch (err) {
      console.error('Failed to save settings:', err);
    } finally {
      setSaveLoading(false);
    }
  };

  const handleSaveSocial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSocial || !editingSocial.platform || !editingSocial.url) return;
    try {
      await saveSocialLink(editingSocial as any);
      setEditingSocial(null);
    } catch (err) {
      console.error('Failed to save social link:', err);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Toast */}
      {successToast && (
        <div className="p-3.5 rounded-2xl bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2.5 shadow-xl">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-semibold">{successToast}</span>
        </div>
      )}

      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* Founder Details */}
        <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-purple-950 border border-purple-500/30 text-purple-400 flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Founder Profile & Visionary Info</h3>
                <p className="text-xs text-slate-400">Controls Rakhi Guptha / Rakesh Voruganti founder credentials.</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-mono font-bold uppercase text-slate-300">Founder Name</label>
              <input
                type="text"
                value={settingsDraft.founder_info?.name || ''}
                onChange={(e) =>
                  setSettingsDraft({
                    ...settingsDraft,
                    founder_info: { ...settingsDraft.founder_info, name: e.target.value },
                  })
                }
                className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-mono font-bold uppercase text-slate-300">Founder Phone</label>
              <input
                type="text"
                value={settingsDraft.founder_info?.phone || ''}
                onChange={(e) =>
                  setSettingsDraft({
                    ...settingsDraft,
                    founder_info: { ...settingsDraft.founder_info, phone: e.target.value },
                  })
                }
                className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="font-mono font-bold uppercase text-slate-300">Founder Bio</label>
              <textarea
                rows={2}
                value={settingsDraft.founder_info?.bio || ''}
                onChange={(e) =>
                  setSettingsDraft({
                    ...settingsDraft,
                    founder_info: { ...settingsDraft.founder_info, bio: e.target.value },
                  })
                }
                className="w-full bg-slate-950/80 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="sm:col-span-2">
              <MediaUploader
                label="Founder Official Portrait"
                currentUrl={settingsDraft.founder_info?.avatar_url}
                onUploadSuccess={(url) =>
                  setSettingsDraft({
                    ...settingsDraft,
                    founder_info: { ...settingsDraft.founder_info, avatar_url: url },
                  })
                }
              />
            </div>
          </div>
        </div>

        {/* SEO & Metadata */}
        <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl">
          <div className="flex items-center gap-2.5 border-b border-white/10 pb-4">
            <div className="w-8 h-8 rounded-xl bg-purple-950 border border-purple-500/30 text-purple-400 flex items-center justify-center">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Global SEO & Metadata</h3>
              <p className="text-xs text-slate-400">Search engine meta tags and social share previews.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5 sm:col-span-2">
              <label className="font-mono font-bold uppercase text-slate-300">Site Meta Title</label>
              <input
                type="text"
                value={settingsDraft.site_name || ''}
                onChange={(e) => setSettingsDraft({ ...settingsDraft, site_name: e.target.value })}
                className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="font-mono font-bold uppercase text-slate-300">Site Tagline</label>
              <input
                type="text"
                value={settingsDraft.site_tagline || ''}
                onChange={(e) => setSettingsDraft({ ...settingsDraft, site_tagline: e.target.value })}
                className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-end">
          <button
            type="submit"
            disabled={saveLoading}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-purple-500/20 flex items-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{saveLoading ? 'Saving...' : 'Save All Settings to Database'}</span>
          </button>
        </div>
      </form>

      {/* Social Links Manager */}
      <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-950 border border-purple-500/30 text-purple-400 flex items-center justify-center">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Social Media Links</h3>
              <p className="text-xs text-slate-400">Manage footer and contact social media channels.</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              setEditingSocial({
                platform: 'Instagram',
                label: 'Instagram',
                url: 'https://instagram.com/thevisionex',
                icon_name: 'Instagram',
                is_active: true,
                display_order: socialLinks.length + 1,
              })
            }
            className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Social Link</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {socialLinks.map((link) => (
            <div
              key={link.id}
              className="p-3.5 rounded-2xl bg-slate-950/60 border border-white/5 flex items-center justify-between gap-3 text-xs"
            >
              <div className="min-w-0">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <span>{link.label}</span>
                  {link.is_active && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
                </div>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] text-purple-400 hover:underline truncate block"
                >
                  {link.url}
                </a>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => setEditingSocial(link)}
                  className="p-1 rounded bg-white/5 hover:bg-white/10 text-slate-300"
                >
                  <Edit2 className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  onClick={() => deleteSocialLink(link.id)}
                  className="p-1 rounded bg-white/5 hover:bg-rose-600/20 text-slate-300 hover:text-rose-400"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Social Modal */}
      {editingSocial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-slate-900 border border-white/10 rounded-3xl p-6 space-y-4 shadow-2xl">
            <h3 className="text-sm font-bold text-white">Edit Social Link</h3>
            <form onSubmit={handleSaveSocial} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-mono text-slate-400 uppercase text-[10px]">Platform Label</label>
                <input
                  type="text"
                  required
                  value={editingSocial.label || ''}
                  onChange={(e) => setEditingSocial({ ...editingSocial, label: e.target.value })}
                  placeholder="e.g. LinkedIn"
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-slate-400 uppercase text-[10px]">Destination URL</label>
                <input
                  type="url"
                  required
                  value={editingSocial.url || ''}
                  onChange={(e) => setEditingSocial({ ...editingSocial, url: e.target.value })}
                  placeholder="https://..."
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingSocial(null)}
                  className="px-3 py-1.5 rounded-xl bg-white/5 text-slate-300 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-purple-600 text-white text-xs font-bold"
                >
                  Save Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
