import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Quote, Phone, MessageCircle, Mail, ArrowRight, ShieldCheck, Heart, Award, Rocket, CheckCircle2 } from 'lucide-react';
import { PageBackButton } from '../components/layout/PageBackButton';
import { trackPageView } from '../lib/analytics';

export const FounderPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Founder Story | Rakhi Guptha ("Rakesh Voruganti") - THE VISIONEX';
    trackPageView('/founder', document.title);
  }, []);

  return (
    <div className="pt-24 pb-14 space-y-12 sm:space-y-14">
      {/* Top Back Button & Header */}
      <section className="container-custom">
        <PageBackButton />
        <div className="text-center max-w-3xl mx-auto space-y-3 pt-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/40 text-xs font-mono font-bold text-purple-300 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>LEADERSHIP & VISION</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Meet the Founder: <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
              Rakhi Guptha ("Rakesh Voruganti")
            </span>
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed">
            "A student with a vision, an internet connection, and the right mentorship can build solutions that transform families and communities."
          </p>
        </div>
      </section>

      {/* Founder Biography & Portrait Section */}
      <section className="container-custom">
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/10 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Founder Portrait */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-purple-500/30 shadow-2xl group">
                <img
                  src="/founder.jpg"
                  alt='Rakhi Guptha ("Rakesh Voruganti")'
                  className="w-full h-auto object-cover object-top transition-transform duration-700 group-hover:scale-102"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 space-y-0.5">
                  <div className="text-sm font-bold text-white">Rakhi Guptha ("Rakesh Voruganti")</div>
                  <div className="text-[11px] font-mono text-purple-300">Founder & Visionary, THE VISIONEX</div>
                </div>
              </div>
            </div>

            {/* Right: Narrative Story */}
            <div className="lg:col-span-7 space-y-4 text-slate-300 text-xs sm:text-sm leading-relaxed">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-purple-400 uppercase">
                <Quote className="w-4 h-4" />
                <span>The Origin Story</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-white">
                From Observation to Purpose-Driven Execution
              </h2>

              <p>
                As a student observing the Indian collegiate ecosystem, Rakhi Guptha ("Rakesh Voruganti") witnessed countless brilliant peers struggle with outdated academic syllabi that failed to equip them for the rapidly emerging AI and digital economy.
              </p>

              <p>
                Rather than relying on conventional job placements or waiting for external validation, Rakhi set out to build a platform that directly teaches students how to create their own digital income streams, launch ventures, and hire their peers.
              </p>

              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-500/30 text-purple-200 text-xs italic">
                "Our mission is simple: transform 1 student from an anxious job seeker into a confident venture builder, who then creates 10 meaningful opportunities for their peers."
              </div>

              <div className="pt-2 flex flex-wrap gap-2">
                <a
                  href="https://wa.me/917013429578"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-xs py-2 px-3.5 inline-flex items-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Connect on WhatsApp (7013429578)</span>
                </a>
                <a
                  href="tel:9652553433"
                  className="btn-secondary text-xs py-2 px-3.5 inline-flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-blue-400" />
                  <span>Direct Call (9652553433)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
