import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  SiteSettings,
  ContactEnquiry,
  CommunityEvent,
  CommunityMember,
  Program,
  ProgramRegistration,
  Announcement,
  StudentRegistration,
  SocialLink,
  MediaItem,
  AdminActivityLog,
  WebsiteContentMap,
} from '../types';
import {
  dataStore,
  INITIAL_SITE_SETTINGS,
  INITIAL_WEBSITE_CONTENT,
  INITIAL_PROGRAMS,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_SOCIAL_LINKS,
  INITIAL_COMMUNITY_MEMBERS,
  INITIAL_EVENTS,
} from '../lib/dataStore';
import { subscribeToTable } from '../lib/supabase';

interface ContentContextType {
  // Website Settings
  settings: SiteSettings;
  updateSettings: (newSettings: SiteSettings) => Promise<void>;

  // Website Content CMS
  websiteContent: WebsiteContentMap;
  updateWebsiteContentSection: <K extends keyof WebsiteContentMap>(
    sectionKey: K,
    content: WebsiteContentMap[K]
  ) => Promise<void>;

  // Programs
  programs: Program[];
  publishedPrograms: Program[];
  saveProgram: (program: Partial<Program> & { title: string }) => Promise<Program>;
  deleteProgram: (id: string) => Promise<void>;
  duplicateProgram: (id: string) => Promise<Program | null>;

  // Program Registrations
  programRegistrations: ProgramRegistration[];
  submitProgramRegistration: (reg: Omit<ProgramRegistration, 'id' | 'created_at'>) => Promise<{ success: boolean; error?: string }>;
  deleteProgramRegistration: (id: string) => Promise<void>;

  // Students / Community Registrations
  students: StudentRegistration[];
  submitStudentRegistration: (student: Omit<StudentRegistration, 'id' | 'created_at' | 'status'>) => Promise<{ success: boolean; error?: string }>;
  updateStudent: (id: string, updates: Partial<StudentRegistration>) => Promise<void>;
  deleteStudent: (id: string) => Promise<void>;

  // Announcements
  announcements: Announcement[];
  activeAnnouncements: Announcement[];
  saveAnnouncement: (ann: Partial<Announcement> & { title: string; description: string }) => Promise<Announcement>;
  deleteAnnouncement: (id: string) => Promise<void>;

  // Contact Enquiries
  contactRequests: ContactEnquiry[];
  unreadContactCount: number;
  submitContact: (data: { name: string; email: string; phone?: string; subject: string; message: string }) => Promise<{ success: boolean; error?: string }>;
  markContactRead: (id: string, isRead: boolean, status: ContactEnquiry['status']) => Promise<void>;
  deleteContact: (id: string) => Promise<void>;

  // Social Links
  socialLinks: SocialLink[];
  saveSocialLink: (link: Partial<SocialLink> & { platform: string; label: string; url: string }) => Promise<SocialLink>;
  deleteSocialLink: (id: string) => Promise<void>;

  // Media Library
  mediaItems: MediaItem[];
  saveMediaItem: (media: Omit<MediaItem, 'id' | 'created_at'>) => Promise<MediaItem>;
  deleteMediaItem: (id: string) => Promise<void>;

  // Community Members & Events
  members: CommunityMember[];
  saveCommunityMember: (member: Partial<CommunityMember> & { display_name: string; headline: string }) => Promise<CommunityMember>;
  deleteCommunityMember: (id: string) => Promise<void>;
  events: CommunityEvent[];
  toggleEventRSVP: (eventId: string) => Promise<void>;

  // Admin Logs
  activityLogs: AdminActivityLog[];
  logAdminActivity: (adminEmail: string, action: string, entity: string, entityId?: string, details?: any) => Promise<void>;

