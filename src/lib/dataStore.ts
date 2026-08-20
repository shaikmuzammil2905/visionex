import { supabase, isSupabaseConfigured } from './supabase';
import { BlogPost, BlogCategory, ContactRequest, CommunityMember, CommunityEvent, NotificationItem, SiteSettings, SEOSettings, UserProfile } from '../types';

// Initial seed categories
export const INITIAL_CATEGORIES: BlogCategory[] = [
  { id: 'cat-1', name: 'Digital Skills', slug: 'digital-skills', description: 'Practical digital capabilities, high-income skills, and modern tooling.' },
  { id: 'cat-2', name: 'Entrepreneurship', slug: 'entrepreneurship', description: 'Venture creation, business models, client acquisition, and scale.' },
  { id: 'cat-3', name: 'AI & Automation', slug: 'ai-automation', description: 'How artificial intelligence is rewriting the playbook for modern creators.' },
  { id: 'cat-4', name: 'Mindset & Vision', slug: 'mindset-vision', description: 'Income, health, family, purpose, and impact philosophy.' },
  { id: 'cat-5', name: '1 → 10 Case Studies', slug: 'case-studies', description: 'Stories of student creators generating real ripple effects.' },
];

// Initial seed blog posts
export const INITIAL_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    title: 'The Shift: Why Students Must Transition From Job Seekers to Opportunity Creators',
    slug: 'shift-students-job-seekers-to-opportunity-creators',
    excerpt: 'Traditional career trajectories are experiencing unprecedented turbulence. Discover why cultivating digital entrepreneurship early gives students an unshakeable advantage.',
    content: `## The Modern Workplace Reality

The traditional playbook—study for four years, secure a single resume entry, and rely on standard corporate ladders—is facing systemic disruption. Automation, global talent distribution, and rapid AI adoption mean job markets demand proactive builders rather than passive seekers.

### 1. The Power of Building in Public
When a student creates a digital service, a micro-SaaS, a media asset, or a high-value niche community, they don't just gain resume points—they build leverage.

* **Real Portfolio Value**: Code, design work, and client testimonials speak louder than grade sheets.
* **Economic Autonomy**: Generating your first ₹10,000 to ₹1,00,000 online completely transforms your self-confidence.
* **Compound Opportunity**: One digital asset can attract clients, mentors, co-founders, and investors worldwide.

> "Don't just find your future. Build it." — THE VISIONEX

### 2. Moving from 1 to 10
The essence of THE VISIONEX 1 → 10 philosophy is simple: when one student masters a high-income digital skill and builds a venture, they inevitably hire peers, delegate tasks, mentor juniors, and create a chain reaction of new opportunities.`,
    cover_image: '/hero-desk.jpg',
    category_id: 'cat-2',
    category_name: 'Entrepreneurship',
    tags: ['Entrepreneurship', 'Career', 'Future of Work', 'Students'],
    author_name: 'Rakhi Guptha',
    author_role: 'Founder, THE VISIONEX',
    read_time: '6 min read',
    is_featured: true,
    is_published: true,
    published_at: '2026-08-15T10:00:00Z',
    seo_title: 'Why Students Must Transition to Opportunity Creators | THE VISIONEX',
    seo_description: 'Discover how student digital entrepreneurship creates financial autonomy, practical skills, and 10x community impact.',
    views_count: 1420,
    created_at: '2026-08-15T10:00:00Z',
  },
  {
    id: 'post-2',
    title: 'Mastering the 5 Pillars: Income, Health, Family, Purpose, and Opportunity',
    slug: 'mastering-the-5-pillars-income-health-family-purpose-opportunity',
    excerpt: 'Sustainable success is never one-dimensional. Explore the holistic framework that grounds every entrepreneur built within THE VISIONEX ecosystem.',
    content: `## Beyond the Hustle: Sustainable Growth

Many student creators burn out because they treat financial success as an isolated goal. At THE VISIONEX, we ground all entrepreneurial education in our 5 Core Pillars:

### 1. Income 💰
Financial freedom is the oxygen of ambition. Creating legitimate, sustainable earning channels gives you choices, eliminates anxiety, and funds future innovation.

### 2. Health ❤️
Your physical vitality and mental clarity are non-negotiable. No revenue milestone is worth chronic burnout or broken wellness.

### 3. Family 👨‍👩‍👧‍👦
Growth means little if you cannot protect, uplift, and share memorable time with those who believed in you from day one.

### 4. Purpose 🎯
Knowing *why* you build dictates *what* you build. Purpose turns mundane discipline into effortless long-term momentum.

### 5. Opportunity 🚀
The ultimate culmination of your personal victory is opening doors for others. When you reach the top floor, remember to send the elevator back down.`,
    cover_image: '/hero-bg.png',
    category_id: 'cat-4',
    category_name: 'Mindset & Vision',
    tags: ['Philosophy', 'Mindset', 'Growth', '5 Pillars'],
    author_name: 'Rakhi Guptha',
    author_role: 'Founder, THE VISIONEX',
    read_time: '4 min read',
    is_featured: false,
    is_published: true,
    published_at: '2026-08-18T09:30:00Z',
    seo_title: 'The 5 Pillars of Holistic Entrepreneurship | THE VISIONEX',
    seo_description: 'Learn why Income, Health, Family, Purpose, and Opportunity form the indestructible foundation for student founders.',
    views_count: 980,
    created_at: '2026-08-18T09:30:00Z',
  },
  {
    id: 'post-3',
    title: 'How AI Tools are Democratizing Digital Product Creation for College Students',
    slug: 'ai-tools-democratizing-digital-product-creation-students',
    excerpt: 'AI is not eliminating work—it is reshaping leverage. Learn how student creators are utilizing modern tools to build web apps, marketing campaigns, and digital agencies.',
    content: `## The Modern Student Tech Stack

A decade ago, launching a functional digital software or agency required large teams and substantial capital. Today, an ambitious college student armed with modern AI tooling can match the output of an entire traditional department.

### Key Focus Areas:
1. **Accelerated Development**: Rapid prototyping with AI coding assistants and modern component systems.
2. **Dynamic Content Engines**: High-fidelity visual creation, automated copywriting, and personalized marketing.
3. **Workflow Automation**: Connecting CRM, payments, and client communication via smart pipelines.

Rather than fearing displacement, Visionex students leverage AI as a 10x force multiplier.`,
    cover_image: '/hero-desk.jpg',
    category_id: 'cat-3',
    category_name: 'AI & Automation',
    tags: ['AI Tools', 'Automation', 'Productivity', 'Tech'],
    author_name: 'Editorial Team',
    author_role: 'THE VISIONEX Research',
    read_time: '5 min read',
    is_featured: false,
    is_published: true,
    published_at: '2026-08-19T14:15:00Z',
    seo_title: 'AI Tools for Student Founders | THE VISIONEX',
    seo_description: 'Explore the modern AI tools enabling college students to build digital agencies and products faster than ever.',
    views_count: 850,
    created_at: '2026-08-19T14:15:00Z',
  },
];

