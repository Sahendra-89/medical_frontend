import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-slate-500 mb-6 font-medium whitespace-nowrap overflow-x-auto pb-2 no-scrollbar">
      <Link href="/" className="hover:text-medical-blue flex items-center transition">
        <Home size={12} className="mr-1" /> Home
      </Link>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight size={12} className="text-slate-300 flex-shrink-0" />
          {item.href ? (
            <Link href={item.href} className="hover:text-medical-blue transition truncate max-w-[150px] sm:max-w-[250px]">
              {item.label}
            </Link>
          ) : (
            <span className="text-slate-800 font-bold truncate max-w-[150px] sm:max-w-[250px]" aria-current="page">
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
