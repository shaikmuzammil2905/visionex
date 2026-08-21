import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { BlogPost, BlogCategory } from '../types';
import { dataStore, INITIAL_CATEGORIES } from '../lib/dataStore';
import { subscribeToTable } from '../lib/supabase';


interface BlogContextType {
  posts: BlogPost[];
  categories: BlogCategory[];
  featuredPost: BlogPost | null;
  loading: boolean;
  getPostBySlug: (slug: string) => Promise<BlogPost | null>;
  savePost: (post: Omit<BlogPost, 'id' | 'created_at'> & { id?: string }) => Promise<BlogPost>;
  deletePost: (id: string) => Promise<void>;
  refreshPosts: () => Promise<void>;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories] = useState<BlogCategory[]>(INITIAL_CATEGORIES);
  const [loading, setLoading] = useState(true);

  const refreshPosts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await dataStore.getPosts();
      setPosts(data);
    } catch (err) {
      console.warn('Failed to load posts:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshPosts();

    const unsub = subscribeToTable('blog_posts', () => {
      refreshPosts();
    });

    return () => {
      unsub();
    };
  }, [refreshPosts]);


  const getPostBySlug = async (slug: string): Promise<BlogPost | null> => {
    const existing = posts.find((p) => p.slug === slug);
    if (existing) return existing;
    return await dataStore.getPostBySlug(slug);
  };

  const savePost = async (post: Omit<BlogPost, 'id' | 'created_at'> & { id?: string }): Promise<BlogPost> => {
    const saved = await dataStore.savePost(post);
    await refreshPosts();
    return saved;
  };

  const deletePost = async (id: string): Promise<void> => {
    await dataStore.deletePost(id);
    await refreshPosts();
  };

  const featuredPost = posts.find((p) => p.is_featured && p.is_published) || posts.find((p) => p.is_published) || null;

  return (
    <BlogContext.Provider
      value={{
        posts,
        categories,
        featuredPost,
        loading,
        getPostBySlug,
        savePost,
        deletePost,
        refreshPosts,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) throw new Error('useBlog must be used within a BlogProvider');
  return context;
};