// Initial seed community members
export const INITIAL_COMMUNITY_MEMBERS: CommunityMember[] = [
  {
    id: 'mem-1',
    display_name: 'Aravind Kumar',
    headline: 'Full-Stack Developer & Micro-SaaS Builder',
    skills: ['React', 'Next.js', 'Supabase', 'TypeScript'],
    venture_name: 'DevFlow Hub',
    location: 'Hyderabad, India',
    is_featured: true,
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    linkedin_url: 'https://linkedin.com',
    github_url: 'https://github.com',
  },
  {
    id: 'mem-2',
    display_name: 'Sneha Reddy',
    headline: 'Digital Growth Strategist & UI/UX Specialist',
    skills: ['Figma', 'Personal Branding', 'Content Systems'],
    venture_name: 'ScaleCraft Digital',
    location: 'Bengaluru, India',
    is_featured: true,
    avatar_url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    linkedin_url: 'https://linkedin.com',
    twitter_url: 'https://twitter.com',
  },
  {
    id: 'mem-3',
    display_name: 'Rahul Sharma',
    headline: 'AI Automation Consultant & Student Creator',
    skills: ['Make.com', 'OpenAI API', 'Python', 'Zapier'],
    venture_name: 'AutoMorph Studio',
    location: 'Pune, India',
    is_featured: true,
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    linkedin_url: 'https://linkedin.com',
    github_url: 'https://github.com',
  },
];

