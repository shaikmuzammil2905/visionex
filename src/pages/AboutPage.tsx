import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Rocket, ArrowRight, CheckCircle2, Award } from 'lucide-react';
import { PageBackButton } from '../components/layout/PageBackButton';
import { trackPageView } from '../lib/analytics';

export const AboutPage: React.FC = () => {
  useEffect(() => {
    document.title = 'About Us | THE VISIONEX - Our Story & Vision';
    trackPageView('/about', document.title);
  }, []);

  return (
    <div className="pt-24 pb-14 space-y-12 sm:space-y-14">
      {/* Top Back Button & Header */}
      <section className="container-custom">
        <PageBackButton />
        <div className="text-center max-w-3xl mx-auto space-y-3 pt-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/40 text-xs font-mono font-bold text-purple-300 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>WHO WE ARE</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Building the Next Generation of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-400 to-blue-400">
              Student Opportunity Creators
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            THE VISIONEX was founded on a simple premise: students shouldn't spend years waiting for corporate doors to open—they should be equipped to build their own.
          </p>
        </div>
      </section>

      {/* Storytelling Progression */}
      <section className="container-custom space-y-10 sm:space-y-12">
        {/* 1. Who We Are */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-3">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider">
              01 • IDENTITY
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              A Movement at the Intersection of Skill, Mindset & Venture Creation
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              THE VISIONEX is a specialized platform and community dedicated to student digital entrepreneurship. We bridge the gap between academic theory and the practical realities of the modern internet economy.
            </p>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              We guide students through the exact processes required to master in-demand technical and creative skills, package them into viable services or digital products, and cultivate sustainable economic independence.
            </p>
          </div>
          <div className="lg:col-span-6">
            <div className="glass-card p-6 sm:p-7 rounded-2xl border-purple-500/20 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-500/40 flex items-center justify-center text-purple-400 shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-white">The Visionex Core Promise</h4>
                  <p className="text-xs text-slate-400">Transforming capability into leverage</p>
                </div>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <span>Practical, project-based digital skills over rote memorization.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <span>Emphasis on ethical, legitimate, and sustainable business models.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <span>Holistic balance across Income, Health, Family, Purpose, and Opportunity.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 2. Why We Started */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 lg:order-2 space-y-3">
            <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">
              02 • GENESIS
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Why We Started THE VISIONEX
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Founded by Rakhi Guptha ("Rakesh Voruganti"), THE VISIONEX was born out of observing countless hardworking students graduate with degrees but zero real-world leverage, portfolio depth, or understanding of digital revenue models.
            </p>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              In an era powered by AI, cloud infrastructure, and global online commerce, waiting until graduation to begin testing ideas in the real world is no longer necessary or strategic.
            </p>
            <Link to="/founder" className="btn-secondary text-xs py-2 px-4 inline-flex items-center gap-1.5 mt-1">
              <span>Read Founder's Story</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="lg:col-span-6 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-xl h-64 sm:h-72">
              <img
                src="/founder.jpg"
                alt="Founder Rakhi Guptha"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[10px] font-mono text-purple-300 uppercase font-bold">Founder & Visionary</span>
                <h4 className="text-sm font-bold text-white">Rakhi Guptha ("Rakesh Voruganti")</h4>
              </div>
            </div>
          </div>
        </div>

        {/* 3. The Problem & Our Approach */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
              03 • OUR APPROACH
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              From Dependency to Self-Sustaining Creation
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              We guide students through a structured 4-step framework that turns curiosity into tangible impact.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1.5">
              <div className="w-7 h-7 rounded-lg bg-blue-950/80 text-blue-400 flex items-center justify-center font-mono font-bold text-xs">
                01
              </div>
              <h3 className="text-sm font-bold text-white">Skill Acquisition</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Learn high-income capabilities: full-stack code, AI automation, UI/UX, and growth marketing.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1.5">
              <div className="w-7 h-7 rounded-lg bg-indigo-950/80 text-indigo-400 flex items-center justify-center font-mono font-bold text-xs">
                02
              </div>
              <h3 className="text-sm font-bold text-white">Micro-Venture Launch</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Package skills into real service offerings, digital assets, or client projects with live feedback.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1.5">
              <div className="w-7 h-7 rounded-lg bg-purple-950/80 text-purple-400 flex items-center justify-center font-mono font-bold text-xs">
                03
              </div>
              <h3 className="text-sm font-bold text-white">Revenue Validation</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Generate legitimate, ethical income streams that build unshakeable confidence and autonomy.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1.5">
              <div className="w-7 h-7 rounded-lg bg-emerald-950/80 text-emerald-400 flex items-center justify-center font-mono font-bold text-xs">
                04
              </div>
              <h3 className="text-sm font-bold text-white">The 1 → 10 Ripple</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Hire student peers, delegate workloads, and become a hub of opportunity for others.
              </p>
            </div>
          </div>
        </div>

        {/* 4. Our Vision for the Future */}
        <div className="text-center max-w-2xl mx-auto space-y-4 pt-2">
          <span className="text-xs font-mono font-bold text-pink-400 uppercase tracking-widest">
            04 • THE VISION
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            "A World Where Every Student Has the Knowledge & Courage to Build."
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            We envision an ecosystem where student entrepreneurship is celebrated as a mainstream path of empowerment.
          </p>

          <div className="pt-2 flex items-center justify-center gap-3">
            <Link to="/mission" className="btn-primary text-xs py-2.5 px-5">
              <span>Read The 1 → 10 Mission</span>
              <Rocket className="w-3.5 h-3.5" />
            </Link>
            <Link to="/community" className="btn-secondary text-xs py-2.5 px-5">
              <span>Explore Community</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
