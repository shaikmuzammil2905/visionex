import { supabase, isSupabaseConfigured } from './supabase';
import {
  BlogPost,
  BlogCategory,
  ContactEnquiry,
  CommunityMember,
  CommunityEvent,
  NotificationItem,
  SiteSettings,
  UserProfile,
  Program,
  ProgramRegistration,
  Announcement,
  StudentRegistration,
  SocialLink,
  MediaItem,
  AdminActivityLog,
  WebsiteContentMap,
} from '../types';

// Initial seed categories
export const INITIAL_CATEGORIES: BlogCategory[] = [
  { id: 'cat-1', name: 'Digital Skills', slug: 'digital-skills', description: 'Practical digital capabilities, high-income skills, and modern tooling.' },
  { id: 'cat-2', name: 'Entrepreneurship', slug: 'entrepreneurship', description: 'Venture creation, business models, client acquisition, and scale.' },
  { id: 'cat-3', name: 'AI & Automation', slug: 'ai-automation', description: 'How artificial intelligence is rewriting the playbook for modern creators.' },
  { id: 'cat-4', name: 'Mindset & Vision', slug: 'mindset-vision', description: 'Income, health, family, purpose, and impact philosophy.' },
  { id: 'cat-5', name: '1 → 10 Case Studies', slug: 'case-studies', description: 'Stories of student creators generating real ripple effects.' },
];

// Initial seed programs
export const INITIAL_PROGRAMS: Program[] = [
  {
    id: 'prog-1',
    title: 'Full-Stack Web & MVP Engineering',
    slug: 'fullstack-web-engineering',
    category: 'technical',
    difficulty: 'Beginner to Advanced',
    timeframe: '8-12 Weeks',
    short_description: 'Learn modern React, Node.js, Next.js, and Supabase to build rapid web prototypes, client SaaS applications, and marketplace platforms.',
    full_description: 'Comprehensive engineering track covering frontend systems, relational databases, user authentication, and cloud deployments.',
    icon_name: 'Code',
    gradient_color: 'from-blue-500 to-indigo-500',
    tools: ['React', 'TypeScript', 'Supabase', 'Next.js', 'Vite', 'Tailwind'],
    venture_idea: 'Custom web portal or micro-SaaS subscription for local businesses.',
    status: 'published',
    is_featured: true,
    display_order: 1,
    location: 'Online Cohort',
    registration_link: '/register',
  },
  {
    id: 'prog-2',
    title: 'AI Tools, Agents & Workflow Automation',
    slug: 'ai-tools-agents-automation',
    category: 'technical',
    difficulty: 'All Levels',
    timeframe: '4-6 Weeks',
    short_description: 'Harness LLMs, n8n, Make, and Python scripting to automate business operations, lead qualification pipelines, customer Gmail reminders, and content synthesis.',
    full_description: 'Master practical AI systems that replace repetitive work with automated agents and intelligent pipelines.',
    icon_name: 'Cpu',
    gradient_color: 'from-purple-500 to-pink-500',
    tools: ['ChatGPT', 'Claude', 'n8n', 'Make.com', 'Zapier', 'Python', 'Gmail API'],
    venture_idea: 'AI workflow audit, automated CRM setup, and automated lead ordering reminder systems.',
    status: 'published',
    is_featured: true,
    display_order: 2,
    location: 'Online Cohort',
    registration_link: '/register',
  },
  {
    id: 'prog-3',
    title: 'Lead Ordering & Customer Gmail Reminders',
    slug: 'lead-ordering-gmail-reminders',
    category: 'growth',
    difficulty: 'Beginner to Intermediate',
    timeframe: '2-4 Weeks',
    short_description: 'Build automated Gmail reminder to customers for leads ordering, instant order confirmations, and automated client follow-up sequences.',
    full_description: 'Design and deploy client retention triggers, webhook-based ordering notifications, and transaction reminders.',
    icon_name: 'Mail',
    gradient_color: 'from-amber-500 to-rose-500',
    tools: ['Gmail API', 'Make.com', 'Zapier', 'Google Sheets', 'Webhooks'],
    venture_idea: 'Automated lead ordering and customer notification agency.',
    status: 'published',
    is_featured: true,
    display_order: 3,
    location: 'Online Cohort',
    registration_link: '/register',
  },
  {
    id: 'prog-4',
    title: 'Cross-Platform Mobile App Prototyping',
    slug: 'mobile-app-prototyping',
    category: 'technical',
    difficulty: 'Intermediate',
    timeframe: '8-10 Weeks',
    short_description: 'Build native iOS and Android applications with React Native and Flutter for student lifestyle, productivity, and local commerce.',
    full_description: 'Learn responsive native interfaces, device storage, push notifications, and app store deployment.',
    icon_name: 'Smartphone',
    gradient_color: 'from-cyan-500 to-blue-500',
    tools: ['React Native', 'Expo', 'Flutter', 'Firebase'],
    venture_idea: 'Niche campus utility or community marketplace app.',
    status: 'published',
    is_featured: false,
    display_order: 4,
    location: 'Online Cohort',
    registration_link: '/register',
  },
  {
    id: 'prog-5',
    title: 'UI/UX Product Design & Figma Mastery',
    slug: 'ui-ux-figma-mastery',
    category: 'growth',
    difficulty: 'Beginner to Intermediate',
    timeframe: '4-6 Weeks',
    short_description: 'Master user research, wireframing, high-fidelity Figma design systems, interactive prototypes, and conversion rate optimization.',
    full_description: 'Transform ideas into intuitive digital interfaces with enterprise design tokens and accessibility.',
    icon_name: 'Palette',
    gradient_color: 'from-violet-500 to-purple-500',
    tools: ['Figma', 'Framer', 'Design Tokens', 'UserTesting'],
    venture_idea: 'Landing page design agency delivering conversion-optimized layouts.',
    status: 'published',
    is_featured: false,
    display_order: 5,
    location: 'Online Cohort',
    registration_link: '/register',
  },
  {
    id: 'prog-6',
    title: 'Short-Form Video & Visual Storytelling',
    slug: 'video-storytelling',
    category: 'growth',
    difficulty: 'Beginner',
    timeframe: '3-5 Weeks',
    short_description: 'Master storytelling, CapCut editing, motion graphics, and algorithmic retention hooks for YouTube Shorts, Reels, and TikTok.',
    full_description: 'Produce high-converting video assets and personal brand narratives that drive viral reach.',
    icon_name: 'Video',
    gradient_color: 'from-amber-500 to-orange-500',
    tools: ['Premiere Pro', 'CapCut', 'After Effects', 'Descript'],
    venture_idea: 'Content repurposing and viral distribution partner for B2B founders.',
    status: 'published',
    is_featured: false,
    display_order: 6,
    location: 'Online Cohort',
    registration_link: '/register',
  },
  {
    id: 'prog-7',
    title: 'Performance Marketing & Lead Funnels',
    slug: 'performance-marketing-funnels',
    category: 'growth',
    difficulty: 'All Levels',
    timeframe: '6-8 Weeks',
    short_description: 'Master SEO, Google Search Console, meta advertising funnels, email automation sequences, Gmail reminder to customers for leads ordering, and analytical tracking.',
    full_description: 'Build quantifiable growth engines that generate qualified leads and high ROAS for digital businesses.',
    icon_name: 'Megaphone',
    gradient_color: 'from-emerald-500 to-teal-500',
    tools: ['Google Ads', 'Meta Ads', 'GA4', 'ConvertKit', 'Gmail API', 'SEMrush'],
    venture_idea: 'Performance lead generation boutique charging on pay-per-lead models.',
    status: 'published',
    is_featured: false,
    display_order: 7,
    location: 'Online Cohort',
    registration_link: '/register',
  },
  {
    id: 'prog-8',
    title: 'E-Commerce & Digital Asset Monetization',
    slug: 'ecommerce-digital-assets',
    category: 'venture',
    difficulty: 'Beginner to Intermediate',
    timeframe: '4-6 Weeks',
    short_description: 'Package templates, digital toolkits, specialized newsletters, and niche merchandise into high-margin automated storefronts.',
    full_description: 'Launch digital product storefronts with global payment integrations and instant digital delivery.',
    icon_name: 'ShoppingCart',
    gradient_color: 'from-pink-500 to-rose-500',
    tools: ['Shopify', 'Gumroad', 'Stripe', 'Notion'],
    venture_idea: 'Digital template store generating recurring passive royalties.',
    status: 'published',
    is_featured: false,
    display_order: 8,
    location: 'Online Cohort',
    registration_link: '/register',
  },
];

