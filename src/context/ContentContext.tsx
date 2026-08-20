import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteSettings, ContactRequest, CommunityEvent, CommunityMember } from '../types';
import { dataStore, INITIAL_SITE_SETTINGS } from '../lib/dataStore';

interface ContentContextType {
  settings: SiteSettings;
  updateSettings: (newSettings: SiteSettings) => Promise<void>;
  contactRequests: ContactRequest[];
  unreadContactCount: number;
  submitContact: (data: { name: string; email: string; phone?: string; subject: string; message: string }) => Promise<{ success: boolean; error?: string }>;
  markContactRead: (id: string, isRead: boolean, status: ContactRequest['status']) => Promise<void>;
  deleteContact: (id: string) => Promise<void>;
  events: CommunityEvent[];
  toggleEventRSVP: (eventId: string) => Promise<void>;
  members: CommunityMember[];
  loading: boolean;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SiteSettings>(INITIAL_SITE_SETTINGS);
  const [contactRequests, setContactRequests] = useState<ContactRequest[]>([]);
  const [events, setEvents] = useState<CommunityEvent[]>([]);
  const [members, setMembers] = useState<CommunityMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [loadedSettings, loadedContacts, loadedEvents, loadedMembers] = await Promise.all([
          dataStore.getSiteSettings(),
          dataStore.getContactRequests(),
          dataStore.getEvents(),
          dataStore.getCommunityMembers(),
        ]);
        setSettings(loadedSettings);
        setContactRequests(loadedContacts);
        setEvents(loadedEvents);
        setMembers(loadedMembers);
      } catch (err) {
        console.warn('Content data loading error:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const updateSettings = async (newSettings: SiteSettings) => {
    setSettings(newSettings);
    await dataStore.saveSiteSettings(newSettings);
  };

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

  const markContactRead = async (id: string, isRead: boolean, status: ContactRequest['status']) => {
    await dataStore.updateContactStatus(id, isRead, status);
    setContactRequests((prev) =>
      prev.map((c) => (c.id === id ? { ...c, is_read: isRead, status } : c))
    );
  };

  const deleteContact = async (id: string) => {
    await dataStore.deleteContactRequest(id);
    setContactRequests((prev) => prev.filter((c) => c.id !== id));
  };

  const toggleEventRSVP = async (eventId: string) => {
    const updated = await dataStore.toggleEventRSVP(eventId);
    setEvents(updated);
  };

  const unreadContactCount = contactRequests.filter((c) => !c.is_read).length;

  return (
    <ContentContext.Provider
      value={{
        settings,
        updateSettings,
        contactRequests,
        unreadContactCount,
        submitContact,
        markContactRead,
        deleteContact,
        events,
        toggleEventRSVP,
        members,
        loading,
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
