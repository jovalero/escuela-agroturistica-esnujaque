'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Search, X } from 'lucide-react';
import type { SearchableItem } from '@/lib/content';
import { Badge } from '@/components/ui/Badge';

interface DocumentSearchProps {
  items: SearchableItem[];
}

function normalizeText(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function getExcerpt(plainText: string, rawQuery: string): string {
  const normText = normalizeText(plainText);
  const normQuery = normalizeText(rawQuery.trim());
  const idx = normText.indexOf(normQuery);

  if (idx === -1) {
    return plainText.slice(0, 180) + (plainText.length > 180 ? '…' : '');
  }

  const start = Math.max(0, idx - 70);
  const end = Math.min(plainText.length, idx + normQuery.length + 110);
  const prefix = start > 0 ? '…' : '';
  const suffix = end < plainText.length ? '…' : '';
  return `${prefix}${plainText.slice(start, end).trim()}${suffix}`;
}

export function DocumentSearch({ items }: DocumentSearchProps) {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const trimmed = query.trim();
    if (trimmed.length < 2) return [];
    const normQuery = normalizeText(trimmed);

    return items
      .filter((item) => {
        const haystack = normalizeText(
          `${item.title} ${item.description} ${item.headings.join(' ')} ${item.plainText}`
        );
        return haystack.includes(normQuery);
      })
      .map((item) => ({
        ...item,
        excerpt: getExcerpt(item.plainText, trimmed),
      }));
  }, [items, query]);

  return (
    <div className="rounded-2xl border border-stone-200 dark:border-paramo-800 bg-white dark:bg-papel-cardDark p-5 sm:p-6 shadow-sm">
      <label
        htmlFor="document-search-input"
        className="block font-sans text-sm font-bold text-stone-900 dark:text-stone-100 mb-2"
      >
        Buscar dentro de los 21 capítulos del anteproyecto
      </label>
      <div className="relative flex items-center">
        <Search
          className="pointer-events-none absolute left-3.5 h-5 w-5 text-paramo-700 dark:text-paramo-300"
          aria-hidden="true"
        />
        <input
          id="document-search-input"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ej.: Laboratorio de Análisis de Suelos, Santuario de Durí, Chipuén, UNESCO..."
          className="w-full rounded-xl border border-stone-300 dark:border-paramo-700 bg-papel dark:bg-papel-dark pl-11 pr-10 py-3 font-sans text-sm sm:text-base text-stone-900 dark:text-stone-100 placeholder:text-stone-500 focus:border-paramo-600 focus:outline-none focus:ring-2 focus:ring-paramo-600"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            aria-label="Limpiar búsqueda"
            className="absolute right-3 rounded-lg p-1 text-stone-500 hover:bg-stone-200 dark:hover:bg-paramo-800"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </div>

      {query.trim().length >= 2 && (
        <div
          role="region"
          aria-live="polite"
          aria-label="Resultados de búsqueda en el documento"
          className="mt-4 border-t border-stone-200 dark:border-paramo-800 pt-4"
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-400 mb-3">
            {results.length === 0
              ? `No se encontraron coincidencias para «${query}»`
              : `${results.length} ${results.length === 1 ? 'capítulo encontrado' : 'capítulos encontrados'} para «${query}»`}
          </p>

          {results.length > 0 && (
            <ul className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {results.map((res) => (
                <li key={res.slug}>
                  <Link
                    href={`/documento/${res.slug}`}
                    className="group block rounded-xl border border-stone-200 dark:border-paramo-800 bg-stone-50/70 dark:bg-paramo-900/40 p-4 transition-all hover:border-paramo-500 hover:bg-paramo-50/60 dark:hover:bg-paramo-900/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paramo-600"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-serif text-base font-bold text-paramo-900 dark:text-paramo-100 group-hover:underline">
                        Capítulo {res.order}. {res.title}
                      </span>
                      <Badge variant="paramo">{res.category}</Badge>
                    </div>
                    <p className="mt-1.5 text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                      {res.excerpt}
                    </p>
                    <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-paramo-700 dark:text-paramo-300">
                      Ir al capítulo
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