// Initial seed blog posts
export const INITIAL_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    title: 'The Shift: Why Students Must Transition From Job Seekers to Opportunity Creators',
    slug: 'shift-students-job-seekers-to-opportunity-creators',
    excerpt: 'Traditional career trajectories are experiencing unprecedented turbulence. Discover why cultivating digital entrepreneurship early gives students an unshakeable advantage.',
    content: `## The Modern Workplace Reality\n\nThe traditional playbook—study for four years, secure a single resume entry, and rely on standard corporate ladders—is facing systemic disruption. Automation, global talent distribution, and rapid AI adoption mean job markets demand proactive builders rather than passive seekers.\n\n### 1. The Power of Building in Public\nWhen a student creates a digital service, a micro-SaaS, a media asset, or a high-value niche community, they don't just gain resume points—they build leverage.\n\n* **Real Portfolio Value**: Code, design work, and client testimonials speak louder than grade sheets.\n* **Economic Autonomy**: Generating your first ₹10,000 to ₹1,00,000 online completely transforms your self-confidence.\n* **Compound Opportunity**: One digital asset can attract clients, mentors, co-founders, and investors worldwide.\n\n> "Don't just find your future. Build it." — THE VISIONEX\n\n### 2. Moving from 1 to 10\nThe essence of THE VISIONEX 1 → 10 philosophy is simple: when one student masters a high-income digital skill and builds a venture, they inevitably hire peers, delegate tasks, mentor juniors, and create a chain reaction of new opportunities.`,
    cover_image: '/hero-desk.jpg',
    category_id: 'cat-2',
    category_name: 'Entrepreneurship',
    tags: ['Entrepreneurship', 'Career', 'Future of Work', 'Students'],
    author_name: 'Rakhi Guptha',
    author_role: 'Founder, THE VISIONEX',
    read_time: '6 min read',
    is_featured: true,
    is_published: true,
    status: 'published',
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
    content: `## Beyond the Hustle: Sustainable Growth\n\nMany student creators burn out because they treat financial success as an isolated goal. At THE VISIONEX, we ground all entrepreneurial education in our 5 Core Pillars:\n\n### 1. Income 💰\nFinancial freedom is the oxygen of ambition. Creating legitimate, sustainable earning channels gives you choices, eliminates anxiety, and funds future innovation.\n\n### 2. Health ❤️\nYour physical vitality and mental clarity are non-negotiable. No revenue milestone is worth chronic burnout or broken wellness.\n\n### 3. Family 👨‍👩‍👧‍👦\nGrowth means little if you cannot protect, uplift, and share memorable time with those who believed in you from day one.\n\n### 4. Purpose 🎯\nKnowing *why* you build dictates *what* you build. Purpose turns mundane discipline into effortless long-term momentum.\n\n### 5. Opportunity 🚀\nThe ultimate culmination of your personal victory is opening doors for others. When you reach the top floor, remember to send the elevator back down.`,
    cover_image: '/hero-bg.png',
    category_id: 'cat-4',
    category_name: 'Mindset & Vision',
    tags: ['Philosophy', 'Mindset', 'Growth', '5 Pillars'],
    author_name: 'Rakhi Guptha',
    author_role: 'Founder, THE VISIONEX',
    read_time: '4 min read',
    is_featured: false,
    is_published: true,
    status: 'published',
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
    content: `## The Modern Student Tech Stack\n\nA decade ago, launching a functional digital software or agency required large teams and substantial capital. Today, an ambitious college student armed with modern AI tooling can match the output of an entire traditional department.\n\n### Key Focus Areas:\n1. **Accelerated Development**: Rapid prototyping with AI coding assistants and modern component systems.\n2. **Dynamic Content Engines**: High-fidelity visual creation, automated copywriting, and personalized marketing.\n3. **Workflow Automation**: Connecting CRM, payments, and client communication via smart pipelines.\n\nRather than fearing displacement, Visionex students leverage AI as a 10x force multiplier.`,
    cover_image: '/hero-desk.jpg',
    category_id: 'cat-3',
    category_name: 'AI & Automation',
    tags: ['AI Tools', 'Automation', 'Productivity', 'Tech'],
    author_name: 'Editorial Team',
    author_role: 'THE VISIONEX Research',
    read_time: '5 min read',
    is_featured: false,
    is_published: true,
    status: 'published',
    published_at: '2026-08-19T14:15:00Z',
    seo_title: 'AI Tools for Student Founders | THE VISIONEX',
    seo_description: 'Explore the modern AI tools enabling college students to build digital agencies and products faster than ever.',
    views_count: 850,
    created_at: '2026-08-19T14:15:00Z',
  },
];

