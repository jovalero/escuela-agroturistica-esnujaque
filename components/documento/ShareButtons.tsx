'use client';

import React, { useState } from 'react';
import { Check, Copy, Share2 } from 'lucide-react';
import { siteConfig } from '@/data/site';
import { Toast } from '@/components/ui/Toast';

interface ShareButtonsProps {
  title: string;
  slug: string;
}

export function ShareButtons({ title, slug }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = `${siteConfig.url}/documento/${slug}`;
  const shareText = `${title} — ${siteConfig.name} (Anteproyecto 2026)`;

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${shareText}: ${shareUrl}`)}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="rounded-2xl border border-stone-200 dark:border-paramo-800 bg-stone-50/80 dark:bg-paramo-900/40 p-4 sm:p-5 print:hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-stone-800 dark:text-stone-200">
          <Share2 className="h-4 w-4 text-paramo-700 dark:text-paramo-300" aria-hidden="true" />
          <span>Compartir este capítulo con la comunidad:</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* WhatsApp prioritario */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Compartir ${title} por WhatsApp`}
            className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3.5 py-2 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
          >
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2zm5.82 14.01c-.24.68-1.41 1.3-1.95 1.38-.5.08-1.13.11-1.83-.11-.42-.13-.97-.31-1.66-.61-2.92-1.26-4.83-4.21-4.98-4.41-.14-.2-1.19-1.58-1.19-3.02 0-1.44.75-2.15 1.02-2.44.27-.29.59-.36.79-.36.2 0 .4.01.57.01.18.01.43-.07.67.51.24.59.82 2.02.89 2.17.07.15.12.32.02.52-.1.2-.15.32-.29.49-.15.17-.31.38-.44.51-.15.15-.3.31-.13.61.17.29.76 1.25 1.63 2.02 1.12.99 2.06 1.3 2.36 1.45.29.15.46.12.63-.07.17-.2.73-.85.93-1.15.2-.29.39-.24.66-.15.27.1 1.71.81 2 .95.29.15.49.22.56.34.07.12.07.71-.17 1.39z" />
            </svg>
            <span>WhatsApp</span>
          </a>

          <a
            href={facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Compartir ${title} en Facebook`}
            className="inline-flex items-center gap-1.5 rounded-xl border border-stone-300 dark:border-paramo-700 bg-white dark:bg-papel-cardDark px-3 py-2 text-xs sm:text-sm font-medium text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-paramo-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paramo-600"
          >
            <span>Facebook</span>
          </a>

          <a
            href={twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Compartir ${title} en X`}
            className="inline-flex items-center gap-1.5 rounded-xl border border-stone-300 dark:border-paramo-700 bg-white dark:bg-papel-cardDark px-3 py-2 text-xs sm:text-sm font-medium text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-paramo-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paramo-600"
          >
            <span>X</span>
          </a>

          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-xl border border-stone-300 dark:border-paramo-700 bg-white dark:bg-papel-cardDark px-3 py-2 text-xs sm:text-sm font-medium text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-paramo-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paramo-600"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                <span>Enlace copiado</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" aria-hidden="true" />
                <span>Copiar enlace</span>
              </>
            )}
          </button>
        </div>
      </div>

      <Toast
        message={copied ? 'Enlace del capítulo copiado al portapapeles' : null}
        onClose={() => setCopied(false)}
      />
    </div>
  );
}
