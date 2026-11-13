import React from 'react';
import Image from 'next/image';
import { Camera, Mountain } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PhotoPlaceholderProps {
  label: string;
  alt: string;
  caption?: string;
  src?: string;
  aspectRatio?: 'video' | 'square' | 'portrait';
  className?: string;
}

export function PhotoPlaceholder({
  label,
  alt,
  caption,
  src,
  aspectRatio = 'video',
  className,
}: PhotoPlaceholderProps) {
  const ratioClasses = {
    video: 'aspect-video',
    square: 'aspect-square',
    portrait: 'aspect-[4/5]',
  };

  return (
    <figure className={cn('group overflow-hidden rounded-2xl border border-paramo-200/80 dark:border-paramo-800 bg-paramo-900/5 dark:bg-paramo-950', className)}>
      <div
        className={cn(
          'relative w-full overflow-hidden bg-gradient-to-br from-paramo-800 via-paramo-700 to-laguna-700 flex flex-col items-center justify-center p-6 text-center text-white',
          ratioClasses[aspectRatio]
        )}
      >
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <>
            {/* Silueta decorativa de páramo andino en SVG puro (0 KB externos) */}
            <svg
              aria-hidden="true"
              viewBox="0 0 600 220"
              className="absolute inset-x-0 bottom-0 h-3/5 w-full text-paramo-950/35 fill-current pointer-events-none"
              preserveAspectRatio="none"
            >
              <path d="M0,220 L0,140 L110,65 L210,130 L340,40 L470,125 L550,80 L600,115 L600,220 Z" />
              <path
                d="M0,220 L0,165 L150,110 L280,155 L420,90 L530,150 L600,130 L600,220 Z"
                className="text-paramo-950/50 fill-current"
              />
            </svg>
            <div className="relative z-10 flex flex-col items-center max-w-md">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm border border-white/25">
                <Mountain className="h-6 w-6 text-paramo-100" aria-hidden="true" />
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-300/95 px-3 py-1 text-xs font-bold text-stone-950 shadow-sm">
                <Camera className="h-3.5 w-3.5" aria-hidden="true" />
                {label}
              </span>
              <p className="mt-2.5 text-xs text-paramo-100/90 font-sans">
                {alt}
              </p>
            </div>
          </>
        )}
      </div>
      {caption && (
        <figcaption className="px-4 py-3 text-xs sm:text-sm text-stone-700 dark:text-stone-300 bg-white dark:bg-papel-cardDark border-t border-stone-200/70 dark:border-paramo-800/70">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
