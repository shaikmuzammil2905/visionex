import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, MessageCircle, Phone, Mail, ArrowRight, Quote, ShieldCheck, Target, Heart } from 'lucide-react';
import { trackPageView, analytics } from '../lib/analytics';

export const FounderPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Founder Profile | Rakhi Guptha ("Rakesh Voruganti") - THE VISIONEX';
    trackPageView('/founder', document.title);
  }, []);

  return (
    <div className="pt-28 pb-20 space-y-20">
      {/* Hero Header with Founder Portrait */}
      <section className="container-custom max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Portrait Image */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-purple-500/30 shadow-2xl bg-slate-900 group">
              <img
                src="/founder.jpg"
                alt='Rakhi Guptha ("Rakesh Voruganti") - Founder of THE VISIONEX'
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-5 left-5 right-5">
                <span className="text-[11px] font-mono uppercase font-bold text-purple-300 tracking-wider">
                  FOUNDER & VISIONARY
                </span>
                <h2 className="text-xl font-bold text-white leading-tight">
                  Rakhi Guptha
                </h2>
                <p className="text-xs text-slate-300 font-mono">
                  ("Rakesh Voruganti")
                </p>
              </div>
            </div>
          </div>

          {/* Intro Copy */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/40 text-xs font-mono font-bold text-purple-300 uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>LEADERSHIP PROFILE</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Rakhi Guptha <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-400 to-blue-400">
                ("Rakesh Voruganti")
              </span>
            </h1>

            <p className="text-base text-purple-200 font-medium italic">
              "One person can create more than an income. They can create opportunities."
            </p>

            <p className="text-slate-300 text-sm leading-relaxed">
              Rakhi Guptha is the founder of THE VISIONEX. Driven by a deep commitment to student empowerment, he conceptualized THE VISIONEX to transform ambitious college students from passive job seekers into proactive digital venture creators.
            </p>

            <div className="pt-2 flex items-center gap-3 flex-wrap">
              <a
                href="https://wa.me/917013429578?text=Hello%20Rakhi%20Guptha%2C%20I%20would%20like%20to%20connect%20regarding%20THE%20VISIONEX."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => analytics.trackWhatsAppClick('founder_page')}
                className="btn-primary text-xs py-2.5 px-5"
              >
                <MessageCircle className="w-4 h-4 mr-1" /> Connect on WhatsApp
              </a>
              <a
                href="tel:9652553433"
                onClick={() => analytics.trackPhoneClick()}
                className="btn-secondary text-xs py-2.5 px-5"
              >
                <Phone className="w-4 h-4 mr-1" /> +91 9652553433
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* The Founder's Story & Genesis */}
      <section className="container-custom max-w-4xl mx-auto space-y-12">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 space-y-6">
          <div className="flex items-center gap-3 text-purple-400">
            <Quote className="w-8 h-8 opacity-60" />
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              The Genesis of THE VISIONEX
            </h3>
          </div>

          <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed">
            <p>
              "For decades, higher education followed a standardized script: earn grades, build a paper resume, and wait for corporate hiring cycles to open. But the technological landscape moved forward. With the rise of artificial intelligence, global remote freelance marketplaces, and modern software toolchains, the tools required to build an enterprise are accessible on every college student's laptop."
            </p>
            <p>
              "Yet, millions of capable students still feel paralyzed by career uncertainty and corporate layoffs. I founded THE VISIONEX to provide the missing layer: practical digital entrepreneurship frameworks, rigorous skill training, and a supportive community of builders."
            </p>
            <p>
              "When you build a venture—no matter how small to begin with—you shift from asking for permission to creating value. That shift changes everything."
            </p>
          </div>
        </div>

        {/* Vision, Mission, and Core Philosophy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 rounded-2xl border-purple-500/20 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Target className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">The Vision</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              To cultivate an interconnected ecosystem of 10,000+ student founders who generate self-sustaining ventures and unlock thousands of peer opportunities.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border-blue-500/20 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-950/80 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">The Mission</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              To empower students with tangible digital capabilities, ethical venture architectures, and collaborative masterminds.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border-pink-500/20 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-pink-950/80 border border-pink-500/30 flex items-center justify-center text-pink-400">
              <Heart className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">The 5 Pillars</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Grounding all success in Income, Health, Family, Purpose, and Opportunity to ensure sustainable, meaningful achievement.
            </p>
          </div>
        </div>

        {/* Direct Leadership Message to Students */}
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-purple-500/30 text-center space-y-5 bg-gradient-to-b from-purple-950/30 to-slate-950">
          <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest">
            A PERSONAL MESSAGE TO STUDENTS
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            "Don't Just Find Your Future. Build It."
          </h3>
          <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed">
            "The future belongs to those who take initiative today. Pick a digital skill, build something real, and let's create opportunities together."
          </p>
          <div className="pt-2">
            <Link to="/register" className="btn-primary text-sm py-3 px-8 shadow-xl">
              <span>Join Rakhi in THE VISIONEX Community</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
