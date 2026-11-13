import React from 'react';
import { cn } from '@/lib/utils';

interface QuoteProps {
  quote: string;
  author?: string;
  context?: string;
  className?: string;
}

export function Quote({ quote, author, context, className }: QuoteProps) {
  return (
    <figure
      className={cn(
        'relative rounded-2xl border-l-4 border-paramo-600 bg-paramo-50/70 dark:bg-paramo-900/40 dark:border-paramo-400 p-6 sm:p-8 my-6',
        className
      )}
    >
      <blockquote className="font-serif text-lg sm:text-xl italic leading-relaxed text-stone-900 dark:text-stone-100">
        «{quote}»
      </blockquote>
      {(author || context) && (
        <figcaption className="mt-3 font-sans text-sm font-semibold text-paramo-800 dark:text-paramo-200">
          {author && <span>— {author}</span>}
          {context && <span className="font-normal text-stone-600 dark:text-stone-400"> · {context}</span>}
        </figcaption>
      )}
    </figure>
  );
}
