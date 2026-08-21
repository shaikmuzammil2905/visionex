import React, { useState } from 'react';
import {
  ShieldCheck,
  KeyRound,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Clock,
  User,
  Database,
  FileText,
  Loader2,
  Copy,
  Check,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { useContent } from '../../../context/ContentContext';

export const SecurityTab: React.FC = () => {
  const { user, changePassword } = useAuth();
  const { activityLogs, logAdminActivity } = useContent();

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleCopySecret = () => {
    navigator.clipboard.writeText('VX-ADMIN-7K9P-4M2Q-X8R6');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match.');
      return;
    }

    setLoading(true);
    const res = await changePassword(oldPassword, newPassword);
    setLoading(false);

    if (res.success) {
      setSuccess('Super Admin password successfully updated! Previous password is now invalidated.');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      if (user?.email) {
        await logAdminActivity(user.email, 'password_change', 'auth', user.id, { timestamp: new Date().toISOString() });
      }
    } else {
      setError(res.error || 'Failed to update password.');
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Master Secret Code Reference Card */}
      <div className="bg-gradient-to-r from-purple-950/60 via-slate-900/80 to-indigo-950/60 border border-purple-500/40 rounded-3xl p-6 sm:p-8 space-y-3 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                Master Secret Code (Authorized)
              </h3>
            </div>
            <p className="text-xs text-slate-400">
              Use this secret key to reset admin passwords or bypass recovery without email delays.
            </p>
          </div>

          <div className="flex items-center gap-3 p-2 rounded-2xl bg-black/50 border border-white/10 shrink-0">
            <code className="text-sm font-mono font-bold text-purple-300 px-3 tracking-wider">
              VX-ADMIN-7K9P-4M2Q-X8R6
            </code>
            <button
              type="button"
              onClick={handleCopySecret}
              className="p-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs flex items-center gap-1 transition-all cursor-pointer shadow"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Password Change Card */}
      <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl">
        <div className="flex items-center gap-2.5 border-b border-white/10 pb-4">
          <div className="w-8 h-8 rounded-xl bg-purple-950 border border-purple-500/30 text-purple-400 flex items-center justify-center">
            <KeyRound className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Change Admin Password</h3>
            <p className="text-xs text-slate-400">
              Verify your current password to update credentials and invalidate old sessions.
            </p>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleChangePassword} className="space-y-4 text-xs max-w-lg">
          <div className="space-y-1.5">
            <label className="font-mono font-bold uppercase text-slate-300">
              Current Password *
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Enter current password"
                className="w-full bg-slate-950/80 border border-white/10 rounded-xl pl-10 pr-10 py-2.5 text-white focus:outline-none focus:border-purple-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="font-mono font-bold uppercase text-slate-300">
                New Password *
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Min 6 characters"
                className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-mono font-bold uppercase text-slate-300">
                Confirm New Password *
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-type new password"
                className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-purple-500/20 disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Update Password & Re-authenticate</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Admin Audit Trail Logs Table */}
      <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-950 border border-purple-500/30 text-purple-400 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Admin Activity Audit Logs</h3>
              <p className="text-xs text-slate-400">Immutable trail of administrative updates and security events.</p>
            </div>
          </div>
          <span className="text-[11px] font-mono text-purple-400">{activityLogs.length} Events Logged</span>
        </div>

        {activityLogs.length === 0 ? (
          <div className="py-8 text-center text-slate-400 rounded-2xl bg-slate-950/60 border border-white/5 space-y-1">
            <Clock className="w-6 h-6 mx-auto text-slate-600 mb-1" />
            <p className="text-xs font-semibold text-slate-300">No security audit events recorded yet</p>
            <p className="text-[11px] text-slate-500">Actions taken in this panel will generate an audit record here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/80 border-b border-white/10 text-[10px] font-mono uppercase text-slate-400">
                <tr>
                  <th className="py-3 px-4 font-bold">Admin User</th>
                  <th className="py-3 px-4 font-bold">Action Taken</th>
                  <th className="py-3 px-4 font-bold">Target Entity</th>
                  <th className="py-3 px-4 font-bold">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-mono text-[11px]">
                {activityLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-white/[0.02]">
                    <td className="py-3 px-4 text-white font-semibold">{log.admin_email}</td>
                    <td className="py-3 px-4 text-purple-400 font-bold uppercase">{log.action}</td>
                    <td className="py-3 px-4 text-slate-400">{log.entity} {log.entity_id ? `(${log.entity_id.slice(0, 8)})` : ''}</td>
                    <td className="py-3 px-4 text-slate-500">{new Date(log.created_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