// Initial seed announcements
export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    title: 'New Digital Entrepreneurship Bootcamp Launching Soon!',
    description: 'Join our upcoming 8-week cohort on Full-Stack MVP Engineering and AI Automation. Limited seats available for student builders.',
    link_url: '/digital-entrepreneurship',
    button_text: 'Explore Cohort',
    is_active: true,
    is_pinned: true,
    display_order: 1,
    created_at: new Date().toISOString(),
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

// Initial seed website content CMS sections
export const INITIAL_WEBSITE_CONTENT: WebsiteContentMap = {
  hero_section: {
    badge_text: 'THE FUTURE IS CREATED',
    title_line1: "DON'T JUST FIND YOUR FUTURE.",
    title_gradient_line2: 'BUILD IT.',
    subtitle: 'Learn. Build. Earn. Live. Empower.',
    primary_cta_text: 'Explore Our Mission',
    primary_cta_link: '/mission',
    secondary_cta_text: 'Join Community',
    secondary_cta_link: '/register',
    orbital_node_left_top: 'Continuous Skill Mastery',
    orbital_node_right_top: 'Independent Digital Income',
    orbital_node_left_bottom: 'Community Empowerment',
    orbital_node_right_bottom: 'The 1 → 10 Opportunity Mission',
  },
  mission_multiplier: {
    subtitle: 'THE MULTIPLIER EFFECT',
    heading_line1: 'The 1 → 10 Opportunity Mission',
    heading_gradient_line2: 'Creating Doors for Others',
    paragraph_1:
      'When 1 student launches a thriving digital venture, they unlock meaningful paid gigs, internships, and opportunities for 10+ student peers in their ecosystem.',
    paragraph_2:
      'We bridge the divide between academic theory and real economic empowerment through practical skill accelerators.',
    stat_left_number: '1 → 10',
    stat_left_label: 'Opportunity Multiplier',
    stat_right_number: '100%',
    stat_right_label: 'Proof of Work',
  },
  why_pillars: {
    badge_text: '5 CORE PILLARS',
    heading: 'The 5 Reasons Why Visionex Exists',
    pillars: [
      {
        id: 'income',
        title: 'Income & Cashflow Independence',
        description: 'Mastering digital capabilities that generate predictable client revenue.',
      },
      {
        id: 'health',
        title: 'Health & Peak Energy',
        description: 'Maintaining physical fitness and mental clarity while building ventures.',
      },
      {
        id: 'family',
        title: 'Family Freedom & Support',
        description: 'Providing security and meaningful time for those who matter most.',
      },
      {
        id: 'purpose',
        title: 'Purpose & Meaningful Work',
        description: 'Building assets that solve real problems with uncompromising integrity.',
      },
      {
        id: 'opportunity',
        title: '1 → 10 Opportunity Multiplication',
        description: 'Employing and empowering 10 other students once you succeed.',
      },
    ],
  },
  contact_section: {
    heading: "We'd Love to Hear From You",
    subtitle:
      'Have questions about student ventures, partnerships, speaking engagements, or joining the community? Reach out directly.',
    email: 'rakhiguptha26@gmail.com',
    phone: '9652553433',
    whatsapp: '7013429578',
    address: 'Hyderabad / Digital Campus, India',
  },
  footer: {
    tagline: "Don't just find your future. Build it.",
    copyright_text: '© 2026 THE VISIONEX. Founded by Rakhi Guptha ("Rakesh Voruganti"). All rights reserved.',
  },
};


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
    email: 'rakhiguptha26@gmail.com',
    address: 'Hyderabad, Telangana, India',
  },
  founder_info: {
    name: 'Rakhi Guptha',
    alias: 'Rakesh Voruganti',
    title: 'Founder & Visionary',
    mission_quote: 'One person can create more than an income. They can create opportunities.',
  },
  branding: {
    site_name: 'THE VISIONEX',
    tagline: "Don't just find your future. Build it.",
    logo_url: '/logo.png',
    favicon_url: '/favicon.ico',
  },
  social_media: {
    instagram: 'https://instagram.com/rakhiguptha26',
    facebook: 'https://facebook.com/thevisionex',
    linkedin: 'https://linkedin.com/company/thevisionex',
    youtube: 'https://youtube.com/@thevisionex',
    twitter: 'https://twitter.com/thevisionex',
    whatsapp: 'https://wa.me/917013429578',
  },
  seo: {
    meta_title: 'THE VISIONEX | Student Opportunity Creators & Digital Ventures',
    meta_description: 'Empowering students to transition from job seekers to opportunity creators through digital skills, AI automation, and venture blueprints.',
    keywords: 'student entrepreneurship, digital skills, AI automation, student startups, college founders, 1 to 10 mission',
    og_image: '/hero-bg.png',
  },
};

