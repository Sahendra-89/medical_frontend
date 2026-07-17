"use client";

import React from 'react';
import Link from 'next/link';

export default function BlogsPage() {
  const blogs = [
    { title: 'The Importance of Vitamin D in Winter', category: 'Nutrition', readTime: '5 min read', image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=500&q=80' },
    { title: 'How to Manage Diabetes with Diet', category: 'Wellness', readTime: '8 min read', image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&q=80' },
    { title: 'Understanding Heart Health Basics', category: 'Medical', readTime: '6 min read', image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=500&q=80' },
    { title: 'Benefits of Regular Health Checkups', category: 'Prevention', readTime: '4 min read', image: 'https://images.unsplash.com/photo-1579684453423-f84349ef60b0?w=500&q=80' },
    { title: 'A Guide to Better Sleep Hygiene', category: 'Lifestyle', readTime: '7 min read', image: 'https://images.unsplash.com/photo-1511295742362-92c96b124e41?w=500&q=80' },
    { title: 'Managing Stress in the Modern World', category: 'Mental Health', readTime: '6 min read', image: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=500&q=80' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pb-20">
      <section className="bg-medical-dark text-white pt-16 pb-16 px-4 sm:px-8 text-center">
        <h1 className="text-3xl sm:text-5xl font-black mb-4">Health Insights & Articles</h1>
        <p className="text-blue-100 text-lg max-w-xl mx-auto">
          Read the latest articles, medical news, and wellness tips written by healthcare experts.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-8 mt-12 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl transition group cursor-pointer flex flex-col">
              <div className="h-48 overflow-hidden relative">
                <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-medical-blue text-xs font-bold px-3 py-1 rounded-full">
                  {blog.category}
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-slate-800 mb-3 group-hover:text-medical-blue transition">{blog.title}</h3>
                <div className="mt-auto flex items-center justify-between text-sm text-slate-500 font-medium pt-4 border-t border-slate-100">
                  <span>{blog.readTime}</span>
                  <span className="text-medical-blue">Read More &rarr;</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
