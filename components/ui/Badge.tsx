import React from 'react';
import { cn } from '@/lib/utils';

type BadgeVariant = 'paramo' | 'tierra' | 'laguna' | 'warning' | 'neutral';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const badgeStyles: Record<BadgeVariant, string> = {
  paramo:
    'bg-paramo-100 text-paramo-900 border-paramo-300 dark:bg-paramo-800/80 dark:text-paramo-100 dark:border-paramo-600',
  tierra:
    'bg-tierra-100 text-tierra-900 border-tierra-300 dark:bg-tierra-900/70 dark:text-tierra-200 dark:border-tierra-700',
  laguna:
    'bg-laguna-100 text-laguna-900 border-laguna-300 dark:bg-laguna-900/70 dark:text-laguna-100 dark:border-laguna-700',
  warning:
    'bg-amber-100 text-amber-950 border-amber-300 dark:bg-amber-900/60 dark:text-amber-100 dark:border-amber-700',
  neutral:
    'bg-stone-100 text-stone-800 border-stone-300 dark:bg-stone-800 dark:text-stone-200 dark:border-stone-700',
};

export function Badge({ variant = 'paramo', className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold tracking-wide font-sans',
        badgeStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
