"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, User, BookOpen } from 'lucide-react';
import { getBlogPostById } from '../../../lib/api';

export default function BlogPostPage() {
  const { id } = useParams();
  const router = useRouter();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchBlogPost = async () => {
      if (!id) return;
      try {
        const res = await getBlogPostById(id);
        if (res.blog) {
          setPost(res.blog);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogPost();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-24 text-center">
        <div className="w-10 h-10 border-4 border-medical-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-xs text-slate-500 font-semibold animate-pulse">Loading health insight...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-24 text-center">
        <BookOpen size={48} className="text-slate-300 mx-auto mb-4" />
        <h3 className="font-bold text-slate-700 text-lg">Article Not Found</h3>
        <p className="text-xs text-slate-500 mt-1">The article may have been deleted or the link is incorrect.</p>
        <button onClick={() => router.push('/blog')} className="mt-6 bg-medical-blue text-white font-bold px-6 py-2.5 rounded-xl text-xs shadow-md hover:bg-blue-600 transition">
          Back to Health Journal
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-16 flex-1 w-full">
      <button onClick={() => router.push('/blog')} className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-medical-blue transition mb-8">
        <ArrowLeft size={16} /> Back to All Articles
      </button>

      <article className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 sm:p-12 overflow-hidden">
        {/* Header */}
        <div className="mb-8">
          <span className="bg-blue-50 text-medical-blue font-bold text-xs px-3 py-1 rounded-full border border-blue-100 mb-4 inline-block">
            {post.category}
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-snug mb-4">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-4 border-t border-slate-100">
            <span className="font-bold text-slate-700 flex items-center gap-1"><User size={14} className="text-medical-blue" /> {post.author}</span>
            <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
            <span className="flex items-center gap-1"><BookOpen size={14} /> {post.readTime}</span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="rounded-2xl overflow-hidden mb-8 border border-slate-100 bg-slate-50">
          <img src={post.image || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1200'} alt={post.title} className="w-full h-auto max-h-96 object-cover" />
        </div>

        {/* Content */}
        <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-6 whitespace-pre-line font-medium">
          {post.content}
        </div>
      </article>
    </div>
  );
}
