import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

export function Card({ hoverable = false, className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl bg-white dark:bg-papel-cardDark border border-stone-200/90 dark:border-paramo-800/70 p-6 shadow-sm',
        hoverable &&
          'transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-paramo-300 dark:hover:border-paramo-600',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
