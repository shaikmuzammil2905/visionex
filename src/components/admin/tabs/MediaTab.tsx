import React, { useState } from 'react';
import {
  Image as ImageIcon,
  Copy,
  Check,
  Trash2,
  ExternalLink,
  Search,
  Sparkles,
  CloudUpload,
} from 'lucide-react';
import { useContent } from '../../../context/ContentContext';
import { MediaItem } from '../../../types';
import { MediaUploader } from '../MediaUploader';
import { ConfirmModal } from '../ConfirmModal';
import { getOptimizedImageUrl } from '../../../lib/cloudinary';

export const MediaTab: React.FC = () => {
  const { mediaItems, saveMediaItem, deleteMediaItem } = useContent();

  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filteredMedia = mediaItems.filter((m) => {
    const filename = m.filename || m.file_name || '';
    const format = m.format || m.file_type || '';
    return (
      filename.toLowerCase().includes(search.toLowerCase()) ||
      format.toLowerCase().includes(search.toLowerCase())
    );
  });

  const handleUploadSuccess = async (url: string, publicId?: string) => {
    if (!url) return;
    const filename = url.split('/').pop() || 'media-asset';
    const format = filename.split('.').pop() || 'webp';

    await saveMediaItem({
      file_url: url,
      url,
      public_id: publicId || `media_${Date.now()}`,
      file_name: filename,
      filename,
      file_type: format,
      format,
      bytes: 102400,
      width: 1200,
      height: 800,
      folder: 'visionex_media',
    });
  };

  const handleCopy = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async () => {
    if (deletingId) {
      await deleteMediaItem(deletingId);
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Upload Zone */}
      <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-950 border border-purple-500/30 text-purple-400 flex items-center justify-center">
            <CloudUpload className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Upload New Media Asset</h3>
            <p className="text-xs text-slate-400">Directly uploads to Cloudinary CDN (Preset: ml_default).</p>
          </div>
        </div>

        <MediaUploader
          label=""
          onUploadSuccess={handleUploadSuccess}
        />
      </div>

      {/* Media Gallery */}
      <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-purple-400" />
              <span>Cloudinary CDN Assets ({mediaItems.length})</span>
            </h3>
            <p className="text-xs text-slate-400">High-performance media assets with instant edge distribution.</p>
          </div>

          <div className="relative max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter media..."
              className="w-full bg-slate-950 border border-white/10 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>

        {filteredMedia.length === 0 ? (
          <div className="py-12 text-center text-slate-400 rounded-2xl bg-slate-950/60 border border-white/5 space-y-1">
            <ImageIcon className="w-8 h-8 mx-auto text-slate-600 mb-2" />
            <p className="text-xs font-semibold text-slate-300">No media assets in library yet</p>
            <p className="text-[11px] text-slate-500">Upload images above to build your Cloudinary asset library.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredMedia.map((media) => {
              const url = media.url || media.file_url || '';
              const filename = media.filename || media.file_name || 'media-asset';
              const format = media.format || media.file_type || 'image';

              return (
                <div
                  key={media.id}
                  className="group rounded-2xl bg-slate-950/80 border border-white/5 hover:border-purple-500/40 p-2.5 flex flex-col justify-between transition-all shadow-lg"
                >
                  <div className="aspect-square rounded-xl overflow-hidden bg-black/40 relative flex items-center justify-center">
                    <img
                      src={getOptimizedImageUrl(url, { width: 300, crop: 'fill' })}
                      alt={filename}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 p-2">
                      <button
                        type="button"
                        onClick={() => handleCopy(url, media.id)}
                        className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs backdrop-blur-md cursor-pointer"
                        title="Copy URL"
                      >
                        {copiedId === media.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeletingId(media.id)}
                        className="p-1.5 rounded-lg bg-rose-950/80 hover:bg-rose-900 text-rose-300 text-xs border border-rose-500/30 cursor-pointer"
                        title="Delete Asset"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="pt-2 space-y-0.5 text-left">
                    <div className="text-[11px] font-bold text-white truncate">{filename}</div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                      <span className="uppercase">{format}</span>
                      <span>{new Date(media.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={Boolean(deletingId)}
        title="Delete Media Asset?"
        message="This asset will be removed from your CMS library index."
        confirmLabel="Delete Asset"
        onConfirm={handleDelete}
        onCancel={() => setDeletingId(null)}
      />
    </div>
  );
};
