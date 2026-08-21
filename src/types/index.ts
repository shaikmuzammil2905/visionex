export type UserRole = 'member' | 'admin' | 'moderator' | 'super_admin';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  role: UserRole;
  bio?: string;
  avatar_url?: string;
  interests?: string[];
  is_active: boolean;
  created_at: string;
  updated_at?: string;
}

export interface StudentRegistration {
  id: string;
  full_name: string;
  email: string;
  mobile?: string;
  phone?: string;
  college?: string;
  college_name?: string;
  degree?: string;
  graduation_year?: string;
  age?: string;
  year?: string;
  city?: string;
  skills?: string | string[];
  motivation?: string;
  linkedin_url?: string;
  github_url?: string;
  how_heard?: string;
  status: 'active' | 'verified' | 'pending' | 'archived';
  notes?: string;
  created_at: string;
  updated_at?: string;
}

export interface Program {
  id: string;
  title: string;
  slug: string;
  category: 'technical' | 'growth' | 'venture' | 'ai' | 'all';
  difficulty?: string;
  difficulty_level?: string;
  timeframe?: string;
  duration_weeks?: string | number;
  short_description: string;
  description?: string;
  full_description?: string;
  image_url?: string;
  icon_name?: string;
  gradient_color?: string;
  tools?: string[];
  tools_covered?: string[];
  venture_idea?: string;
  start_date?: string;
  end_date?: string;
  location?: string;
  registration_link?: string;
  status: 'draft' | 'published' | 'archived';
  is_featured: boolean;
  display_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface ProgramRegistration {
  id: string;
  program_id?: string;
  program_title: string;
  student_name: string;
  student_email?: string;
  student_phone?: string;
  email: string;
  mobile?: string;
  college?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  created_at: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image?: string;
  video_url?: string;
  category_id?: string;
  category?: string;
  category_name: string;
  tags: string[];
  author_name: string;
  author_role: string;
  read_time: string;
  is_featured: boolean;
  is_published: boolean;
  status?: 'draft' | 'published' | 'unpublished';
  published_at: string;
  seo_title?: string;
  seo_description?: string;
  views_count: number;
  created_at: string;
  updated_at?: string;
}

export interface Announcement {
  id: string;
  title: string;
  description: string;
  image_url?: string;
  announcement_date?: string;
  link_url?: string;
  button_text?: string;
  is_active: boolean;
  is_pinned?: boolean;
  display_order?: number;
  created_at: string;
  updated_at?: string;
}

export interface ContactEnquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  is_read: boolean;
  status: 'new' | 'read' | 'replied' | 'closed' | 'in_progress' | 'resolved' | 'archived';
  notes?: string;
  created_at: string;
}

export type ContactRequest = ContactEnquiry;

export interface CommunityMember {
  id: string;
  user_id?: string;
  display_name: string;
  headline: string;
  skills: string[];
  venture_name?: string;
  location?: string;
  avatar_url?: string;
  linkedin_url?: string;
  twitter_url?: string;
  github_url?: string;
  is_featured?: boolean;
  created_at?: string;
}

export interface CommunityEvent {
  id: string;
  title: string;
  description: string;
  event_date: string;
  location_type: 'online' | 'in_person' | 'hybrid';
  meeting_link?: string;
  venue?: string;
  host_name: string;
  max_seats: number;
  registered_count: number;
  is_active: boolean;
  is_registered?: boolean;
}

export interface MediaItem {
  id: string;
  file_name?: string;
  filename?: string;
  file_url?: string;
  url?: string;
  public_id?: string;
  file_type?: string;
  format?: string;
  file_size?: number;
  bytes?: number;
  width?: number;
  height?: number;
  folder?: string;
  tags?: string[];
  created_at: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  label: string;
  url: string;
  icon_name?: string;
  is_active: boolean;
  display_order: number;
}

export interface AdminActivityLog {
  id: string;
  admin_email: string;
  action: string;
  entity: string;
  entity_id?: string;
  details?: Record<string, any>;
  created_at: string;
}

export interface NotificationItem {
  id: string;
  user_id?: string;
  title: string;
  message: string;
  link?: string;
  type: 'info' | 'success' | 'warning' | 'announcement';
  is_read: boolean;
  created_at: string;
}

export interface HeroContentCMS {
  badge_text: string;
  title_line1: string;
  title_gradient_line2: string;
  subtitle: string;
  primary_cta_text: string;
  primary_cta_link: string;
  secondary_cta_text: string;
  secondary_cta_link: string;
  orbital_node_left_top?: string;
  orbital_node_right_top?: string;
  orbital_node_left_bottom?: string;
  orbital_node_right_bottom?: string;
}

export interface MissionMultiplierCMS {
  subtitle: string;
  heading_line1: string;
  heading_gradient_line2: string;
  paragraph_1: string;
  paragraph_2: string;
  stat_left_number?: string;
  stat_left_label?: string;
  stat_right_number?: string;
  stat_right_label?: string;
}

export interface WhyPillarItem {
  id: string;
  title: string;
  description: string;
  sub_points?: string[];
}

export interface WhyPillarsCMS {
  badge?: string;
  badge_text?: string;
  headline?: string;
  subheadline?: string;
  heading?: string;
  pillars: WhyPillarItem[];
}

export interface ContactSectionCMS {
  badge?: string;
  headline?: string;
  subheadline?: string;
  heading?: string;
  subtitle?: string;
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  phone_label?: string;
  whatsapp_label?: string;
  email_label?: string;
  location_label?: string;
}

export interface FooterCMS {
  tagline: string;
  description?: string;
  copyright?: string;
  copyright_text?: string;
  badge_note?: string;
}

export interface WebsiteContentMap {
  hero_section: HeroContentCMS;
  mission_multiplier: MissionMultiplierCMS;
  why_pillars: WhyPillarsCMS;
  contact_section: ContactSectionCMS;
  footer: FooterCMS;
}

export interface SiteSettings {
  site_name?: string;
  site_tagline?: string;
  hero_content: {
    tag: string;
    headline: string;
    subheadline: string;
    supporting_text: string;
  };
  contact_info: {
    phone: string;
    whatsapp: string;
    email: string;
    address: string;
  };
  founder_info: {
    name: string;
    phone?: string;
    bio?: string;
    avatar_url?: string;
    alias?: string;
    title?: string;
    mission_quote?: string;
  };
  branding?: {
    site_name: string;
    tagline: string;
    logo_url: string;
    favicon_url?: string;
  };
  social_media?: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
    youtube?: string;
    twitter?: string;
    whatsapp?: string;
  };
  seo?: {
    meta_title: string;
    meta_description: string;
    keywords: string;
    og_image?: string;
  };
}

export interface SEOSettings {
  route_path: string;
  title: string;
  description: string;
  keywords?: string;
  og_image?: string;
  canonical_url?: string;
}
