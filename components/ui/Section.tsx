import React from 'react';
import { cn } from '@/lib/utils';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'default' | 'muted' | 'dark' | 'accent';
}

export function Section({
  variant = 'default',
  className,
  children,
  ...props
}: SectionProps) {
  const variantStyles = {
    default: 'bg-white dark:bg-papel-dark text-stone-900 dark:text-stone-100',
    muted:
      'bg-stone-50 dark:bg-paramo-950/70 text-stone-900 dark:text-stone-100 border-y border-stone-200/70 dark:border-paramo-800/60',
    dark: 'bg-paramo-800 dark:bg-paramo-950 text-white',
    accent:
      'bg-paramo-50/80 dark:bg-paramo-900/40 text-stone-900 dark:text-stone-100 border-y border-paramo-200/60 dark:border-paramo-800/60',
  };

  return (
    <section
      className={cn('py-14 sm:py-20', variantStyles[variant], className)}
      {...props}
    >
      {children}
    </section>
  );
}
