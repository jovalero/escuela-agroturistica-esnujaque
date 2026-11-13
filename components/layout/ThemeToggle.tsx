'use client';

import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const syncFromDom = () => {
      const saved = localStorage.getItem('eta-theme');
      const isDarkMode =
        saved === 'dark' || document.documentElement.classList.contains('dark');
      setIsDark(isDarkMode);
      document.documentElement.classList.toggle('dark', isDarkMode);
    };

    syncFromDom();
    window.addEventListener('eta-theme-change', syncFromDom);
    return () => window.removeEventListener('eta-theme-change', syncFromDom);
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    document.documentElement.classList.toggle('dark', nextDark);
    localStorage.setItem('eta-theme', nextDark ? 'dark' : 'light');
    window.dispatchEvent(new Event('eta-theme-change'));
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      title={isDark ? 'Modo oscuro activo · Clic para modo claro' : 'Modo claro activo · Clic para modo oscuro'}
      className={cn(
        'inline-flex items-center gap-1 rounded-full border border-emerald-700/70 bg-emerald-950/70 p-1 text-white shadow-xs transition-colors hover:border-amber-300/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300',
        className
      )}
    >
      <span
        className={cn(
          'flex h-7 w-7 items-center justify-center rounded-full transition-all duration-200',
          !isDark
            ? 'bg-amber-400 text-stone-950 shadow-xs scale-100'
            : 'text-emerald-200/70 hover:text-white scale-95'
        )}
      >
        <Sun className="h-4 w-4" aria-hidden="true" />
      </span>
      <span
        className={cn(
          'flex h-7 w-7 items-center justify-center rounded-full transition-all duration-200',
          isDark
            ? 'bg-amber-400 text-stone-950 shadow-xs scale-100'
            : 'text-emerald-200/70 hover:text-white scale-95'
        )}
      >
        <Moon className="h-4 w-4" aria-hidden="true" />
      </span>
    </button>
  );
}