// Initial seed community events
export const INITIAL_EVENTS: CommunityEvent[] = [
  {
    id: 'evt-1',
    title: 'The 1 → 10 Blueprint: Building Your First Digital Venture While in College',
    description: 'A deep-dive workshop with Rakhi Guptha and student founders on identifying high-leverage digital problems and acquiring your first clients.',
    event_date: '2026-08-28T18:00:00+05:30',
    location_type: 'online',
    meeting_link: 'https://meet.thevisionex.com/blueprint',
    host_name: 'Rakhi Guptha ("Rakesh Voruganti")',
    max_seats: 250,
    registered_count: 184,
    is_active: true,
  },
  {
    id: 'evt-2',
    title: 'AI Toolchains for Solo Founders & Freelancers',
    description: 'Hands-on live coding & automation session showing how to build client-ready deliverables in half the time.',
    event_date: '2026-09-04T19:00:00+05:30',
    location_type: 'online',
    meeting_link: 'https://meet.thevisionex.com/ai-toolchains',
    host_name: 'THE VISIONEX Tech Lead',
    max_seats: 200,
    registered_count: 120,
    is_active: true,
  },
];

// Initial seed site settings
export const INITIAL_SITE_SETTINGS: SiteSettings = {
  hero_content: {
    tag: 'THE FUTURE IS CREATED',
    headline: "DON'T JUST FIND YOUR FUTURE. BUILD IT.",
    subheadline: 'Learn. Build. Earn. Live. Empower.',
    supporting_text: 'We empower students to explore digital entrepreneurship, build real skills, create income and opportunities, and design a meaningful life.',
  },
  contact_info: {
    phone: '9652553433',
    whatsapp: '7013429578',
    email: 'contact@thevisionex.com',
    address: 'Hyderabad, Telangana, India',
  },
  founder_info: {
    name: 'Rakhi Guptha',
    alias: 'Rakesh Voruganti',
    title: 'Founder & Visionary',
    mission_quote: 'One person can create more than an income. They can create opportunities.',
  },
};

// Storage keys
const STORAGE_KEYS = {
  POSTS: 'vx_blog_posts',
  CATEGORIES: 'vx_blog_categories',
  CONTACTS: 'vx_contact_requests',
  MEMBERS: 'vx_community_members',
  EVENTS: 'vx_community_events',
  NOTIFICATIONS: 'vx_notifications',
  SETTINGS: 'vx_site_settings',
  SAVED: 'vx_saved_resources',
  USERS: 'vx_user_profiles',
};

// Safe local storage helpers
function getLocal<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function setLocal<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.warn('LocalStorage save error:', err);
  }
}