export const INITIAL_SOCIAL_LINKS: SocialLink[] = [
  { id: 'soc-1', platform: 'instagram', label: 'Instagram', url: 'https://instagram.com/rakhiguptha26', icon_name: 'Instagram', is_active: true, display_order: 1 },
  { id: 'soc-2', platform: 'whatsapp', label: 'WhatsApp', url: 'https://wa.me/917013429578', icon_name: 'MessageCircle', is_active: true, display_order: 2 },
  { id: 'soc-3', platform: 'linkedin', label: 'LinkedIn', url: 'https://linkedin.com/company/thevisionex', icon_name: 'Linkedin', is_active: true, display_order: 3 },
  { id: 'soc-4', platform: 'youtube', label: 'YouTube', url: 'https://youtube.com/@thevisionex', icon_name: 'Youtube', is_active: true, display_order: 4 },
  { id: 'soc-5', platform: 'twitter', label: 'X / Twitter', url: 'https://twitter.com/thevisionex', icon_name: 'Twitter', is_active: true, display_order: 5 },
];

// Storage keys
const STORAGE_KEYS = {
  POSTS: 'vx_blog_posts',
  CATEGORIES: 'vx_blog_categories',
  PROGRAMS: 'vx_programs',
  PROGRAM_REGS: 'vx_program_registrations',
  STUDENTS: 'vx_students',
  ANNOUNCEMENTS: 'vx_announcements',
  CONTACTS: 'vx_contact_requests',
  MEMBERS: 'vx_community_members',
  EVENTS: 'vx_community_events',
  NOTIFICATIONS: 'vx_notifications',
  SETTINGS: 'vx_site_settings',
  CONTENT: 'vx_website_content',
  SOCIALS: 'vx_social_links',
  MEDIA: 'vx_media_items',
  LOGS: 'vx_admin_activity_logs',
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
  // 1. PROGRAMS
  async getPrograms(): Promise<Program[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('programs')
          .select('*')
          .order('display_order', { ascending: true });
        if (!error && data && data.length > 0) return data as Program[];
      } catch (err) {
        console.warn('Supabase getPrograms error:', err);
      }
    }
    return getLocal<Program[]>(STORAGE_KEYS.PROGRAMS, INITIAL_PROGRAMS);
  },

  async saveProgram(program: Partial<Program> & { title: string }): Promise<Program> {
    const isNew = !program.id;
    const slug = program.slug || program.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newId = program.id || `prog-${Date.now()}`;
    const fullProg: Program = {
      id: newId,
      title: program.title,
      slug,
      category: program.category || 'technical',
      difficulty: program.difficulty || 'Beginner to Advanced',
      timeframe: program.timeframe || '4-8 Weeks',
      short_description: program.short_description || '',
      full_description: program.full_description || '',
      image_url: program.image_url,
      icon_name: program.icon_name || 'Code',
      gradient_color: program.gradient_color || 'from-purple-500 to-blue-500',
      tools: program.tools || [],
      venture_idea: program.venture_idea || '',
      start_date: program.start_date,
      end_date: program.end_date,
      location: program.location || 'Online Cohort',
      registration_link: program.registration_link || '/register',
      status: program.status || 'published',
      is_featured: program.is_featured ?? false,
      display_order: program.display_order || 1,
      created_at: program.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured && supabase) {
      try {
        if (isNew) {
          await supabase.from('programs').insert([fullProg]);
        } else {
          await supabase.from('programs').update(fullProg).eq('id', fullProg.id);
        }
      } catch (err) {
        console.warn('Supabase saveProgram error:', err);
      }
    }

    const list = getLocal<Program[]>(STORAGE_KEYS.PROGRAMS, INITIAL_PROGRAMS);
    const updated = isNew ? [fullProg, ...list] : list.map((p) => (p.id === fullProg.id ? fullProg : p));
    setLocal(STORAGE_KEYS.PROGRAMS, updated);
    return fullProg;
  },

  async deleteProgram(id: string): Promise<void> {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('programs').delete().eq('id', id);
      } catch (err) {
        console.warn('Supabase deleteProgram error:', err);
      }
    }
    const list = getLocal<Program[]>(STORAGE_KEYS.PROGRAMS, INITIAL_PROGRAMS);
    setLocal(STORAGE_KEYS.PROGRAMS, list.filter((p) => p.id !== id));
  },

  async duplicateProgram(id: string): Promise<Program | null> {
    const list = await this.getPrograms();
    const source = list.find((p) => p.id === id);
    if (!source) return null;
    const duplicated = await this.saveProgram({
      ...source,
      id: undefined,
      title: `${source.title} (Copy)`,
      slug: `${source.slug}-copy-${Date.now().toString().slice(-4)}`,
      status: 'draft',
    });
    return duplicated;
  },

  // 2. PROGRAM REGISTRATIONS
  async getProgramRegistrations(programId?: string): Promise<ProgramRegistration[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        let q = supabase.from('program_registrations').select('*').order('created_at', { ascending: false });
        if (programId) q = q.eq('program_id', programId);
        const { data, error } = await q;
        if (!error && data) return data as ProgramRegistration[];
      } catch (err) {
        console.warn('Supabase getProgramRegistrations error:', err);
      }
    }
    const list = getLocal<ProgramRegistration[]>(STORAGE_KEYS.PROGRAM_REGS, []);
    return programId ? list.filter((r) => r.program_id === programId) : list;
  },

  async saveProgramRegistration(reg: Omit<ProgramRegistration, 'id' | 'created_at'>): Promise<ProgramRegistration> {
    const fullReg: ProgramRegistration = {
      ...reg,
      id: `preg-${Date.now()}`,
      created_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('program_registrations').insert([fullReg]);
      } catch (err) {
        console.warn('Supabase saveProgramRegistration error:', err);
      }
    }

    const list = getLocal<ProgramRegistration[]>(STORAGE_KEYS.PROGRAM_REGS, []);
    setLocal(STORAGE_KEYS.PROGRAM_REGS, [fullReg, ...list]);
    return fullReg;
  },

  async deleteProgramRegistration(id: string): Promise<void> {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('program_registrations').delete().eq('id', id);
      } catch (err) {
        console.warn('Supabase deleteProgramRegistration error:', err);
      }
    }
    const list = getLocal<ProgramRegistration[]>(STORAGE_KEYS.PROGRAM_REGS, []);
    setLocal(STORAGE_KEYS.PROGRAM_REGS, list.filter((r) => r.id !== id));
  },

  // 3. STUDENTS / COMMUNITY REGISTRATIONS
  async getStudents(): Promise<StudentRegistration[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('students').select('*').order('created_at', { ascending: false });
        if (!error && data) return data as StudentRegistration[];
      } catch (err) {
        console.warn('Supabase getStudents error:', err);
      }
    }
    return getLocal<StudentRegistration[]>(STORAGE_KEYS.STUDENTS, []);
  },

  async saveStudentRegistration(student: Omit<StudentRegistration, 'id' | 'created_at' | 'status'> & { status?: StudentRegistration['status'] }): Promise<StudentRegistration> {
    const fullStudent: StudentRegistration = {
      ...student,
      id: `stud-${Date.now()}`,
      status: student.status || 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('students').insert([fullStudent]);
      } catch (err) {
        console.warn('Supabase saveStudentRegistration error:', err);
      }
    }

    const list = getLocal<StudentRegistration[]>(STORAGE_KEYS.STUDENTS, []);
    setLocal(STORAGE_KEYS.STUDENTS, [fullStudent, ...list]);
    return fullStudent;
  },

  async updateStudent(id: string, updates: Partial<StudentRegistration>): Promise<void> {
    const fullUpdates = { ...updates, updated_at: new Date().toISOString() };
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('students').update(fullUpdates).eq('id', id);
      } catch (err) {
        console.warn('Supabase updateStudent error:', err);
      }
    }
    const list = getLocal<StudentRegistration[]>(STORAGE_KEYS.STUDENTS, []);
    setLocal(STORAGE_KEYS.STUDENTS, list.map((s) => (s.id === id ? { ...s, ...fullUpdates } : s)));
  },

  async deleteStudent(id: string): Promise<void> {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('students').delete().eq('id', id);
      } catch (err) {
        console.warn('Supabase deleteStudent error:', err);
      }
    }
    const list = getLocal<StudentRegistration[]>(STORAGE_KEYS.STUDENTS, []);
    setLocal(STORAGE_KEYS.STUDENTS, list.filter((s) => s.id !== id));
  },

  // 4. ANNOUNCEMENTS
  async getAnnouncements(): Promise<Announcement[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('announcements').select('*').order('display_order', { ascending: true });
        if (!error && data && data.length > 0) return data as Announcement[];
      } catch (err) {
        console.warn('Supabase getAnnouncements error:', err);
      }
    }
    return getLocal<Announcement[]>(STORAGE_KEYS.ANNOUNCEMENTS, INITIAL_ANNOUNCEMENTS);
  },

  async saveAnnouncement(ann: Partial<Announcement> & { title: string; description: string }): Promise<Announcement> {
    const isNew = !ann.id;
    const fullAnn: Announcement = {
      id: ann.id || `ann-${Date.now()}`,
      title: ann.title,
      description: ann.description,
      image_url: ann.image_url,
      announcement_date: ann.announcement_date || new Date().toISOString(),
      link_url: ann.link_url || '/digital-entrepreneurship',
      button_text: ann.button_text || 'Learn More',
      is_active: ann.is_active ?? true,
      is_pinned: ann.is_pinned ?? false,
      display_order: ann.display_order || 1,
      created_at: ann.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured && supabase) {
      try {
        if (isNew) {
          await supabase.from('announcements').insert([fullAnn]);
        } else {
          await supabase.from('announcements').update(fullAnn).eq('id', fullAnn.id);
        }
      } catch (err) {
        console.warn('Supabase saveAnnouncement error:', err);
      }
    }

    const list = getLocal<Announcement[]>(STORAGE_KEYS.ANNOUNCEMENTS, INITIAL_ANNOUNCEMENTS);
    const updated = isNew ? [fullAnn, ...list] : list.map((a) => (a.id === fullAnn.id ? fullAnn : a));
    setLocal(STORAGE_KEYS.ANNOUNCEMENTS, updated);
    return fullAnn;
  },

  async deleteAnnouncement(id: string): Promise<void> {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('announcements').delete().eq('id', id);
      } catch (err) {
        console.warn('Supabase deleteAnnouncement error:', err);
      }
    }
    const list = getLocal<Announcement[]>(STORAGE_KEYS.ANNOUNCEMENTS, INITIAL_ANNOUNCEMENTS);
    setLocal(STORAGE_KEYS.ANNOUNCEMENTS, list.filter((a) => a.id !== id));
  },

  // 5. BLOG POSTS & RESOURCES
  async getPosts(): Promise<BlogPost[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
        if (!error && data && data.length > 0) return data as BlogPost[];
      } catch (err) {
        console.warn('Supabase getPosts error:', err);
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
    const fullPost: BlogPost = {
      ...post,
      id: post.id || `post-${Date.now()}`,
      created_at: post.id ? (post as BlogPost).created_at || new Date().toISOString() : new Date().toISOString(),
      updated_at: new Date().toISOString(),
      views_count: post.views_count || 0,
      status: post.status || (post.is_published ? 'published' : 'draft'),
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
    const updated = isNew ? [fullPost, ...posts] : posts.map((p) => (p.id === fullPost.id ? fullPost : p));
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

  async getCategories(): Promise<BlogCategory[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('blog_categories').select('*').order('name');
        if (!error && data && data.length > 0) return data as BlogCategory[];
      } catch (err) {
        console.warn('Supabase getCategories error:', err);
      }
    }
    return getLocal<BlogCategory[]>(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
  },

  // 6. CONTACT ENQUIRIES
  async getContactRequests(): Promise<ContactEnquiry[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('contact_enquiries').select('*').order('created_at', { ascending: false });
        if (!error && data) return data as ContactEnquiry[];
      } catch (err) {
        console.warn('Supabase getContactRequests error:', err);
      }
    }
    return getLocal<ContactEnquiry[]>(STORAGE_KEYS.CONTACTS, []);
  },

  async saveContactRequest(data: { name: string; email: string; phone?: string; subject: string; message: string }): Promise<ContactEnquiry> {
    const fullContact: ContactEnquiry = {
      id: `req-${Date.now()}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      subject: data.subject,
      message: data.message,
      is_read: false,
      status: 'new',
      created_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('contact_enquiries').insert([fullContact]);
      } catch (err) {
        console.warn('Supabase saveContactRequest error:', err);
      }
    }

    const list = getLocal<ContactEnquiry[]>(STORAGE_KEYS.CONTACTS, []);
    setLocal(STORAGE_KEYS.CONTACTS, [fullContact, ...list]);
    return fullContact;
  },

  async updateContactStatus(id: string, isRead: boolean, status: ContactEnquiry['status']): Promise<void> {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('contact_enquiries').update({ is_read: isRead, status }).eq('id', id);
      } catch (err) {
        console.warn('Supabase updateContactStatus error:', err);
      }
    }
    const list = getLocal<ContactEnquiry[]>(STORAGE_KEYS.CONTACTS, []);
    setLocal(STORAGE_KEYS.CONTACTS, list.map((c) => (c.id === id ? { ...c, is_read: isRead, status } : c)));
  },

  async deleteContactRequest(id: string): Promise<void> {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('contact_enquiries').delete().eq('id', id);
      } catch (err) {
        console.warn('Supabase deleteContactRequest error:', err);
      }
    }
    const list = getLocal<ContactEnquiry[]>(STORAGE_KEYS.CONTACTS, []);
    setLocal(STORAGE_KEYS.CONTACTS, list.filter((c) => c.id !== id));
  },

  // 7. WEBSITE CONTENT CMS
  async getWebsiteContent(): Promise<WebsiteContentMap> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('website_content').select('*');
        if (!error && data && data.length > 0) {
          const map: any = { ...INITIAL_WEBSITE_CONTENT };
          data.forEach((row: any) => {
            if (row.section_key && row.content) {
              map[row.section_key] = row.content;
            }
          });
          return map as WebsiteContentMap;
        }
      } catch (err) {
        console.warn('Supabase getWebsiteContent error:', err);
      }
    }
    return getLocal<WebsiteContentMap>(STORAGE_KEYS.CONTENT, INITIAL_WEBSITE_CONTENT);
  },

  async saveWebsiteContentSection<K extends keyof WebsiteContentMap>(sectionKey: K, content: WebsiteContentMap[K]): Promise<void> {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase
          .from('website_content')
          .upsert({ section_key: sectionKey, content, updated_at: new Date().toISOString() }, { onConflict: 'section_key' });
      } catch (err) {
        console.warn(`Supabase saveWebsiteContent (${sectionKey}) error:`, err);
      }
    }
    const current = getLocal<WebsiteContentMap>(STORAGE_KEYS.CONTENT, INITIAL_WEBSITE_CONTENT);
    const updated = { ...current, [sectionKey]: content };
    setLocal(STORAGE_KEYS.CONTENT, updated);
  },

  // 8. SITE SETTINGS
  async getSiteSettings(): Promise<SiteSettings> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('website_settings').select('*');
        if (!error && data && data.length > 0) {
          const settings: any = { ...INITIAL_SITE_SETTINGS };
          data.forEach((row: any) => {
            if (row.key && row.value) {
              settings[row.key] = row.value;
            }
          });
          return settings as SiteSettings;
        }
      } catch (err) {
        console.warn('Supabase getSiteSettings error:', err);
      }
    }
    return getLocal<SiteSettings>(STORAGE_KEYS.SETTINGS, INITIAL_SITE_SETTINGS);
  },

  async saveSiteSettings(settings: SiteSettings): Promise<void> {
    if (isSupabaseConfigured && supabase) {
      try {
        const entries = Object.entries(settings);
        for (const [key, value] of entries) {
          await supabase
            .from('website_settings')
            .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' });
        }
      } catch (err) {
        console.warn('Supabase saveSiteSettings error:', err);
      }
    }
    setLocal(STORAGE_KEYS.SETTINGS, settings);
  },

  // 9. SOCIAL LINKS
  async getSocialLinks(): Promise<SocialLink[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('social_links').select('*').order('display_order', { ascending: true });
        if (!error && data && data.length > 0) return data as SocialLink[];
      } catch (err) {
        console.warn('Supabase getSocialLinks error:', err);
      }
    }
    return getLocal<SocialLink[]>(STORAGE_KEYS.SOCIALS, INITIAL_SOCIAL_LINKS);
  },

  async saveSocialLink(link: Partial<SocialLink> & { platform: string; label: string; url: string }): Promise<SocialLink> {
    const isNew = !link.id;
    const fullLink: SocialLink = {
      id: link.id || `soc-${Date.now()}`,
      platform: link.platform,
      label: link.label,
      url: link.url,
      icon_name: link.icon_name || 'Link',
      is_active: link.is_active ?? true,
      display_order: link.display_order || 1,
    };

    if (isSupabaseConfigured && supabase) {
      try {
        if (isNew) {
          await supabase.from('social_links').insert([fullLink]);
        } else {
          await supabase.from('social_links').update(fullLink).eq('id', fullLink.id);
        }
      } catch (err) {
        console.warn('Supabase saveSocialLink error:', err);
      }
    }

    const list = getLocal<SocialLink[]>(STORAGE_KEYS.SOCIALS, INITIAL_SOCIAL_LINKS);
    const updated = isNew ? [...list, fullLink] : list.map((s) => (s.id === fullLink.id ? fullLink : s));
    setLocal(STORAGE_KEYS.SOCIALS, updated);
    return fullLink;
  },

  async deleteSocialLink(id: string): Promise<void> {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('social_links').delete().eq('id', id);
      } catch (err) {
        console.warn('Supabase deleteSocialLink error:', err);
      }
    }
    const list = getLocal<SocialLink[]>(STORAGE_KEYS.SOCIALS, INITIAL_SOCIAL_LINKS);
    setLocal(STORAGE_KEYS.SOCIALS, list.filter((s) => s.id !== id));
  },

  // 10. MEDIA ITEMS
  async getMediaItems(): Promise<MediaItem[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('media').select('*').order('created_at', { ascending: false });
        if (!error && data) return data as MediaItem[];
      } catch (err) {
        console.warn('Supabase getMediaItems error:', err);
      }
    }
    return getLocal<MediaItem[]>(STORAGE_KEYS.MEDIA, []);
  },

  async saveMediaItem(media: Omit<MediaItem, 'id' | 'created_at'>): Promise<MediaItem> {
    const fullMedia: MediaItem = {
      ...media,
      id: `media-${Date.now()}`,
      created_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('media').insert([fullMedia]);
      } catch (err) {
        console.warn('Supabase saveMediaItem error:', err);
      }
    }

    const list = getLocal<MediaItem[]>(STORAGE_KEYS.MEDIA, []);
    setLocal(STORAGE_KEYS.MEDIA, [fullMedia, ...list]);
    return fullMedia;
  },

  async deleteMediaItem(id: string): Promise<void> {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('media').delete().eq('id', id);
      } catch (err) {
        console.warn('Supabase deleteMediaItem error:', err);
      }
    }
    const list = getLocal<MediaItem[]>(STORAGE_KEYS.MEDIA, []);
    setLocal(STORAGE_KEYS.MEDIA, list.filter((m) => m.id !== id));
  },

  // 11. ADMIN ACTIVITY LOGS
  async getAdminActivityLogs(): Promise<AdminActivityLog[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('admin_activity_logs').select('*').order('created_at', { ascending: false }).limit(50);
        if (!error && data) return data as AdminActivityLog[];
      } catch (err) {
        console.warn('Supabase getAdminActivityLogs error:', err);
      }
    }
    return getLocal<AdminActivityLog[]>(STORAGE_KEYS.LOGS, []);
  },

  async logAdminActivity(adminEmail: string, action: string, entity: string, entityId?: string, details?: any): Promise<void> {
    const log: AdminActivityLog = {
      id: `log-${Date.now()}`,
      admin_email: adminEmail,
      action,
      entity,
      entity_id: entityId,
      details,
      created_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('admin_activity_logs').insert([log]);
      } catch (err) {
        console.warn('Supabase logAdminActivity error:', err);
      }
    }

    const list = getLocal<AdminActivityLog[]>(STORAGE_KEYS.LOGS, []);
    setLocal(STORAGE_KEYS.LOGS, [log, ...list.slice(0, 49)]);
  },

  // 12. COMMUNITY MEMBERS
  async getCommunityMembers(): Promise<CommunityMember[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('community_members').select('*').order('created_at', { ascending: false });
        if (!error && data && data.length > 0) return data as CommunityMember[];
      } catch (err) {
        console.warn('Supabase getCommunityMembers error:', err);
      }
    }
    return getLocal<CommunityMember[]>(STORAGE_KEYS.MEMBERS, INITIAL_COMMUNITY_MEMBERS);
  },

  async saveCommunityMember(member: Partial<CommunityMember> & { display_name: string; headline: string }): Promise<CommunityMember> {
    const isNew = !member.id;
    const fullMember: CommunityMember = {
      id: member.id || `mem-${Date.now()}`,
      display_name: member.display_name,
      headline: member.headline,
      skills: member.skills || [],
      venture_name: member.venture_name,
      location: member.location || 'India',
      avatar_url: member.avatar_url,
      linkedin_url: member.linkedin_url,
      twitter_url: member.twitter_url,
      github_url: member.github_url,
      is_featured: member.is_featured ?? true,
      created_at: member.created_at || new Date().toISOString(),
    };

    if (isSupabaseConfigured && supabase) {
      try {
        if (isNew) {
          await supabase.from('community_members').insert([fullMember]);
        } else {
          await supabase.from('community_members').update(fullMember).eq('id', fullMember.id);
        }
      } catch (err) {
        console.warn('Supabase saveCommunityMember error:', err);
      }
    }

    const list = getLocal<CommunityMember[]>(STORAGE_KEYS.MEMBERS, INITIAL_COMMUNITY_MEMBERS);
    const updated = isNew ? [fullMember, ...list] : list.map((m) => (m.id === fullMember.id ? fullMember : m));
    setLocal(STORAGE_KEYS.MEMBERS, updated);
    return fullMember;
  },

  async deleteCommunityMember(id: string): Promise<void> {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('community_members').delete().eq('id', id);
      } catch (err) {
        console.warn('Supabase deleteCommunityMember error:', err);
      }
    }
    const list = getLocal<CommunityMember[]>(STORAGE_KEYS.MEMBERS, INITIAL_COMMUNITY_MEMBERS);
    setLocal(STORAGE_KEYS.MEMBERS, list.filter((m) => m.id !== id));
  },

  // 13. COMMUNITY EVENTS
  async getEvents(): Promise<CommunityEvent[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('community_events').select('*').order('event_date', { ascending: true });
        if (!error && data && data.length > 0) return data as CommunityEvent[];
      } catch (err) {
        console.warn('Supabase getEvents error:', err);
      }
    }
    return getLocal<CommunityEvent[]>(STORAGE_KEYS.EVENTS, INITIAL_EVENTS);
  },

  async toggleEventRSVP(eventId: string): Promise<CommunityEvent[]> {
    const events = await this.getEvents();
    const updated = events.map((evt) => {
      if (evt.id === eventId) {
        const isReg = !evt.is_registered;
        return {
          ...evt,
          is_registered: isReg,
          registered_count: isReg ? evt.registered_count + 1 : Math.max(0, evt.registered_count - 1),
        };
      }
      return evt;
    });
    setLocal(STORAGE_KEYS.EVENTS, updated);
    return updated;
  },

  // 14. USERS & PROFILES
  async getUsers(): Promise<UserProfile[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
        if (!error && data) return data as UserProfile[];
      } catch (err) {
        console.warn('Supabase getUsers error:', err);
      }
    }
    return getLocal<UserProfile[]>(STORAGE_KEYS.USERS, []);
  },

  async updateUserRole(userId: string, role: UserProfile['role'], is_active: boolean): Promise<void> {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('profiles').update({ role, is_active, updated_at: new Date().toISOString() }).eq('id', userId);
      } catch (err) {
        console.warn('Supabase updateUserRole error:', err);
      }
    }
    const users = getLocal<UserProfile[]>(STORAGE_KEYS.USERS, []);
    setLocal(
      STORAGE_KEYS.USERS,
      users.map((u) => (u.id === userId ? { ...u, role, is_active } : u))
    );
  },

  async getNotifications(userId?: string): Promise<NotificationItem[]> {
    return [
      {
        id: 'notif-1',
        title: 'Welcome to THE VISIONEX',
        message: 'Explore our digital entrepreneurship tracks and begin building your proof of work.',
        type: 'success',
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
    ];
  },

  async getSavedResources(userId: string): Promise<string[]> {
    return getLocal<string[]>(`${STORAGE_KEYS.SAVED}_${userId}`, ['post-1']);
  },
};

