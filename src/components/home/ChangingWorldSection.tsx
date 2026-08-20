import React from 'react';
import { Bot, GraduationCap, Rocket, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ChangingWorldSection: React.FC = () => {
  const cards = [
    {
      icon: Bot,
      title: 'AI IS CHANGING WORK',
      color: 'from-blue-500/20 to-indigo-500/10 border-blue-500/30 text-blue-400',
      desc: 'Technology is creating new possibilities while transforming traditional roles. Those who master AI leverage become hyper-productive creators.',
      link: '/digital-entrepreneurship',
      linkText: 'Explore AI Tools',
    },
    {
      icon: GraduationCap,
      title: 'STUDENTS NEED PRACTICAL EXPOSURE',
      color: 'from-purple-500/20 to-pink-500/10 border-purple-500/30 text-purple-400',
      desc: 'Education is most potent when combined with real-world entrepreneurial experience, live client deliverables, and genuine problem solving.',
      link: '/about',
      linkText: 'Our Approach',
    },
    {
      icon: Rocket,
      title: 'OPPORTUNITIES CAN BE CREATED',
      color: 'from-emerald-500/20 to-cyan-500/10 border-emerald-500/30 text-emerald-400',
      desc: 'Digital entrepreneurship gives young creators boundaryless ways to build, collaborate, and scale income-generating ventures.',
      link: '/mission',
      linkText: '1 → 10 Vision',
    },
  ];

  return (
    <section className="py-20 bg-[#07090e] relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-block px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono font-bold text-slate-300 uppercase tracking-widest">
            A CHANGING WORLD
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-snug uppercase">
            THE WAY PEOPLE LEARN, WORK AND EARN IS EVOLVING.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Students who recognize these macro shifts early position themselves at the forefront of digital opportunity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className={`glass-card p-6 sm:p-8 rounded-2xl border bg-gradient-to-b ${card.color} flex flex-col justify-between group hover:scale-[1.02] transition-all duration-300`}
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    {card.title}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10">
                  <Link
                    to={card.link}
                    className="inline-flex items-center gap-1.5 text-xs font-bold font-mono uppercase tracking-wider text-white hover:text-purple-300 transition-colors"
                  >
                    <span>{card.linkText}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
