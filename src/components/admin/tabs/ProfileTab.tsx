import React, { useState } from 'react';
import {
  UserCheck,
  Save,
  CheckCircle2,
  Mail,
  Phone,
  User,
  Shield,
  Loader2,
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { MediaUploader } from '../MediaUploader';


export const ProfileTab: React.FC = () => {
  const { user, updateProfile } = useAuth();

  const [fullName, setFullName] = useState(user?.full_name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar_url || '');
  const [saveLoading, setSaveLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveLoading(true);
    try {
      await updateProfile({
        full_name: fullName,
        phone,
        bio,
        avatar_url: avatarUrl,
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to update admin profile:', err);
    } finally {
      setSaveLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex items-center gap-2.5 border-b border-white/10 pb-4">
          <div className="w-8 h-8 rounded-xl bg-purple-950 border border-purple-500/30 text-purple-400 flex items-center justify-center">
            <UserCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Super Administrator Profile</h3>
            <p className="text-xs text-slate-400">Update your public name, contact information, and avatar.</p>
          </div>
        </div>

        {success && (
          <div className="p-3.5 rounded-2xl bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2.5 shadow-xl">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-semibold">Profile updated successfully!</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs max-w-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-mono font-bold uppercase text-slate-300">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Rakhi Guptha"
                  className="w-full bg-slate-950/80 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-mono font-bold uppercase text-slate-300">
                Email Address (Primary Auth)
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  disabled
                  value={user?.email || ''}
                  className="w-full bg-slate-950/40 border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-slate-400 font-mono cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="font-mono font-bold uppercase text-slate-300">
              Phone / WhatsApp
            </label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 96525 53433"
                className="w-full bg-slate-950/80 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="font-mono font-bold uppercase text-slate-300">
              Bio / Founder Note
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Founder & Visionary at THE VISIONEX..."
              className="w-full bg-slate-950/80 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <MediaUploader
            label="Profile Avatar Image"
            currentUrl={avatarUrl}
            onUploadSuccess={(url) => setAvatarUrl(url)}
          />

          <div className="pt-2">
            <button
              type="submit"
              disabled={saveLoading}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-purple-500/20 flex items-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
            >
              {saveLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Update Profile</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
