import React from 'react';
import { cn } from '@/lib/utils';

interface QuoteProps {
  quote: string;
  author?: string;
  context?: string;
  className?: string;
  variant?: 'light' | 'dark' | 'white';
}

export function Quote({ quote, author, context, className, variant = 'light' }: QuoteProps) {
  const isDark = variant === 'dark';
  const isWhite = variant === 'white';

  const containerStyles = isDark
    ? 'border-l-4 border-amber-400 bg-[#143326] text-white border border-emerald-700/60 shadow-sm'
    : isWhite
    ? 'border-l-4 border-amber-500 bg-white text-stone-950 border border-stone-200/90 shadow-xl'
    : 'border-l-4 border-amber-500 bg-amber-50/70 text-stone-950 border border-stone-200/80 shadow-xs';

  const quoteStyles = isDark
    ? 'text-white'
    : 'text-black';

  const figcaptionStyles = isDark
    ? 'text-amber-300'
    : isWhite
    ? 'text-stone-950'
    : 'text-amber-950';

  const contextStyles = isDark
    ? 'text-emerald-200'
    : isWhite
    ? 'text-stone-600'
    : 'text-stone-800';

  return (
    <figure
      className={cn(
        'relative rounded-2xl p-6 sm:p-8 my-6',
        containerStyles,
        className
      )}
    >
      <blockquote
        className={cn(
          'font-serif text-lg sm:text-xl italic leading-relaxed font-semibold',
          quoteStyles
        )}
      >
        «{quote}»
      </blockquote>
      {(author || context) && (
        <figcaption
          className={cn(
            'mt-3 font-sans text-sm font-bold',
            figcaptionStyles
          )}
        >
          {author && <span>— {author}</span>}
          {context && (
            <span
              className={cn(
                'font-normal',
                contextStyles
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
