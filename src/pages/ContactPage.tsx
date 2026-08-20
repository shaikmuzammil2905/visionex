import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, Mail, MapPin, Send, CheckCircle2, AlertCircle, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { trackPageView, analytics } from '../lib/analytics';

export const ContactPage: React.FC = () => {
  const { submitContact } = useContent();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Student Entrepreneurship Inquiry',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    document.title = 'Contact Us | THE VISIONEX - Get in Touch';
    trackPageView('/contact', document.title);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in your name, email, and message.');
      return;
    }

    setLoading(true);
    setError(null);
    const res = await submitContact(formData);
    setLoading(false);

    if (res.success) {
      setSuccess(true);
      analytics.trackContactSubmit(formData.subject);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'Student Entrepreneurship Inquiry',
        message: '',
      });
    } else {
      setError(res.error || 'Failed to submit inquiry. Please try again or reach out on WhatsApp.');
    }
  };

  const faqs = [
    {
      q: 'Who can join THE VISIONEX?',
      a: 'THE VISIONEX is open to all college students, recent graduates, and ambitious self-taught builders who want to master digital skills and explore legitimate digital entrepreneurship.',
    },
    {
      q: 'Does it cost anything to join the community?',
      a: 'Core community membership, entry-level roadmaps, and monthly Founder AMAs are completely free. We also host advanced mentorship cohorts and private incubator masterminds for students ready to scale ventures.',
    },
    {
      q: 'Do I need prior coding or business experience?',
      a: 'No. Our roadmaps start from foundational digital fluency and progress through practical, step-by-step project execution across development, AI tools, UI/UX, and marketing.',
    },
    {
      q: 'What is the 1 → 10 Mission?',
      a: 'It is our guiding philosophy: when 1 student masters digital entrepreneurship and launches a venture, they aim to create meaningful opportunities for 10+ student peers.',
    },
  ];

  return (
    <div className="pt-28 pb-20 space-y-20">
      {/* Header */}
      <section className="container-custom text-center max-w-4xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/60 border border-blue-500/40 text-xs font-mono font-bold text-blue-300 uppercase tracking-widest">
          <Mail className="w-3.5 h-3.5 text-blue-400" />
          <span>DIRECT CONTACT</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
          Let's Build Something <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400">
            Remarkable Together
          </span>
        </h1>

        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Have questions about our mission, workshops, digital skills roadmaps, or partnerships? Reach out directly to our team.
        </p>
      </section>

      {/* Main Contact Grid */}
      <section className="container-custom max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
              <h2 className="text-xl font-bold text-white">Contact Channels</h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Connect directly with the founder and community leads via WhatsApp or phone.
              </p>

              <div className="space-y-4">
                {/* WhatsApp */}
                <a
                  href="https://wa.me/917013429578?text=Hello%20THE%20VISIONEX%20Team%2C%20I%20have%20an%20inquiry%20regarding%20the%20community."
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => analytics.trackWhatsAppClick('contact_page')}
                  className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 hover:border-emerald-500/60 flex items-center justify-between group transition-all"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-900/60 flex items-center justify-center text-emerald-300">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-emerald-400 font-bold uppercase">WhatsApp (Instant)</div>
                      <div className="text-sm font-bold text-white">+91 7013429578</div>
                    </div>
                  </div>
                  <span className="text-xs text-emerald-400 font-mono group-hover:translate-x-1 transition-transform">→</span>
                </a>

                {/* Phone Call */}
                <a
                  href="tel:9652553433"
                  onClick={() => analytics.trackPhoneClick()}
                  className="p-4 rounded-2xl bg-blue-950/40 border border-blue-500/30 hover:border-blue-500/60 flex items-center justify-between group transition-all"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-blue-900/60 flex items-center justify-center text-blue-300">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-blue-400 font-bold uppercase">Direct Phone</div>
                      <div className="text-sm font-bold text-white">+91 9652553433</div>
                    </div>
                  </div>
                  <span className="text-xs text-blue-400 font-mono group-hover:translate-x-1 transition-transform">→</span>
                </a>

                {/* Email */}
                <a
                  href="mailto:contact@thevisionex.com"
                  className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/30 hover:border-purple-500/60 flex items-center justify-between group transition-all"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-purple-900/60 flex items-center justify-center text-purple-300">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-purple-400 font-bold uppercase">Official Email</div>
                      <div className="text-sm font-bold text-white">contact@thevisionex.com</div>
                    </div>
                  </div>
                  <span className="text-xs text-purple-400 font-mono group-hover:translate-x-1 transition-transform">→</span>
                </a>

                {/* Location */}
                <div className="p-4 rounded-2xl bg-slate-900/40 border border-white/5 flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-slate-400 font-bold uppercase">Hub Base</div>
                    <div className="text-sm font-bold text-white">Hyderabad, Telangana, India</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/10 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white">Send Us a Message</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Fill out the form below. We typically respond within 24 hours.
                </p>
              </div>

              {success && (
                <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs sm:text-sm flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold text-emerald-300">Message Received Successfully!</strong>
                    Thank you for reaching out to THE VISIONEX. Our team has recorded your inquiry and will connect with you shortly.
                  </div>
                </div>
              )}

              {error && (
                <div className="p-4 rounded-2xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs sm:text-sm flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <div>{error}</div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-slate-300 uppercase">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aditya Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-slate-300 uppercase">
                      Your Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. aditya@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-slate-300 uppercase">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. 9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-slate-300 uppercase">
                      Subject / Interest
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-sm text-white focus:outline-none focus:border-purple-500"
                    >
                      <option value="Student Entrepreneurship Inquiry">Student Entrepreneurship Inquiry</option>
                      <option value="Joining 1 -> 10 Cohort">Joining 1 → 10 Cohort</option>
                      <option value="Workshops & Masterclasses">Workshops & Masterclasses</option>
                      <option value="College Campus Collaboration">College Campus Collaboration</option>
                      <option value="Founder Rakhi Guptha Direct">Message to Founder</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-slate-300 uppercase">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us about your background, college, digital skills, or questions..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full py-3.5 text-sm sm:text-base font-bold justify-center"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                      Submitting Message...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-4 h-4" /> Send Inquiry
                    </span>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions Accordion */}
      <section className="container-custom max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest">
            FAQ
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="glass-card rounded-2xl border border-white/10 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4"
                >
                  <span className="text-sm sm:text-base font-bold text-white">{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-purple-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-3 animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
