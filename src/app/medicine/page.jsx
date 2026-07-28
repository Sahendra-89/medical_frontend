"use client";
import { useState, useEffect } from 'react';
import { getProducts } from '../../lib/api';
import Link from 'next/link';
import { Search, Filter, X, Pill, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import Breadcrumbs from '../../components/Breadcrumbs';

const CATEGORIES = [
  'must-haves', 'vitamin-store', 'sexual-wellness', 'personal-care', 
  'homeopathy', 'summer-store', 'health-food', 'diabetes-essentials',
  'ayurvedic', 'mother-baby', 'elderly-care', 'otc', 'prescription',
  'devices', 'wellness'
];

const CAT_ICONS = {
  'must-haves': '⭐', 'vitamin-store': '💊', 'sexual-wellness': '❤️', 
  'personal-care': '🧴', 'homeopathy': '🔬', 'summer-store': '☀️', 
  'health-food': '🥤', 'diabetes-essentials': '🩸', 'ayurvedic': '🌱', 
  'mother-baby': '👶', 'elderly-care': '🦯', 'otc': '🏥', 
  'prescription': '📋', 'devices': '🩺', 'wellness': '🌿'
};

export default function MedicineCatalogPage() {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(12);

  const load = async () => {
    setLoading(true);
    const res = await getProducts({ search: query, category, limit: 500 });
    // Map products to the medicine format expected by the UI
    const mapped = (res.products || []).map(p => ({
      id: p.id,
      medicine_name: p.name,
      company_name: p.brand,
      category: p.category_id,
      price: p.price,
      image_url: p.image,
      slug: p.id // Use ID as slug if there is no slug
    }));
    setMedicines(mapped);
    setLoading(false);
  };

  useEffect(() => { load(); }, [query, category]);

  // Reset to page 1 when filter/search changes
  useEffect(() => { setPage(1); }, [query, category, perPage]);

  const handleSearch = (e) => { e.preventDefault(); setQuery(search); };

  const cats = [...new Set(medicines.map(m => m.category).filter(Boolean))].sort();

  // Pagination calculations
  const totalItems = medicines.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage));
  const safePage = Math.min(page, totalPages);
  const startIdx = (safePage - 1) * perPage;
  const paginated = medicines.slice(startIdx, startIdx + perPage);

  // Page numbers to show (max 5 around current)
  const getPageNums = () => {
    const delta = 2;
    const range = [];
    for (let i = Math.max(1, safePage - delta); i <= Math.min(totalPages, safePage + delta); i++) range.push(i);
    if (range[0] > 1) { range.unshift('...'); range.unshift(1); }
    if (range[range.length - 1] < totalPages) { range.push('...'); range.push(totalPages); }
    return range;
  };


  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={category
          ? [{ label: 'Medicines', href: '/medicine' }, { label: category }]
          : [{ label: 'Medicines' }]}
        />

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-3">
            Medicine Catalog
          </h1>
          <p className="text-slate-500 text-base">
            {medicines.length} genuine medicines & healthcare products
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* Sidebar */}
          <aside className="w-full lg:w-56 flex-shrink-0">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 sticky top-24">
              <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2 text-sm">
                <Filter size={15} className="text-blue-600" /> Categories
              </h3>
              <div className="space-y-1">
                <button
                  onClick={() => setCategory('')}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition ${!category ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  All Medicines
                </button>
                {(cats.length ? cats : CATEGORIES).map(c => (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-2 ${category === c ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-50'}`}
                  >
                    <span>{CAT_ICONS[c] || '💊'}</span> {c}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main */}
          <div className="flex-1 min-w-0">

            {/* Search */}
            <form onSubmit={handleSearch} className="bg-white rounded-2xl border border-slate-200 shadow-sm mb-6 flex items-center overflow-hidden">
              <Search size={18} className="text-slate-400 ml-4 flex-shrink-0" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by medicine name or company..."
                className="flex-1 py-3 px-3 text-sm bg-transparent text-slate-900 placeholder-slate-400 focus:outline-none"
              />
              {query && (
                <button type="button" onClick={() => { setSearch(''); setQuery(''); }} className="mr-2 text-slate-400 hover:text-red-500 transition">
                  <X size={16} />
                </button>
              )}
              <button type="submit" className="bg-blue-600 text-white px-5 py-3 font-bold text-sm hover:bg-blue-700 transition flex-shrink-0">
                Search
              </button>
            </form>

            {/* Active filters */}
            {(category || query) && (
              <div className="flex flex-wrap gap-2 mb-5">
                {category && (
                  <span className="flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1.5 rounded-full border border-blue-200">
                    {CAT_ICONS[category]} {category}
                    <button onClick={() => setCategory('')}><X size={12} /></button>
                  </span>
                )}
                {query && (
                  <span className="flex items-center gap-1.5 bg-slate-100 text-slate-700 text-xs font-bold px-3 py-1.5 rounded-full border border-slate-200">
                    "{query}"
                    <button onClick={() => { setSearch(''); setQuery(''); }}><X size={12} /></button>
                  </span>
                )}
              </div>
            )}

            {/* Grid */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(perPage)].map((_, i) => (
                  <div key={i} className="bg-white rounded-3xl p-6 border border-slate-200 animate-pulse">
                    <div className="aspect-square bg-slate-100 rounded-2xl mb-4" />
                    <div className="h-4 bg-slate-100 rounded mb-2" />
                    <div className="h-3 bg-slate-100 rounded w-2/3" />
                  </div>
                ))}
              </div>
            ) : medicines.length === 0 ? (
              <div className="text-center bg-white rounded-3xl p-16 border border-slate-200 shadow-sm">
                <Pill size={40} className="mx-auto text-slate-300 mb-4" />
                <p className="text-slate-500 font-semibold mb-2">No medicines found</p>
                <p className="text-slate-400 text-xs">Try a different search or category</p>
                <button onClick={() => { setSearch(''); setQuery(''); setCategory(''); }} className="mt-4 text-xs text-blue-600 hover:underline font-bold">Clear filters</button>
              </div>
            ) : (
              <>
                {/* Results bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <p className="text-xs text-slate-500 font-semibold">
                    Showing <span className="text-slate-800 font-black">{startIdx + 1}–{Math.min(startIdx + perPage, totalItems)}</span> of <span className="text-slate-800 font-black">{totalItems}</span> medicines
                  </p>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <span className="font-semibold">Per page:</span>
                    {[6, 12, 24, 48].map(n => (
                      <button key={n} onClick={() => setPerPage(n)}
                        className={`w-8 h-7 rounded-lg font-bold transition ${perPage === n ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                        {n}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Medicine grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginated.map((med) => (
                    <Link
                      href={`/medicine/${med.slug || med.id}`}
                      key={med.id}
                      className="group bg-white rounded-3xl p-5 border border-slate-200 shadow-sm hover:shadow-xl transition duration-300 flex flex-col relative overflow-hidden"
                    >
                      <div className="absolute top-4 right-4 bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                        {CAT_ICONS[med.category] || '💊'} {med.category}
                      </div>
                      <div className="aspect-square bg-slate-50 rounded-2xl mb-4 overflow-hidden flex items-center justify-center p-4 border border-slate-100">
                        {med.image_url ? (
                          <img src={med.image_url} alt={med.medicine_name} className="object-contain w-full h-full mix-blend-multiply group-hover:scale-105 transition duration-500" />
                        ) : (
                          <span className="text-4xl">{CAT_ICONS[med.category] || '💊'}</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-slate-900 text-sm mb-0.5 leading-tight group-hover:text-blue-600 transition">{med.medicine_name}</h3>
                        <p className="text-[11px] text-slate-500 font-medium mb-3">{med.company_name}</p>
                        <div className="mt-auto pt-3 flex items-center justify-between border-t border-slate-100">
                          <div className="font-black text-lg text-slate-900">₹{Number(med.price).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
                          <div className="text-[11px] font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition">
                            View Details →
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Pagination Bar */}
                {totalPages > 1 && (
                  <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
                    {/* Info */}
                    <p className="text-xs text-slate-500">
                      Page <span className="font-black text-slate-800">{safePage}</span> of <span className="font-black text-slate-800">{totalPages}</span>
                    </p>

                    {/* Controls */}
                    <div className="flex items-center gap-1.5">
                      {/* First */}
                      <button
                        onClick={() => { setPage(1); window.scrollTo(0,0); }}
                        disabled={safePage === 1}
                        className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed transition"
                        title="First page"
                      >
                        <ChevronsLeft size={15} />
                      </button>
                      {/* Prev */}
                      <button
                        onClick={() => { setPage(p => Math.max(1, p - 1)); window.scrollTo(0,0); }}
                        disabled={safePage === 1}
                        className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed transition"
                        title="Previous page"
                      >
                        <ChevronLeft size={15} />
                      </button>

                      {/* Page Numbers */}
                      {getPageNums().map((num, i) =>
                        num === '...' ? (
                          <span key={`dots-${i}`} className="w-9 h-9 flex items-center justify-center text-slate-400 text-xs font-bold">…</span>
                        ) : (
                          <button
                            key={num}
                            onClick={() => { setPage(num); window.scrollTo(0,0); }}
                            className={`w-9 h-9 flex items-center justify-center rounded-xl text-xs font-black transition border ${
                              safePage === num
                                ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                                : 'bg-white text-slate-700 border-slate-200 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600'
                            }`}
                          >
                            {num}
                          </button>
                        )
                      )}

                      {/* Next */}
                      <button
                        onClick={() => { setPage(p => Math.min(totalPages, p + 1)); window.scrollTo(0,0); }}
                        disabled={safePage === totalPages}
                        className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed transition"
                        title="Next page"
                      >
                        <ChevronRight size={15} />
                      </button>
                      {/* Last */}
                      <button
                        onClick={() => { setPage(totalPages); window.scrollTo(0,0); }}
                        disabled={safePage === totalPages}
                        className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed transition"
                        title="Last page"
                      >
                        <ChevronsRight size={15} />
                      </button>
                    </div>

                    {/* Jump to page */}
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-slate-500 font-semibold">Go to:</span>
                      <input
                        type="number" min={1} max={totalPages}
                        className="w-14 h-9 rounded-xl border border-slate-200 text-center text-xs font-bold focus:outline-none focus:border-blue-500 bg-white"
                        onKeyDown={e => {
                          if (e.key === 'Enter') {
                            const v = parseInt(e.target.value);
                            if (v >= 1 && v <= totalPages) { setPage(v); window.scrollTo(0,0); }
                          }
                        }}
                        placeholder={safePage}
                      />
                    </div>
                  </div>
                )}
              </>
            )}


          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-16 bg-blue-50 border border-blue-100 p-5 rounded-2xl text-center">
          <p className="text-xs text-slate-600 max-w-4xl mx-auto">
            <strong className="text-blue-600">Disclaimer:</strong> Medicine information is for educational purposes only. Consult a qualified healthcare professional before use. Prescription medicines require a valid prescription.
          </p>
        </div>
      </div>
    </div>
  );
}
