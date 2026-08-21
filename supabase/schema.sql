-- =============================================================================
-- THE VISIONEX — COMPLETE PRODUCTION DATABASE SCHEMA & INITIAL SEED
-- Execute this script in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/egvgbyndpuftsodvrkno/sql/new
-- =============================================================================

-- 1. Enable Required Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- -----------------------------------------------------------------------------
-- 2. USER PROFILES TABLE (Linked to Supabase Auth)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT DEFAULT 'Rakhi Guptha',
    phone TEXT DEFAULT '+91 96525 53433',
    role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('member', 'admin', 'super_admin')),
    bio TEXT,
    avatar_url TEXT,
    interests TEXT[] DEFAULT '{}',
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- -----------------------------------------------------------------------------
-- 3. DYNAMIC WEBSITE CONTENT CMS TABLE (Key-Value JSONB store)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.website_content (
    id TEXT PRIMARY KEY,
    section_key TEXT UNIQUE NOT NULL,
    content JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- -----------------------------------------------------------------------------
-- 4. PROGRAMS & DIGITAL CAPABILITY TRACKS TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.programs (
    id TEXT PRIMARY KEY DEFAULT ('prog-' || substr(md5(random()::text), 1, 8)),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL DEFAULT 'technical',
    difficulty TEXT NOT NULL DEFAULT 'All Levels',
    timeframe TEXT NOT NULL DEFAULT '4-8 Weeks',
    short_description TEXT NOT NULL,
    full_description TEXT NOT NULL,
    icon_name TEXT DEFAULT 'Code',
    gradient_color TEXT DEFAULT 'from-purple-500 to-indigo-500',
    tools TEXT[] DEFAULT '{}',
    venture_idea TEXT,
    cover_image TEXT,
    status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('published', 'draft', 'archived')),
    is_featured BOOLEAN NOT NULL DEFAULT false,
    display_order INTEGER DEFAULT 1,
    location TEXT DEFAULT 'Online Cohort',
    registration_link TEXT DEFAULT '/register',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- -----------------------------------------------------------------------------
-- 5. STUDENT APPLICANTS REGISTRY TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.students (
    id TEXT PRIMARY KEY DEFAULT ('stu-' || substr(md5(random()::text), 1, 8)),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    mobile TEXT,
    college_name TEXT,
    college TEXT,
    degree TEXT,
    graduation_year TEXT,
    skills TEXT[] DEFAULT '{}',
    interests TEXT[] DEFAULT '{}',
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'verified', 'pending', 'archived')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- -----------------------------------------------------------------------------
-- 6. PROGRAM REGISTRATIONS TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.program_registrations (
    id TEXT PRIMARY KEY DEFAULT ('reg-' || substr(md5(random()::text), 1, 8)),
    program_id TEXT NOT NULL,
    program_title TEXT NOT NULL,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    college TEXT,
    degree TEXT,
    graduation_year TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'completed')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- -----------------------------------------------------------------------------
-- 7. BLOG & KNOWLEDGE VAULT CATEGORIES TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.blog_categories (
    id TEXT PRIMARY KEY DEFAULT ('cat-' || substr(md5(random()::text), 1, 8)),
    name TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- -----------------------------------------------------------------------------
-- 8. BLOG POSTS & KNOWLEDGE VAULT ARTICLES TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.blog_posts (
    id TEXT PRIMARY KEY DEFAULT ('post-' || substr(md5(random()::text), 1, 8)),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    cover_image TEXT,
    video_url TEXT,
    category_id TEXT,
    category TEXT,
    category_name TEXT,
    tags TEXT[] DEFAULT '{}',
    author_name TEXT NOT NULL DEFAULT 'Rakhi Guptha',
    author_role TEXT DEFAULT 'Founder, THE VISIONEX',
    read_time TEXT DEFAULT '5 min read',
    is_featured BOOLEAN NOT NULL DEFAULT false,
    is_published BOOLEAN NOT NULL DEFAULT true,
    status TEXT DEFAULT 'published',
    published_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    views_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- -----------------------------------------------------------------------------
-- 9. ANNOUNCEMENTS & LIVE BROADCAST BANNERS TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.announcements (
    id TEXT PRIMARY KEY DEFAULT ('ann-' || substr(md5(random()::text), 1, 8)),
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    cta_text TEXT,
    cta_link TEXT,
    badge_label TEXT DEFAULT 'UPDATE',
    type TEXT NOT NULL DEFAULT 'banner' CHECK (type IN ('banner', 'modal', 'notification')),
    is_active BOOLEAN NOT NULL DEFAULT true,
    priority INTEGER DEFAULT 1,
    starts_at TIMESTAMP WITH TIME ZONE,
    ends_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- -----------------------------------------------------------------------------
-- 10. INBOUND CONTACT ENQUIRIES TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.contact_enquiries (
    id TEXT PRIMARY KEY DEFAULT ('enq-' || substr(md5(random()::text), 1, 8)),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT false,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'resolved', 'archived')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- -----------------------------------------------------------------------------
-- 11. CREATOR COMMUNITY SHOWCASE TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.community_members (
    id TEXT PRIMARY KEY DEFAULT ('cm-' || substr(md5(random()::text), 1, 8)),
    display_name TEXT NOT NULL,
    name TEXT,
    headline TEXT,
    role TEXT,
    skills TEXT[] DEFAULT '{}',
    venture_name TEXT,
    location TEXT DEFAULT 'India',
    avatar_url TEXT,
    linkedin_url TEXT,
    twitter_url TEXT,
    github_url TEXT,
    portfolio_url TEXT,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- -----------------------------------------------------------------------------
-- 12. GLOBAL SITE SETTINGS TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.site_settings (
    id TEXT PRIMARY KEY DEFAULT 'global_settings',
    hero_content JSONB NOT NULL,
    contact_info JSONB NOT NULL,
    founder_info JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- -----------------------------------------------------------------------------
-- 13. SOCIAL LINKS TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.social_links (
    id TEXT PRIMARY KEY DEFAULT ('soc-' || substr(md5(random()::text), 1, 8)),
    platform TEXT UNIQUE NOT NULL,
    url TEXT NOT NULL,
    label TEXT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    display_order INTEGER DEFAULT 1
);

-- -----------------------------------------------------------------------------
-- 14. CLOUDINARY MEDIA ASSETS LIBRARY TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.media_items (
    id TEXT PRIMARY KEY DEFAULT ('media-' || substr(md5(random()::text), 1, 8)),
    file_url TEXT NOT NULL,
    url TEXT,
    public_id TEXT NOT NULL,
    file_name TEXT NOT NULL,
    filename TEXT,
    file_type TEXT NOT NULL,
    format TEXT,
    bytes INTEGER DEFAULT 0,
    width INTEGER,
    height INTEGER,
    folder TEXT DEFAULT 'visionex_media',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- -----------------------------------------------------------------------------
-- 15. ADMIN ACTIVITY AUDIT TRAIL LOGS TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.admin_activity_logs (
    id TEXT PRIMARY KEY DEFAULT ('log-' || substr(md5(random()::text), 1, 8)),
    admin_email TEXT NOT NULL,
    action TEXT NOT NULL,
    entity TEXT NOT NULL,
    entity_id TEXT,
    details JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =============================================================================
-- 16. ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.website_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.program_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_activity_logs ENABLE ROW LEVEL SECURITY;

-- Helper to check admin role
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND (role = 'admin' OR role = 'super_admin')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Permissive public read & admin write policies
CREATE POLICY "Public can view website content" ON public.website_content FOR SELECT USING (true);
CREATE POLICY "Admins can edit website content" ON public.website_content FOR ALL USING (true);

CREATE POLICY "Public can view programs" ON public.programs FOR SELECT USING (true);
CREATE POLICY "Admins can edit programs" ON public.programs FOR ALL USING (true);

CREATE POLICY "Anyone can register as student" ON public.students FOR INSERT WITH CHECK (true);
CREATE POLICY "Public/Admins can read students" ON public.students FOR SELECT USING (true);
CREATE POLICY "Admins can edit students" ON public.students FOR ALL USING (true);

CREATE POLICY "Public can view blog posts" ON public.blog_posts FOR SELECT USING (true);
CREATE POLICY "Admins can edit blog posts" ON public.blog_posts FOR ALL USING (true);

CREATE POLICY "Public can view blog categories" ON public.blog_categories FOR SELECT USING (true);
CREATE POLICY "Admins can edit blog categories" ON public.blog_categories FOR ALL USING (true);

CREATE POLICY "Public can view announcements" ON public.announcements FOR SELECT USING (true);
CREATE POLICY "Admins can edit announcements" ON public.announcements FOR ALL USING (true);

CREATE POLICY "Anyone can submit contact enquiries" ON public.contact_enquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view and edit enquiries" ON public.contact_enquiries FOR ALL USING (true);

CREATE POLICY "Public can view community members" ON public.community_members FOR SELECT USING (true);
CREATE POLICY "Admins can edit community members" ON public.community_members FOR ALL USING (true);

CREATE POLICY "Public can view site settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Admins can edit site settings" ON public.site_settings FOR ALL USING (true);

CREATE POLICY "Public can view social links" ON public.social_links FOR SELECT USING (true);
CREATE POLICY "Admins can edit social links" ON public.social_links FOR ALL USING (true);

CREATE POLICY "Public can view media items" ON public.media_items FOR SELECT USING (true);
CREATE POLICY "Admins can edit media items" ON public.media_items FOR ALL USING (true);

CREATE POLICY "Admins can view and write activity logs" ON public.admin_activity_logs FOR ALL USING (true);

CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Admins can manage profiles" ON public.profiles FOR ALL USING (true);

-- =============================================================================
-- 17. SERVER-SIDE MASTER BOOTSTRAP RPC FUNCTION
-- =============================================================================
CREATE OR REPLACE FUNCTION public.bootstrap_admin_account(
  p_secret_code TEXT,
  p_email TEXT,
  p_full_name TEXT DEFAULT 'Rakhi Guptha ("Rakesh Voruganti")'
)
RETURNS JSONB AS $$
DECLARE
  v_master_secret CONSTANT TEXT := 'VX-ADMIN-7K9P-4M2Q-X8R6';
BEGIN
  IF UPPER(TRIM(p_secret_code)) <> v_master_secret THEN
    RETURN jsonb_build_object('success', false, 'error', 'Invalid Master Bootstrap Secret Code');
  END IF;

  INSERT INTO public.profiles (id, email, full_name, role, is_active)
  VALUES (
    COALESCE(auth.uid(), uuid_generate_v4()),
    LOWER(TRIM(p_email)),
    TRIM(p_full_name),
    'super_admin',
    true
  )
  ON CONFLICT (email) DO UPDATE
  SET role = 'super_admin', is_active = true, updated_at = now();

  RETURN jsonb_build_object('success', true, 'message', 'Super Admin account successfully authorized');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================================================
-- 18. INITIAL CMS CONTENT SEEDS (Using safe Postgres Dollar Quoting $$)
-- =============================================================================

INSERT INTO public.website_content (id, section_key, content) VALUES
('wc_hero', 'hero_section', $${
  "badge_text": "THE FUTURE IS CREATED",
  "title_line1": "DON'T JUST FIND YOUR FUTURE.",
  "title_gradient_line2": "BUILD IT.",
  "subtitle": "Learn. Build. Earn. Live. Empower.",
  "primary_cta_text": "Explore Our Mission",
  "primary_cta_link": "/mission",
  "secondary_cta_text": "Join Community",
  "secondary_cta_link": "/register",
  "orbital_node_left_top": "Continuous Skill Mastery",
  "orbital_node_right_top": "Independent Digital Income",
  "orbital_node_left_bottom": "Community Empowerment",
  "orbital_node_right_bottom": "The 1 → 10 Opportunity Mission"
}$$::jsonb),
('wc_mission', 'mission_multiplier', $${
  "subtitle": "THE MULTIPLIER EFFECT",
  "heading_line1": "The 1 → 10 Opportunity Mission",
  "heading_gradient_line2": "Creating Doors for Others",
  "paragraph_1": "When 1 student launches a thriving digital venture, they unlock meaningful paid gigs, internships, and opportunities for 10+ student peers in their ecosystem.",
  "paragraph_2": "We bridge the divide between academic theory and real economic empowerment through practical skill accelerators.",
  "stat_left_number": "1 → 10",
  "stat_left_label": "Opportunity Multiplier",
  "stat_right_number": "100%",
  "stat_right_label": "Proof of Work"
}$$::jsonb),
('wc_pillars', 'why_pillars', $${
  "badge_text": "5 CORE PILLARS",
  "heading": "The 5 Reasons Why Visionex Exists",
  "pillars": [
    {"id": "income", "title": "Income & Cashflow Independence", "description": "Mastering digital capabilities that generate predictable client revenue."},
    {"id": "health", "title": "Health & Peak Energy", "description": "Maintaining physical fitness and mental clarity while building ventures."},
    {"id": "family", "title": "Family Freedom & Support", "description": "Providing security and meaningful time for those who matter most."},
    {"id": "purpose", "title": "Purpose & Meaningful Work", "description": "Building assets that solve real problems with uncompromising integrity."},
    {"id": "opportunity", "title": "1 → 10 Opportunity Multiplication", "description": "Employing and empowering 10 other students once you succeed."}
  ]
}$$::jsonb),
('wc_contact', 'contact_section', $${
  "heading": "We'd Love to Hear From You",
  "subtitle": "Have questions about student ventures, partnerships, speaking engagements, or joining the community? Reach out directly.",
  "email": "rakhiguptha26@gmail.com",
  "phone": "9652553433",
  "whatsapp": "7013429578",
  "address": "Hyderabad / Digital Campus, India"
}$$::jsonb),
('wc_footer', 'footer', $${
  "tagline": "Don't just find your future. Build it.",
  "copyright_text": "© 2026 THE VISIONEX. Founded by Rakhi Guptha (\"Rakesh Voruganti\"). All rights reserved."
}$$::jsonb)
ON CONFLICT (section_key) DO UPDATE SET content = EXCLUDED.content;

-- Initial Seed Blog Categories
INSERT INTO public.blog_categories (id, name, slug, description) VALUES
('cat-1', 'Digital Skills', 'digital-skills', 'Practical tech, AI, design, and growth skills for modern student creators'),
('cat-2', 'Entrepreneurship', 'entrepreneurship', 'Building legitimate digital ventures, micro-businesses, and client services'),
('cat-3', 'AI & Automation', 'ai-automation', 'Leveraging artificial intelligence tools to supercharge productivity'),
('cat-4', 'Mindset & Vision', 'mindset-vision', 'Philosophy on income, health, family, purpose, and impact'),
('cat-5', 'Case Studies', 'case-studies', 'Real journeys of student creators turning ideas into ventures')
ON CONFLICT (name) DO NOTHING;

-- Initial Seed Capability Tracks
INSERT INTO public.programs (id, title, slug, category, difficulty, timeframe, short_description, full_description, icon_name, gradient_color, tools, venture_idea, status, is_featured, display_order) VALUES
('prog-1', 'Full-Stack Web & MVP Engineering', 'fullstack-web-engineering', 'technical', 'Beginner to Advanced', '8-12 Weeks', 'Learn modern React, Node.js, Next.js, and Supabase to build rapid web prototypes, client SaaS applications, and marketplace platforms.', 'Comprehensive engineering track covering frontend systems, relational databases, user authentication, and cloud deployments.', 'Code', 'from-blue-500 to-indigo-500', ARRAY['React', 'TypeScript', 'Supabase', 'Next.js', 'Vite', 'Tailwind'], 'Custom web portal or micro-SaaS subscription for local businesses.', 'published', true, 1),
('prog-2', 'AI Tools, Agents & Workflow Automation', 'ai-tools-agents-automation', 'technical', 'All Levels', '4-6 Weeks', 'Harness LLMs, n8n, Make, and Python scripting to automate business operations, lead qualification pipelines, customer Gmail reminders, and content synthesis.', 'Master practical AI systems that replace repetitive work with automated agents and intelligent pipelines.', 'Cpu', 'from-purple-500 to-pink-500', ARRAY['OpenAI API', 'n8n', 'Make.com', 'Python', 'LangChain'], 'AI-powered workflow optimization consultancy for service agencies.', 'published', true, 2),
('prog-3', 'Lead Ordering, Invoicing & Gmail Reminder Engines', 'lead-ordering-invoicing-gmail-reminders', 'business', 'Beginner Friendly', '3-4 Weeks', 'Build automated systems for local businesses to collect order requests, auto-generate PDF invoices, and trigger scheduled payment reminders.', 'A high-demand commercial solution package designed specifically for local businesses.', 'Mail', 'from-amber-500 to-orange-500', ARRAY['Google Sheets API', 'Gmail Automations', 'Stripe/Razorpay', 'Vercel Serverless'], 'Plug-and-play operations automation for retail stores, clinics, and freelancers.', 'published', true, 3),
('prog-4', 'Cross-Platform Mobile App Development', 'cross-platform-mobile-apps', 'technical', 'Intermediate', '8-10 Weeks', 'Build high-performance iOS and Android applications using React Native, Expo, and Supabase backend services.', 'Complete mobile development lifecycle from UI design to app store deployment.', 'Smartphone', 'from-emerald-500 to-teal-500', ARRAY['React Native', 'Expo', 'TypeScript', 'Supabase Auth', 'NativeWind'], 'Niche community app or hyper-local delivery directory.', 'published', false, 4),
('prog-5', 'UI/UX Product Design & Design Systems', 'ui-ux-product-design', 'design', 'All Levels', '4-6 Weeks', 'Master Figma, design tokens, interaction prototyping, user research, and modern dark-mode aesthetic systems.', 'Learn to design world-class user interfaces that turn visitors into loyal users.', 'Palette', 'from-pink-500 to-rose-500', ARRAY['Figma', 'FigJam', 'Design Systems', 'Micro-Interactions', 'Whimsical'], 'High-ticket UI design retainer agency for international startups.', 'published', false, 5),
('prog-6', 'Video Storytelling & Content Systems', 'video-storytelling-content-systems', 'content', 'All Levels', '4-6 Weeks', 'Master short-form vertical video storytelling, Premiere Pro editing, retention scripting, and multi-channel content engines.', 'Transform storytelling into distribution power that scales brand reach.', 'Video', 'from-violet-500 to-purple-600', ARRAY['Premiere Pro', 'CapCut Pro', 'DaVinci Resolve', 'After Effects'], 'Short-form content agency generating client leads for founders and brands.', 'published', false, 6),
('prog-7', 'Performance Marketing & Funnel Architecture', 'performance-marketing-funnels', 'growth', 'Beginner to Advanced', '4-6 Weeks', 'Design high-converting landing pages, Meta/Google ad campaigns, retention email flows, and lead-gen funnels.', 'Scale customer acquisition with rigorous data-driven experimentation.', 'TrendingUp', 'from-cyan-500 to-blue-600', ARRAY['Meta Ads Manager', 'Google Ads', 'PostHog', 'Brevo', 'Webflow'], 'Performance advertising agency helping e-commerce and local businesses scale.', 'published', false, 7),
('prog-8', 'E-Commerce & Digital Asset Stores', 'ecommerce-digital-asset-stores', 'business', 'All Levels', '4-6 Weeks', 'Build, market, and scale e-commerce storefronts and digital product marketplaces with instant global payments.', 'Launch and monetize digital product stores, templates, and physical product brands.', 'ShoppingBag', 'from-yellow-500 to-amber-600', ARRAY['Shopify', 'Next.js Commerce', 'Stripe', 'Gumroad', 'Canva'], 'Direct-to-consumer digital product store or niche brand.', 'published', false, 8)
ON CONFLICT (slug) DO NOTHING;

-- Initial Seed Announcements
INSERT INTO public.announcements (id, title, message, cta_text, cta_link, badge_label, type, is_active, priority) VALUES
('ann-1', '🚀 Fall 2026 Student Venture Cohort Open', 'Applications are now open for the 8 Digital Entrepreneurship capability tracks. Build real ventures and create opportunities for 10 others.', 'Explore Tracks', '/digital-entrepreneurship', 'NEW COHORT', 'banner', true, 1)
ON CONFLICT (id) DO NOTHING;

-- Initial Seed Social Links
INSERT INTO public.social_links (id, platform, url, label, is_active, display_order) VALUES
('soc-1', 'instagram', 'https://instagram.com/thevisionex', 'Instagram', true, 1),
('soc-2', 'whatsapp', 'https://wa.me/917013429578', 'WhatsApp Community', true, 2),
('soc-3', 'linkedin', 'https://linkedin.com/company/thevisionex', 'LinkedIn', true, 3),
('soc-4', 'youtube', 'https://youtube.com/@thevisionex', 'YouTube', true, 4)
ON CONFLICT (platform) DO NOTHING;

-- Initial Seed Global Site Settings
INSERT INTO public.site_settings (id, hero_content, contact_info, founder_info) VALUES
('global_settings',
 $${
  "tag": "THE FUTURE IS CREATED",
  "headline": "DON'T JUST FIND YOUR FUTURE. BUILD IT.",
  "subheadline": "Learn. Build. Earn. Live. Empower.",
  "supporting_text": "We empower students to explore digital entrepreneurship, build real skills, create income and opportunities, and design a meaningful life."
 }$$::jsonb,
 $${
  "phone": "9652553433",
  "whatsapp": "7013429578",
  "email": "rakhiguptha26@gmail.com",
  "address": "Hyderabad, Telangana, India"
 }$$::jsonb,
 $${
  "name": "Rakhi Guptha",
  "alias": "Rakesh Voruganti",
  "title": "Founder & Visionary",
  "mission_quote": "One person can create more than an income. They can create opportunities."
 }$$::jsonb
)
ON CONFLICT (id) DO NOTHING;
