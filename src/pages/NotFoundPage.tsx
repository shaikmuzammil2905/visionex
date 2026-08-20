import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="pt-36 pb-24 min-h-[70vh] flex items-center justify-center text-center">
      <div className="container-custom max-w-md mx-auto space-y-6">
        <div className="text-6xl sm:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 font-mono">
          404
        </div>
        <h1 className="text-2xl font-bold text-white">Page Not Found</h1>
        <p className="text-sm text-slate-400 leading-relaxed">
          The page you are looking for might have been moved or does not exist. Let's get you back to building the future.
        </p>
        <div className="pt-2">
          <Link to="/" className="btn-primary text-xs py-2.5 px-6 inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};
