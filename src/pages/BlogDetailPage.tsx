import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Clock, User, ArrowLeft, Share2, MessageCircle, Globe, Check, ArrowRight } from 'lucide-react';
import { useBlog } from '../context/BlogContext';
import { BlogPost } from '../types';
import { trackPageView, analytics } from '../lib/analytics';

export const BlogDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { getPostBySlug, posts } = useBlog();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      if (!slug) return;
      setLoading(true);
      const found = await getPostBySlug(slug);
      setPost(found);
      setLoading(false);
      if (found) {
        document.title = `${found.seo_title || found.title} | THE VISIONEX`;
        trackPageView(`/resources/${slug}`, found.title);
        analytics.trackBlogView(slug, found.title);
      }
    }
    load();
  }, [slug, getPostBySlug]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(`Check out "${post?.title}" on THE VISIONEX:\n${window.location.href}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
    analytics.trackWhatsAppClick('blog_share');
  };

  const handleShareTwitter = () => {
    const text = encodeURIComponent(`"${post?.title}" via @THEVISIONEX\n${window.location.href}`);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  };

  const handleShareLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank');
  };

  if (loading) {
    return (
      <div className="pt-36 pb-20 container-custom text-center min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" />
          <span className="text-xs text-slate-400 font-mono">Loading resource...</span>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="pt-36 pb-20 container-custom text-center min-h-[60vh] flex items-center justify-center">
        <div className="glass-card p-8 rounded-2xl max-w-md mx-auto space-y-4">
          <h2 className="text-xl font-bold text-white">Article Not Found</h2>
          <p className="text-xs text-slate-400">The resource you requested may have moved or been updated.</p>
          <Link to="/resources" className="btn-primary text-xs py-2 px-4 inline-flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Resources
          </Link>
        </div>
      </div>
    );
  }

  const relatedPosts = posts.filter((p: any) => p.id !== post.id && p.is_published).slice(0, 3);

  const renderContent = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, idx) => {
      if (line.startsWith('## ')) {
        return (
          <h2 key={idx} className="text-xl sm:text-2xl font-bold text-white mt-8 mb-4 border-b border-white/10 pb-2">
            {line.replace('## ', '')}
          </h2>
        );
      }
      if (line.startsWith('### ')) {
        return (
          <h3 key={idx} className="text-lg sm:text-xl font-bold text-purple-200 mt-6 mb-3">
            {line.replace('### ', '')}
          </h3>
        );
      }
      if (line.startsWith('> ')) {
        return (
          <blockquote key={idx} className="my-6 pl-4 border-l-2 border-purple-500 italic text-purple-200/90 text-sm sm:text-base bg-purple-950/20 py-2 rounded-r-lg">
            {line.replace('> ', '')}
          </blockquote>
        );
      }
      if (line.startsWith('* ')) {
        return (
          <li key={idx} className="text-sm text-slate-300 ml-4 list-disc mb-1.5">
            {line.replace('* ', '')}
          </li>
        );
      }
      if (line.trim() === '') {
        return <div key={idx} className="h-3" />;
      }
      return (
        <p key={idx} className="text-sm sm:text-base text-slate-300 leading-relaxed mb-4">
          {line}
        </p>
      );
    });
  };

  return (
    <article className="pt-28 pb-20">
      <div className="container-custom max-w-4xl mx-auto space-y-10">
        <div>
          <Link
            to="/resources"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Knowledge Vault
          </Link>
        </div>

        <header className="space-y-4">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-purple-950/80 text-purple-300 border border-purple-500/40">
              {post.category_name}
            </span>
            <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              {post.read_time}
            </span>
            <span className="text-xs text-slate-500 font-mono">
              Published on {new Date(post.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {post.title}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {post.excerpt}
          </p>

          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-950 border border-purple-500/30 flex items-center justify-center text-purple-300 font-bold text-sm">
                <User className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">{post.author_name}</div>
                <div className="text-[11px] text-slate-400">{post.author_role}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-mono mr-1">Share:</span>
              <button
                onClick={handleShareWhatsApp}
                title="Share on WhatsApp"
                className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-900/60 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
              </button>
              <button
                onClick={handleShareTwitter}
                title="Share on Twitter / X"
                className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white transition-colors"
              >
                <Globe className="w-4 h-4" />
              </button>
              <button
                onClick={handleCopyLink}
                title="Copy Link"
                className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white transition-colors flex items-center gap-1 text-xs"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </header>

        {post.cover_image && (
          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl h-64 sm:h-96">
            <img
              src={post.cover_image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/10">
          <div className="prose prose-invert max-w-none">
            {renderContent(post.content)}
          </div>

          <div className="mt-10 pt-6 border-t border-white/10 flex flex-wrap gap-2 items-center">
            <span className="text-xs text-slate-500 font-mono">Tags:</span>
            {post.tags.map((tag: string, i: number) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-md text-xs font-mono bg-white/5 text-purple-300 border border-white/5"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {relatedPosts.length > 0 && (
          <div className="pt-10 space-y-6">
            <h3 className="text-xl font-bold text-white">Related Resources</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rel: any) => (
                <div key={rel.id} className="glass-card p-5 rounded-xl border border-white/10 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-purple-400 font-bold uppercase">{rel.category_name}</span>
                    <h4 className="text-sm font-bold text-white line-clamp-2">
                      <Link to={`/resources/${rel.slug}`}>{rel.title}</Link>
                    </h4>
                  </div>
                  <Link
                    to={`/resources/${rel.slug}`}
                    className="text-xs font-bold text-blue-400 hover:text-blue-300 inline-flex items-center gap-1 mt-4"
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
};
