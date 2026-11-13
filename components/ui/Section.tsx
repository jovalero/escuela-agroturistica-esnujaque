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
      'bg-amber-50/50 text-stone-950 border-y border-amber-200/80',
    dark: 'bg-stone-950 text-white',
    accent:
      'bg-orange-50/50 text-stone-950 border-y border-amber-200/80',
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
