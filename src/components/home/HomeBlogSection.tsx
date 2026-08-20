import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, User, Sparkles } from 'lucide-react';
import { useBlog } from '../../context/BlogContext';

export const HomeBlogSection: React.FC = () => {
  const { posts } = useBlog();
  const recentPosts = posts.slice(0, 3);

  return (
    <section className="py-20 bg-[#07090e] relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-purple-950/50 border border-purple-500/30 text-xs font-mono font-bold text-purple-300 uppercase tracking-widest mb-3">
              KNOWLEDGE VAULT
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              LATEST <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">RESOURCES</span>
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Practical guides, frameworks, and case studies for aspiring student founders.
            </p>
          </div>
          <Link
            to="/resources"
            className="btn-secondary text-xs sm:text-sm py-2.5 px-5 self-start md:self-auto group"
          >
            <span>View All Resources</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentPosts.map((post) => (
            <article
              key={post.id}
              className="glass-card rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500/40 flex flex-col justify-between group transition-all"
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-slate-900">
                  <img
                    src={post.cover_image || '/hero-desk.jpg'}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase bg-black/80 text-purple-300 border border-purple-500/30 backdrop-blur-md">
                      {post.category_name}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-purple-400" />
                      {post.author_name}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      {post.read_time}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-2 leading-snug">
                    <Link to={`/resources/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <Link
                  to={`/resources/${post.slug}`}
                  className="text-xs font-bold text-blue-400 hover:text-blue-300 inline-flex items-center gap-1 group/link"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
