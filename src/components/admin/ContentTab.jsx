import React from 'react';
import { BookOpen, Percent, CheckCircle, Plus, Trash2 } from 'lucide-react';

export default function ContentTab({
  blogs,
  coupons,
  contentSubTab,
  setContentSubTab,
  contentSuccess,
  newBlog,
  setNewBlog,
  newCoupon,
  setNewCoupon,
  contentLoading,
  handleCreateBlog,
  handleDeleteBlog,
  handleCreateCoupon,
  handleDeleteCoupon
}) {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4">
        <h2 className="text-xl font-bold text-slate-900">Website Content Management</h2>
        <div className="flex bg-slate-100 rounded-xl p-1 border border-slate-200">
          <button
            onClick={() => setContentSubTab('blogs')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition ${contentSubTab === 'blogs' ? 'bg-white text-medical-blue shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            <BookOpen size={14} /> Blog Articles
          </button>
          <button
            onClick={() => setContentSubTab('coupons')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition ${contentSubTab === 'coupons' ? 'bg-white text-medical-black' : 'text-slate-600 hover:text-slate-900'}`}
          >
            <Percent size={14} /> Discount Coupons
          </button>
        </div>
      </div>

      {contentSuccess && (
        <div className="bg-green-50 border border-black text-black text-xs p-4 rounded-2xl font-bold flex items-center gap-2">
          <CheckCircle size={18} /> {contentSuccess}
        </div>
      )}

      {/* Sub-tab: Blog Content */}
      {contentSubTab === 'blogs' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form to Publish New Post */}
          <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8">
            <h3 className="font-bold text-sm text-slate-900 mb-2 flex items-center gap-2">
              <Plus size={18} className="text-medical-blue" /> Write New Health Insight
            </h3>
            <p className="text-[11px] text-slate-500 mb-6 leading-relaxed">Publish expert medical guides, wellness advice, and pharmaceutical news to the homepage & blog feed.</p>

            <form onSubmit={handleCreateBlog} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1.5">Article Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 5 Benefits of Daily Probiotic Supplements"
                  value={newBlog.title}
                  onChange={e => setNewBlog({ ...newBlog, title: e.target.value })}
                  className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:border-medical-blue focus:ring-1 focus:ring-medical-blue"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1.5">Category *</label>
                  <select
                    value={newBlog.category}
                    onChange={e => setNewBlog({ ...newBlog, category: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:border-medical-blue"
                  >
                    <option value="Medicine Education">Medicine Education</option>
                    <option value="Wellness & Nutrition">Wellness & Nutrition</option>
                    <option value="Medical Devices">Medical Devices</option>
                    <option value="Personal Care">Personal Care</option>
                    <option value="Baby Care">Baby Care</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1.5">Author *</label>
                  <input
                    type="text"
                    required
                    value={newBlog.author}
                    onChange={e => setNewBlog({ ...newBlog, author: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:border-medical-blue focus:ring-1 focus:ring-medical-blue"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1.5">Image URL</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/... (optional)"
                  value={newBlog.image}
                  onChange={e => setNewBlog({ ...newBlog, image: e.target.value })}
                  className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:border-medical-blue focus:ring-1 focus:ring-medical-blue"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1.5">Short Excerpt *</label>
                <textarea
                  required
                  rows="2"
                  placeholder="Brief summary of the article (1-2 sentences) shown on feed cards."
                  value={newBlog.excerpt}
                  onChange={e => setNewBlog({ ...newBlog, excerpt: e.target.value })}
                  className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:border-medical-blue focus:ring-1 focus:ring-medical-blue resize-none"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1.5">Full Article Content *</label>
                <textarea
                  required
                  rows="6"
                  placeholder="Enter full content. Paragraph breaks are maintained."
                  value={newBlog.content}
                  onChange={e => setNewBlog({ ...newBlog, content: e.target.value })}
                  className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:border-medical-blue focus:ring-1 focus:ring-medical-blue"
                />
              </div>

              <button
                type="submit"
                disabled={contentLoading}
                className="w-full bg-medical-blue hover:bg-blue-600 text-white font-bold py-3.5 rounded-xl text-xs transition shadow-md flex items-center justify-center gap-2"
              >
                {contentLoading ? 'Publishing...' : 'Publish Article Now'}
              </button>
            </form>
          </div>

          {/* List of Published Articles */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="font-bold text-xs uppercase text-slate-500 tracking-wider">Published Insights ({blogs.length})</h3>

            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {blogs.map(post => (
                <div key={post.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow transition flex items-start gap-4">
                  <img
                    src={post.image || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300'}
                    alt={post.title}
                    className="w-16 h-16 rounded-xl object-cover border border-slate-100 bg-slate-50 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="bg-blue-50 text-medical-blue text-[9px] font-black px-2 py-0.5 rounded-full border border-blue-100">{post.category}</span>
                    <h4 className="font-bold text-slate-800 text-sm mt-1.5 truncate">{post.title}</h4>
                    <p className="text-[10px] text-slate-400 mt-1">By {post.author} • {post.date} • {post.readTime}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <a
                      href={`/blog/${post.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-slate-400 hover:text-medical-blue hover:bg-slate-50 rounded-lg transition"
                    >
                      <BookOpen size={16} />
                    </a>
                    <button
                      onClick={() => handleDeleteBlog(post.id)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Sub-tab: Discount Coupons */}
      {contentSubTab === 'coupons' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form to Create Coupon */}
          <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8">
            <h3 className="font-bold text-sm text-slate-900 mb-2 flex items-center gap-2">
              <Plus size={18} className="text-medical-blue" /> Create Discount Coupon
            </h3>
            <p className="text-[11px] text-slate-500 mb-6 leading-relaxed">Add promo codes that customers can apply at checkout to save money.</p>

            <form onSubmit={handleCreateCoupon} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1.5">Coupon Code *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SAVE20, OFF150"
                  value={newCoupon.code}
                  onChange={e => setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })}
                  className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:border-medical-blue focus:ring-1 focus:ring-medical-blue"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1.5">Discount Type *</label>
                  <select
                    value={newCoupon.type}
                    onChange={e => setNewCoupon({ ...newCoupon, type: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:border-medical-blue"
                  >
                    <option value="percent">Percentage (%)</option>
                    <option value="flat">Flat Amount (₹)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1.5">Value *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    placeholder={newCoupon.type === 'percent' ? 'e.g. 15 for 15%' : 'e.g. 100 for ₹100'}
                    value={newCoupon.discount_value}
                    onChange={e => setNewCoupon({ ...newCoupon, discount_value: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:border-medical-blue focus:ring-1 focus:ring-medical-blue"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1.5">Min Order Value (₹) *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    placeholder="e.g. 499"
                    value={newCoupon.min_order_value}
                    onChange={e => setNewCoupon({ ...newCoupon, min_order_value: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:border-medical-blue focus:ring-1 focus:ring-medical-blue"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1.5">Max Discount (₹)</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="e.g. 200 (optional)"
                    value={newCoupon.max_discount}
                    onChange={e => setNewCoupon({ ...newCoupon, max_discount: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:border-medical-blue focus:ring-1 focus:ring-medical-blue"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={contentLoading}
                className="w-full bg-medical-blue hover:bg-blue-600 text-white font-bold py-3.5 rounded-xl text-xs transition shadow-md flex items-center justify-center gap-2"
              >
                {contentLoading ? 'Creating...' : 'Create Promo Code'}
              </button>
            </form>
          </div>

          {/* List of Coupon Codes */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="font-bold text-xs uppercase text-slate-500 tracking-wider">Active Promotional Coupons ({coupons.length})</h3>

            <div className="overflow-x-auto bg-white border border-slate-200 rounded-2xl shadow-sm">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                    <th className="p-4">Code</th>
                    <th className="p-4">Type</th>
                    <th className="p-4">Discount</th>
                    <th className="p-4">Min Spend</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {coupons.map(c => (
                    <tr key={c.code} className="hover:bg-slate-50 transition">
                      <td className="p-4 font-mono font-bold text-slate-900 bg-slate-50/50">{c.code}</td>
                      <td className="p-4 capitalize text-slate-500">{c.type}</td>
                      <td className="p-4 font-bold text-medical-blue">
                        {c.type === 'percent' ? `${c.discount_value}%` : `₹${c.discount_value}`}
                        {c.max_discount && <span className="text-[9px] text-slate-400 font-normal block">Max: ₹{c.max_discount}</span>}
                      </td>
                      <td className="p-4 text-slate-600">₹{c.min_order_value}</td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleDeleteCoupon(c.code)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
