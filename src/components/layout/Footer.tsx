import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, Mail, MapPin, Sparkles, ArrowUpRight, ShieldCheck, Heart } from 'lucide-react';
import { analytics } from '../../lib/analytics';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#05070a] border-t border-white/10 pt-16 pb-12 overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Slogan */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src="/logo.png"
                alt="THE VISIONEX Logo"
                className="w-10 h-10 object-contain rounded-lg shadow-md"
              />
              <span className="font-extrabold text-xl tracking-tight text-white font-mono">
                THE VISIONE<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">X</span>
              </span>
            </Link>
            <p className="text-sm text-purple-200 font-semibold tracking-wide uppercase font-mono">
              Don't just find your future. Build it.
            </p>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Empowering students to explore digital entrepreneurship, master practical skills, build legitimate income-generating ventures, and create meaningful opportunities for others.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <Link
                to="/register"
                className="btn-primary text-xs py-2 px-4 shadow"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Join Movement
              </Link>
              <Link
                to="/mission"
                className="btn-secondary text-xs py-2 px-4"
              >
                1 → 10 Mission
              </Link>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-mono tracking-widest text-slate-300 font-bold">
              Platform
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-slate-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/why" className="text-slate-400 hover:text-white transition-colors">
                  Our Why (5 Pillars)
                </Link>
              </li>
              <li>
                <Link to="/mission" className="text-slate-400 hover:text-white transition-colors">
                  Our Mission
                </Link>
              </li>
              <li>
                <Link to="/founder" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1">
                  Founder Profile
                  <ArrowUpRight className="w-3 h-3 text-purple-400" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Entrepreneurship & Community */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-mono tracking-widest text-slate-300 font-bold">
              Initiatives
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/digital-entrepreneurship" className="text-slate-400 hover:text-white transition-colors">
                  Digital Skills Hub
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-slate-400 hover:text-white transition-colors">
                  Creator Community
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-slate-400 hover:text-white transition-colors">
                  Resources & Blog
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-slate-400 hover:text-white transition-colors">
                  Member Portal
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-slate-400 hover:text-white transition-colors">
                  Admin CMS
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Direct Contact */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-mono tracking-widest text-slate-300 font-bold">
              Connect With Us
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="tel:9652553433"
                  onClick={() => analytics.trackPhoneClick()}
                  className="flex items-center gap-2 text-slate-300 hover:text-blue-400 transition-colors"
                >
                  <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>+91 9652553433</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/917013429578?text=Hello%20THE%20VISIONEX%20Team%2C%20I%20am%20interested%20in%20digital%20entrepreneurship%20and%20joining%20the%20community."
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => analytics.trackWhatsAppClick('footer')}
                  className="flex items-center gap-2 text-slate-300 hover:text-emerald-400 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>+91 7013429578 (WhatsApp)</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:rakhiguptha26@gmail.com"
                  className="flex items-center gap-2 text-slate-300 hover:text-purple-400 transition-colors"
                >
                  <Mail className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>rakhiguptha26@gmail.com <span className="text-xs text-purple-400">(@rakhiguptha26)</span></span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@thevisionex.com"
                  className="flex items-center gap-2 text-slate-400 hover:text-purple-400 transition-colors text-xs"
                >
                  <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span>contact@thevisionex.com</span>
                </a>
              </li>
              <li>
                <div className="flex items-center gap-2 text-slate-400 text-xs pt-1">
                  <MapPin className="w-4 h-4 text-slate-500 shrink-0" />
                  <span>Hyderabad, Telangana, India</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Legal Notice */}
        <div className="py-6 border-b border-white/5 text-xs text-slate-400 leading-relaxed space-y-2">
          <p className="flex items-start gap-1.5">
            <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
            <span>
              <strong>Educational Disclaimer:</strong> THE VISIONEX is an educational initiative, platform, and community fostering digital entrepreneurship and practical skill creation. Nothing on this website constitutes a guarantee of employment, fixed compensation, or instant financial results. Success requires dedicated study, ethical execution, and consistent skill application.
            </span>
          </p>
          <p className="flex items-start gap-1.5 text-amber-300/90 font-medium pt-1">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              <strong>Age Requirement Note:</strong> This opportunity is only for 18+ age.
            </span>
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 THE VISIONEX. Founded by Rakhi Guptha ("Rakesh Voruganti"). All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-purple-400 fill-purple-400" /> for Student Opportunity Creators
          </p>
        </div>
      </div>
    </footer>
  );
};
