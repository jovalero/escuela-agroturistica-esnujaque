import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';
import type { ChapterMeta } from '@/lib/content';

interface ChapterNavigationProps {
  prev: ChapterMeta | null;
  next: ChapterMeta | null;
}

export function ChapterNavigation({ prev, next }: ChapterNavigationProps) {
  return (
    <nav
      aria-label="Navegación entre capítulos"
      className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 print:hidden"
    >
      {prev ? (
        <Link
          href={`/documento/${prev.slug}`}
          className="group flex flex-col justify-between rounded-2xl border border-stone-200 dark:border-paramo-800 bg-white dark:bg-papel-cardDark p-5 shadow-sm transition-all hover:border-paramo-400 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paramo-600"
        >
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
            Capítulo anterior ({prev.order}/21)
          </span>
          <span className="mt-2 font-serif text-base sm:text-lg font-bold text-paramo-800 dark:text-paramo-200 group-hover:underline">
            {prev.title}
          </span>
        </Link>
      ) : (
        <Link
          href="/documento"
          className="group flex flex-col justify-between rounded-2xl border border-stone-200 dark:border-paramo-800 bg-white dark:bg-papel-cardDark p-5 shadow-sm transition-all hover:border-paramo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paramo-600"
        >
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
            <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
            Índice general
          </span>
          <span className="mt-2 font-serif text-base sm:text-lg font-bold text-paramo-800 dark:text-paramo-200 group-hover:underline">
            Ver todos los capítulos del anteproyecto
          </span>
        </Link>
      )}

      {next ? (
        <Link
          href={`/documento/${next.slug}`}
          className="group flex flex-col justify-between rounded-2xl border border-stone-200 dark:border-paramo-800 bg-white dark:bg-papel-cardDark p-5 text-left sm:text-right shadow-sm transition-all hover:border-paramo-400 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paramo-600"
        >
          <span className="inline-flex items-center sm:justify-end gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
            Capítulo siguiente ({next.order}/21)
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </span>
          <span className="mt-2 font-serif text-base sm:text-lg font-bold text-paramo-800 dark:text-paramo-200 group-hover:underline">
            {next.title}
          </span>
        </Link>
      ) : (
        <Link
          href="/participa"
          className="group flex flex-col justify-between rounded-2xl border border-paramo-300 dark:border-paramo-700 bg-paramo-50/80 dark:bg-paramo-900/50 p-5 text-left sm:text-right shadow-sm transition-all hover:border-paramo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paramo-600"
        >
          <span className="inline-flex items-center sm:justify-end gap-1.5 text-xs font-semibold uppercase tracking-wider text-paramo-700 dark:text-paramo-300">
            Fin del documento · Siguiente paso
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </span>
          <span className="mt-2 font-serif text-base sm:text-lg font-bold text-paramo-900 dark:text-paramo-100 group-hover:underline">
            Participá en la encuesta y el buzón comunitario
          </span>
        </Link>
      )}
    </nav>
  );
}
