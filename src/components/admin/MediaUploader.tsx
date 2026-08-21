import React, { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, CheckCircle2, AlertCircle, Copy, Check, X, Loader2 } from 'lucide-react';
import { uploadImageToCloudinary, isCloudinaryConfigured } from '../../lib/cloudinary';

interface MediaUploaderProps {
  currentUrl?: string;
  onUploadSuccess: (url: string, publicId?: string) => void;
  label?: string;
  aspectRatio?: string;
  folder?: string;
}

export const MediaUploader: React.FC<MediaUploaderProps> = ({
  currentUrl,
  onUploadSuccess,
  label = 'Upload Image (Cloudinary)',
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(currentUrl || null);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Keep preview in sync with currentUrl if prop updates
  React.useEffect(() => {
    setPreview(currentUrl || null);
  }, [currentUrl]);

  const handleFile = async (file: File) => {
    setError(null);
    setUploading(true);
    setProgress(0);

    const localUrl = URL.createObjectURL(file);
    setPreview(localUrl);

    try {
      const result = await uploadImageToCloudinary(file, (pct) => {
        setProgress(pct);
      });
      setPreview(result.secure_url);
      onUploadSuccess(result.secure_url, result.public_id);
    } catch (err: any) {
      setError(err.message || 'Failed to upload image');
      setPreview(currentUrl || null);
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleCopy = () => {
    if (preview) {
      navigator.clipboard.writeText(preview);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    onUploadSuccess('', undefined);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="text-[11px] font-mono font-bold uppercase text-slate-300 flex items-center justify-between">
          <span>{label}</span>
          <span className="text-[10px] text-purple-400 font-normal">Cloudinary CDN</span>
        </label>
      )}

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-2xl p-4 transition-all cursor-pointer flex flex-col items-center justify-center text-center group ${
          isDragging
            ? 'border-purple-500 bg-purple-950/40'
            : 'border-white/15 bg-slate-900/60 hover:border-purple-500/40 hover:bg-slate-900/80'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/svg+xml,image/gif"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          className="hidden"
        />

        {preview ? (
          <div className="relative w-full aspect-video max-h-48 rounded-xl overflow-hidden group/img border border-white/10 bg-black/40 flex items-center justify-center">
            <img src={preview} alt="Uploaded Preview" className="w-full h-full object-contain" />

            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopy();
                }}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs flex items-center gap-1 backdrop-blur-md cursor-pointer"
                title="Copy CDN URL"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span className="text-[10px]">{copied ? 'Copied' : 'Copy URL'}</span>
              </button>

              <button
                type="button"
                onClick={handleRemove}
                className="p-2 rounded-lg bg-rose-950/80 hover:bg-rose-900 text-rose-300 text-xs flex items-center gap-1 border border-rose-500/30 cursor-pointer"
                title="Remove Image"
              >
                <X className="w-3.5 h-3.5" />
                <span className="text-[10px]">Remove</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="py-4 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-500/30 text-purple-400 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div className="text-xs text-white font-medium">
              Click to browse or drop an image here
            </div>
            <div className="text-[10px] text-slate-400 font-mono">
              JPG, PNG, WEBP, SVG (Max 10MB)
            </div>
          </div>
        )}

        {uploading && (
          <div className="absolute inset-0 bg-slate-950/90 rounded-2xl flex flex-col items-center justify-center p-4 space-y-2 backdrop-blur-sm z-10">
            <Loader2 className="w-6 h-6 text-purple-400 animate-spin" />
            <div className="text-xs text-white font-medium">Uploading to Cloudinary... {progress}%</div>
            <div className="w-3/4 bg-white/10 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-full transition-all duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="text-[11px] text-rose-400 flex items-center gap-1.5 px-2">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
