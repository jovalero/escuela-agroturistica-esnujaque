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
    default:
      'bg-white text-stone-900 border-y border-stone-200/80 dark:bg-[#0B1611] dark:text-stone-100 dark:border-emerald-900/50 transition-colors duration-200',
    muted:
      'bg-[#1B4332] text-white border-y border-[#143326] dark:bg-[#11241B] dark:text-white dark:border-emerald-900/60 transition-colors duration-200',
    dark:
      'bg-[#143326] text-white border-y border-[#0d2218] dark:bg-[#08120D] dark:text-white dark:border-emerald-950 transition-colors duration-200',
    accent:
      'bg-[#1B4332] text-white border-y border-[#143326] dark:bg-[#11241B] dark:text-white dark:border-emerald-900/60 transition-colors duration-200',
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
