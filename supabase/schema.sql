-- =============================================================================
-- THE VISIONEX - SUPABASE DATABASE SCHEMA & ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================================================

-- Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- -----------------------------------------------------------------------------
-- 1. PROFILES TABLE (Linked with Supabase Auth auth.users)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    phone TEXT,
    role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('member', 'admin', 'moderator')),
    bio TEXT,
    avatar_url TEXT,
    interests TEXT[] DEFAULT '{}',
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- -----------------------------------------------------------------------------
-- 2. BLOG CATEGORIES TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.blog_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    icon TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- -----------------------------------------------------------------------------
-- 3. BLOG POSTS TABLE (CMS for Resources/Articles)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    cover_image TEXT,
    category_id UUID REFERENCES public.blog_categories(id) ON DELETE SET NULL,
    category_name TEXT,
    tags TEXT[] DEFAULT '{}',
    author_name TEXT NOT NULL DEFAULT 'THE VISIONEX Team',
    author_role TEXT DEFAULT 'Editorial Team',
    read_time TEXT DEFAULT '5 min read',
    is_featured BOOLEAN NOT NULL DEFAULT false,
    is_published BOOLEAN NOT NULL DEFAULT true,
    published_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    seo_title TEXT,
    seo_description TEXT,
    views_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- -----------------------------------------------------------------------------
-- 4. CONTACT REQUESTS TABLE (Lead & Inquiry Submissions)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.contact_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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
-- 5. COMMUNITY MEMBERS TABLE (Public or Verified Directory)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.community_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    display_name TEXT NOT NULL,
    headline TEXT,
    skills TEXT[] DEFAULT '{}',
    venture_name TEXT,
    location TEXT,
    avatar_url TEXT,
    linkedin_url TEXT,
    twitter_url TEXT,
    github_url TEXT,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- -----------------------------------------------------------------------------
-- 6. COMMUNITY EVENTS TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.community_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    event_date TIMESTAMP WITH TIME ZONE NOT NULL,
    location_type TEXT NOT NULL DEFAULT 'online' CHECK (location_type IN ('online', 'in_person', 'hybrid')),
    meeting_link TEXT,
    venue TEXT,
    host_name TEXT NOT NULL,
    max_seats INTEGER DEFAULT 100,
    registered_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- -----------------------------------------------------------------------------
-- 7. SAVED RESOURCES TABLE (Bookmarks for members)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.saved_resources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    post_id UUID REFERENCES public.blog_posts(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE (user_id, post_id)
);

-- -----------------------------------------------------------------------------
-- 8. NOTIFICATIONS TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    link TEXT,
    type TEXT DEFAULT 'info' CHECK (type IN ('info', 'success', 'warning', 'announcement')),
    is_read BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- -----------------------------------------------------------------------------
