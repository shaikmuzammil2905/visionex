import React from 'react';
import { GraduationCap, BookOpen, Sparkles, TrendingUp, Compass, Rocket, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const StudentJourneySection: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'STUDENT',
      icon: GraduationCap,
      color: 'text-blue-400 border-blue-500/30 bg-blue-950/40',
      desc: 'Aspiring builder with ambition, curiosity, and untapped potential.',
    },
    {
      step: '02',
      title: 'LEARN',
      icon: BookOpen,
      color: 'text-indigo-400 border-indigo-500/30 bg-indigo-950/40',
      desc: 'Mastering high-leverage digital tools, coding, AI, and marketing.',
    },
    {
      step: '03',
      title: 'START',
      icon: Sparkles,
      color: 'text-purple-400 border-purple-500/30 bg-purple-950/40',
      desc: 'Launching first micro-service, digital product, or agency offer.',
    },
    {
      step: '04',
      title: 'EARN',
      icon: TrendingUp,
      color: 'text-emerald-400 border-emerald-500/30 bg-emerald-950/40',
      desc: 'Securing first paying clients and achieving financial independence.',
    },
    {
      step: '05',
      title: 'GROW',
      icon: Compass,
      color: 'text-pink-400 border-pink-500/30 bg-pink-950/40',
      desc: 'Automating processes, scaling revenue, and refining service offerings.',
    },
    {
      step: '06',
      title: 'CREATE DOORS',
      icon: Rocket,
      color: 'text-cyan-400 border-cyan-500/30 bg-cyan-950/40',
      desc: 'Hiring peers, mentoring juniors, and manifesting the 1 → 10 impact.',
    },
  ];

  return (
    <section className="py-10 sm:py-14 bg-gradient-to-b from-[#07090e] via-[#0b0f19] to-[#07090e] relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 space-y-2.5">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-950/50 border border-blue-500/30 text-xs font-mono font-bold text-blue-300 uppercase tracking-widest">
            THE EVOLUTION ROADMAP
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            STUDENT → <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">ENTREPRENEUR</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            The proven progression engineered inside THE VISIONEX to transform passive learners into active venture creators.
          </p>
        </div>

        {/* 6 Step Cards Pipeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="glass-card p-5 flex flex-col justify-between group hover:border-purple-500/40 transition-all duration-300 relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-slate-500 group-hover:text-purple-400 transition-colors">
                      {item.step}
                    </span>
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center border ${item.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-purple-200 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden xl:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 text-slate-600">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/digital-entrepreneurship"
            className="btn-secondary text-xs sm:text-sm py-3 px-6 inline-flex items-center gap-2 group"
          >
            <span>Explore The Full Digital Entrepreneurship Framework</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};
