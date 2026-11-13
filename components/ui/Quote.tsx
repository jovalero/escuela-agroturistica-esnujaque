import React from 'react';
import { cn } from '@/lib/utils';

interface QuoteProps {
  quote: string;
  author?: string;
  context?: string;
  className?: string;
  variant?: 'light' | 'dark';
}

export function Quote({ quote, author, context, className, variant = 'light' }: QuoteProps) {
  const isDark = variant === 'dark';

  return (
    <figure
      className={cn(
        'relative rounded-2xl border-l-4 p-6 sm:p-8 my-6 shadow-sm',
        isDark
          ? 'border-amber-400 bg-[#143326] text-white border border-emerald-700/60'
          : 'border-amber-500 bg-amber-50/70 text-stone-950 border border-stone-200/80 shadow-xs',
        className
      )}
    >
      <blockquote
        className={cn(
          'font-serif text-lg sm:text-xl italic leading-relaxed font-semibold',
          isDark ? 'text-white' : 'text-black'
        )}
      >
        «{quote}»
      </blockquote>
      {(author || context) && (
        <figcaption
          className={cn(
            'mt-3 font-sans text-sm font-bold',
            isDark ? 'text-amber-300' : 'text-amber-950'
          )}
        >
          {author && <span>— {author}</span>}
          {context && (
            <span
              className={cn(
                'font-normal',
                isDark ? 'text-emerald-200' : 'text-stone-800'
              )}
            >
              {' '}· {context}
            </span>
          )}
        </figcaption>
      )}
    </figure>
  );
}