  // Loading state & refresh
  loading: boolean;
  refreshAll: () => Promise<void>;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SiteSettings>(INITIAL_SITE_SETTINGS);
  const [websiteContent, setWebsiteContent] = useState<WebsiteContentMap>(INITIAL_WEBSITE_CONTENT);
  const [programs, setPrograms] = useState<Program[]>(INITIAL_PROGRAMS);
  const [programRegistrations, setProgramRegistrations] = useState<ProgramRegistration[]>([]);
  const [students, setStudents] = useState<StudentRegistration[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>(INITIAL_ANNOUNCEMENTS);
  const [contactRequests, setContactRequests] = useState<ContactEnquiry[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(INITIAL_SOCIAL_LINKS);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [members, setMembers] = useState<CommunityMember[]>(INITIAL_COMMUNITY_MEMBERS);
  const [events, setEvents] = useState<CommunityEvent[]>(INITIAL_EVENTS);
  const [activityLogs, setActivityLogs] = useState<AdminActivityLog[]>([]);
  const [loading, setLoading] = useState(true);

  const loadAllData = useCallback(async () => {
    try {
      const [
        loadedSettings,
        loadedContent,
        loadedPrograms,
        loadedProgramRegs,
        loadedStudents,
        loadedAnnouncements,
        loadedContacts,
        loadedSocials,
        loadedMedia,
        loadedMembers,
        loadedEvents,
        loadedLogs,
      ] = await Promise.all([
        dataStore.getSiteSettings(),
        dataStore.getWebsiteContent(),
        dataStore.getPrograms(),
        dataStore.getProgramRegistrations(),
        dataStore.getStudents(),
        dataStore.getAnnouncements(),
        dataStore.getContactRequests(),
        dataStore.getSocialLinks(),
        dataStore.getMediaItems(),
        dataStore.getCommunityMembers(),
        dataStore.getEvents(),
        dataStore.getAdminActivityLogs(),
      ]);

      setSettings(loadedSettings);
      setWebsiteContent(loadedContent);
      setPrograms(loadedPrograms);
      setProgramRegistrations(loadedProgramRegs);
      setStudents(loadedStudents);
      setAnnouncements(loadedAnnouncements);
      setContactRequests(loadedContacts);
      setSocialLinks(loadedSocials);
      setMediaItems(loadedMedia);
      setMembers(loadedMembers);
      setEvents(loadedEvents);
      setActivityLogs(loadedLogs);
    } catch (err) {
      console.warn('Content data loading error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAllData();

    // Setup Supabase Realtime Subscriptions for live updates
    const unsubSettings = subscribeToTable('website_settings', async () => {
      const updated = await dataStore.getSiteSettings();
      setSettings(updated);
    });

    const unsubContent = subscribeToTable('website_content', async () => {
      const updated = await dataStore.getWebsiteContent();
      setWebsiteContent(updated);
    });

    const unsubPrograms = subscribeToTable('programs', async () => {
      const updated = await dataStore.getPrograms();
      setPrograms(updated);
    });

    const unsubProgramRegs = subscribeToTable('program_registrations', async () => {
      const updated = await dataStore.getProgramRegistrations();
      setProgramRegistrations(updated);
    });

    const unsubStudents = subscribeToTable('students', async () => {
      const updated = await dataStore.getStudents();
      setStudents(updated);
    });

    const unsubAnnouncements = subscribeToTable('announcements', async () => {
      const updated = await dataStore.getAnnouncements();
      setAnnouncements(updated);
    });

    const unsubContacts = subscribeToTable('contact_enquiries', async () => {
      const updated = await dataStore.getContactRequests();
      setContactRequests(updated);
    });

    const unsubSocials = subscribeToTable('social_links', async () => {
      const updated = await dataStore.getSocialLinks();
      setSocialLinks(updated);
    });

    const unsubMedia = subscribeToTable('media', async () => {
      const updated = await dataStore.getMediaItems();
      setMediaItems(updated);
    });

    const unsubMembers = subscribeToTable('community_members', async () => {
      const updated = await dataStore.getCommunityMembers();
      setMembers(updated);
    });

    const unsubEvents = subscribeToTable('community_events', async () => {
      const updated = await dataStore.getEvents();
      setEvents(updated);
    });

    return () => {
      unsubSettings();
      unsubContent();
      unsubPrograms();
      unsubProgramRegs();
      unsubStudents();
      unsubAnnouncements();
      unsubContacts();
      unsubSocials();
      unsubMedia();
      unsubMembers();
      unsubEvents();
    };
  }, [loadAllData]);

  // SETTINGS
  const updateSettings = async (newSettings: SiteSettings) => {
    setSettings(newSettings);
    await dataStore.saveSiteSettings(newSettings);
  };

  // WEBSITE CONTENT CMS
  const updateWebsiteContentSection = async <K extends keyof WebsiteContentMap>(
    sectionKey: K,
    content: WebsiteContentMap[K]
  ) => {
    setWebsiteContent((prev) => ({ ...prev, [sectionKey]: content }));
    await dataStore.saveWebsiteContentSection(sectionKey, content);
  };

  // PROGRAMS
  const saveProgram = async (prog: Partial<Program> & { title: string }): Promise<Program> => {
    const saved = await dataStore.saveProgram(prog);
    setPrograms((prev) => {
      const exists = prev.some((p) => p.id === saved.id);
      return exists ? prev.map((p) => (p.id === saved.id ? saved : p)) : [saved, ...prev];
    });
    return saved;
  };

  const deleteProgram = async (id: string) => {
    await dataStore.deleteProgram(id);
    setPrograms((prev) => prev.filter((p) => p.id !== id));
  };

  const duplicateProgram = async (id: string): Promise<Program | null> => {
    const dup = await dataStore.duplicateProgram(id);
    if (dup) {
      setPrograms((prev) => [dup, ...prev]);
    }
    return dup;
  };

  // PROGRAM REGISTRATIONS
  const submitProgramRegistration = async (
    reg: Omit<ProgramRegistration, 'id' | 'created_at'>
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const saved = await dataStore.saveProgramRegistration(reg);
      setProgramRegistrations((prev) => [saved, ...prev]);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Failed to submit program registration' };
    }
  };

  const deleteProgramRegistration = async (id: string) => {
    await dataStore.deleteProgramRegistration(id);
    setProgramRegistrations((prev) => prev.filter((p) => p.id !== id));
  };

  // STUDENTS
  const submitStudentRegistration = async (
    student: Omit<StudentRegistration, 'id' | 'created_at' | 'status'>
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const saved = await dataStore.saveStudentRegistration(student);
      setStudents((prev) => [saved, ...prev]);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Failed to submit registration' };
    }
  };

  const updateStudent = async (id: string, updates: Partial<StudentRegistration>) => {
    await dataStore.updateStudent(id, updates);
    setStudents((prev) => prev.map((s) => (s.id === id ? { ...s, ...updates } : s)));
  };

  const deleteStudent = async (id: string) => {
    await dataStore.deleteStudent(id);
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  // ANNOUNCEMENTS
  const saveAnnouncement = async (
    ann: Partial<Announcement> & { title: string; description: string }
  ): Promise<Announcement> => {
    const saved = await dataStore.saveAnnouncement(ann);
    setAnnouncements((prev) => {
      const exists = prev.some((a) => a.id === saved.id);
      return exists ? prev.map((a) => (a.id === saved.id ? saved : a)) : [saved, ...prev];
    });
    return saved;
  };

  const deleteAnnouncement = async (id: string) => {
    await dataStore.deleteAnnouncement(id);
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
  };

  // CONTACT ENQUIRIES
  const submitContact = async (data: {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
  }): Promise<{ success: boolean; error?: string }> => {
    try {
      const saved = await dataStore.saveContactRequest(data);
      setContactRequests((prev) => [saved, ...prev]);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Failed to send message' };
    }
  };

  const markContactRead = async (id: string, isRead: boolean, status: ContactEnquiry['status']) => {
    await dataStore.updateContactStatus(id, isRead, status);
    setContactRequests((prev) =>
      prev.map((c) => (c.id === id ? { ...c, is_read: isRead, status } : c))
    );
  };

  const deleteContact = async (id: string) => {
    await dataStore.deleteContactRequest(id);
    setContactRequests((prev) => prev.filter((c) => c.id !== id));
  };

  // SOCIAL LINKS
  const saveSocialLink = async (
    link: Partial<SocialLink> & { platform: string; label: string; url: string }
  ): Promise<SocialLink> => {
    const saved = await dataStore.saveSocialLink(link);
    setSocialLinks((prev) => {
      const exists = prev.some((s) => s.id === saved.id);
      return exists ? prev.map((s) => (s.id === saved.id ? saved : s)) : [...prev, saved];
    });
    return saved;
  };

  const deleteSocialLink = async (id: string) => {
    await dataStore.deleteSocialLink(id);
    setSocialLinks((prev) => prev.filter((s) => s.id !== id));
  };

  // MEDIA ITEMS
  const saveMediaItem = async (media: Omit<MediaItem, 'id' | 'created_at'>): Promise<MediaItem> => {
    const saved = await dataStore.saveMediaItem(media);
    setMediaItems((prev) => [saved, ...prev]);
    return saved;
  };

  const deleteMediaItem = async (id: string) => {
    await dataStore.deleteMediaItem(id);
    setMediaItems((prev) => prev.filter((m) => m.id !== id));
  };

  // COMMUNITY MEMBERS
  const saveCommunityMember = async (
    member: Partial<CommunityMember> & { display_name: string; headline: string }
  ): Promise<CommunityMember> => {
    const saved = await dataStore.saveCommunityMember(member);
    setMembers((prev) => {
      const exists = prev.some((m) => m.id === saved.id);
      return exists ? prev.map((m) => (m.id === saved.id ? saved : m)) : [saved, ...prev];
    });
    return saved;
  };

  const deleteCommunityMember = async (id: string) => {
    await dataStore.deleteCommunityMember(id);
    setMembers((prev) => prev.filter((m) => m.id !== id));
  };

  // COMMUNITY EVENTS
  const toggleEventRSVP = async (eventId: string) => {
    const updated = await dataStore.toggleEventRSVP(eventId);
    setEvents(updated);
  };

  // ADMIN LOGS
  const logAdminActivity = async (
    adminEmail: string,
    action: string,
    entity: string,
    entityId?: string,
    details?: any
  ) => {
    await dataStore.logAdminActivity(adminEmail, action, entity, entityId, details);
    const updated = await dataStore.getAdminActivityLogs();
    setActivityLogs(updated);
  };

  const unreadContactCount = contactRequests.filter((c) => !c.is_read).length;
  const publishedPrograms = programs.filter((p) => p.status === 'published');
  const activeAnnouncements = announcements.filter((a) => a.is_active);

  return (
    <ContentContext.Provider
      value={{
        settings,
        updateSettings,
        websiteContent,
        updateWebsiteContentSection,
        programs,
        publishedPrograms,
        saveProgram,
        deleteProgram,
        duplicateProgram,
        programRegistrations,
        submitProgramRegistration,
        deleteProgramRegistration,
        students,
        submitStudentRegistration,
        updateStudent,
        deleteStudent,
        announcements,
        activeAnnouncements,
        saveAnnouncement,
        deleteAnnouncement,
        contactRequests,
        unreadContactCount,
        submitContact,
        markContactRead,
        deleteContact,
        socialLinks,
        saveSocialLink,
        deleteSocialLink,
        mediaItems,
        saveMediaItem,
        deleteMediaItem,
        members,
        saveCommunityMember,
        deleteCommunityMember,
        events,
        toggleEventRSVP,
        activityLogs,
        logAdminActivity,
        loading,
        refreshAll: loadAllData,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) throw new Error('useContent must be used within a ContentProvider');
  return context;
};

