import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'tierra';
type ButtonSize = 'sm' | 'md' | 'lg';

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
}

type ButtonAsButton = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: undefined;
  };

type ButtonAsLink = BaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
    href: string;
    download?: boolean | string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-paramo-700 text-white hover:bg-paramo-800 dark:bg-paramo-500 dark:text-paramo-950 dark:hover:bg-paramo-400 shadow-sm',
  secondary:
    'bg-paramo-100 text-paramo-900 hover:bg-paramo-200 dark:bg-paramo-800 dark:text-paramo-100 dark:hover:bg-paramo-700',
  outline:
    'border-2 border-paramo-700 text-paramo-800 hover:bg-paramo-50 dark:border-paramo-400 dark:text-paramo-200 dark:hover:bg-paramo-900/60',
  ghost:
    'text-paramo-800 hover:bg-paramo-100/70 dark:text-paramo-200 dark:hover:bg-paramo-800/60',
  tierra:
    'bg-tierra-600 text-white hover:bg-tierra-700 dark:bg-tierra-500 dark:text-paramo-950 dark:hover:bg-tierra-400 shadow-sm',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3.5 py-1.5 text-sm rounded-lg gap-1.5',
  md: 'px-5 py-2.5 text-sm sm:text-base rounded-xl gap-2',
  lg: 'px-6 py-3.5 text-base sm:text-lg rounded-xl gap-2.5',
};

export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', className, children, ...rest } = props;

  const classes = cn(
    'inline-flex items-center justify-center font-sans font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paramo-600 focus-visible:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none',
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  if ('href' in rest && typeof rest.href === 'string') {
    const { href, download, ...anchorRest } = rest;
    if (download || href.startsWith('http') || href.endsWith('.pdf')) {
      return (
        <a href={href} download={download} className={classes} {...anchorRest}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...anchorRest}>
        {children}
      </Link>
    );
  }

  const buttonRest = rest as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type={buttonRest.type || 'button'} className={classes} {...buttonRest}>
      {children}
    </button>
  );
}
