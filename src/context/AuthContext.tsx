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
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  quickLoginAs: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'vx_current_auth_user';

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

  useEffect(() => {
    async function checkSession() {
      if (isSupabaseConfigured && supabase) {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();

            if (profile) {
              const u: UserProfile = {
                id: profile.id,
                email: profile.email,
                full_name: profile.full_name || 'Member',
                phone: profile.phone,
                role: (profile.role as UserRole) || 'member',
                bio: profile.bio,
                avatar_url: profile.avatar_url,
                interests: profile.interests || [],
                is_active: profile.is_active ?? true,
                created_at: profile.created_at,
              };
              setUser(u);
              localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(u));
            }
          }
        } catch (err) {
          console.warn('Session restoration error:', err);
        }
      }
      setLoading(false);
    }
    checkSession();
  }, []);

  const login = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);
    try {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password: pass });
        if (error) {
          setLoading(false);
          return { success: false, error: error.message };
        }
        if (data.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.user.id)
            .single();

          const u: UserProfile = {
            id: data.user.id,
            email: data.user.email || email,
            full_name: profile?.full_name || 'Member',
            phone: profile?.phone,
            role: (profile?.role as UserRole) || 'member',
            bio: profile?.bio,
            avatar_url: profile?.avatar_url,
            interests: profile?.interests || [],
            is_active: true,
            created_at: profile?.created_at || new Date().toISOString(),
          };
          setUser(u);
          localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(u));
          analytics.trackLogin();
          setLoading(false);
          return { success: true };
        }
      }

      // Standalone fallback authentication
      const isAdminLogin = email.toLowerCase().includes('admin') || email.toLowerCase().includes('rakesh');
      const u: UserProfile = {
        id: `user-${Date.now()}`,
        email,
        full_name: isAdminLogin ? 'Rakhi Guptha ("Rakesh Voruganti")' : email.split('@')[0],
        role: isAdminLogin ? 'admin' : 'member',
        phone: '9652553433',
        bio: isAdminLogin ? 'Founder & Visionary at THE VISIONEX' : 'Aspiring student creator and digital entrepreneur',
        avatar_url: isAdminLogin ? '/founder.jpg' : undefined,
        interests: ['Digital Skills', 'Venture Building'],
        is_active: true,
        created_at: new Date().toISOString(),
      };
      setUser(u);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(u));
      analytics.trackLogin();
      setLoading(false);
      return { success: true };
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
          email,
          password: pass,
          options: {
            data: { full_name: name, phone, role },
          },
        });
        if (error) {
          setLoading(false);
          return { success: false, error: error.message };
        }
        if (data.user) {
          const u: UserProfile = {
            id: data.user.id,
            email,
            full_name: name,
            phone,
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

      // Standalone registration
      const u: UserProfile = {
        id: `user-${Date.now()}`,
        email,
        full_name: name,
        phone,
        role,
        bio: 'Student creator ready to build the future.',
        interests: ['Digital Skills', 'Entrepreneurship'],
        is_active: true,
        created_at: new Date().toISOString(),
      };
      setUser(u);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(u));
      analytics.trackRegister(role);
      setLoading(false);
      return { success: true };
    } catch (err: any) {
      setLoading(false);
      return { success: false, error: err.message || 'Registration failed' };
    }
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

  const quickLoginAs = (role: UserRole) => {
    const isAdm = role === 'admin';
    const u: UserProfile = {
      id: isAdm ? 'admin-quick-user' : 'member-quick-user',
      email: isAdm ? 'admin@thevisionex.com' : 'student.creator@thevisionex.com',
      full_name: isAdm ? 'Rakhi Guptha ("Rakesh Voruganti")' : 'Aditya Student Creator',
      role,
      phone: '9652553433',
      bio: isAdm
        ? 'Founder of THE VISIONEX. Empowering students from job seekers to opportunity creators.'
        : 'Student founder exploring AI workflows and digital branding.',
      avatar_url: isAdm ? '/founder.jpg' : undefined,
      interests: ['Digital Skills', 'AI Tools', 'Venture Building'],
      is_active: true,
      created_at: new Date().toISOString(),
    };
    setUser(u);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(u));
  };

  const isAdmin = user?.role === 'admin';

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
        updateProfile,
        quickLoginAs,
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
