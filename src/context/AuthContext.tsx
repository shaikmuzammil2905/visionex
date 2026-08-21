import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { UserProfile, UserRole } from '../types';
import { analytics } from '../lib/analytics';

interface AuthContextType {
  user: UserProfile | null;
  isAdmin: boolean;
  isConfigured: boolean;
  loading: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, phone: string, pass: string, role?: UserRole) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  resetPassword: (newPassword: string) => Promise<{ success: boolean; error?: string }>;
  resetPasswordWithSecretCode: (email: string, secretCode: string, newPassword: string) => Promise<{ success: boolean; error?: string }>;
  changePassword: (oldPassword: string, newPassword: string) => Promise<{ success: boolean; error?: string }>;
  bootstrapAdmin: (secretCode: string, email: string, fullName?: string) => Promise<{ success: boolean; error?: string }>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'vx_current_auth_user';
const ADMIN_CUSTOM_PASS_KEY = 'vx_admin_custom_password';
const MASTER_BOOTSTRAP_SECRET = 'VX-ADMIN-7K9P-4M2Q-X8R6';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const cached = localStorage.getItem(AUTH_STORAGE_KEY);
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(true);

  // Sync Supabase Auth session & handle realtime auth changes
  useEffect(() => {
    let mounted = true;

    async function checkSession() {
      if (isSupabaseConfigured && supabase) {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user && mounted) {
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .maybeSingle();

            const role: UserRole =
              (profile?.role as UserRole) ||
              (session.user.user_metadata?.role as UserRole) ||
              'super_admin';

            const u: UserProfile = {
              id: session.user.id,
              email: session.user.email || profile?.email || '',
              full_name: profile?.full_name || session.user.user_metadata?.full_name || 'Rakhi Guptha ("Rakesh Voruganti")',
              phone: profile?.phone || session.user.user_metadata?.phone || '+91 96525 53433',
              role,
              bio: profile?.bio,
              avatar_url: profile?.avatar_url,
              interests: profile?.interests || [],
              is_active: profile?.is_active ?? true,
              created_at: profile?.created_at || session.user.created_at,
            };
            setUser(u);
            localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(u));
          }
        } catch (err) {
          console.warn('Session restoration error:', err);
        }
      }
      if (mounted) setLoading(false);
    }

    checkSession();

    if (isSupabaseConfigured && supabase) {
      const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .maybeSingle();

          const role: UserRole =
            (profile?.role as UserRole) ||
            (session.user.user_metadata?.role as UserRole) ||
            'super_admin';

          const u: UserProfile = {
            id: session.user.id,
            email: session.user.email || profile?.email || '',
            full_name: profile?.full_name || session.user.user_metadata?.full_name || 'Rakhi Guptha ("Rakesh Voruganti")',
            phone: profile?.phone || session.user.user_metadata?.phone || '+91 96525 53433',
            role,
            bio: profile?.bio,
            avatar_url: profile?.avatar_url,
            interests: profile?.interests || [],
            is_active: profile?.is_active ?? true,
            created_at: profile?.created_at || session.user.created_at,
          };
          if (mounted) setUser(u);
          localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(u));
        } else if (event === 'SIGNED_OUT') {
          if (mounted) setUser(null);
          localStorage.removeItem(AUTH_STORAGE_KEY);
        }
      });

      return () => {
        mounted = false;
        authListener?.subscription.unsubscribe();
      };
    }

    return () => {
      mounted = false;
    };
  }, []);

  const login = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = pass.trim();

    try {
      // 1. Check if Supabase Auth succeeds directly
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password: cleanPass,
        });

        if (data?.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.user.id)
            .maybeSingle();

          const role: UserRole =
            (profile?.role as UserRole) ||
            (data.user.user_metadata?.role as UserRole) ||
            'super_admin';

          const u: UserProfile = {
            id: data.user.id,
            email: data.user.email || cleanEmail,
            full_name: profile?.full_name || data.user.user_metadata?.full_name || 'Rakhi Guptha ("Rakesh Voruganti")',
            phone: profile?.phone || data.user.user_metadata?.phone || '+91 96525 53433',
            role,
            bio: profile?.bio,
            avatar_url: profile?.avatar_url,
            interests: profile?.interests || [],
            is_active: profile?.is_active ?? true,
            created_at: profile?.created_at || new Date().toISOString(),
          };
          setUser(u);
          localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(u));
          analytics.trackLogin();
          setLoading(false);
          return { success: true };
        }
      }

      // 2. Pre-configured Super Admin credentials & Custom Reset Password check
      const customPass = localStorage.getItem(ADMIN_CUSTOM_PASS_KEY);
      const isSuperAdminEmail =
        cleanEmail === 'rakhiguptha26@gmail.com' ||
        cleanEmail === 'admin@thevisionex.com' ||
        cleanEmail === 'shaikmuzammil2905@gmail.com';

      const isValidPassword =
        cleanPass === (customPass || 'Rakhi@2006') ||
        cleanPass === 'Rakhi@2006' ||
        cleanPass === 'Visionex@2026';

      if (isSuperAdminEmail && isValidPassword) {
        const u: UserProfile = {
          id: 'admin_super_visionex',
          email: cleanEmail,
          full_name: 'Rakhi Guptha ("Rakesh Voruganti")',
          phone: '+91 96525 53433',
          role: 'super_admin',
          bio: 'Founder & Visionary at THE VISIONEX. Empowering students to build digital ventures.',
          is_active: true,
          created_at: new Date().toISOString(),
        };
        setUser(u);
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(u));
        analytics.trackLogin();
        setLoading(false);
        return { success: true };
      }

      setLoading(false);
      return { success: false, error: 'Invalid email or password. Please check credentials or reset with Secret Code.' };
    } catch (err: any) {
      setLoading(false);
      return { success: false, error: err.message || 'Login failed' };
    }
  };

  const signup = async (
    name: string,
    email: string,
    phone: string,
    pass: string,
    role: UserRole = 'member'
  ): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);
    try {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password: pass,
          options: {
            data: { full_name: name.trim(), phone: phone.trim(), role },
          },
        });
        if (error) {
          setLoading(false);
          return { success: false, error: error.message };
        }
        if (data.user) {
          const u: UserProfile = {
            id: data.user.id,
            email: email.trim(),
            full_name: name.trim(),
            phone: phone.trim(),
            role,
            is_active: true,
            created_at: new Date().toISOString(),
          };
          setUser(u);
          localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(u));
          analytics.trackRegister(role);
          setLoading(false);
          return { success: true };
        }
      }

      // Fallback local signup
      const u: UserProfile = {
        id: `user_${Date.now()}`,
        email: email.trim(),
        full_name: name.trim(),
        phone: phone.trim(),
        role,
        is_active: true,
        created_at: new Date().toISOString(),
      };
      setUser(u);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(u));
      setLoading(false);
      return { success: true };
    } catch (err: any) {
      setLoading(false);
      return { success: false, error: err.message || 'Registration failed' };
    }
  };

  const forgotPassword = async (email: string): Promise<{ success: boolean; error?: string }> => {
    if (!email) return { success: false, error: 'Please enter your email' };
    if (isSupabaseConfigured && supabase) {
      try {
        const redirectUrl = `${window.location.origin}/admin/reset-password`;
        const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
          redirectTo: redirectUrl,
        });
        if (error) return { success: false, error: error.message };
        return { success: true };
      } catch (err: any) {
        return { success: false, error: err.message || 'Failed to send password reset email' };
      }
    }
    return { success: false, error: 'Supabase authentication not configured' };
  };

  const resetPassword = async (newPassword: string): Promise<{ success: boolean; error?: string }> => {
    if (!newPassword || newPassword.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters' };
    }
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.auth.updateUser({ password: newPassword });
        if (error) return { success: false, error: error.message };
        localStorage.setItem(ADMIN_CUSTOM_PASS_KEY, newPassword);
        return { success: true };
      } catch (err: any) {
        return { success: false, error: err.message || 'Failed to update password' };
      }
    }
    localStorage.setItem(ADMIN_CUSTOM_PASS_KEY, newPassword);
    return { success: true };
  };

  const resetPasswordWithSecretCode = async (
    email: string,
    secretCode: string,
    newPassword: string
  ): Promise<{ success: boolean; error?: string }> => {
    const cleanSecret = secretCode.trim().toUpperCase();
    const cleanPass = newPassword.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanSecret) {
      return { success: false, error: 'Master Secret Code is required' };
    }

    if (cleanSecret !== MASTER_BOOTSTRAP_SECRET) {
      return { success: false, error: 'Invalid Master Secret Code. Please verify your code.' };
    }

    if (!cleanPass || cleanPass.length < 6) {
      return { success: false, error: 'New password must be at least 6 characters long' };
    }

    try {
      // Store in local secure storage
      localStorage.setItem(ADMIN_CUSTOM_PASS_KEY, cleanPass);

      // Also update in Supabase if connected
      if (isSupabaseConfigured && supabase) {
        try {
          await supabase.rpc('bootstrap_admin_account', {
            p_secret_code: cleanSecret,
            p_email: cleanEmail,
            p_full_name: 'Rakhi Guptha ("Rakesh Voruganti")',
          });
          await supabase.auth.updateUser({ password: cleanPass });
        } catch (err) {
          console.warn('Supabase remote password update notice:', err);
        }
      }

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Failed to reset password with secret code' };
    }
  };

  const changePassword = async (oldPassword: string, newPassword: string): Promise<{ success: boolean; error?: string }> => {
    if (!user) return { success: false, error: 'Not authenticated' };
    if (!oldPassword || !newPassword) return { success: false, error: 'Please fill in all password fields' };
    if (newPassword.length < 6) return { success: false, error: 'New password must be at least 6 characters' };

    const customPass = localStorage.getItem(ADMIN_CUSTOM_PASS_KEY) || 'Rakhi@2006';
    if (oldPassword !== customPass && oldPassword !== 'Rakhi@2006' && oldPassword !== 'Visionex@2026') {
      return { success: false, error: 'Incorrect current password' };
    }

    if (isSupabaseConfigured && supabase) {
      try {
        const { error: updateErr } = await supabase.auth.updateUser({ password: newPassword });
        if (updateErr) {
          console.warn('Supabase auth password update error:', updateErr);
        }
      } catch (err) {
        console.warn('Supabase change password error:', err);
      }
    }

    localStorage.setItem(ADMIN_CUSTOM_PASS_KEY, newPassword);
    return { success: true };
  };

  const bootstrapAdmin = async (
    secretCode: string,
    email: string,
    fullName: string = 'Rakhi Guptha ("Rakesh Voruganti")'
  ): Promise<{ success: boolean; error?: string }> => {
    if (secretCode.trim().toUpperCase() === MASTER_BOOTSTRAP_SECRET) {
      const u: UserProfile = {
        id: 'admin_super_visionex',
        email: email.trim().toLowerCase(),
        full_name: fullName.trim(),
        phone: '+91 96525 53433',
        role: 'super_admin',
        is_active: true,
        created_at: new Date().toISOString(),
      };
      setUser(u);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(u));
      return { success: true };
    }
    return { success: false, error: 'Invalid secret code' };
  };

  const logout = async () => {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.auth.signOut();
      } catch (err) {
        console.warn('Supabase logout error:', err);
      }
    }
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...data, updated_at: new Date().toISOString() };
    setUser(updated);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updated));

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('profiles').update(data).eq('id', user.id);
      } catch (err) {
        console.warn('Supabase updateProfile error:', err);
      }
    }
  };

  const isAdmin = user?.role === 'admin' || user?.role === 'super_admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        isConfigured: isSupabaseConfigured,
        loading,
        login,
        signup,
        logout,
        forgotPassword,
        resetPassword,
        resetPasswordWithSecretCode,
        changePassword,
        bootstrapAdmin,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
