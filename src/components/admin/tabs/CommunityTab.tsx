import React, { useState } from 'react';
import {
  Award,
  Plus,
  Edit2,
  Trash2,
  X,
  Search,
  Linkedin,
  Twitter,
  Github,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { useContent } from '../../../context/ContentContext';
import { CommunityMember } from '../../../types';
import { MediaUploader } from '../MediaUploader';
import { ConfirmModal } from '../ConfirmModal';


export const CommunityTab: React.FC = () => {
  const { members, saveCommunityMember, deleteCommunityMember } = useContent();

  const [search, setSearch] = useState('');
  const [editingMember, setEditingMember] = useState<Partial<CommunityMember> | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [skillInput, setSkillInput] = useState('');
  const [saveLoading, setSaveLoading] = useState(false);

  const filteredMembers = members.filter(
    (m) =>
      m.display_name.toLowerCase().includes(search.toLowerCase()) ||
      m.headline.toLowerCase().includes(search.toLowerCase()) ||
      (m.venture_name && m.venture_name.toLowerCase().includes(search.toLowerCase()))
  );

  const handleOpenAdd = () => {
    setEditingMember({
      display_name: '',
      headline: '',
      venture_name: '',
      location: 'Hyderabad, India',
      avatar_url: '',
      skills: ['Full-Stack', 'AI Automations'],
      linkedin_url: '',
      twitter_url: '',
      github_url: '',
      is_featured: true,
    });
    setSkillInput('');
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember || !editingMember.display_name) return;

    setSaveLoading(true);
    try {
      await saveCommunityMember(editingMember as any);
      setEditingMember(null);
    } catch (err) {
      console.error('Failed to save creator:', err);
    } finally {
      setSaveLoading(false);
    }
  };

  const handleDelete = async () => {
    if (deletingId) {
      await deleteCommunityMember(deletingId);
      setDeletingId(null);
    }
  };

  const handleAddSkill = () => {
    if (!skillInput.trim() || !editingMember) return;
    const current = editingMember.skills || [];
    if (!current.includes(skillInput.trim())) {
      setEditingMember({ ...editingMember, skills: [...current, skillInput.trim()] });
    }
    setSkillInput('');
  };

  const handleRemoveSkill = (skill: string) => {
    if (!editingMember) return;
    setEditingMember({
      ...editingMember,
      skills: (editingMember.skills || []).filter((s) => s !== skill),
    });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900/60 p-4 rounded-2xl border border-white/10">
        <div className="flex items-center gap-2 flex-1 max-w-md relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search creators by name, headline, venture..."
            className="w-full bg-slate-950/80 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
          />
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-lg shadow-purple-500/20 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Spotlight Creator</span>
        </button>
      </div>

      {/* Creators Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            className="rounded-2xl bg-slate-900/60 border border-white/10 hover:border-purple-500/40 p-5 flex flex-col justify-between transition-all group shadow-xl"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-950 border border-purple-500/30 overflow-hidden flex items-center justify-center text-purple-300 font-bold text-base shrink-0">
                  {member.avatar_url ? (
                    <img src={member.avatar_url} alt={member.display_name} className="w-full h-full object-cover" />
                  ) : (
                    member.display_name.charAt(0)
                  )}
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-white truncate">{member.display_name}</div>
                  <div className="text-[11px] text-purple-400 font-medium truncate">{member.headline}</div>
                  {member.venture_name && (
                    <div className="text-[10px] text-slate-400 font-mono">Venture: {member.venture_name}</div>
                  )}
                </div>
              </div>

              {/* Skills */}
              {member.skills && member.skills.length > 0 && (
                <div className="flex flex-wrap gap-1 pt-1">
                  {member.skills.map((s, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-500/10 text-purple-300 border border-purple-500/20"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                {member.linkedin_url && (
                  <a href={member.linkedin_url} target="_blank" rel="noreferrer" className="p-1 rounded text-slate-400 hover:text-white">
                    <Linkedin className="w-3.5 h-3.5" />
                  </a>
                )}
                {member.twitter_url && (
                  <a href={member.twitter_url} target="_blank" rel="noreferrer" className="p-1 rounded text-slate-400 hover:text-white">
                    <Twitter className="w-3.5 h-3.5" />
                  </a>
                )}
                {member.github_url && (
                  <a href={member.github_url} target="_blank" rel="noreferrer" className="p-1 rounded text-slate-400 hover:text-white">
                    <Github className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setEditingMember(member)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-purple-600/20 text-slate-300 hover:text-purple-300 transition-colors"
                  title="Edit Creator"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setDeletingId(member.id)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-600/20 text-slate-300 hover:text-rose-400 transition-colors"
                  title="Delete Creator"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Creator Modal */}
      {editingMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg bg-slate-900 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setEditingMember(null)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="border-b border-white/10 pb-3">
              <h3 className="text-lg font-bold text-white">
                {editingMember.id ? 'Edit Spotlight Creator' : 'Add Spotlight Creator'}
              </h3>
              <p className="text-xs text-slate-400">Featured in /community creators showcase.</p>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-mono font-bold uppercase text-slate-300">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={editingMember.display_name || ''}
                  onChange={(e) => setEditingMember({ ...editingMember, display_name: e.target.value })}
                  placeholder="e.g. Aditya Sharma"
                  className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono font-bold uppercase text-slate-300">
                  Headline *
                </label>
                <input
                  type="text"
                  required
                  value={editingMember.headline || ''}
                  onChange={(e) => setEditingMember({ ...editingMember, headline: e.target.value })}
                  placeholder="e.g. Student Founder & AI Automation Specialist"
                  className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-mono font-bold uppercase text-slate-300">
                    Venture Name
                  </label>
                  <input
                    type="text"
                    value={editingMember.venture_name || ''}
                    onChange={(e) => setEditingMember({ ...editingMember, venture_name: e.target.value })}
                    placeholder="e.g. NexusAI"
                    className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono font-bold uppercase text-slate-300">
                    Location
                  </label>
                  <input
                    type="text"
                    value={editingMember.location || 'India'}
                    onChange={(e) => setEditingMember({ ...editingMember, location: e.target.value })}
                    placeholder="e.g. Hyderabad, India"
                    className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              {/* Skills */}
              <div className="space-y-2">
                <label className="font-mono font-bold uppercase text-slate-300">
                  Skills & Expertise Tags
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                    placeholder="Add skill and press Enter"
                    className="flex-1 bg-slate-950/80 border border-white/10 rounded-xl px-3.5 py-2 text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {(editingMember.skills || []).map((s, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-xl text-[11px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1.5"
                    >
                      <span>{s}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(s)}
                        className="hover:text-white"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Cloudinary Avatar Uploader */}
              <MediaUploader
                label="Profile Avatar Photo"
                currentUrl={editingMember.avatar_url}
                onUploadSuccess={(url) => setEditingMember({ ...editingMember, avatar_url: url })}
              />

              <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingMember(null)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saveLoading}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-purple-500/20 disabled:opacity-50 cursor-pointer"
                >
                  {saveLoading ? 'Saving...' : 'Save Creator'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={Boolean(deletingId)}
        title="Delete Spotlight Creator?"
        message="This creator will be removed from the community spotlight showcase."
        confirmLabel="Delete Creator"
        onConfirm={handleDelete}
        onCancel={() => setDeletingId(null)}
      />
    </div>
  );
};
