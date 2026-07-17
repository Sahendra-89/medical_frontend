"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, Calendar, User, ArrowRight, Loader } from 'lucide-react';
import { getBlogPosts } from '../../lib/api';

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await getBlogPosts();
        if (res.blogs) {
          setPosts(res.blogs);
        }
      } catch (err) {
        console.error('Error fetching blog posts:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 flex-1 w-full">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 bg-blue-100 text-medical-blue px-3 py-1 rounded-full text-xs font-bold mb-3">
          <BookOpen size={14} /> Paridhi Health Journal
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">Expert Health & Medicine Articles</h1>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">Stay informed with medical guides, wellness advice, and healthcare insights authored by experienced doctors and registered pharmacists.</p>
      </div>

      {loading ? (
        <div className="text-center py-24">
          <div className="w-10 h-10 border-4 border-medical-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xs text-slate-500 font-semibold">Loading health articles...</p>
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
          <BookOpen size={48} className="text-slate-300 mx-auto mb-4" />
          <h3 className="font-bold text-slate-700 text-lg">No Articles Found</h3>
          <p className="text-xs text-slate-500 mt-1">Check back later for expert health advice and medicine educational content.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(post => (
            <article key={post.id} className="bg-white rounded-3xl border border-slate-200 shadow-card hover:shadow-premium hover:-translate-y-1 transition duration-300 flex flex-col overflow-hidden group">
              <div className="relative pt-[60%] bg-slate-50 overflow-hidden border-b border-slate-100">
                <Link href={`/blog/${post.id}`}>
                  <img src={post.image || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600'} alt={post.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                </Link>
                <span className="absolute top-4 left-4 bg-medical-blue text-white font-bold text-[10px] px-3 py-1 rounded-full shadow-sm">
                  {post.category}
                </span>
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 text-[11px] text-slate-400 mb-3">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>

                  <Link href={`/blog/${post.id}`}>
                    <h3 className="font-bold text-base sm:text-lg text-slate-900 group-hover:text-medical-blue transition line-clamp-2 mb-3 leading-snug">
                      {post.title}
                    </h3>
                  </Link>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-6">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700 flex items-center gap-1.5"><User size={14} className="text-medical-blue" /> {post.author}</span>
                  <Link href={`/blog/${post.id}`} className="font-bold text-medical-blue hover:underline flex items-center gap-1">
                    Read Article <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
