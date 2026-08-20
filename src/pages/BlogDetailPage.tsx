import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { User, Clock, Calendar, ArrowRight, Share2, Check } from 'lucide-react';
import { PageBackButton } from '../components/layout/PageBackButton';
import { useBlog } from '../context/BlogContext';
import { trackPageView } from '../lib/analytics';

export const BlogDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { posts } = useBlog();
  const [copied, setCopied] = useState(false);

  const post = posts.find((p: any) => p.slug === slug);

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | THE VISIONEX`;
      trackPageView(`/resources/${post.slug}`, document.title);
    }
  }, [post]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!post) {
    return (
      <div className="pt-28 pb-16 container-custom text-center space-y-4">
        <PageBackButton fallbackPath="/resources" label="Back to Resources" />
        <h1 className="text-2xl font-bold text-white">Resource Not Found</h1>
        <p className="text-sm text-slate-400">The requested article could not be found.</p>
        <Link to="/resources" className="btn-primary text-xs py-2 px-4 inline-flex">
          Browse All Resources
        </Link>
      </div>
    );
  }

  return (
    <article className="pt-24 pb-14 space-y-8">
      {/* Top Header */}
      <section className="container-custom max-w-3xl mx-auto space-y-4">
        <PageBackButton fallbackPath="/resources" label="Back to Resources" />

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-purple-400">
            <span className="px-2.5 py-0.5 rounded bg-purple-950/80 border border-purple-500/30 uppercase font-bold">
              {post.category_name}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-slate-400">
              <Clock className="w-3.5 h-3.5" />
              {post.read_time}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {post.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {post.excerpt}
          </p>

          <div className="pt-2 flex items-center justify-between border-t border-b border-white/10 py-3 text-xs text-slate-400">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-950 border border-purple-500/40 flex items-center justify-center text-purple-300 font-bold">
                {post.author_name.charAt(0)}
              </div>
              <div>
                <div className="font-bold text-white">{post.author_name}</div>
                <div className="text-[10px] text-slate-400">
                  {new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
              </div>
            </div>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-mono transition-all border border-white/10"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Link Copied!' : 'Share'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Cover Image */}
      {post.cover_image && (
        <section className="container-custom max-w-4xl mx-auto">
          <div className="rounded-2xl overflow-hidden border border-white/10 max-h-[380px] shadow-2xl">
            <img
              src={post.cover_image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </section>
      )}

      {/* Article Body */}
      <section className="container-custom max-w-3xl mx-auto">
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/10 prose prose-invert max-w-none text-slate-200 text-sm leading-relaxed space-y-4">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </section>
    </article>
  );
};
