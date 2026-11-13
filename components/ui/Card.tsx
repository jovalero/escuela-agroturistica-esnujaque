import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

export function Card({ hoverable = false, className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl bg-white border border-stone-300/90 p-6 shadow-xs text-stone-950',
        hoverable &&
          'transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-amber-400',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
