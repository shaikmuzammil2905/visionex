import React, { useState } from 'react';
import {
  Layers,
  Plus,
  Edit2,
  Trash2,
  Copy,
  CheckCircle2,
  AlertCircle,
  Eye,
  X,
  Sparkles,
  ExternalLink,
  Code,
  Users,
  Search,
} from 'lucide-react';
import { useContent } from '../../../context/ContentContext';
import { Program } from '../../../types';
import { MediaUploader } from '../MediaUploader';
import { ConfirmModal } from '../ConfirmModal';


export const ProgramsTab: React.FC = () => {
  const { programs, saveProgram, deleteProgram, duplicateProgram, programRegistrations } = useContent();

  const [search, setSearch] = useState('');
  const [editingProgram, setEditingProgram] = useState<Partial<Program> | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [selectedProgramRegs, setSelectedProgramRegs] = useState<string | null>(null);
  const [toolInput, setToolInput] = useState('');
  const [saveLoading, setSaveLoading] = useState(false);

  const filteredPrograms = programs.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.short_description.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenAdd = () => {
    setEditingProgram({
      title: '',
      slug: '',
      category: 'technical',
      difficulty: 'Beginner to Advanced',
      timeframe: '4-8 Weeks',
      short_description: '',
      full_description: '',
      image_url: '',
      icon_name: 'Code',
      gradient_color: 'from-purple-500 to-blue-500',
      tools: ['Cursor AI', 'React', 'Supabase'],
      venture_idea: 'Build and launch your first digital venture in 30 days.',
      status: 'published',
      is_featured: false,
      display_order: programs.length + 1,
    });
    setToolInput('');
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProgram || !editingProgram.title) return;

    setSaveLoading(true);
    try {
      await saveProgram(editingProgram as any);
      setEditingProgram(null);
    } catch (err) {
      console.error('Failed to save program:', err);
    } finally {
      setSaveLoading(false);
    }
  };

  const handleDelete = async () => {
    if (deletingId) {
      await deleteProgram(deletingId);
      setDeletingId(null);
    }
  };

  const handleAddTool = () => {
    if (!toolInput.trim() || !editingProgram) return;
    const current = editingProgram.tools || [];
    if (!current.includes(toolInput.trim())) {
      setEditingProgram({ ...editingProgram, tools: [...current, toolInput.trim()] });
    }
    setToolInput('');
  };

  const handleRemoveTool = (tool: string) => {
    if (!editingProgram) return;
    setEditingProgram({
      ...editingProgram,
      tools: (editingProgram.tools || []).filter((t) => t !== tool),
    });
  };

  const currentProgramRegs = programRegistrations.filter(
    (r) => r.program_id === selectedProgramRegs
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900/60 p-4 rounded-2xl border border-white/10">
        <div className="flex items-center gap-2 flex-1 max-w-md relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search programs by title or category..."
            className="w-full bg-slate-950/80 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
          />
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-lg shadow-purple-500/20 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Program Track</span>
        </button>
      </div>

      {/* Program Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPrograms.map((prog) => {
          const regCount = programRegistrations.filter((r) => r.program_id === prog.id).length;
          return (
            <div
              key={prog.id}
              className="rounded-2xl bg-slate-900/60 border border-white/10 hover:border-purple-500/40 p-5 flex flex-col justify-between transition-all group shadow-xl"
            >
              <div className="space-y-3">
                {/* Header & Status */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                        prog.status === 'published'
                          ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30'
                          : 'bg-amber-950/80 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {prog.status}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-purple-500/10 text-purple-300 border border-purple-500/20">
                      {prog.category}
                    </span>
                  </div>

                  <span className="text-[11px] font-mono text-slate-500">#{prog.display_order}</span>
                </div>

                {/* Cover Image */}
                {prog.image_url && (
                  <div className="w-full h-32 rounded-xl overflow-hidden bg-black/40 border border-white/5">
                    <img src={prog.image_url} alt={prog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                )}

                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors">
                    {prog.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {prog.short_description}
                  </p>
                </div>

                {/* Tools Chips */}
                {prog.tools && prog.tools.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {prog.tools.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-slate-300 border border-white/5"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer Actions */}
              <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setSelectedProgramRegs(prog.id)}
                  className="text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>{regCount} Enrolled</span>
                </button>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => duplicateProgram(prog.id)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                    title="Duplicate Program Track"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingProgram(prog)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-purple-600/20 text-slate-300 hover:text-purple-300 transition-colors"
                    title="Edit Program"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeletingId(prog.id)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-600/20 text-slate-300 hover:text-rose-400 transition-colors"
                    title="Delete Program"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Program Modal */}
      {editingProgram && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-2xl bg-slate-900 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto custom-scrollbar">
            <button
              onClick={() => setEditingProgram(null)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="border-b border-white/10 pb-4">
              <h3 className="text-lg font-bold text-white">
                {editingProgram.id ? 'Edit Program Track' : 'Create New Program Track'}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Changes will sync to Supabase and reflect live on /digital-entrepreneurship.
              </p>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-mono font-bold uppercase text-slate-300">
                    Track Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProgram.title || ''}
                    onChange={(e) => setEditingProgram({ ...editingProgram, title: e.target.value })}
                    placeholder="e.g. AI-Powered Full-Stack Architecture"
                    className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono font-bold uppercase text-slate-300">
                    Category
                  </label>
                  <select
                    value={editingProgram.category || 'technical'}
                    onChange={(e) => setEditingProgram({ ...editingProgram, category: e.target.value as any })}
                    className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="technical">Technical Engineering</option>
                    <option value="creative">Creative & Design</option>
                    <option value="business">Business & Growth</option>
                    <option value="ai">AI & Automation</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="font-mono font-bold uppercase text-slate-300">
                    Difficulty Level
                  </label>
                  <input
                    type="text"
                    value={editingProgram.difficulty || 'Beginner to Advanced'}
                    onChange={(e) => setEditingProgram({ ...editingProgram, difficulty: e.target.value })}
                    placeholder="e.g. Beginner to Advanced"
                    className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono font-bold uppercase text-slate-300">
                    Timeframe
                  </label>
                  <input
                    type="text"
                    value={editingProgram.timeframe || '4-8 Weeks'}
                    onChange={(e) => setEditingProgram({ ...editingProgram, timeframe: e.target.value })}
                    placeholder="e.g. 4-8 Weeks"
                    className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono font-bold uppercase text-slate-300">
                    Publish Status
                  </label>
                  <select
                    value={editingProgram.status || 'published'}
                    onChange={(e) => setEditingProgram({ ...editingProgram, status: e.target.value as any })}
                    className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="published">Published (Live on Site)</option>
                    <option value="draft">Draft (Admin Only)</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-mono font-bold uppercase text-slate-300">
                  Short Description (Card Summary)
                </label>
                <textarea
                  rows={2}
                  required
                  value={editingProgram.short_description || ''}
                  onChange={(e) => setEditingProgram({ ...editingProgram, short_description: e.target.value })}
                  placeholder="Concise overview of what student builders will learn and build..."
                  className="w-full bg-slate-950/80 border border-white/10 rounded-xl p-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono font-bold uppercase text-slate-300">
                  Venture Idea Prompt
                </label>
                <input
                  type="text"
                  value={editingProgram.venture_idea || ''}
                  onChange={(e) => setEditingProgram({ ...editingProgram, venture_idea: e.target.value })}
                  placeholder="e.g. Build an AI-assisted CRM for local businesses and charge $50/mo."
                  className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              {/* Tools tags input */}
              <div className="space-y-2">
                <label className="font-mono font-bold uppercase text-slate-300">
                  Curriculum Tools & Technologies
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={toolInput}
                    onChange={(e) => setToolInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTool())}
                    placeholder="Add tool (e.g. Cursor AI, Supabase) and press Enter"
                    className="flex-1 bg-slate-950/80 border border-white/10 rounded-xl px-3.5 py-2 text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddTool}
                    className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {(editingProgram.tools || []).map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-xl text-[11px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1.5"
                    >
                      <span>{t}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTool(t)}
                        className="hover:text-white"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Cloudinary Cover Image Uploader */}
              <MediaUploader
                label="Track Cover Image"
                currentUrl={editingProgram.image_url}
                onUploadSuccess={(url) => setEditingProgram({ ...editingProgram, image_url: url })}
              />

              <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingProgram(null)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saveLoading}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-purple-500/20 disabled:opacity-50 cursor-pointer"
                >
                  {saveLoading ? 'Saving...' : 'Save & Sync Track'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Program Registrations Drawer */}
      {selectedProgramRegs && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-2xl bg-slate-900 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setSelectedProgramRegs(null)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-400" />
                <span>Enrolled Students for this Track</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {currentProgramRegs.length} total student applications
              </p>
            </div>

            {currentProgramRegs.length === 0 ? (
              <div className="py-12 text-center text-slate-400 rounded-2xl bg-slate-950/60 border border-white/5">
                <p className="text-xs">No direct program registrations recorded yet.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {currentProgramRegs.map((r) => (
                  <div
                    key={r.id}
                    className="p-3.5 rounded-xl bg-slate-950/60 border border-white/5 flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="font-bold text-white">{r.student_name}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{r.email} • {r.mobile || 'No phone'}</div>

                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
                      {r.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={Boolean(deletingId)}
        title="Delete Program Track?"
        message="This action will remove the program track from the database and the public website. Are you sure?"
        confirmLabel="Delete Track"
        onConfirm={handleDelete}
        onCancel={() => setDeletingId(null)}
      />
    </div>
  );
};
