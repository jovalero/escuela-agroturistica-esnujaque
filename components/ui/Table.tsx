import React from 'react';
import { cn } from '@/lib/utils';

export function Table({
  className,
  children,
  ...props
}: React.TableHTMLAttributes<HTMLTableElement>) {
  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-stone-200 dark:border-paramo-800 shadow-sm">
      <table
        className={cn(
          'w-full border-collapse text-left font-sans text-sm text-stone-800 dark:text-stone-100',
          className
        )}
        {...props}
      >
        {children}
      </table>
    </div>
  );
}
