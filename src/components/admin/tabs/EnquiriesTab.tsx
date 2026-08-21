import React, { useState } from 'react';
import {
  Mail,
  Search,
  Filter,
  Eye,
  Trash2,
  Phone,
  Calendar,
  X,
  Reply,
  CheckCircle2,
  Clock,
  User,
} from 'lucide-react';
import { useContent } from '../../../context/ContentContext';
import { ContactEnquiry } from '../../../types';
import { ConfirmModal } from '../ConfirmModal';
import { CsvExportButton } from '../CsvExportButton';


export const EnquiriesTab: React.FC = () => {
  const { contactRequests, markContactRead, deleteContact } = useContent();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedEnquiry, setSelectedEnquiry] = useState<ContactEnquiry | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filteredEnquiries = contactRequests.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.subject.toLowerCase().includes(search.toLowerCase()) ||
      c.message.toLowerCase().includes(search.toLowerCase()) ||
      (c.phone && c.phone.includes(search));

    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleOpenDetail = async (enquiry: ContactEnquiry) => {
    setSelectedEnquiry(enquiry);
    if (!enquiry.is_read) {
      await markContactRead(enquiry.id, true, enquiry.status === 'new' ? 'in_progress' : enquiry.status);
    }
  };

  const handleStatusChange = async (id: string, newStatus: ContactEnquiry['status']) => {
    await markContactRead(id, true, newStatus);
    if (selectedEnquiry?.id === id) {
      setSelectedEnquiry({ ...selectedEnquiry, status: newStatus, is_read: true });
    }
  };

  const handleDelete = async () => {
    if (deletingId) {
      await deleteContact(deletingId);
      setDeletingId(null);
      if (selectedEnquiry?.id === deletingId) {
        setSelectedEnquiry(null);
      }
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Search and Action Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900/60 p-4 rounded-2xl border border-white/10">
        <div className="flex items-center gap-2 flex-1 max-w-md relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search enquiries by sender, email, or message..."
            className="w-full bg-slate-950/80 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
          />
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-950/80 border border-white/10 px-3 py-1.5 rounded-xl">
            <Filter className="w-3.5 h-3.5 text-purple-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent text-white focus:outline-none text-xs cursor-pointer"
            >
              <option value="all" className="bg-slate-900">All Enquiries ({contactRequests.length})</option>
              <option value="new" className="bg-slate-900">New</option>
              <option value="in_progress" className="bg-slate-900">In Progress</option>
              <option value="replied" className="bg-slate-900">Replied</option>
              <option value="closed" className="bg-slate-900">Closed</option>
            </select>
          </div>

          <CsvExportButton data={contactRequests} filename="visionex-enquiries" label="Export CSV" />
        </div>
      </div>

      {/* Enquiries Table */}
      <div className="rounded-2xl bg-slate-900/60 border border-white/10 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 border-b border-white/10 text-[11px] font-mono uppercase text-slate-400">
              <tr>
                <th className="py-3.5 px-4 font-bold">Sender</th>
                <th className="py-3.5 px-4 font-bold">Subject</th>
                <th className="py-3.5 px-4 font-bold">Message Preview</th>
                <th className="py-3.5 px-4 font-bold">Status</th>
                <th className="py-3.5 px-4 font-bold">Received</th>
                <th className="py-3.5 px-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredEnquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    <Mail className="w-8 h-8 mx-auto mb-2 text-slate-600" />
                    <p className="font-semibold text-slate-300">No contact messages found</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Messages submitted through /contact will appear in real-time.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredEnquiries.map((c) => (
                  <tr
                    key={c.id}
                    className={`hover:bg-white/[0.02] transition-colors ${
                      !c.is_read ? 'bg-purple-950/20 font-semibold' : ''
                    }`}
                  >
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        {!c.is_read && <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />}
                        <div>
                          <div className="font-bold text-white">{c.name}</div>
                          <div className="text-[11px] text-slate-400 font-mono">{c.email}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 max-w-[200px]">
                      <div className="font-semibold text-slate-200 truncate">{c.subject}</div>
                    </td>

                    <td className="py-3.5 px-4 max-w-[280px]">
                      <p className="text-slate-400 line-clamp-1">{c.message}</p>
                    </td>

                    <td className="py-3.5 px-4">
                      <select
                        value={c.status}
                        onChange={(e) => handleStatusChange(c.id, e.target.value as ContactEnquiry['status'])}
                        className={`text-[11px] font-mono font-bold px-2 py-1 rounded-lg border focus:outline-none cursor-pointer ${
                          c.status === 'new'
                            ? 'bg-rose-950/80 text-rose-300 border-rose-500/40'
                            : c.status === 'in_progress'
                            ? 'bg-amber-950/80 text-amber-300 border-amber-500/40'
                            : c.status === 'replied'
                            ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
                            : 'bg-slate-800 text-slate-300 border-white/10'
                        }`}
                      >
                        <option value="new" className="bg-slate-900">New</option>
                        <option value="in_progress" className="bg-slate-900">In Progress</option>
                        <option value="replied" className="bg-slate-900">Replied</option>
                        <option value="closed" className="bg-slate-900">Closed</option>
                      </select>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-[11px] text-slate-400 whitespace-nowrap">
                      {new Date(c.created_at).toLocaleDateString()}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleOpenDetail(c)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-purple-600/20 text-slate-300 hover:text-purple-300 transition-colors"
                          title="Read Full Enquiry"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeletingId(c.id)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-600/20 text-slate-300 hover:text-rose-400 transition-colors"
                          title="Delete Enquiry"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Enquiry Detail Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-xl bg-slate-900 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedEnquiry(null)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="border-b border-white/10 pb-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  Status: {selectedEnquiry.status}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {new Date(selectedEnquiry.created_at).toLocaleString()}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mt-2">{selectedEnquiry.subject}</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-white/5 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Sender Name</span>
                <div className="font-bold text-white">{selectedEnquiry.name}</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-white/5 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Email Address</span>
                <div className="font-bold text-white font-mono">{selectedEnquiry.email}</div>
              </div>

              {selectedEnquiry.phone && (
                <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-white/5 space-y-1 sm:col-span-2">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Phone Number</span>
                  <div className="font-bold text-white font-mono">{selectedEnquiry.phone}</div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-mono font-bold uppercase text-slate-400">
                Message Content
              </label>
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/5 text-xs text-slate-200 leading-relaxed whitespace-pre-wrap">
                {selectedEnquiry.message}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-white/10">
              <a
                href={`mailto:${selectedEnquiry.email}?subject=Re: ${encodeURIComponent(selectedEnquiry.subject)}`}
                className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20 transition-all cursor-pointer"
              >
                <Reply className="w-4 h-4" />
                <span>Reply via Email Client</span>
              </a>

              <button
                type="button"
                onClick={() => setSelectedEnquiry(null)}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold"
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
        title="Delete Contact Enquiry?"
        message="This message will be removed from your inbox permanently."
        confirmLabel="Delete Message"
        onConfirm={handleDelete}
        onCancel={() => setDeletingId(null)}
      />
    </div>
  );
};
