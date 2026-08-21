import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AdminLayout } from '../components/admin/AdminLayout';
import { OverviewTab } from '../components/admin/tabs/OverviewTab';
import { StudentsTab } from '../components/admin/tabs/StudentsTab';
import { CommunityTab } from '../components/admin/tabs/CommunityTab';
import { ProgramsTab } from '../components/admin/tabs/ProgramsTab';
import { ResourcesTab } from '../components/admin/tabs/ResourcesTab';
import { AnnouncementsTab } from '../components/admin/tabs/AnnouncementsTab';
import { EnquiriesTab } from '../components/admin/tabs/EnquiriesTab';
import { WebsiteContentTab } from '../components/admin/tabs/WebsiteContentTab';
import { SettingsTab } from '../components/admin/tabs/SettingsTab';
import { MediaTab } from '../components/admin/tabs/MediaTab';
import { SecurityTab } from '../components/admin/tabs/SecurityTab';
import { ProfileTab } from '../components/admin/tabs/ProfileTab';

export const AdminPage: React.FC = () => {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.title = 'Super Admin Control Center | THE VISIONEX';
    if (!loading && (!user || !isAdmin)) {
      navigate('/admin/login');
    }
  }, [user, isAdmin, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-purple-400 font-mono text-xs">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" />
          <span>Authenticating Admin Session...</span>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) return null;

  // Determine active tab from URL path
  const path = location.pathname;
  let activeTab = 'overview';
  let title = 'Dashboard Overview';
  let subtitle = 'Real-time metrics, live Supabase synchronization, and quick controls.';

  if (path === '/admin/students' || path.startsWith('/admin/students')) {
    activeTab = 'students';
    title = 'Student Registrations';
    subtitle = 'Search, manage, and verify all student applications and onboarding records.';
  } else if (path === '/admin/community' || path.startsWith('/admin/community')) {
    activeTab = 'community';
    title = 'Creator Community';
    subtitle = 'Spotlight student entrepreneurs, skill badges, and venture projects.';
  } else if (path === '/admin/programs' || path.startsWith('/admin/programs')) {
    activeTab = 'programs';
    title = 'Programs & Tracks';
    subtitle = '8 Digital Entrepreneurship tracks, curriculums, and live cohort enrolments.';
  } else if (path === '/admin/resources' || path.startsWith('/admin/resources')) {
    activeTab = 'resources';
    title = 'Knowledge Vault & Blog';
    subtitle = 'Publish markdown guides, case studies, and insights with Cloudinary art.';
  } else if (path === '/admin/announcements' || path.startsWith('/admin/announcements')) {
    activeTab = 'announcements';
    title = 'Announcements & Alerts';
    subtitle = 'Create pinned top banners and broadcast messages for all website visitors.';
  } else if (path === '/admin/enquiries' || path.startsWith('/admin/enquiries')) {
    activeTab = 'enquiries';
    title = 'Contact Enquiries Inbox';
    subtitle = 'Inbound partnership inquiries, incubation requests, and direct messaging.';
  } else if (path === '/admin/website-content' || path.startsWith('/admin/website-content')) {
    activeTab = 'website-content';
    title = 'Website Content CMS';
    subtitle = 'Live realtime editors for Hero, Mission, 5 Pillars, Contact, and Footer.';
  } else if (path === '/admin/settings' || path.startsWith('/admin/settings')) {
    activeTab = 'settings';
    title = 'Settings & Branding';
    subtitle = 'Global SEO, founder profile details, brand metadata, and social channels.';
  } else if (path === '/admin/media' || path.startsWith('/admin/media')) {
    activeTab = 'media';
    title = 'Cloudinary Media Library';
    subtitle = 'Direct unsigned image uploader and high-performance CDN asset delivery.';
  } else if (path === '/admin/security' || path.startsWith('/admin/security')) {
    activeTab = 'security';
    title = 'Security & Audit Logs';
    subtitle = 'Password management, old session invalidation, and immutable activity logs.';
  } else if (path === '/admin/profile' || path.startsWith('/admin/profile')) {
    activeTab = 'profile';
    title = 'Super Admin Profile';
    subtitle = 'Manage your admin credentials, avatar photo, and contact details.';
  }

  return (
    <AdminLayout title={title} subtitle={subtitle} activeTab={activeTab}>
      {activeTab === 'overview' && <OverviewTab />}
      {activeTab === 'students' && <StudentsTab />}
      {activeTab === 'community' && <CommunityTab />}
      {activeTab === 'programs' && <ProgramsTab />}
      {activeTab === 'resources' && <ResourcesTab />}
      {activeTab === 'announcements' && <AnnouncementsTab />}
      {activeTab === 'enquiries' && <EnquiriesTab />}
      {activeTab === 'website-content' && <WebsiteContentTab />}
      {activeTab === 'settings' && <SettingsTab />}
      {activeTab === 'media' && <MediaTab />}
      {activeTab === 'security' && <SecurityTab />}
      {activeTab === 'profile' && <ProfileTab />}
    </AdminLayout>
  );
};
