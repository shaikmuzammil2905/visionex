import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  KeyRound,
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  Sparkles,
  Loader2,
  Copy,
  Check,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const ForgotPasswordPage: React.FC = () => {
  const { resetPasswordWithSecretCode, login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('rakhiguptha26@gmail.com');
  const [secretCode, setSecretCode] = useState('VX-ADMIN-7K9P-4M2Q-X8R6');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleCopyCode = () => {
    navigator.clipboard.writeText('VX-ADMIN-7K9P-4M2Q-X8R6');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!secretCode.trim()) {
      setError('Please enter the Master Secret Code.');
      return;
    }

    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New password and confirm password do not match.');
      return;
    }

    setLoading(true);
    try {
      const res = await resetPasswordWithSecretCode(email, secretCode, newPassword);

      if (res.success) {
        setSuccess('Password successfully reset and activated! Logging you in...');
        // Automatically log in with new password
        await login(email, newPassword);
        setTimeout(() => {
          navigate('/admin');
        }, 1200);
      } else {
        setError(res.error || 'Failed to reset password. Please check your Secret Code.');
      }
    } catch (err: any) {
      setError(err.message || 'Error occurred while resetting password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07090e] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2.5 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 p-0.5 shadow-xl shadow-purple-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <KeyRound className="w-6 h-6 text-purple-400" />
              </div>
            </div>
            <div className="text-left">
              <span className="font-extrabold text-lg text-white font-mono tracking-tight block">
                THE VISIONE<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">X</span>
              </span>
              <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest block font-bold">
                Security & Recovery
              </span>
            </div>
          </Link>

          <h2 className="text-2xl font-black tracking-tight text-white pt-2">
            Reset Admin Password
          </h2>
          <p className="text-xs text-slate-400">
            Authorize with the Master Secret Code to set a new password instantly.
          </p>
        </div>

        {/* Master Code Display Banner */}
        <div className="p-3.5 rounded-2xl bg-purple-950/70 border border-purple-500/40 flex items-center justify-between gap-2 shadow-lg">
          <div className="flex items-center gap-2 text-xs">
            <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
            <div>
              <span className="text-[10px] uppercase font-mono text-purple-300 font-bold block">Master Secret Code:</span>
              <code className="text-xs font-mono font-bold text-white tracking-wider">VX-ADMIN-7K9P-4M2Q-X8R6</code>
            </div>
          </div>
          <button
            type="button"
            onClick={handleCopyCode}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs flex items-center gap-1 transition-colors cursor-pointer shrink-0"
            title="Copy Secret Code"
          >
            {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="text-[10px] font-semibold">{copiedCode ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        {/* Reset Card */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl space-y-6 backdrop-blur-xl bg-slate-900/80">
          {error && (
            <div className="p-3.5 rounded-2xl bg-rose-950/80 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5 animate-fadeIn">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div className="leading-relaxed">{error}</div>
            </div>
          )}

          {success && (
            <div className="p-3.5 rounded-2xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs flex items-start gap-2.5 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div className="leading-relaxed font-semibold">{success}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5 text-xs">
              <label className="font-mono font-bold uppercase text-slate-300">
                Admin Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="rakhiguptha26@gmail.com"
                  className="w-full bg-slate-950/90 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white font-mono placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <label className="font-mono font-bold uppercase text-slate-300">
                  Master Secret Code *
                </label>
                <button
                  type="button"
                  onClick={() => setSecretCode('VX-ADMIN-7K9P-4M2Q-X8R6')}
                  className="text-[10px] text-purple-400 hover:text-purple-300 font-mono underline cursor-pointer"
                >
                  Insert Default Code
                </button>
              </div>
              <div className="relative">
                <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
                <input
                  type="text"
                  required
                  value={secretCode}
                  onChange={(e) => setSecretCode(e.target.value)}
                  placeholder="VX-ADMIN-7K9P-4M2Q-X8R6"
                  className="w-full bg-slate-950/90 border border-purple-500/50 rounded-xl pl-10 pr-4 py-2.5 text-white font-mono font-bold tracking-wider placeholder:text-slate-400 focus:outline-none focus:border-purple-400 uppercase"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="space-y-1.5">
                <label className="font-mono font-bold uppercase text-slate-300">
                  New Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min 6 chars"
                    className="w-full bg-slate-950/90 border border-white/10 rounded-xl pl-10 pr-3.5 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-mono font-bold uppercase text-slate-300">
                  Confirm Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-type password"
                    className="w-full bg-slate-950/90 border border-white/10 rounded-xl pl-10 pr-10 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
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
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-xl shadow-purple-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Authorize & Set New Password</span>
                </>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
            <Link to="/admin/login" className="text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1">
              <span>← Back to Admin Login</span>
            </Link>
            <Link to="/" className="hover:text-white transition-colors">
              Public Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
