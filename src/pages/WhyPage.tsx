import React, { useEffect, useState } from 'react';
import { DollarSign, Heart, Users, Target, Rocket, CheckCircle, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { trackPageView } from '../lib/analytics';

export const WhyPage: React.FC = () => {
  const [scores, setScores] = useState<Record<string, number>>({
    income: 3,
    health: 3,
    family: 3,
    purpose: 3,
    opportunity: 3,
  });

  useEffect(() => {
    document.title = 'Our Why | THE VISIONEX - 5 Pillars of Holistic Entrepreneurship';
    trackPageView('/why', document.title);
  }, []);

  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);

  const pillarsDetail = [
    {
      id: 'income',
      emoji: '💰',
      icon: DollarSign,
      title: 'INCOME',
      subtitle: 'Create sustainable earning opportunities',
      color: 'border-yellow-500/30 text-yellow-400 bg-yellow-950/30',
      description: 'Why do you want to earn? Money is not the ultimate end, but it is the critical enabler of freedom. Earning your own income as a student removes financial panic, funds your technical learning, and gives you leverage in negotiating your future.',
      actionItems: [
        'Develop 1 to 2 high-income digital capabilities (Full-stack, AI workflows, UI/UX).',
        'Acquire your first paying client or ship a paid digital resource.',
        'Build recurring cash flow to achieve foundational independence before graduation.',
      ],
    },
    {
      id: 'health',
      emoji: '❤️',
      icon: Heart,
      title: 'HEALTH',
      subtitle: 'Protect physical & mental energy as your #1 asset',
      color: 'border-rose-500/30 text-rose-400 bg-rose-950/30',
      description: 'No business milestone or bank balance can compensate for compromised health. When you sacrifice sleep, nutrition, and mental peace for temporary hustle, you mortgage your long-term creative longevity.',
      actionItems: [
        'Maintain daily movement, strength conditioning, and outdoor activity.',
        'Prioritize 7+ hours of quality sleep to protect executive focus.',
        'Practice mental grounding and digital detox to prevent sensory overload.',
      ],
    },
    {
      id: 'family',
      emoji: '👨‍👩‍👧‍👦',
      icon: Users,
      title: 'FAMILY',
      subtitle: 'Use growth to create security, time, and cherished moments',
      color: 'border-blue-500/30 text-blue-400 bg-blue-950/30',
      description: 'Entrepreneurial success is empty if your loved ones do not benefit from your rise. We build not to escape our roots, but to provide financial security, ease parental burdens, and share meaningful life experiences.',
      actionItems: [
        'Alleviate financial worries for your family through your independent earnings.',
        'Dedicate uninterrupted quality time to loved ones irrespective of workload.',
        'Cultivate deep gratitude for the sacrifices that gave you the chance to build.',
      ],
    },
    {
      id: 'purpose',
      emoji: '🎯',
      icon: Target,
      title: 'PURPOSE',
      subtitle: 'Know what you are building and why it matters',
      color: 'border-purple-500/30 text-purple-400 bg-purple-950/30',
      description: 'Tactics without purpose lead to empty hustle. Knowing your core "Why" gives you resilience during painful troughs and prevents vanity metrics from distracting you from authentic value creation.',
      actionItems: [
        'Write down your non-negotiable core values and revisit them monthly.',
        'Solve real problems that genuine human beings care about.',
        'Align your venture with meaningful long-term utility rather than quick gimmicks.',
      ],
    },
    {
      id: 'opportunity',
      emoji: '🚀',
      icon: Rocket,
      title: 'OPPORTUNITY',
      subtitle: 'Use your growth to create doors for others',
      color: 'border-cyan-500/30 text-cyan-400 bg-cyan-950/30',
      description: 'The ultimate stage of mastery is generativity. When your digital venture grows, your responsibility is to employ fellow students, mentor upcoming creators, and spark new economic cycles in your community.',
      actionItems: [
        'Hire and subcontract student peers for design, dev, or marketing tasks.',
        'Share transparent breakdowns of your learnings, wins, and mistakes.',
        'Actively mentor juniors stepping onto the digital entrepreneurship path.',
      ],
    },
  ];

  return (
    <div className="pt-28 pb-20 space-y-16">
      {/* Header */}
      <section className="container-custom text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/40 text-xs font-mono font-bold text-purple-300 uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>OUR WHY</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Why Do I Want to Earn? <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
            The 5 Pillars of THE VISIONEX
          </span>
        </h1>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          At THE VISIONEX, we believe that true wealth is multidimensional. We reject hollow hustle culture in favor of an indestructible five-part foundation.
        </p>
      </section>

      {/* Detailed Pillars Breakdown */}
      <section className="container-custom space-y-8 max-w-5xl mx-auto">
        {pillarsDetail.map((p, idx) => (
          <div
            key={p.id}
            className={`glass-card p-6 sm:p-8 rounded-2xl border ${p.color} space-y-5 transition-all`}
          >
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl sm:text-4xl">{p.emoji}</span>
                <div>
                  <div className="text-xs font-mono font-bold text-slate-400 uppercase">
                    Pillar 0{idx + 1}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                    {p.title}
                  </h2>
                </div>
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                {p.subtitle}
              </span>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {p.description}
            </p>

            <div className="pt-2">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-purple-300 mb-2.5">
                Practical Execution Blueprint:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {p.actionItems.map((item, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-black/40 border border-white/5 text-xs text-slate-300 flex items-start gap-2"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Interactive 5-Pillar Holistic Self-Audit Widget */}
      <section className="container-custom max-w-4xl mx-auto">
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-purple-500/30 space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest">
              INTERACTIVE TOOL
            </span>
            <h3 className="text-2xl font-bold text-white">
              Student Founder Balance Audit
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto">
              Rate your current standing across each pillar from 1 (Needs Focus) to 5 (Thriving) to see your balance score.
            </p>
          </div>

          <div className="space-y-4 pt-2">
            {pillarsDetail.map((p) => (
              <div key={p.id} className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 w-full sm:w-1/3">
                  <span>{p.emoji}</span>
                  <span className="text-sm font-bold text-white">{p.title}</span>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-2/3 justify-end">
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={scores[p.id]}
                    onChange={(e) => setScores({ ...scores, [p.id]: Number(e.target.value) })}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                    aria-label={`Score for ${p.title}`}
                  />
                  <span className="w-8 text-center font-mono font-bold text-sm text-purple-300">
                    {scores[p.id]}/5
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs text-slate-400 font-mono">Total Holistic Score:</span>
              <div className="text-2xl font-extrabold text-white font-mono flex items-center gap-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                  {totalScore} / 25
                </span>
                <span className="text-xs font-normal text-slate-400">
                  {totalScore >= 20 ? '🌟 Exceptional Alignment' : totalScore >= 14 ? '⚡ Strong Momentum' : '🌱 High Growth Opportunity'}
                </span>
              </div>
            </div>
            <Link to="/register" className="btn-primary text-xs sm:text-sm py-2.5 px-6">
              <span>Join Community & Build Balance</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