// -----------------------------------------------------------------------------
// UNIFIED DATA ACCESS LAYER
// -----------------------------------------------------------------------------
export const dataStore = {
  // BLOG POSTS
  async getPosts(): Promise<BlogPost[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .order('created_at', { ascending: false });
        if (!error && data && data.length > 0) return data as BlogPost[];
      } catch (err) {
        console.warn('Supabase getPosts fallback:', err);
      }
    }
    return getLocal<BlogPost[]>(STORAGE_KEYS.POSTS, INITIAL_POSTS);
  },

  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    const posts = await this.getPosts();
    return posts.find((p) => p.slug === slug) || null;
  },

  async savePost(post: Omit<BlogPost, 'id' | 'created_at'> & { id?: string }): Promise<BlogPost> {
    const isNew = !post.id;
    const newId = post.id || `post-${Date.now()}`;
    const fullPost: BlogPost = {
      ...post,
      id: newId,
      created_at: post.id ? (post as BlogPost).created_at || new Date().toISOString() : new Date().toISOString(),
      updated_at: new Date().toISOString(),
      views_count: post.views_count || 0,
    };

    if (isSupabaseConfigured && supabase) {
      try {
        if (isNew) {
          await supabase.from('blog_posts').insert([fullPost]);
        } else {
          await supabase.from('blog_posts').update(fullPost).eq('id', fullPost.id);
        }
      } catch (err) {
        console.warn('Supabase savePost error:', err);
      }
    }

    const posts = getLocal<BlogPost[]>(STORAGE_KEYS.POSTS, INITIAL_POSTS);
    const updated = isNew
      ? [fullPost, ...posts]
      : posts.map((p) => (p.id === fullPost.id ? fullPost : p));
    setLocal(STORAGE_KEYS.POSTS, updated);
    return fullPost;
  },

  async deletePost(id: string): Promise<void> {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('blog_posts').delete().eq('id', id);
      } catch (err) {
        console.warn('Supabase deletePost error:', err);
      }
    }
    const posts = getLocal<BlogPost[]>(STORAGE_KEYS.POSTS, INITIAL_POSTS);
    setLocal(STORAGE_KEYS.POSTS, posts.filter((p) => p.id !== id));
  },

  // CONTACT REQUESTS
  async getContactRequests(): Promise<ContactRequest[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('contact_requests')
          .select('*')
          .order('created_at', { ascending: false });
        if (!error && data) return data as ContactRequest[];
      } catch (err) {
        console.warn('Supabase getContactRequests fallback:', err);
      }
    }
    return getLocal<ContactRequest[]>(STORAGE_KEYS.CONTACTS, [
      {
        id: 'contact-demo-1',
        name: 'Vikas Sharma',
        email: 'vikas.dev@example.com',
        phone: '9876543210',
        subject: 'Student Entrepreneurship Community Inquiry',
        message: 'Hello, I am a 3rd year engineering student looking to join THE VISIONEX incubator cohort. How do I get started?',
        is_read: false,
        status: 'new',
        created_at: new Date().toISOString(),
      },
    ]);
  },

  async saveContactRequest(req: Omit<ContactRequest, 'id' | 'created_at' | 'is_read' | 'status'>): Promise<ContactRequest> {
    const newReq: ContactRequest = {
      ...req,
      id: `contact-${Date.now()}`,
      is_read: false,
      status: 'new',
      created_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('contact_requests').insert([newReq]);
      } catch (err) {
        console.warn('Supabase saveContactRequest error:', err);
      }
    }

    const contacts = getLocal<ContactRequest[]>(STORAGE_KEYS.CONTACTS, []);
    setLocal(STORAGE_KEYS.CONTACTS, [newReq, ...contacts]);
    return newReq;
  },

  async updateContactStatus(id: string, is_read: boolean, status: ContactRequest['status']): Promise<void> {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('contact_requests').update({ is_read, status }).eq('id', id);
      } catch (err) {
        console.warn('Supabase updateContactStatus error:', err);
      }
    }
    const contacts = getLocal<ContactRequest[]>(STORAGE_KEYS.CONTACTS, []);
    setLocal(
      STORAGE_KEYS.CONTACTS,
      contacts.map((c) => (c.id === id ? { ...c, is_read, status } : c))
    );
  },

  async deleteContactRequest(id: string): Promise<void> {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('contact_requests').delete().eq('id', id);
      } catch (err) {
        console.warn('Supabase deleteContactRequest error:', err);
      }
    }
    const contacts = getLocal<ContactRequest[]>(STORAGE_KEYS.CONTACTS, []);
    setLocal(STORAGE_KEYS.CONTACTS, contacts.filter((c) => c.id !== id));
  },

  // COMMUNITY MEMBERS
  async getCommunityMembers(): Promise<CommunityMember[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('community_members').select('*');
        if (!error && data && data.length > 0) return data as CommunityMember[];
      } catch (err) {
        console.warn('Supabase getCommunityMembers fallback:', err);
      }
    }
    return getLocal<CommunityMember[]>(STORAGE_KEYS.MEMBERS, INITIAL_COMMUNITY_MEMBERS);
  },

  // EVENTS
  async getEvents(): Promise<CommunityEvent[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('community_events').select('*');
        if (!error && data && data.length > 0) return data as CommunityEvent[];
      } catch (err) {
        console.warn('Supabase getEvents fallback:', err);
      }
    }
    return getLocal<CommunityEvent[]>(STORAGE_KEYS.EVENTS, INITIAL_EVENTS);
  },

  async toggleEventRSVP(eventId: string): Promise<CommunityEvent[]> {
    const events = await this.getEvents();
    const updated = events.map((e) => {
      if (e.id === eventId) {
        const isReg = !e.is_registered;
        return {
          ...e,
          is_registered: isReg,
          registered_count: isReg ? e.registered_count + 1 : Math.max(0, e.registered_count - 1),
        };
      }
      return e;
    });
    setLocal(STORAGE_KEYS.EVENTS, updated);
    return updated;
  },

  // NOTIFICATIONS
  async getNotifications(userId?: string): Promise<NotificationItem[]> {
    const list = getLocal<NotificationItem[]>(STORAGE_KEYS.NOTIFICATIONS, [
      {
        id: 'notif-1',
        title: 'Welcome to THE VISIONEX!',
        message: 'Start your journey from student to opportunity creator. Check out the 1 → 10 Mission.',
        type: 'announcement',
        is_read: false,
        created_at: new Date().toISOString(),
      },
      {
        id: 'notif-2',
        title: 'Upcoming Founder AMA',
        message: 'Join Rakhi Guptha live on Aug 28 for "The 1 → 10 Blueprint" session.',
        type: 'info',
        is_read: false,
        created_at: new Date().toISOString(),
      },
    ]);
    return userId ? list.filter((n) => !n.user_id || n.user_id === userId) : list;
  },

  async markNotificationRead(id: string): Promise<void> {
    const list = getLocal<NotificationItem[]>(STORAGE_KEYS.NOTIFICATIONS, []);
    setLocal(
      STORAGE_KEYS.NOTIFICATIONS,
      list.map((n) => (n.id === id ? { ...n, is_read: true } : n))
    );
  },

  // SAVED RESOURCES / BOOKMARKS
  async getSavedResources(userId: string): Promise<string[]> {
    const all = getLocal<Record<string, string[]>>(STORAGE_KEYS.SAVED, {});
    return all[userId] || [];
  },

  async toggleSavedResource(userId: string, postId: string): Promise<boolean> {
    const all = getLocal<Record<string, string[]>>(STORAGE_KEYS.SAVED, {});
    const userSaved = all[userId] || [];
    const exists = userSaved.includes(postId);
    const updated = exists ? userSaved.filter((id) => id !== postId) : [...userSaved, postId];
    all[userId] = updated;
    setLocal(STORAGE_KEYS.SAVED, all);
    return !exists;
  },

  // SITE SETTINGS
  async getSiteSettings(): Promise<SiteSettings> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('site_settings').select('*');
        if (!error && data) {
          const map: any = { ...INITIAL_SITE_SETTINGS };
          data.forEach((row) => {
            map[row.key] = row.value;
          });
          return map;
        }
      } catch (err) {
        console.warn('Supabase getSiteSettings fallback:', err);
      }
    }
    return getLocal<SiteSettings>(STORAGE_KEYS.SETTINGS, INITIAL_SITE_SETTINGS);
  },

  async saveSiteSettings(settings: SiteSettings): Promise<void> {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('site_settings').upsert([
          { key: 'hero_content', value: settings.hero_content },
          { key: 'contact_info', value: settings.contact_info },
          { key: 'founder_info', value: settings.founder_info },
        ]);
      } catch (err) {
        console.warn('Supabase saveSiteSettings error:', err);
      }
    }
    setLocal(STORAGE_KEYS.SETTINGS, settings);
  },

  // USER MANAGEMENT
  async getUsers(): Promise<UserProfile[]> {
    const list = getLocal<UserProfile[]>(STORAGE_KEYS.USERS, [
      {
        id: 'user-admin-1',
        email: 'admin@thevisionex.com',
        full_name: 'Rakhi Guptha ("Rakesh Voruganti")',
        role: 'admin',
        phone: '9652553433',
        bio: 'Founder of THE VISIONEX. Building the student opportunity creator movement.',
        avatar_url: '/founder.jpg',
        interests: ['Digital Entrepreneurship', 'AI Automation', 'Community'],
        is_active: true,
        created_at: '2026-08-01T00:00:00Z',
      },
      {
        id: 'user-demo-1',
        email: 'student@example.com',
        full_name: 'Aditya Varma',
        role: 'member',
        phone: '9876501234',
        bio: 'Aspiring digital creator and web designer exploring micro-agencies.',
        interests: ['Web Development', 'Digital Skills', 'Personal Branding'],
        is_active: true,
        created_at: '2026-08-10T12:00:00Z',
      },
    ]);
    return list;
  },

  async updateUserRole(userId: string, role: UserProfile['role'], is_active: boolean): Promise<void> {
    const users = getLocal<UserProfile[]>(STORAGE_KEYS.USERS, []);
    setLocal(
      STORAGE_KEYS.USERS,
      users.map((u) => (u.id === userId ? { ...u, role, is_active } : u))
    );
  },
};
