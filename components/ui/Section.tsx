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
    default: 'bg-white text-stone-900 border-y border-stone-200/80',
    muted: 'bg-[#1B4332] text-white border-y border-[#143326]',
    dark: 'bg-[#143326] text-white border-y border-[#0d2218]',
    accent: 'bg-[#1B4332] text-white border-y border-[#143326]',
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
