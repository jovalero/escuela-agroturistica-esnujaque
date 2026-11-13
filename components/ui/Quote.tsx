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
        'relative rounded-2xl border-l-4 border-amber-500 bg-amber-50/70 p-6 sm:p-8 my-6 text-stone-950 border border-stone-200/80 shadow-xs',
        className
      )}
    >
      <blockquote className="font-serif text-lg sm:text-xl italic leading-relaxed text-black font-semibold">
        «{quote}»
      </blockquote>
      {(author || context) && (
        <figcaption className="mt-3 font-sans text-sm font-bold text-amber-950">
          {author && <span>— {author}</span>}
          {context && <span className="font-normal text-stone-800"> · {context}</span>}
        </figcaption>
      )}
    </figure>
  );
}
