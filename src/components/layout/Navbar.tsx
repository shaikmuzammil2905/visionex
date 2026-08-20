import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronRight, User, Shield, LogOut, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAdmin, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Our Why', path: '/why' },
    { name: 'Mission', path: '/mission' },
    { name: 'Digital Entrepreneurship', path: '/digital-entrepreneurship' },
    { name: 'Community', path: '/community' },
    { name: 'Resources', path: '/resources' },
    { name: 'Founder', path: '/founder' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#07090e]/90 backdrop-blur-xl border-b border-white/10 shadow-xl shadow-black/40 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src="/logo.png"
            alt="THE VISIONEX Logo"
            className="w-9 h-9 md:w-10 md:h-10 object-contain rounded-lg transition-transform duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_12px_rgba(139,92,246,0.6)]"
          />
          <div className="flex flex-col">
            <span className="font-extrabold text-lg md:text-xl tracking-tight text-white font-mono flex items-center gap-1">
              THE VISIONE<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">X</span>
            </span>
          </div>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden xl:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-colors duration-200 py-1 relative ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA / Auth Controls */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              {isAdmin ? (
                <Link
                  to="/admin"
                  className="px-3.5 py-1.5 rounded-lg bg-purple-950/60 border border-purple-500/40 text-purple-200 text-xs font-semibold hover:bg-purple-900/60 flex items-center gap-1.5 transition-all"
                >
                  <Shield className="w-3.5 h-3.5 text-purple-400" />
                  Admin CMS
                </Link>
              ) : (
                <Link
                  to="/dashboard"
                  className="px-3.5 py-1.5 rounded-lg bg-blue-950/60 border border-blue-500/40 text-blue-200 text-xs font-semibold hover:bg-blue-900/60 flex items-center gap-1.5 transition-all"
                >
                  <User className="w-3.5 h-3.5 text-blue-400" />
                  Dashboard
                </Link>
              )}
              <button
                onClick={handleLogout}
                title="Log out"
                className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-white/5 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-slate-300 hover:text-white px-3 py-1.5 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn-primary text-xs md:text-sm py-2 px-4 shadow-lg"
              >
                <Sparkles className="w-4 h-4 text-purple-200" />
                Join Now
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="xl:hidden p-2 rounded-xl text-slate-200 hover:text-white bg-white/5 border border-white/10 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden fixed inset-x-0 top-[60px] bottom-0 bg-[#07090e]/95 backdrop-blur-2xl border-b border-white/10 p-6 flex flex-col justify-between overflow-y-auto z-40 animate-fadeIn">
          <div className="flex flex-col gap-2">
            <div className="text-xs uppercase font-mono tracking-widest text-slate-400 mb-2 px-3">
              Navigation Menu
            </div>
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-all ${
                    isActive
                      ? 'bg-purple-950/40 text-white border border-purple-500/30'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </Link>
              );
            })}
          </div>

          <div className="pt-6 border-t border-white/10 mt-6 flex flex-col gap-3">
            {user ? (
              <div className="flex flex-col gap-2">
                <div className="px-3 text-xs text-slate-400">
                  Signed in as <span className="text-white font-semibold">{user.full_name}</span> ({user.role})
                </div>
                {isAdmin ? (
                  <Link to="/admin" className="btn-primary w-full justify-center text-sm py-3">
                    <Shield className="w-4 h-4 mr-1" /> Open Admin CMS
                  </Link>
                ) : (
                  <Link to="/dashboard" className="btn-primary w-full justify-center text-sm py-3">
                    <User className="w-4 h-4 mr-1" /> Member Dashboard
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="btn-secondary w-full justify-center text-sm py-2.5 text-red-400 border-red-500/20"
                >
                  <LogOut className="w-4 h-4 mr-1" /> Log Out
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2.5">
                <Link to="/register" className="btn-primary w-full justify-center text-base py-3 shadow-xl">
                  <Sparkles className="w-4 h-4 mr-1" /> Join THE VISIONEX
                </Link>
                <Link to="/login" className="btn-secondary w-full justify-center text-sm py-2.5">
                  Member Login
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
