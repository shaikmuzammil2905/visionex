export type UserRole = 'member' | 'admin' | 'moderator';

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
  category_id?: string;
  category_name: string;
  tags: string[];
  author_name: string;
  author_role: string;
  read_time: string;
  is_featured: boolean;
  is_published: boolean;
  published_at: string;
  seo_title?: string;
  seo_description?: string;
  views_count: number;
  created_at: string;
  updated_at?: string;
}

export interface ContactRequest {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  is_read: boolean;
  status: 'new' | 'in_progress' | 'resolved' | 'archived';
  notes?: string;
  created_at: string;
}

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
  joined_at?: string;
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

export interface SiteSettings {
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
    alias: string;
    title: string;
    mission_quote: string;
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
