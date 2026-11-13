'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Megaphone, X, ArrowRight } from 'lucide-react';
import { siteConfig } from '@/data/site';

export function AnnouncementBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (!siteConfig.announcementBanner.enabled || dismissed) {
    return null;
  }

  return (
    <div
      role="region"
      aria-label="Anuncio comunitario"
      className="bg-paramo-900 text-paramo-50 border-b border-paramo-700 px-4 py-2 text-xs sm:text-sm print:hidden"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-tierra-500 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white">
            <Megaphone className="h-3 w-3" aria-hidden="true" />
            {siteConfig.announcementBanner.badge}
          </span>
          <span className="font-medium text-paramo-100">
            {siteConfig.announcementBanner.text}
          </span>
          <Link
            href={siteConfig.announcementBanner.ctaHref}
            className="inline-flex items-center gap-1 font-semibold text-amber-300 underline underline-offset-4 hover:text-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 rounded"
          >
            {siteConfig.announcementBanner.ctaLabel}
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Ocultar anuncio de asamblea"
          className="rounded p-1 text-paramo-200 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white shrink-0"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
