import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface PageBackButtonProps {
  label?: string;
  fallbackPath?: string;
  className?: string;
}

export const PageBackButton: React.FC<PageBackButtonProps> = ({
  label = 'Back',
  fallbackPath = '/',
  className = '',
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === '/') return null;

  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate(fallbackPath);
    }
  };

  return (
    <button
      onClick={handleBack}
      type="button"
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white transition-all shadow-md group cursor-pointer backdrop-blur-md active:scale-95 mb-4 ${className}`}
      aria-label="Go back"
    >
      <ArrowLeft className="w-4 h-4 text-purple-400 group-hover:-translate-x-1 transition-transform" />
      <span>{label}</span>
    </button>
  );
};
