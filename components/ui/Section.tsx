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
    default: 'bg-white text-stone-950',
    muted:
      'bg-gradient-to-br from-paramo-950 via-paramo-900 to-paramo-800 text-white border-y border-paramo-700/80',
    dark: 'bg-paramo-950 text-white border-y border-paramo-800',
    accent:
      'bg-gradient-to-br from-paramo-950 via-paramo-900 to-paramo-800 text-white border-y border-paramo-700/80',
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
