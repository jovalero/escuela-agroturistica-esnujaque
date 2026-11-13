'use client';

import React, { useState } from 'react';
import { ChevronDown, List } from 'lucide-react';
import type { ChapterHeading } from '@/lib/content';
import { cn } from '@/lib/utils';

interface TableOfContentsProps {
  headings: ChapterHeading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  if (headings.length === 0) return null;

  return (
    <aside aria-label="Tabla de contenidos del capítulo" className="print:hidden">
      {/* Versión móvil desplegable */}
      <div className="lg:hidden mb-6 rounded-2xl border border-stone-200 dark:border-paramo-800 bg-white dark:bg-papel-cardDark shadow-sm">
        <button
          type="button"
          aria-expanded={mobileOpen}
          aria-controls="toc-mobile-list"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left font-sans text-sm font-bold text-stone-900 dark:text-stone-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paramo-600 rounded-2xl"
        >
          <span className="inline-flex items-center gap-2">
            <List className="h-4 w-4 text-paramo-700 dark:text-paramo-300" aria-hidden="true" />
            <span>Secciones de este capítulo ({headings.length})</span>
          </span>
          <ChevronDown
            className={cn(
              'h-4 w-4 text-stone-600 dark:text-stone-300 transition-transform',
              mobileOpen && 'rotate-180'
            )}
            aria-hidden="true"
          />
        </button>

        <nav
          id="toc-mobile-list"
          aria-label="Secciones del capítulo (móvil)"
          hidden={!mobileOpen}
          className="border-t border-stone-200 dark:border-paramo-800 px-4 py-3"
        >
          <ol className="space-y-2 text-sm">
            {headings.map((h) => (
              <li key={h.id} className={cn(h.level === 3 && 'pl-4')}>
                <a
                  href={`#${h.id}`}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded py-1 text-stone-700 hover:text-paramo-800 dark:text-stone-300 dark:hover:text-paramo-200"
                >
                  {h.text}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>

      {/* Versión desktop lateral sticky */}
      <div className="hidden lg:block sticky top-24 rounded-2xl border border-stone-200 dark:border-paramo-800 bg-white dark:bg-papel-cardDark p-5 shadow-sm">
        <h2 className="flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-wider text-paramo-800 dark:text-paramo-300 mb-3">
          <List className="h-4 w-4" aria-hidden="true" />
          <span>En este capítulo</span>
        </h2>
        <nav aria-label="Secciones del capítulo (escritorio)">
          <ol className="space-y-2 text-sm border-l border-stone-200 dark:border-paramo-800 pl-3">
            {headings.map((h) => (
              <li key={h.id} className={cn(h.level === 3 && 'pl-3 text-xs')}>
                <a
                  href={`#${h.id}`}
                  className="block py-0.5 text-stone-700 hover:text-paramo-800 dark:text-stone-300 dark:hover:text-paramo-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paramo-600 rounded"
                >
                  {h.text}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </aside>
  );
}
