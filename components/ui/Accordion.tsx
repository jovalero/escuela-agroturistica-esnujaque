'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  defaultOpenId?: string;
  className?: string;
}

export function Accordion({ items, defaultOpenId, className }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId || null);

  return (
    <div className={cn('divide-y divide-stone-200 dark:divide-paramo-800 rounded-2xl border border-stone-200 dark:border-paramo-800 bg-white dark:bg-papel-cardDark', className)}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        const panelId = `accordion-panel-${item.id}`;
        const buttonId = `accordion-btn-${item.id}`;
        return (
          <div key={item.id}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-sans font-semibold text-stone-900 dark:text-stone-100 hover:bg-stone-50 dark:hover:bg-paramo-900/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-paramo-600"
              >
                <span>{item.title}</span>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 shrink-0 text-paramo-700 dark:text-paramo-300 transition-transform duration-200',
                    isOpen && 'rotate-180'
                  )}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="px-5 pb-5 pt-1 text-sm sm:text-base leading-relaxed text-stone-700 dark:text-stone-300"
            >
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
