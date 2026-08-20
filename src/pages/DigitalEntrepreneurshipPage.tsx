import React, { useEffect, useState } from 'react';
import { Code, Share2, Megaphone, Briefcase, Globe, Users, BookOpen, Wrench, Bot, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { trackPageView } from '../lib/analytics';

export const DigitalEntrepreneurshipPage: React.FC = () => {
  const [activeTrack, setActiveTrack] = useState<string>('all');

  useEffect(() => {
    document.title = 'Digital Entrepreneurship | THE VISIONEX - Modern Skills & Venture Building';
    trackPageView('/digital-entrepreneurship', document.title);
  }, []);

  const skillDomains = [
    {
      id: 'digital-skills',
      title: 'Digital Skills & Full-Stack Mastery',
      category: 'technical',
      icon: Code,
      color: 'border-blue-500/30 text-blue-400',
      badge: 'Core Foundation',
      desc: 'Mastering modern web development (React, TypeScript, Next.js), API design, responsive UI frameworks, and rapid software prototyping.',
      modules: ['Modern Frontend & Backend Systems', 'Component Libraries & Clean Architecture', 'Database Design & Cloud Deployment'],
    },
    {
      id: 'personal-branding',
      title: 'Personal Branding & Authority',
      category: 'growth',
      icon: Share2,
      color: 'border-purple-500/30 text-purple-400',
      badge: 'Leverage',
      desc: 'Building public proof of competence on LinkedIn, Twitter, and GitHub to attract clients, co-founders, and mentorship without cold pitching.',
      modules: ['Building in Public Methodology', 'Content Distribution Engines', 'Case Study & Portfolio Crafting'],
    },
    {
      id: 'digital-marketing',
      title: 'Growth Marketing & Client Acquisition',
      category: 'growth',
      icon: Megaphone,
      color: 'border-pink-500/30 text-pink-400',
      badge: 'Revenue',
      desc: 'Understanding search mechanics, organic social distribution, conversion copywriting, and structured outreach funnels that convert visitors.',
      modules: ['SEO & Organic Discoverability', 'Conversion-Focused Landing Pages', 'High-Converting Cold Outreach'],
    },
    {
      id: 'business-models',
      title: 'Online Business Models & Pricing',
      category: 'strategy',
      icon: Briefcase,
      color: 'border-emerald-500/30 text-emerald-400',
      badge: 'Venture',
      desc: 'Designing micro-SaaS, productized freelance services, digital template ecosystems, and consulting retainers with predictable margins.',
      modules: ['Productized Service Blueprints', 'Value-Based Pricing Strategies', 'Contract Negotiation & Deliverables'],
    },
    {
      id: 'ai-awareness',
      title: 'AI Awareness & Workflow Automation',
      category: 'technical',
      icon: Bot,
      color: 'border-cyan-500/30 text-cyan-400',
      badge: 'Force Multiplier',
      desc: 'Supercharging daily output with LLM integrations, AI coding assistants, automated CRM triggers, and workflow orchestration tools.',
      modules: ['LLM Workflow Integration', 'Zapier & Make.com Automation', 'Custom AI Agent Prototyping'],
    },
    {
      id: 'community-building',
      title: 'Networking & Community Building',
      category: 'growth',
      icon: Users,
      color: 'border-indigo-500/30 text-indigo-400',
      badge: 'Network',
      desc: 'Cultivating authentic relationships with student founders, industry operators, and potential collaborative partners globally.',
      modules: ['Peer Accountability Circles', 'Event Hosting & Virtual AMAs', 'Collaborative Masterminds'],
    },
    {
      id: 'digital-tools',
      title: 'Modern Toolchains & Product Management',
      category: 'strategy',
      icon: Wrench,
      color: 'border-yellow-500/30 text-yellow-400',
      badge: 'Execution',
      desc: 'Navigating Figma, Notion workspaces, Git version control, Supabase backends, and Stripe/Razorpay payment infrastructure.',
      modules: ['Rapid UI/UX Wireframing in Figma', 'Notion Ops & Client Dashboards', 'Payment & Analytics Setup'],
    },
    {
      id: 'practical-learning',
      title: 'Practical Learning & Venture Shipping',
      category: 'strategy',
      icon: BookOpen,
      color: 'border-rose-500/30 text-rose-400',
      badge: 'Output',
      desc: 'Replacing theoretical tests with deployed products, live client testimonials, and measurable marketplace feedback loops.',
      modules: ['14-Day Sprint Execution', 'User Feedback Loops', 'Iteration & Scale Roadmaps'],
    },
  ];

  const filteredDomains = activeTrack === 'all'
    ? skillDomains
    : skillDomains.filter((d) => d.category === activeTrack);

  return (
    <div className="pt-28 pb-20 space-y-16">
      {/* Header */}
      <section className="container-custom text-center max-w-4xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/60 border border-blue-500/40 text-xs font-mono font-bold text-blue-300 uppercase tracking-widest">
          <Globe className="w-3.5 h-3.5 text-blue-400" />
          <span>DIGITAL ENTREPRENEURSHIP HUB</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
          Master the Capabilities That Create <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400">
            Real Economic Autonomy
          </span>
        </h1>

        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          The internet rewards builders, not test-takers. Explore the essential digital pillars that enable college students to launch, operate, and scale legitimate ventures.
        </p>

        {/* Filter Pills */}
        <div className="pt-4 flex items-center justify-center gap-2 flex-wrap">
          <button
            onClick={() => setActiveTrack('all')}
            className={`px-4 py-1.5 rounded-full text-xs font-mono font-semibold transition-all ${
              activeTrack === 'all'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                : 'bg-white/5 text-slate-400 hover:text-white border border-white/5'
            }`}
          >
            All 8 Pillars
          </button>
          <button
            onClick={() => setActiveTrack('technical')}
            className={`px-4 py-1.5 rounded-full text-xs font-mono font-semibold transition-all ${
              activeTrack === 'technical'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                : 'bg-white/5 text-slate-400 hover:text-white border border-white/5'
            }`}
          >
            Technical & AI
          </button>
          <button
            onClick={() => setActiveTrack('growth')}
            className={`px-4 py-1.5 rounded-full text-xs font-mono font-semibold transition-all ${
              activeTrack === 'growth'
                ? 'bg-pink-600 text-white shadow-lg shadow-pink-500/30'
                : 'bg-white/5 text-slate-400 hover:text-white border border-white/5'
            }`}
          >
            Growth & Brand
          </button>
          <button
            onClick={() => setActiveTrack('strategy')}
            className={`px-4 py-1.5 rounded-full text-xs font-mono font-semibold transition-all ${
              activeTrack === 'strategy'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30'
                : 'bg-white/5 text-slate-400 hover:text-white border border-white/5'
            }`}
          >
            Venture & Execution
          </button>
        </div>
      </section>

      {/* Grid of Skill Cards */}
      <section className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredDomains.map((domain) => {
            const Icon = domain.icon;
            return (
              <div
                key={domain.id}
                className={`glass-card p-6 rounded-2xl border ${domain.color} flex flex-col justify-between group hover:scale-[1.02] transition-all duration-300`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-xl bg-black/50 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300">
                      {domain.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-purple-200 transition-colors leading-snug">
                    {domain.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {domain.desc}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-white/5">
                    <span className="text-[10px] font-mono uppercase font-bold text-slate-400 tracking-wider">
                      Key Competencies:
                    </span>
                    {domain.modules.map((m, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                        <span className="truncate">{m}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA to join cohort */}
      <section className="container-custom max-w-4xl mx-auto">
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-purple-500/30 text-center space-y-4 bg-gradient-to-r from-purple-950/40 via-slate-900 to-blue-950/40">
          <Sparkles className="w-8 h-8 text-purple-400 mx-auto" />
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Ready to Build Your First Venture?
          </h3>
          <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed">
            Join THE VISIONEX creator cohort and work alongside motivated student peers solving real-world challenges.
          </p>
          <div className="pt-2 flex items-center justify-center gap-3">
            <Link to="/register" className="btn-primary text-sm py-3 px-8 shadow-xl">
              <span>Start Learning Free</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
            <Link to="/community" className="btn-secondary text-sm py-3 px-6">
              <span>Meet Other Creators</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