-- 9. SITE CONTENT SETTINGS (Dynamic CMS Key-Value Store)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.site_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    description TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- -----------------------------------------------------------------------------
-- 10. SEO SETTINGS TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.seo_settings (
    route_path TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    keywords TEXT,
    og_image TEXT,
    canonical_url TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =============================================================================
-- HELPER FUNCTIONS & ADMIN VERIFICATION
-- =============================================================================

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create a profile entry when a new user signs up in Auth
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    COALESCE(new.raw_user_meta_data->>'role', 'member')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- =============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_settings ENABLE ROW LEVEL SECURITY;

-- 1. Profiles Policies
CREATE POLICY "Public profiles are viewable by everyone" 
  ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" 
  ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can manage all profiles" 
  ON public.profiles FOR ALL USING (public.is_admin());

-- 2. Blog Categories Policies
CREATE POLICY "Categories viewable by everyone" 
  ON public.blog_categories FOR SELECT USING (true);

CREATE POLICY "Admins can manage categories" 
  ON public.blog_categories FOR ALL USING (public.is_admin());

-- 3. Blog Posts Policies
CREATE POLICY "Published blog posts viewable by everyone" 
  ON public.blog_posts FOR SELECT USING (is_published = true OR public.is_admin());

CREATE POLICY "Admins can insert blog posts" 
  ON public.blog_posts FOR INSERT WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update blog posts" 
  ON public.blog_posts FOR UPDATE USING (public.is_admin());

CREATE POLICY "Admins can delete blog posts" 
  ON public.blog_posts FOR DELETE USING (public.is_admin());

-- 4. Contact Requests Policies
CREATE POLICY "Anyone can submit contact requests" 
  ON public.contact_requests FOR INSERT WITH CHECK (true);

CREATE POLICY "Only admins can view contact requests" 
  ON public.contact_requests FOR SELECT USING (public.is_admin());

CREATE POLICY "Only admins can update contact requests" 
  ON public.contact_requests FOR UPDATE USING (public.is_admin());

CREATE POLICY "Only admins can delete contact requests" 
  ON public.contact_requests FOR DELETE USING (public.is_admin());

-- 5. Community Members Policies
CREATE POLICY "Community members viewable by all" 
  ON public.community_members FOR SELECT USING (true);

CREATE POLICY "Users can manage their own community member profile" 
  ON public.community_members FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all community members" 
  ON public.community_members FOR ALL USING (public.is_admin());

-- 6. Events Policies
CREATE POLICY "Events viewable by everyone" 
  ON public.community_events FOR SELECT USING (is_active = true OR public.is_admin());

CREATE POLICY "Admins can manage events" 
  ON public.community_events FOR ALL USING (public.is_admin());

-- 7. Saved Resources Policies
CREATE POLICY "Users can manage their own saved resources" 
  ON public.saved_resources FOR ALL USING (auth.uid() = user_id);

-- 8. Notifications Policies
CREATE POLICY "Users can view their own notifications" 
  ON public.notifications FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can update own notification read state" 
  ON public.notifications FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all notifications" 
  ON public.notifications FOR ALL USING (public.is_admin());

-- 9. Site Settings Policies
CREATE POLICY "Site settings viewable by everyone" 
  ON public.site_settings FOR SELECT USING (true);

CREATE POLICY "Admins can update site settings" 
  ON public.site_settings FOR ALL USING (public.is_admin());

-- 10. SEO Settings Policies
CREATE POLICY "SEO settings viewable by everyone" 
  ON public.seo_settings FOR SELECT USING (true);

CREATE POLICY "Admins can manage SEO settings" 
  ON public.seo_settings FOR ALL USING (public.is_admin());

-- =============================================================================
-- SEED DATA (Default Categories & Initial Config)
-- =============================================================================

INSERT INTO public.blog_categories (name, slug, description) VALUES
  ('Digital Skills', 'digital-skills', 'Practical tech, AI, design, and growth skills for modern student creators'),
  ('Entrepreneurship', 'entrepreneurship', 'Building legitimate digital ventures, micro-businesses, and client services'),
  ('AI & Automation', 'ai-automation', 'Leveraging artificial intelligence tools to supercharge productivity and opportunities'),
  ('Mindset & Vision', 'mindset-vision', 'Philosophy on income, health, family, purpose, and impact'),
  ('Case Studies', 'case-studies', 'Real journeys of student creators turning ideas into ventures')
ON CONFLICT (name) DO NOTHING;

INSERT INTO public.site_settings (key, value, description) VALUES
  ('hero_content', '{"tag": "THE FUTURE IS CREATED", "headline": "DON''T JUST FIND YOUR FUTURE. BUILD IT.", "subheadline": "Learn. Build. Earn. Live. Empower.", "supporting_text": "We empower students to explore digital entrepreneurship, build real skills, create income and opportunities, and design a meaningful life."}'::jsonb, 'Home page hero configuration'),
  ('contact_info', '{"phone": "9652553433", "whatsapp": "7013429578", "email": "contact@thevisionex.com", "address": "Hyderabad, Telangana, India"}'::jsonb, 'Public contact numbers and address'),
  ('founder_info', '{"name": "Rakhi Guptha", "alias": "Rakesh Voruganti", "title": "Founder & Visionary", "mission_quote": "One person can create more than an income. They can create opportunities."}'::jsonb, 'Founder profile metadata')
ON CONFLICT (key) DO NOTHING;
