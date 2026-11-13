import React from 'react';
import { Badge } from './Badge';
import { Card } from './Card';
import { CheckCircle2 } from 'lucide-react';

export interface TimelineItem {
  stage: string;
  title: string;
  subtitle?: string;
  description: string;
  condition?: string;
  highlights?: string[];
}

interface TimelineProps {
  items: TimelineItem[];
}

export function Timeline({ items }: TimelineProps) {
  return (
    <ol className="relative border-l-2 border-paramo-300 dark:border-paramo-700 ml-3 sm:ml-6 space-y-10">
      {items.map((item, idx) => (
        <li key={item.title} className="relative pl-6 sm:pl-10">
          <span
            aria-hidden="true"
            className="absolute -left-[13px] top-1 flex h-6 w-6 items-center justify-center rounded-full bg-paramo-700 text-xs font-bold text-white ring-4 ring-papel dark:ring-papel-dark"
          >
            {idx + 1}
          </span>
          <Card className="p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Badge variant={idx === items.length - 1 ? 'tierra' : 'paramo'}>
                {item.stage}
              </Badge>
              {item.subtitle && (
                <span className="text-xs sm:text-sm font-medium text-stone-600 dark:text-stone-400">
                  {item.subtitle}
                </span>
              )}
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100">
              {item.title}
            </h3>
            <p className="mt-3 text-base leading-relaxed text-stone-700 dark:text-stone-300">
              {item.description}
            </p>
            {item.highlights && item.highlights.length > 0 && (
              <ul className="mt-4 space-y-2">
                {item.highlights.map((hl) => (
                  <li
                    key={hl}
                    className="flex items-start gap-2.5 text-sm text-stone-700 dark:text-stone-300"
                  >
                    <CheckCircle2
                      className="h-4 w-4 text-paramo-600 dark:text-paramo-400 shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            )}
            {item.condition && (
              <div className="mt-5 rounded-xl bg-tierra-50 dark:bg-tierra-900/30 border border-tierra-200 dark:border-tierra-800/70 p-3.5 text-xs sm:text-sm text-tierra-900 dark:text-tierra-200">
                <strong className="font-semibold">Condición de viabilidad: </strong>
                {item.condition}
              </div>
            )}
          </Card>
        </li>
      ))}
    </ol>
  );
}
