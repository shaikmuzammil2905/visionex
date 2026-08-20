import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Sparkles, Clock, User, ArrowRight, Tag, BookOpen } from 'lucide-react';
import { useBlog } from '../context/BlogContext';
import { trackPageView } from '../lib/analytics';

export const ResourcesPage: React.FC = () => {
  const { posts, categories, loading } = useBlog();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    document.title = 'Resources & Blog | THE VISIONEX - Digital Entrepreneurship Insights';
    trackPageView('/resources', document.title);
  }, []);

  const publishedPosts = posts.filter((p: any) => p.is_published);

  const filteredPosts = publishedPosts.filter((post: any) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t: string) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'all' ||
      post.category_name.toLowerCase().replace(/\s+/g, '-') === selectedCategory.toLowerCase() ||
      post.category_id === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const featuredPost = publishedPosts.find((p: any) => p.is_featured) || publishedPosts[0];

  return (
    <div className="pt-28 pb-20 space-y-16">
      {/* Header */}
      <section className="container-custom text-center max-w-4xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/40 text-xs font-mono font-bold text-purple-300 uppercase tracking-widest">
          <BookOpen className="w-3.5 h-3.5 text-purple-400" />
          <span>KNOWLEDGE VAULT</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
          Practical Insights for <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-400 to-blue-400">
            Student Opportunity Creators
          </span>
        </h1>

        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Explore battle-tested frameworks, digital tools, AI guides, and tactical case studies designed to accelerate your venture.
        </p>

        {/* Search Bar */}
        <div className="pt-4 max-w-lg mx-auto relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search guides, AI tools, case studies, or roadmaps..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-900/90 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 shadow-xl transition-all"
          />
        </div>

        {/* Category Pills */}
        <div className="pt-2 flex items-center justify-center gap-2 flex-wrap">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-1.5 rounded-full text-xs font-mono font-semibold transition-all ${
              selectedCategory === 'all'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                : 'bg-white/5 text-slate-400 hover:text-white border border-white/5'
            }`}
          >
            All Articles ({publishedPosts.length})
          </button>
          {categories.map((cat: any) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.name.toLowerCase().replace(/\s+/g, '-'))}
              className={`px-4 py-1.5 rounded-full text-xs font-mono font-semibold transition-all ${
                selectedCategory === cat.name.toLowerCase().replace(/\s+/g, '-')
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                  : 'bg-white/5 text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Article Card */}
      {featuredPost && selectedCategory === 'all' && !searchQuery && (
        <section className="container-custom max-w-6xl mx-auto">
          <div className="glass-card rounded-3xl overflow-hidden border border-purple-500/30 grid grid-cols-1 lg:grid-cols-12 gap-0 group">
            <div className="lg:col-span-7 relative min-h-[260px] lg:min-h-[380px] overflow-hidden bg-slate-900">
              <img
                src={featuredPost.cover_image || '/hero-desk.jpg'}
                alt={featuredPost.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-black/80 text-purple-300 border border-purple-500/40 backdrop-blur-md">
                  Featured Masterclass
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                  <span className="text-purple-400 font-bold uppercase">{featuredPost.category_name}</span>
                  <span>•</span>
                  <span>{featuredPost.read_time}</span>
                </div>

                <h2 className="text-xl sm:text-2xl font-extrabold text-white group-hover:text-purple-200 transition-colors leading-snug">
                  <Link to={`/resources/${featuredPost.slug}`}>
                    {featuredPost.title}
                  </Link>
                </h2>

                <p className="text-sm text-slate-300 line-clamp-3 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <User className="w-4 h-4 text-purple-400" />
                  <span>{featuredPost.author_name}</span>
                </div>
                <Link
                  to={`/resources/${featuredPost.slug}`}
                  className="btn-primary text-xs py-2 px-4 inline-flex items-center gap-1.5"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section className="container-custom max-w-6xl mx-auto">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16 space-y-3 glass-panel p-8 rounded-2xl">
            <p className="text-slate-400 text-sm">No resources found matching your search.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="btn-secondary text-xs py-2 px-4"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post: any) => (
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

                    <div className="flex flex-wrap gap-1 pt-1">
                      {post.tags.slice(0, 3).map((tag: string, i: number) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded text-[9px] font-mono bg-white/5 text-slate-400 border border-white/5"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2">
                  <Link
                    to={`/resources/${post.slug}`}
                    className="text-xs font-bold text-blue-400 hover:text-blue-300 inline-flex items-center gap-1 group/link"
                  >
                    <span>Read Full Guide</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
