'use client';

import React, { useEffect, useState } from 'react';

export function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (docHeight <= 0) {
        setProgress(0);
        return;
      }
      const pct = Math.min(100, Math.max(0, Math.round((scrollTop / docHeight) * 100)));
      setProgress(pct);
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div
      className="fixed left-0 right-0 top-0 z-50 h-1 bg-paramo-900/15 dark:bg-paramo-950 print:hidden"
      role="progressbar"
      aria-label="Progreso de lectura del capítulo"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full bg-gradient-to-r from-paramo-600 via-tierra-500 to-laguna-500 transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
