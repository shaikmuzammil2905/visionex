# THE VISIONEX 🚀

> **DON'T JUST FIND YOUR FUTURE. BUILD IT.**
> *Learn. Build. Earn. Live. Empower.*
> *From Student to Opportunity Creator.*

---

## 🌟 Overview

**THE VISIONEX** is a student digital entrepreneurship and community platform founded by **Rakhi Guptha ("Rakesh Voruganti")**. The mission is to empower students to transition from traditional job seekers into proactive digital venture creators, cultivating legitimate income-generating assets and creating meaningful opportunities for others (**The 1 → 10 Mission**).

---

## 🛠️ Technology Stack

- **Frontend Core**: React 19, TypeScript, Vite
- **Routing**: React Router DOM (v7)
- **Styling**: Modern Cosmic Obsidian Theme, Glassmorphism, CSS Custom Properties
- **Icons & Micro-Interactions**: Lucide React, HTML5 Canvas Constellation Particles, Canvas Confetti
- **Database & Authentication**: Supabase (PostgreSQL, Row Level Security, Auth) + Standalone Persistent Fallback Layer
- **Analytics**: Google Analytics 4 (GA4) Event Tracker
- **SEO & Meta**: Schema.org JSON-LD (Organization, WebSite, Person), Dynamic OpenGraph, Sitemap.xml, Robots.txt

---

## 📂 Page & Route Structure

| Route | Page | Purpose |
|---|---|---|
| `/` | **Home Page** | Hero with interactive constellation orbit, 4 highlight cards, **1 → 10 Mission** simulator, **Our Why** vertical storytelling, **Student → Entrepreneur** pipeline, **A Changing World**, and **The Problem**. |
| `/about` | **About Us** | Who We Are, Genesis, Problem & Reality, Approach, and Vision. |
| `/why` | **Our Why** | Deep-dive into the 5 Pillars: **Income 💰**, **Health ❤️**, **Family 👨‍👩‍👧‍👦**, **Purpose 🎯**, and **Opportunity 🚀** with interactive balance audit tool. |
| `/mission` | **1 → 10 Mission** | The signature Opportunity Multiplier, Student Creator Manifesto, and interactive ripple simulation. |
| `/digital-entrepreneurship` | **Digital Skills Hub** | 8 digital capabilities, AI tool awareness, personal branding, and business models. |
| `/community` | **Community Hub** | Member directory spotlight, upcoming live workshops with RSVP, benefits, and discussions. |
| `/resources` | **Knowledge Vault** | Searchable digital entrepreneurship guides, category filters, and featured articles. |
| `/resources/:slug` | **Article Detail** | Full markdown reader, author bio, social sharing (WhatsApp, X, LinkedIn, Copy Link), related guides. |
| `/founder` | **Founder Profile** | Official profile for **Rakhi Guptha ("Rakesh Voruganti")**, story, philosophy, and direct channels. |
| `/contact` | **Contact Us** | Functional contact form with database persistence, WhatsApp (`7013429578`), Phone (`9652553433`), and interactive FAQ. |
| `/register` | **Join Movement** | Member signup with interests, validation, and confetti celebration. |
| `/login` | **Member & Admin Login** | Authentication with password reset modal and quick-test demo role switcher. |
| `/dashboard` | **Member Dashboard** | Creator milestones, learning progress, saved bookmarks, registered event RSVPs, and profile settings. |
| `/admin` | **Admin CMS** | Complete administrative control center: Live stats, Blog CRUD, Inquiries manager with CSV export, Site Settings editor, and User directory. |

---

## ⚙️ Local Development Setup

### 1. Prerequisites
- **Node.js**: v18.0.0+ (Tested on Node.js v24)
- **npm**: v9.0.0+

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Fill in your production credentials when ready:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key-here
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_GSC_VERIFICATION_CODE=your_google_search_console_verification_code
VITE_PAYMENT_KEY_ID=rzp_live_your_key_id_here
VITE_SUPPORT_PHONE=9652553433
VITE_SUPPORT_WHATSAPP=7013429578
```

### 4. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Production Build
```bash
npm run build
```

---

## 🗄️ Supabase Database Setup

1. Create a project at [Supabase.com](https://supabase.com).
2. Go to the **SQL Editor** in your Supabase dashboard.
3. Open `supabase/schema.sql` from this repository.
4. Copy and paste the entire script into the SQL Editor and click **Run**.
5. Copy your **Project URL** and **Anon Public Key** from *Project Settings -> API* into your `.env` file (`VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`).

### Tables Created:
- `profiles`: User accounts linked with Supabase Auth
- `blog_posts`: Knowledge vault articles and guides with SEO tags
- `blog_categories`: Resource categorization
- `contact_requests`: Lead captures and contact form submissions
- `community_members`: Student creator directory
- `community_events`: Virtual workshops and AMAs
- `saved_resources`: Member bookmarks
- `notifications`: Community announcements
- `site_settings`: Dynamic CMS content key-value store
- `seo_settings`: Per-route meta configurations

---

## 🔐 Security & RLS Policies

- Public users can view published blog posts, events, and site settings.
- Anyone can submit contact requests.
- Only authenticated users with `role = 'admin'` can access `/admin`, create/edit blog posts, view contact submissions, or update global site settings.
- Passwords and secret keys are never exposed in frontend bundles.

---

## 📞 Official Contacts

- **Phone**: `+91 9652553433`
- **WhatsApp**: `+91 7013429578`
- **Email**: `contact@thevisionex.com`
- **Founder**: **Rakhi Guptha ("Rakesh Voruganti")**

---

© 2026 THE VISIONEX. All Rights Reserved.
