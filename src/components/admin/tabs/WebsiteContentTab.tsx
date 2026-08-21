import React, { useState } from 'react';
import {
  FileEdit,
  Sparkles,
  Save,
  CheckCircle2,
  Layers,
  Phone,
  Layout,
  Globe,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useContent } from '../../../context/ContentContext';
import { WebsiteContentMap } from '../../../types';

type SectionKey = 'hero_section' | 'mission_multiplier' | 'why_pillars' | 'contact_section' | 'footer';

export const WebsiteContentTab: React.FC = () => {
  const { websiteContent, updateWebsiteContentSection } = useContent();

  const [activeSection, setActiveSection] = useState<SectionKey>('hero_section');
  const [contentDraft, setContentDraft] = useState<WebsiteContentMap>(websiteContent);
  const [savingSection, setSavingSection] = useState<string | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Keep draft in sync if external updates come in
  React.useEffect(() => {
    setContentDraft(websiteContent);
  }, [websiteContent]);

  const handleSave = async (sectionKey: SectionKey) => {
    setSavingSection(sectionKey);
    try {
      await updateWebsiteContentSection(sectionKey, contentDraft[sectionKey]);
      setSuccessToast(`Successfully synced ${sectionKey.replace(/_/g, ' ').toUpperCase()} to live website!`);
      setTimeout(() => setSuccessToast(null), 3000);
    } catch (err) {
      console.error('Failed to update website content section:', err);
    } finally {
      setSavingSection(null);
    }
  };

  const sectionsList: { key: SectionKey; label: string; description: string; icon: any }[] = [
    {
      key: 'hero_section',
      label: 'Home Hero Section',
      description: 'Main titles, orbital tags, headline gradients, and primary CTAs',
      icon: Sparkles,
    },
    {
      key: 'mission_multiplier',
      label: 'Mission Multiplier (1 → 10)',
      description: 'Founder vision, mission description, and statistical multipliers',
      icon: Layers,
    },
    {
      key: 'why_pillars',
      label: '5 Core Why Pillars',
      description: 'Educational systemic gap, AI reality, proof of work, ecosystem',
      icon: Layout,
    },
    {
      key: 'contact_section',
      label: 'Contact & Office Details',
      description: 'Direct email, WhatsApp phone, address, and inquiry prompts',
      icon: Phone,
    },
    {
      key: 'footer',
      label: 'Footer & Copyright',
      description: 'Brand summary tagline and copyright credentials',
      icon: Globe,
    },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Toast */}
      {successToast && (
        <div className="p-3.5 rounded-2xl bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2.5 shadow-xl animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-semibold">{successToast}</span>
        </div>
      )}

      {/* Section Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {sectionsList.map((sec) => {
          const Icon = sec.icon;
          const isActive = activeSection === sec.key;
          return (
            <button
              key={sec.key}
              type="button"
              onClick={() => setActiveSection(sec.key)}
              className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between gap-2 cursor-pointer ${
                isActive
                  ? 'bg-purple-950/60 border-purple-500/50 shadow-lg shadow-purple-500/10'
                  : 'bg-slate-900/60 border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <Icon className={`w-5 h-5 ${isActive ? 'text-purple-400' : 'text-slate-400'}`} />
                {isActive && <span className="w-2 h-2 rounded-full bg-purple-400" />}
              </div>
              <div>
                <div className="text-xs font-bold text-white">{sec.label}</div>
                <div className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{sec.description}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Editor Panel */}
      <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
        {/* 1. HERO SECTION */}
        {activeSection === 'hero_section' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-base font-bold text-white">Hero Section Live CMS</h3>
                <p className="text-xs text-slate-400">Controls the primary entrance of the website.</p>
              </div>
              <button
                type="button"
                onClick={() => handleSave('hero_section')}
                disabled={savingSection === 'hero_section'}
                className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-purple-500/20 transition-all disabled:opacity-50 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{savingSection === 'hero_section' ? 'Saving...' : 'Sync to Live Site'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5 sm:col-span-2">
                <label className="font-mono font-bold uppercase text-slate-300">Top Floating Badge Text</label>
                <input
                  type="text"
                  value={contentDraft.hero_section?.badge_text || ''}
                  onChange={(e) =>
                    setContentDraft({
                      ...contentDraft,
                      hero_section: { ...contentDraft.hero_section, badge_text: e.target.value },
                    })
                  }
                  className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono font-bold uppercase text-slate-300">Hero Main Title (Line 1)</label>
                <input
                  type="text"
                  value={contentDraft.hero_section?.title_line1 || ''}
                  onChange={(e) =>
                    setContentDraft({
                      ...contentDraft,
                      hero_section: { ...contentDraft.hero_section, title_line1: e.target.value },
                    })
                  }
                  className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono font-bold uppercase text-slate-300">Gradient Title Accent (Line 2)</label>
                <input
                  type="text"
                  value={contentDraft.hero_section?.title_gradient_line2 || ''}
                  onChange={(e) =>
                    setContentDraft({
                      ...contentDraft,
                      hero_section: { ...contentDraft.hero_section, title_gradient_line2: e.target.value },
                    })
                  }
                  className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="font-mono font-bold uppercase text-slate-300">Hero Subtitle</label>
                <textarea
                  rows={3}
                  value={contentDraft.hero_section?.subtitle || ''}
                  onChange={(e) =>
                    setContentDraft({
                      ...contentDraft,
                      hero_section: { ...contentDraft.hero_section, subtitle: e.target.value },
                    })
                  }
                  className="w-full bg-slate-950/80 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono font-bold uppercase text-slate-300">Primary CTA Label</label>
                <input
                  type="text"
                  value={contentDraft.hero_section?.primary_cta_text || ''}
                  onChange={(e) =>
                    setContentDraft({
                      ...contentDraft,
                      hero_section: { ...contentDraft.hero_section, primary_cta_text: e.target.value },
                    })
                  }
                  className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono font-bold uppercase text-slate-300">Secondary CTA Label</label>
                <input
                  type="text"
                  value={contentDraft.hero_section?.secondary_cta_text || ''}
                  onChange={(e) =>
                    setContentDraft({
                      ...contentDraft,
                      hero_section: { ...contentDraft.hero_section, secondary_cta_text: e.target.value },
                    })
                  }
                  className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* 2. MISSION MULTIPLIER */}
        {activeSection === 'mission_multiplier' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-base font-bold text-white">Mission Multiplier Live CMS</h3>
                <p className="text-xs text-slate-400">Controls the 1 → 10 philosophy section.</p>
              </div>
              <button
                type="button"
                onClick={() => handleSave('mission_multiplier')}
                disabled={savingSection === 'mission_multiplier'}
                className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-purple-500/20 transition-all disabled:opacity-50 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{savingSection === 'mission_multiplier' ? 'Saving...' : 'Sync to Live Site'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-mono font-bold uppercase text-slate-300">Section Subtitle</label>
                <input
                  type="text"
                  value={contentDraft.mission_multiplier?.subtitle || ''}
                  onChange={(e) =>
                    setContentDraft({
                      ...contentDraft,
                      mission_multiplier: { ...contentDraft.mission_multiplier, subtitle: e.target.value },
                    })
                  }
                  className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono font-bold uppercase text-slate-300">Heading Line 1</label>
                <input
                  type="text"
                  value={contentDraft.mission_multiplier?.heading_line1 || ''}
                  onChange={(e) =>
                    setContentDraft({
                      ...contentDraft,
                      mission_multiplier: { ...contentDraft.mission_multiplier, heading_line1: e.target.value },
                    })
                  }
                  className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="font-mono font-bold uppercase text-slate-300">Heading Gradient Accent</label>
                <input
                  type="text"
                  value={contentDraft.mission_multiplier?.heading_gradient_line2 || ''}
                  onChange={(e) =>
                    setContentDraft({
                      ...contentDraft,
                      mission_multiplier: { ...contentDraft.mission_multiplier, heading_gradient_line2: e.target.value },
                    })
                  }
                  className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="font-mono font-bold uppercase text-slate-300">Primary Mission Narrative (Paragraph 1)</label>
                <textarea
                  rows={3}
                  value={contentDraft.mission_multiplier?.paragraph_1 || ''}
                  onChange={(e) =>
                    setContentDraft({
                      ...contentDraft,
                      mission_multiplier: { ...contentDraft.mission_multiplier, paragraph_1: e.target.value },
                    })
                  }
                  className="w-full bg-slate-950/80 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="font-mono font-bold uppercase text-slate-300">Opportunity Narrative (Paragraph 2)</label>
                <textarea
                  rows={3}
                  value={contentDraft.mission_multiplier?.paragraph_2 || ''}
                  onChange={(e) =>
                    setContentDraft({
                      ...contentDraft,
                      mission_multiplier: { ...contentDraft.mission_multiplier, paragraph_2: e.target.value },
                    })
                  }
                  className="w-full bg-slate-950/80 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* 3. WHY PILLARS */}
        {activeSection === 'why_pillars' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-base font-bold text-white">5 Core Pillars Live CMS</h3>
                <p className="text-xs text-slate-400">Controls the structural foundation & reasons why Visionex exists.</p>
              </div>
              <button
                type="button"
                onClick={() => handleSave('why_pillars')}
                disabled={savingSection === 'why_pillars'}
                className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-purple-500/20 transition-all disabled:opacity-50 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{savingSection === 'why_pillars' ? 'Saving...' : 'Sync to Live Site'}</span>
              </button>
            </div>

            <div className="space-y-4">
              {(contentDraft.why_pillars?.pillars || []).map((pillar, idx) => (
                <div key={pillar.id || idx} className="p-4 rounded-2xl bg-slate-950/60 border border-white/5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-purple-400 text-xs">Pillar #{idx + 1} ({pillar.id})</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="space-y-1">
                      <label className="font-mono text-slate-400 uppercase text-[10px]">Pillar Title</label>
                      <input
                        type="text"
                        value={pillar.title}
                        onChange={(e) => {
                          const updatedPillars = [...(contentDraft.why_pillars?.pillars || [])];
                          updatedPillars[idx] = { ...updatedPillars[idx], title: e.target.value };
                          setContentDraft({
                            ...contentDraft,
                            why_pillars: { ...contentDraft.why_pillars, pillars: updatedPillars },
                          });
                        }}
                        className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-mono text-slate-400 uppercase text-[10px]">Description</label>
                      <input
                        type="text"
                        value={pillar.description}
                        onChange={(e) => {
                          const updatedPillars = [...(contentDraft.why_pillars?.pillars || [])];
                          updatedPillars[idx] = { ...updatedPillars[idx], description: e.target.value };
                          setContentDraft({
                            ...contentDraft,
                            why_pillars: { ...contentDraft.why_pillars, pillars: updatedPillars },
                          });
                        }}
                        className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. CONTACT SECTION */}
        {activeSection === 'contact_section' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-base font-bold text-white">Contact & Office Live CMS</h3>
                <p className="text-xs text-slate-400">Controls contact page header, direct numbers, and address.</p>
              </div>
              <button
                type="button"
                onClick={() => handleSave('contact_section')}
                disabled={savingSection === 'contact_section'}
                className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-purple-500/20 transition-all disabled:opacity-50 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{savingSection === 'contact_section' ? 'Saving...' : 'Sync to Live Site'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-mono font-bold uppercase text-slate-300">Direct Email</label>
                <input
                  type="email"
                  value={contentDraft.contact_section?.email || ''}
                  onChange={(e) =>
                    setContentDraft({
                      ...contentDraft,
                      contact_section: { ...contentDraft.contact_section, email: e.target.value },
                    })
                  }
                  className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono font-bold uppercase text-slate-300">Phone Number</label>
                <input
                  type="text"
                  value={contentDraft.contact_section?.phone || ''}
                  onChange={(e) =>
                    setContentDraft({
                      ...contentDraft,
                      contact_section: { ...contentDraft.contact_section, phone: e.target.value },
                    })
                  }
                  className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono font-bold uppercase text-slate-300">WhatsApp Contact</label>
                <input
                  type="text"
                  value={contentDraft.contact_section?.whatsapp || ''}
                  onChange={(e) =>
                    setContentDraft({
                      ...contentDraft,
                      contact_section: { ...contentDraft.contact_section, whatsapp: e.target.value },
                    })
                  }
                  className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono font-bold uppercase text-slate-300">Location Address</label>
                <input
                  type="text"
                  value={contentDraft.contact_section?.address || ''}
                  onChange={(e) =>
                    setContentDraft({
                      ...contentDraft,
                      contact_section: { ...contentDraft.contact_section, address: e.target.value },
                    })
                  }
                  className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* 5. FOOTER */}
        {activeSection === 'footer' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-base font-bold text-white">Footer Live CMS</h3>
                <p className="text-xs text-slate-400">Controls bottom brand text and copyright statements.</p>
              </div>
              <button
                type="button"
                onClick={() => handleSave('footer')}
                disabled={savingSection === 'footer'}
                className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-purple-500/20 transition-all disabled:opacity-50 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{savingSection === 'footer' ? 'Saving...' : 'Sync to Live Site'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5 sm:col-span-2">
                <label className="font-mono font-bold uppercase text-slate-300">Footer Tagline</label>
                <textarea
                  rows={2}
                  value={contentDraft.footer?.tagline || ''}
                  onChange={(e) =>
                    setContentDraft({
                      ...contentDraft,
                      footer: { ...contentDraft.footer, tagline: e.target.value },
                    })
                  }
                  className="w-full bg-slate-950/80 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="font-mono font-bold uppercase text-slate-300">Copyright Text</label>
                <input
                  type="text"
                  value={contentDraft.footer?.copyright_text || ''}
                  onChange={(e) =>
                    setContentDraft({
                      ...contentDraft,
                      footer: { ...contentDraft.footer, copyright_text: e.target.value },
                    })
                  }
                  className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
