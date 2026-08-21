import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Volume2, ArrowRight, X } from 'lucide-react';
import { useContent } from '../../context/ContentContext';

export const AnnouncementBanner: React.FC = () => {
  const { activeAnnouncements } = useContent();
  const location = useLocation();
  const [dismissed, setDismissed] = useState(false);

  // Hide on admin routes
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  const pinned = activeAnnouncements.find((a) => a.is_pinned) || activeAnnouncements[0];

  if (!pinned || dismissed) return null;

  return (
    <div className="relative z-50 bg-gradient-to-r from-purple-950/90 via-indigo-950/90 to-purple-950/90 border-b border-purple-500/30 text-white text-xs py-2 px-4 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <span className="flex h-2 w-2 relative shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
          </span>
          <div className="flex items-center gap-2 truncate">
            <span className="font-bold text-purple-300 font-mono shrink-0 hidden sm:inline">ANNOUNCEMENT:</span>
            <span className="font-semibold truncate">{pinned.title}</span>
            {pinned.description && (
              <span className="text-slate-300 hidden md:inline truncate text-[11px]">— {pinned.description}</span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {pinned.link_url && (
            <Link
              to={pinned.link_url}
              className="font-bold text-purple-300 hover:text-white flex items-center gap-1 transition-colors text-[11px] underline underline-offset-2"
            >
              <span>{pinned.button_text || 'Learn More'}</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          )}
          <button
            type="button"
            onClick={() => setDismissed(true)}
            className="p-1 rounded text-slate-400 hover:text-white transition-colors"
            title="Dismiss Announcement"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
