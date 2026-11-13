import React from 'react';
import { cn } from '@/lib/utils';

type BadgeVariant = 'paramo' | 'tierra' | 'laguna' | 'warning' | 'neutral';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const badgeStyles: Record<BadgeVariant, string> = {
  paramo:
    'bg-emerald-50 text-emerald-950 border-emerald-300 font-bold',
  tierra:
    'bg-amber-100 text-amber-950 border-amber-400 font-bold',
  laguna:
    'bg-sky-50 text-sky-950 border-sky-300 font-bold',
  warning:
    'bg-amber-200 text-amber-950 border-amber-400 font-bold',
  neutral:
    'bg-stone-100 text-stone-950 border-stone-300 font-bold',
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
