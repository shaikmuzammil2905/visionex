import React, { useState } from 'react';
import {
  Users,
  Search,
  Download,
  Filter,
  CheckCircle2,
  AlertCircle,
  Eye,
  Trash2,
  ExternalLink,
  GraduationCap,
  Sparkles,
  Phone,
  Mail,
  Linkedin,
  Github,
  X,
} from 'lucide-react';
import { useContent } from '../../../context/ContentContext';
import { StudentRegistration } from '../../../types';
import { ConfirmModal } from '../ConfirmModal';
import { CsvExportButton } from '../CsvExportButton';

export const StudentsTab: React.FC = () => {
  const { students, updateStudent, deleteStudent } = useContent();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedStudent, setSelectedStudent] = useState<StudentRegistration | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.full_name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      (s.college_name || s.college || '').toLowerCase().includes(search.toLowerCase()) ||
      (s.phone || s.mobile || '').includes(search);

    const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = async (id: string, newStatus: StudentRegistration['status']) => {
    await updateStudent(id, { status: newStatus });
  };

  const handleDelete = async () => {
    if (deletingId) {
      await deleteStudent(deletingId);
      setDeletingId(null);
      if (selectedStudent?.id === deletingId) {
        setSelectedStudent(null);
      }
    }
  };

  const getSkillsArray = (skills?: string | string[]): string[] => {
    if (!skills) return [];
    if (Array.isArray(skills)) return skills;
    if (typeof skills === 'string') return skills.split(',').map((s) => s.trim()).filter(Boolean);
    return [];
  };

  const exportData = filteredStudents.map((s) => ({
    id: s.id,
    full_name: s.full_name,
    email: s.email,
    phone: s.phone || s.mobile || '',
    college: s.college_name || s.college || '',
    degree: s.degree || '',
    graduation_year: s.graduation_year || '',
    skills: getSkillsArray(s.skills).join('; '),
    status: s.status,
    registered_at: s.created_at,
  }));

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Control Bar */}
      <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-5 sm:p-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-950/80 border border-purple-500/40 text-purple-400 flex items-center justify-center shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Student Applicant Registry</h3>
            <p className="text-xs text-slate-400">
              {students.length} total registered students • Live Supabase synchronization
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
          {/* Search Box */}
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, college..."
              className="w-full bg-slate-950 border border-white/10 rounded-xl pl-9 pr-3.5 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="verified">Verified</option>
            <option value="pending">Pending</option>
            <option value="archived">Archived</option>
          </select>

          {/* CSV Export */}
          <CsvExportButton
            data={exportData}
            filename={`visionex_students_${new Date().toISOString().slice(0, 10)}`}
          />
        </div>
      </div>

      {/* Student Records Table */}
      <div className="bg-slate-900/60 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        {filteredStudents.length === 0 ? (
          <div className="p-12 text-center text-slate-400 space-y-2">
            <GraduationCap className="w-10 h-10 mx-auto text-slate-600 mb-1" />
            <p className="text-sm font-semibold text-slate-300">No student records found</p>
            <p className="text-xs text-slate-500">
              Try modifying your search filter or clear status filter.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/80 border-b border-white/10 text-[10px] font-mono uppercase text-slate-400">
                <tr>
                  <th className="py-3.5 px-4 font-bold">Student Name</th>
                  <th className="py-3.5 px-4 font-bold">Contact Info</th>
                  <th className="py-3.5 px-4 font-bold">Institution & Degree</th>
                  <th className="py-3.5 px-4 font-bold">Skills Focus</th>
                  <th className="py-3.5 px-4 font-bold">Status</th>
                  <th className="py-3.5 px-4 font-bold">Registered</th>
                  <th className="py-3.5 px-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-sans">
                {filteredStudents.map((s) => {
                  const skills = getSkillsArray(s.skills);
                  return (
                    <tr
                      key={s.id}
                      className="hover:bg-white/[0.02] transition-colors group cursor-pointer"
                      onClick={() => setSelectedStudent(s)}
                    >
                      <td className="py-3.5 px-4 font-bold text-white">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-mono text-xs flex items-center justify-center shrink-0">
                            {s.full_name.charAt(0).toUpperCase()}
                          </div>
                          <span>{s.full_name}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="space-y-0.5 font-mono text-[11px]">
                          <div className="text-slate-300">{s.email}</div>
                          <div className="text-slate-500">{s.phone || s.mobile || '—'}</div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-200">{s.college_name || s.college || 'N/A'}</div>
                        <div className="text-[11px] text-slate-400">
                          {s.degree || 'Degree'} {s.graduation_year ? `('${s.graduation_year.slice(-2)})` : ''}
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="flex flex-wrap gap-1 max-w-[200px]">
                          {skills.length > 0 ? (
                            skills.slice(0, 3).map((skill, idx) => (
                              <span
                                key={idx}
                                className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-purple-500/10 text-purple-300 border border-purple-500/20"
                              >
                                {skill}
                              </span>
                            ))
                          ) : (
                            <span className="text-[11px] text-slate-500">General</span>
                          )}
                        </div>
                      </td>

                      <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={s.status}
                          onChange={(e) => handleStatusChange(s.id, e.target.value as StudentRegistration['status'])}
                          className={`text-[11px] font-mono font-bold px-2 py-1 rounded-lg border focus:outline-none cursor-pointer ${
                            s.status === 'active' || s.status === 'verified'
                              ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
                              : s.status === 'pending'
                              ? 'bg-amber-950/80 text-amber-300 border-amber-500/40'
                              : 'bg-slate-800 text-slate-400 border-white/10'
                          }`}
                        >
                          <option value="active" className="bg-slate-900">Active</option>
                          <option value="verified" className="bg-slate-900">Verified</option>
                          <option value="pending" className="bg-slate-900">Pending</option>
                          <option value="archived" className="bg-slate-900">Archived</option>
                        </select>
                      </td>

                      <td className="py-3.5 px-4 font-mono text-[11px] text-slate-400">
                        {new Date(s.created_at).toLocaleDateString()}
                      </td>

                      <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => setSelectedStudent(s)}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                            title="View Full Application"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeletingId(s.id)}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-600/20 text-slate-300 hover:text-rose-400 transition-colors"
                            title="Delete Student Record"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Student Profile Detail Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-2xl bg-slate-900 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedStudent(null)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-mono text-xl font-bold flex items-center justify-center shadow-lg shrink-0">
                {selectedStudent.full_name.charAt(0).toUpperCase()}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-white">{selectedStudent.full_name}</h3>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                      selectedStudent.status === 'active' || selectedStudent.status === 'verified'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                        : 'bg-amber-950 text-amber-300 border border-amber-500/30'
                    }`}
                  >
                    {selectedStudent.status}
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-mono">ID: {selectedStudent.id}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-white/5 space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-500">Email Address</span>
                <div className="font-semibold text-white font-mono flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-purple-400" />
                  <span>{selectedStudent.email}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-white/5 space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-500">Phone / WhatsApp</span>
                <div className="font-semibold text-white font-mono flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{selectedStudent.phone || selectedStudent.mobile || 'Not provided'}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-white/5 space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-500">College / Institution</span>
                <div className="font-semibold text-white">
                  {selectedStudent.college_name || selectedStudent.college || 'Not provided'}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-white/5 space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-500">Academic Standing</span>
                <div className="font-semibold text-white">
                  {selectedStudent.degree || 'Degree'} {selectedStudent.graduation_year ? `• Year ${selectedStudent.graduation_year}` : ''}
                </div>
              </div>
            </div>

            {getSkillsArray(selectedStudent.skills).length > 0 && (
              <div className="space-y-2">
                <label className="text-[11px] font-mono font-bold uppercase text-slate-400">
                  Skills & Interest Tracks
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {getSkillsArray(selectedStudent.skills).map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-xl text-xs font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {selectedStudent.notes && (
              <div className="space-y-2">
                <label className="text-[11px] font-mono font-bold uppercase text-slate-400">
                  Admin Notes / Remarks
                </label>
                <p className="p-4 rounded-2xl bg-slate-950/60 border border-white/5 text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">
                  {selectedStudent.notes}
                </p>
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <span className="text-[11px] font-mono text-slate-500">
                Registered on {new Date(selectedStudent.created_at).toLocaleString()}
              </span>

              <button
                type="button"
                onClick={() => setSelectedStudent(null)}
                className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={Boolean(deletingId)}
        title="Delete Student Record?"
        message="This action will permanently delete this student record from Supabase."
        confirmLabel="Delete Record"
        onConfirm={handleDelete}
        onCancel={() => setDeletingId(null)}
      />
    </div>
  );
};
