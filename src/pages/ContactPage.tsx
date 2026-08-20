import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import { PageBackButton } from '../components/layout/PageBackButton';
import { useContent } from '../context/ContentContext';
import { trackPageView, analytics } from '../lib/analytics';

export const ContactPage: React.FC = () => {
  const { submitContact } = useContent();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'general',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = 'Contact & Support | THE VISIONEX';
    trackPageView('/contact', document.title);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all required fields (Name, Email, Message).');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await submitContact({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: `[${formData.category.toUpperCase()}] ${formData.subject || 'General Inquiry'}`,
        message: formData.message,
      });
      if (res.success) {
        setSubmitted(true);
        analytics.trackContactSubmit(formData.subject || formData.category);
      } else {
        setError(res.error || 'Failed to send message. Please try again.');
      }
    } catch (err: any) {
      setError('An unexpected error occurred. Please try again or reach out on WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-14 space-y-12 sm:space-y-14">
      {/* Top Back Button & Header */}
      <section className="container-custom">
        <PageBackButton />
        <div className="text-center max-w-3xl mx-auto space-y-3 pt-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/40 text-xs font-mono font-bold text-purple-300 uppercase tracking-widest">
            <Mail className="w-3.5 h-3.5 text-purple-400" />
            <span>GET IN TOUCH</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            We'd Love to Hear <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
              From You
            </span>
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed">
            Have questions about student ventures, partnerships, speaking engagements, or joining the community? Reach out directly.
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto">
          {/* Left: Contact Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="glass-card p-5 sm:p-6 rounded-2xl border border-white/10 space-y-4">
              <h3 className="text-base sm:text-lg font-bold text-white">Direct Communication</h3>
              
              <div className="space-y-3 text-xs sm:text-sm">
                <a
                  href="tel:9652553433"
                  className="flex items-start gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-slate-300 hover:text-white"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-950/80 text-blue-400 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Primary Phone</div>
                    <div className="font-bold text-white">9652553433</div>
                  </div>
                </a>

                <a
                  href="https://wa.me/917013429578"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 p-3 rounded-xl bg-emerald-950/30 hover:bg-emerald-950/50 border border-emerald-500/30 transition-all text-emerald-200"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-950 text-emerald-400 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-emerald-400 uppercase">WhatsApp Official</div>
                    <div className="font-bold text-white">7013429578</div>
                  </div>
                </a>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5 text-slate-300">
                  <div className="w-8 h-8 rounded-lg bg-purple-950/80 text-purple-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-slate-400 uppercase">HQ Location</div>
                    <div className="font-bold text-white">Hyderabad / Digital Campus, India</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-5">
              {submitted ? (
                <div className="text-center py-8 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Message Received!</h3>
                  <p className="text-xs text-slate-300 max-w-sm mx-auto">
                    Thank you for reaching out. Founder Rakhi Guptha and the team will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        category: 'general',
                        subject: '',
                        message: '',
                      });
                    }}
                    className="btn-secondary text-xs py-2 px-4 inline-flex mt-2"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-slate-300 font-bold uppercase">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Sharma"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-slate-300 font-bold uppercase">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@college.edu"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-slate-300 font-bold uppercase">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-slate-300 font-bold uppercase">
                        Inquiry Category
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500"
                      >
                        <option value="general">General Inquiry</option>
                        <option value="community">Community Membership</option>
                        <option value="partnership">College / Campus Partnership</option>
                        <option value="media">Media & Speaking</option>
                        <option value="support">Technical Support</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-slate-300 font-bold uppercase">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us what you're building or how we can help..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full text-xs py-3 justify-center flex items-center gap-2 shadow-lg"
                  >
                    {loading ? (
                      <span>Sending message...</span>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
